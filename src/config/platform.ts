const readFlag = (value: string | undefined, fallback: boolean): boolean => {
  if (!value) return fallback;
  const normalized = value.toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;
  return fallback;
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8090';
export const TENANT_ID = import.meta.env.VITE_TENANT_ID || 'sandbox-demo';
export const SANDBOX_MODE = readFlag(import.meta.env.VITE_SANDBOX_MODE, true);
export const ZITADEL_ISSUER = import.meta.env.VITE_ZITADEL_ISSUER || 'http://localhost:8085';
export const ZITADEL_CLIENT_ID = import.meta.env.VITE_ZITADEL_CLIENT_ID || 'carbon-watchdog-portal';
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://carbonwatchdog.org';
