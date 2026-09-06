import { computed, ref } from 'vue';
import { fallbackBuyers, fallbackProjects, fallbackReports } from '../data/portalData';
import { API_BASE_URL, SANDBOX_MODE, TENANT_ID } from '@/config/platform';
import type { Buyer, CapitalizedRiskLevel, Project, Report, RiskLevel } from '../types';

const projects = ref<Project[]>(SANDBOX_MODE ? fallbackProjects : []);
const buyers = ref<Buyer[]>(SANDBOX_MODE ? fallbackBuyers : []);
const reports = ref<Report[]>(SANDBOX_MODE ? fallbackReports : []);
const loading = ref(true);
const errorMessage = ref('');

let loadPromise: Promise<void> | null = null;

const formatNumber = (value: number | null | undefined): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value || 0);

const getRiskLabel = (value: RiskLevel): CapitalizedRiskLevel => {
  const normalized = String(value || 'low').toLowerCase();
  if (normalized === 'high') return 'High';
  if (normalized === 'medium') return 'Medium';
  return 'Low';
};

const getRiskTone = (value: RiskLevel | CapitalizedRiskLevel): string => {
  const normalized = String(value || 'low').toLowerCase();
  if (normalized === 'high') return 'text-red-200';
  if (normalized === 'medium') return 'text-amber-200';
  return 'text-emerald-200';
};

const loadData = async () => {
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    loading.value = true;

    try {
      const [projectsResponse, buyersResponse, reportsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/projects`, { headers: { 'X-Tenant-ID': TENANT_ID } }),
        fetch(`${API_BASE_URL}/api/v1/buyers`, { headers: { 'X-Tenant-ID': TENANT_ID } }),
        fetch(`${API_BASE_URL}/api/v1/reports/monitoring`, {
          headers: { 'X-Tenant-ID': TENANT_ID },
        }),
      ]);

      if (projectsResponse.ok) {
        const data = (await projectsResponse.json()) as { projects?: Project[] };
        projects.value = data.projects || fallbackProjects;
      }

      if (buyersResponse.ok) {
        const data = (await buyersResponse.json()) as { buyers?: Buyer[] };
        buyers.value = data.buyers || fallbackBuyers;
      }

      if (reportsResponse.ok) {
        const data = (await reportsResponse.json()) as { reports?: Report[] };
        reports.value = data.reports || fallbackReports;
      }
    } catch {
      if (SANDBOX_MODE) {
        projects.value = fallbackProjects;
        buyers.value = fallbackBuyers;
        reports.value = fallbackReports;
        errorMessage.value =
          'Sandbox mode: sample data is displayed because the API is unavailable.';
      } else {
        errorMessage.value =
          'Production mode: live API data is unavailable. Sample data is disabled.';
      }
    } finally {
      loading.value = false;
    }
  })();

  return loadPromise;
};

const buyerLinksByProject = (project: Project): Buyer[] =>
  buyers.value.filter((buyer) => project.buyerIds?.includes(buyer.id));

const totalAlerts = computed(() =>
  reports.value.reduce((sum, report) => sum + (report.alerts?.length || 0), 0),
);

const totalExposure = computed(() =>
  buyers.value.reduce((sum, buyer) => sum + (buyer.exposure || 0), 0),
);

const overallRisk = computed<CapitalizedRiskLevel>(() => {
  const riskLevels = reports.value.map((report) => report.overallRisk || 'low');

  if (riskLevels.includes('high')) return 'High';
  if (riskLevels.includes('medium')) return 'Medium';
  return 'Low';
});

export const usePortalData = () => {
  void loadData();

  return {
    projects,
    buyers,
    reports,
    loading,
    errorMessage,
    totalAlerts,
    totalExposure,
    overallRisk,
    formatNumber,
    getRiskLabel,
    getRiskTone,
    buyerLinksByProject,
    loadData,
  };
};
