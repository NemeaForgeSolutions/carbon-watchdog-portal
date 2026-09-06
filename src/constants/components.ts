import type { Component } from 'vue';
import { FileCheck2, Radio, Satellite, ShieldCheck } from 'lucide-vue-next';
import type { Alert, MetricAccent, Project } from '@/types';

export const ALERT_CARD_CONSTANTS = {
  fallbackSeverity: 'low' as Alert['severity'],
  fallbackSeverityLabel: 'Low',
  confidenceSuffix: '% confidence',
} as const;

export const BUYER_CARD_CONSTANTS = {
  badgeLabel: 'Buyer',
  creditUnit: 'credits',
  exposureDescription: 'Exposure in current monitored portfolio',
  defaultTotalMarketExposure: 433000,
} as const;

export const METRIC_CARD_CONSTANTS = {
  defaultAccent: 'slate' as MetricAccent,
  fallbackDetail: 'Live',
  fallbackDescription: 'Latest monitored portfolio snapshot',
} as const;

export const PROJECT_CARD_CONSTANTS = {
  defaultRiskLevel: 'low' as Project['riskLevel'],
  emptyBuyersText: 'No direct buyer linkage',
  unavailableCoordinatesText: 'Lat/Long unavailable',
  buyerExposureTitle: 'Buyer exposure',
  riskLabelSuffix: ' risk',
  integrityScores: {
    low: 94,
    medium: 68,
    high: 34,
  },
} as const;

export type OrbitTelemetryFeed = {
  id: string;
  label: string;
  desc: string;
};

export const CARBON_ORBIT_CONSTANTS = {
  badges: [
    { label: 'Sentinel-2', value: 'Optical feed' },
    { label: 'Sentinel-1', value: 'Radar feed' },
    { label: 'Buyer map', value: 'Exposure layer' },
    { label: 'Alert engine', value: 'Claim review' },
  ],
  telemetryFeeds: [
    { id: 'satellite-a', label: 'SENTINEL-2', desc: 'Optical feed' },
    { id: 'satellite-b', label: 'SENTINEL-1', desc: 'Radar feed' },
    { id: 'satellite-c', label: 'BUYER MAP', desc: 'Exposure layer' },
    { id: 'satellite-d', label: 'ALERT ENGINE', desc: 'Claim review' },
  ] as OrbitTelemetryFeed[],
} as const;

export const APP_HEADER_CONSTANTS = {
  eyebrow: 'Carbon integrity command center',
  brand: 'Carbon Watchdog',
  navAriaLabel: 'Primary navigation',
  briefingTo: '/request-demo',
  mobileNavTitle: 'Navigation',
  themePreferenceLabel: 'Theme preference',
  mobileNavAriaLabel: 'Mobile navigation',
  workspaces: [
    'Global Carbon Assets • Enterprise',
    'North America Aviation & Logistics ESG',
    'EU Corporate Compliance Reserve',
    'Emerging Market Forestry Fund',
  ],
} as const;

export type TelemetryPillar = {
  icon: Component;
  name: string;
  spec: string;
  description: string;
  badge: string;
};

export const APP_FOOTER_CONSTANTS = {
  eyebrow: 'Carbon Watchdog',
  title: 'A calmer surface for carbon integrity, buyer exposure, and evidence review.',
  description:
    'Designed for sustainability, procurement, legal, and audit teams that need a shared source of truth when project claims weaken.',
  briefingCta: {
    label: 'Book an operating briefing',
    to: '/request-demo',
  },
  focus: {
    title: 'Operating focus',
    description:
      'Keep every signal tied to the project boundary, affected buyers, supporting evidence, and the next action to take.',
  },
  bottom: {
    assurance: 'Satellite-first carbon assurance for portfolio and compliance teams.',
    audience: 'Built for internal review, buyer diligence, and claim substantiation.',
  },
  telemetryPillars: [
    {
      icon: Radio,
      name: 'ESA Sentinel-1 SAR',
      spec: '10m C-Band Radar',
      description:
        'Cloud-penetrating interferometric backscatter tracking non-linear canopy disturbances.',
      badge: '6-day Cycle',
    },
    {
      icon: Satellite,
      name: 'Sentinel-2 MSI',
      spec: '13-Band Multi-Spectral',
      description:
        'Red-Edge and SWIR bands for real-time NDVI and chlorophyll-adjusted degradation detection.',
      badge: '5-day Revisit',
    },
    {
      icon: ShieldCheck,
      name: 'CSRD Article 29a',
      spec: 'Double Materiality Hub',
      description:
        'Auditor-ready evidence packets compliant with EU Green Claims and SEC disclosure rules.',
      badge: 'Regulatory Grade',
    },
    {
      icon: FileCheck2,
      name: 'Evidence Vault',
      spec: 'Tamper-Proof Ledger',
      description:
        'Cryptographically hashed observation packages reconciling registry claims against physical reality.',
      badge: 'SOC 2 Type II',
    },
  ] as TelemetryPillar[],
} as const;

export const BUYER_DOSSIER_CONSTANTS = {
  assuranceCycleText: 'Assurance Cycle: Q3 2026 Audit Window',
  dossierSubtitle: 'Corporate Portfolio Exposure & Claim Substantiation Dossier',
  evidenceScoreCutoff: 50,
} as const;

export const PROJECT_DOSSIER_CONSTANTS = {
  chartWidth: 360,
  chartHeight: 120,
  paddingX: 20,
  paddingY: 15,
  ndviMinVal: 0.4,
  ndviMaxVal: 0.95,
  radarMinDb: -9,
  radarMaxDb: 1,
  copyTimeoutMs: 2000,
} as const;

export const GLOBAL_SEARCH_CONSTANTS = {
  defaultProjectLimit: 4,
  defaultBuyerLimit: 3,
  defaultRegulationLimit: 2,
} as const;
