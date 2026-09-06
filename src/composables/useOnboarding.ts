import { ref } from 'vue';
import { API_BASE_URL, TENANT_ID } from '@/config/platform';

export interface OnboardingStatus {
  tenantId: string;
  organization: string;
  completed: boolean;
  currentStep: string;
  completedSteps: string[];
  pendingSteps: string[];
  updatedAt: string;
  importQueued: number;
  importRunning: number;
  importDone: number;
  importFailed: number;
}

export interface ImportJob {
  id: string;
  tenantId?: string;
  sourceType: string;
  description?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progressPercent: number;
  errorMessage?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

const status = ref<OnboardingStatus | null>(null);
const loading = ref(false);
const errorMessage = ref('');
const importJobs = ref<ImportJob[]>([]);

const defaultHeaders = {
  'Content-Type': 'application/json',
  'X-Tenant-ID': TENANT_ID,
};

const loadStatus = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/status`, {
      headers: { 'X-Tenant-ID': TENANT_ID },
    });

    if (!response.ok) {
      throw new Error('Could not load onboarding status');
    }

    status.value = (await response.json()) as OnboardingStatus;
  } catch {
    errorMessage.value = 'Unable to load onboarding status right now.';
  } finally {
    loading.value = false;
  }
};

const startOnboarding = async (payload: {
  organizationName: string;
  industry: string;
  region: string;
  websiteUrl: string;
  adminEmail: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/start`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not start onboarding');
  }

  await loadStatus();
};

const inviteUser = async (payload: { email: string; role: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/invite`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not queue invite');
  }

  await loadStatus();
};

const queueImport = async (payload: { sourceType: string; description: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/imports`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Could not queue import');
  }

  await loadImportJobs();
  await loadStatus();
};

const loadImportJobs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/imports`, {
      headers: { 'X-Tenant-ID': TENANT_ID },
    });

    if (!response.ok) {
      throw new Error('Could not load import jobs');
    }

    const payload = (await response.json()) as { imports?: ImportJob[] };
    importJobs.value = payload.imports || [];
  } catch {
    errorMessage.value = 'Unable to load import jobs right now.';
  }
};

const refreshOnboarding = async () => {
  await Promise.all([loadStatus(), loadImportJobs()]);
};

const completeOnboarding = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/onboarding/complete`, {
    method: 'POST',
    headers: defaultHeaders,
  });

  if (!response.ok) {
    throw new Error('Could not complete onboarding');
  }

  await loadStatus();
};

export const useOnboarding = () => ({
  status,
  importJobs,
  loading,
  errorMessage,
  loadStatus,
  loadImportJobs,
  refreshOnboarding,
  startOnboarding,
  inviteUser,
  queueImport,
  completeOnboarding,
});
