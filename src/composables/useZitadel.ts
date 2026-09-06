import { computed, ref } from 'vue';
import {
  SANDBOX_MODE,
  TENANT_ID,
  ZITADEL_CLIENT_ID,
  ZITADEL_ISSUER,
} from '@/config/platform';

export interface ZitadelUser {
  id: string;
  email: string;
  name: string;
  orgId: string;
  role: 'admin' | 'analyst' | 'viewer' | string;
}

const STORAGE_KEY_TOKEN = 'cw_zitadel_access_token';
const STORAGE_KEY_USER = 'cw_zitadel_user';
const PKCE_VERIFIER_KEY = 'cw_zitadel_pkce_verifier';

const accessToken = ref<string | null>(localStorage.getItem(STORAGE_KEY_TOKEN));
const currentUser = ref<ZitadelUser | null>(
  localStorage.getItem(STORAGE_KEY_USER)
    ? JSON.parse(localStorage.getItem(STORAGE_KEY_USER)!)
    : null,
);
const isLoading = ref(false);
const authError = ref<string | null>(null);

// Generate random string for PKCE code verifier
const generateRandomString = (length = 64): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => charset[dec % charset.length]).join('');
};

// Compute SHA-256 base64url challenge from verifier
const generateCodeChallenge = async (verifier: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Parse JWT payload without external library
const parseJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const useZitadel = () => {
  const isAuthenticated = computed(() => !!accessToken.value);
  const userRole = computed(() => currentUser.value?.role || 'viewer');
  const tenantId = computed(() => currentUser.value?.orgId || TENANT_ID);

  /**
   * Redirects the browser to Zitadel's OAuth2/OIDC authorize endpoint using PKCE.
   */
  const login = async (redirectUri = `${window.location.origin}/auth/callback`) => {
    try {
      isLoading.value = true;
      authError.value = null;

      const codeVerifier = generateRandomString();
      sessionStorage.setItem(PKCE_VERIFIER_KEY, codeVerifier);

      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const authUrl = new URL(`${ZITADEL_ISSUER}/oauth/v2/authorize`);

      authUrl.searchParams.set('client_id', ZITADEL_CLIENT_ID);
      authUrl.searchParams.set('response_type', 'code');
      authUrl.searchParams.set('scope', 'openid profile email urn:zitadel:iam:org:project:roles');
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('code_challenge', codeChallenge);
      authUrl.searchParams.set('code_challenge_method', 'S256');

      window.location.href = authUrl.toString();
    } catch (err) {
      authError.value = err instanceof Error ? err.message : 'Login redirection failed';
      isLoading.value = false;
    }
  };

  /**
   * Handles the OAuth2 callback code exchange on the redirect URI.
   */
  const handleCallback = async (redirectUri = `${window.location.origin}/auth/callback`): Promise<boolean> => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      authError.value = urlParams.get('error_description') || error;
      return false;
    }

    if (!code) {
      return false;
    }

    const codeVerifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    if (!codeVerifier) {
      authError.value = 'PKCE verifier missing from session storage';
      return false;
    }

    try {
      isLoading.value = true;

      const response = await fetch(`${ZITADEL_ISSUER}/oauth/v2/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: ZITADEL_CLIENT_ID,
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      });

      if (!response.ok) {
        throw new Error(`Token exchange failed with status ${response.status}`);
      }

      const tokenData = (await response.json()) as { access_token: string; id_token?: string };
      setSession(tokenData.access_token);

      sessionStorage.removeItem(PKCE_VERIFIER_KEY);
      return true;
    } catch (err) {
      authError.value = err instanceof Error ? err.message : 'Failed to exchange authorization code';
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * Sets the access token and parses user metadata into reactive state.
   */
  const setSession = (token: string) => {
    accessToken.value = token;
    localStorage.setItem(STORAGE_KEY_TOKEN, token);

    const payload = parseJwtPayload(token);
    if (payload) {
      const rolesMap = (payload['urn:zitadel:iam:org:project:roles'] as Record<string, unknown>) || {};
      let role = 'viewer';
      if ('admin' in rolesMap) role = 'admin';
      else if ('analyst' in rolesMap) role = 'analyst';

      const user: ZitadelUser = {
        id: String(payload.sub || ''),
        email: String(payload.email || ''),
        name: String(payload.name || payload.preferred_username || ''),
        orgId: String(payload['urn:zitadel:iam:org:id'] || TENANT_ID),
        role,
      };

      currentUser.value = user;
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  };

  /**
   * Fast-track sandbox mock login for local developer preview without running Zitadel.
   */
  const loginAsMock = (role: 'admin' | 'analyst' | 'viewer' = 'admin', tenant = TENANT_ID) => {
    const mockToken = `mock_${role}_${tenant}`;
    accessToken.value = mockToken;
    localStorage.setItem(STORAGE_KEY_TOKEN, mockToken);

    const user: ZitadelUser = {
      id: `mock-usr-${role}`,
      email: `${role}@carbonwatchdog.internal`,
      name: `Sandbox ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      orgId: tenant,
      role,
    };

    currentUser.value = user;
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  };

  /**
   * Logs out the user and clears stored session tokens.
   */
  const logout = (redirect = true) => {
    accessToken.value = null;
    currentUser.value = null;
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);

    if (redirect && !SANDBOX_MODE) {
      window.location.href = `${ZITADEL_ISSUER}/oidc/v1/end_session?post_logout_redirect_uri=${encodeURIComponent(
        window.location.origin,
      )}`;
    }
  };

  /**
   * Returns standard HTTP headers containing Bearer token and tenant context.
   */
  const getAuthHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      'X-Tenant-ID': tenantId.value,
    };
    if (accessToken.value) {
      headers['Authorization'] = `Bearer ${accessToken.value}`;
    }
    return headers;
  };

  return {
    accessToken,
    currentUser,
    isAuthenticated,
    userRole,
    tenantId,
    isLoading,
    authError,
    login,
    handleCallback,
    loginAsMock,
    logout,
    getAuthHeaders,
  };
};
