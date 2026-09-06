import { computed, ref } from 'vue';
import {
  CARBON_BUYERS,
  CARBON_PROJECTS,
  type BuyerData,
  type ProjectData,
} from '@/data/carbonData';

const selectedProject = ref<ProjectData | null>(null);
const projectDossierOpen = ref(false);

const selectedBuyer = ref<BuyerData | null>(null);
const buyerDossierOpen = ref(false);

const globalSearchOpen = ref(false);

const toastMessage = ref<string | null>(null);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

export function useCarbonDossier() {
  const openProjectDossier = (projectOrIdOrName: ProjectData | string) => {
    if (typeof projectOrIdOrName === 'string') {
      const found =
        CARBON_PROJECTS.find(
          (p) =>
            p.id.toLowerCase() === projectOrIdOrName.toLowerCase() ||
            p.name.toLowerCase().includes(projectOrIdOrName.toLowerCase()),
        ) || CARBON_PROJECTS[0];
      selectedProject.value = found;
    } else {
      selectedProject.value = projectOrIdOrName;
    }
    projectDossierOpen.value = true;
  };

  const closeProjectDossier = () => {
    projectDossierOpen.value = false;
  };

  const openBuyerDossier = (buyerOrIdOrName: BuyerData | string) => {
    if (typeof buyerOrIdOrName === 'string') {
      const found =
        CARBON_BUYERS.find(
          (b) =>
            b.id.toLowerCase() === buyerOrIdOrName.toLowerCase() ||
            b.name.toLowerCase().includes(buyerOrIdOrName.toLowerCase()),
        ) || CARBON_BUYERS[0];
      selectedBuyer.value = found;
    } else {
      selectedBuyer.value = buyerOrIdOrName;
    }
    buyerDossierOpen.value = true;
  };

  const closeBuyerDossier = () => {
    buyerDossierOpen.value = false;
  };

  const showToast = (message: string, duration = 3500) => {
    toastMessage.value = message;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMessage.value = null;
    }, duration);
  };

  const formatNumber = (val: number | null | undefined): string => {
    if (val === null || val === undefined) return '0';
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(0) + 'K';
    }
    return val.toLocaleString();
  };

  const formatCurrency = (val: number | null | undefined): string => {
    if (val === null || val === undefined) return '$0';
    if (val >= 1000000) {
      return `$${(val / 1000000).toFixed(1)}M`;
    }
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}K`;
    }
    return `$${val.toLocaleString()}`;
  };

  return {
    allProjects: computed(() => CARBON_PROJECTS),
    allBuyers: computed(() => CARBON_BUYERS),
    selectedProject,
    projectDossierOpen,
    openProjectDossier,
    closeProjectDossier,
    selectedBuyer,
    buyerDossierOpen,
    openBuyerDossier,
    closeBuyerDossier,
    globalSearchOpen,
    toastMessage,
    showToast,
    formatNumber,
    formatCurrency,
  };
}
