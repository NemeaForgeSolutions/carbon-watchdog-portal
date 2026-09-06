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
} as const;

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
} as const;
