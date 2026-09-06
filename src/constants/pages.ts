import type { Component } from 'vue';
import {
  Database,
  Eye,
  KeyRound,
  Layers,
  Lock,
  Radio,
  Satellite,
  Scale,
  ScrollText,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-vue-next';

import type { AuditChecklistItem } from '@/data/carbonData';

export const WATCHLIST_CREDIT_TYPES = [
  'All',
  'Avoided Deforestation',
  'Mangroves',
  'Agroforestry',
  'Peatland',
  'Reforestation',
] as const;

export const WATCHLIST_RISK_TIERS = ['All', 'critical', 'high', 'medium', 'low'] as const;

export const WATCHLIST_STATUSES = [
  'All',
  'Investigation',
  'Escalated Review',
  'Monitoring Active',
  'Stable',
] as const;

export const WATCHLIST_SATELLITE_SOURCES = [
  'All',
  'Sentinel-1 SAR',
  'Sentinel-2 Optical',
  'Sentinel-1 SAR + Sentinel-2 MSI',
] as const;

export const BUYER_URGENCY_OPTIONS = ['All', 'Immediate', 'Elevated', 'Moderate', 'Low'] as const;

export const BUYER_HEALTH_OPTIONS = [
  'All',
  'Critical Exposure',
  'Elevated Risk',
  'Monitored / Stable',
  'Exemplary',
] as const;

export const AUDIT_STATUS_CYCLE: AuditChecklistItem['status'][] = [
  'Verified',
  'Needs Review',
  'Missing Evidence',
  'Escalated',
];

export const OVERVIEW_ANIMATION_TARGETS = {
  duration: 1200,
  projects: 184,
  alerts: 17,
  buyers: 42,
} as const;

export const PORTFOLIO_PAGE_SIZE = 8;

export type PricingPlan = {
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  projects: string;
  buyers: string;
  cadence: string;
  badge: string;
  featured: boolean;
  cta: string;
  summary: string;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Pilot',
    tagline: 'For initial portfolio validation',
    monthlyPrice: 4200,
    annualPrice: 3500,
    projects: 'Up to 5 projects',
    buyers: 'Up to 3 corporate buyers',
    cadence: 'Bi-weekly satellite pass',
    badge: 'Evaluation Tier',
    featured: false,
    cta: 'Launch Pilot Validation',
    summary:
      'Ideal for sustainability leads seeking to test satellite assurance on flagged portfolio assets.',
  },
  {
    name: 'Growth',
    tagline: 'For active carbon portfolio monitoring',
    monthlyPrice: 9800,
    annualPrice: 8200,
    projects: 'Up to 25 projects',
    buyers: 'Up to 15 corporate buyers',
    cadence: '5-day radar revisit',
    badge: 'Active Surveillance',
    featured: false,
    cta: 'Deploy Growth Platform',
    summary:
      'Designed for ESG asset managers and corporate procurement leads actively retiring offsets.',
  },
  {
    name: 'Enterprise',
    tagline: 'For institutional-scale exposure intelligence',
    monthlyPrice: 24000,
    annualPrice: 19500,
    projects: 'Unlimited global projects',
    buyers: 'Unlimited buyers & subsidiaries',
    cadence: 'Continuous daily synthetic fusion',
    badge: 'Institutional Standard',
    featured: true,
    cta: 'Initiate Enterprise Onboarding',
    summary:
      'Custom defense platform for Fortune 500 airlines, energy firms, and sovereign wealth portfolios.',
  },
];

export type PricingMatrixFeature = {
  name: string;
  pilot: string | boolean;
  growth: string | boolean;
  enterprise: string | boolean;
};

export const PRICING_MATRIX_FEATURES: PricingMatrixFeature[] = [
  {
    name: 'Projects monitored',
    pilot: '5 targets',
    growth: '25 targets',
    enterprise: 'Unlimited global',
  },
  {
    name: 'Buyers & counterparties',
    pilot: '3 entities',
    growth: '15 entities',
    enterprise: 'Unlimited',
  },
  {
    name: 'Satellite monitoring',
    pilot: 'Bi-weekly optical',
    growth: '5-day optical + SAR',
    enterprise: 'Daily multi-sensor fusion',
  },
  {
    name: 'Risk alerts',
    pilot: 'Standard email',
    growth: 'Real-time Webhook & Slack',
    enterprise: 'Custom PagerDuty & 24/7 Ops',
  },
  {
    name: 'Compliance center',
    pilot: 'Self-serve reference',
    growth: 'CSRD & Green Claims checks',
    enterprise: 'Full legal substantiation',
  },
  {
    name: 'Evidence packs',
    pilot: '3 per quarter',
    growth: 'Unlimited PDF packs',
    enterprise: 'Custom legal memorandums',
  },
  {
    name: 'API access',
    pilot: false,
    growth: 'Read-only REST',
    enterprise: 'High-throughput REST & GraphQL',
  },
  {
    name: 'SSO & IAM',
    pilot: false,
    growth: 'SAML 2.0 / Okta',
    enterprise: 'Enterprise OIDC, SCIM, RBAC',
  },
  {
    name: 'Audit logs',
    pilot: '30 days',
    growth: '1 year retention',
    enterprise: 'Immutable cryptographic ledger',
  },
  {
    name: 'Dedicated support',
    pilot: 'Email support',
    growth: 'Priority analyst desk',
    enterprise: 'Dedicated remote sensing scientist',
  },
];

export type PipelineStep = {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  icon: Component;
  color: string;
};

export const METHODS_PIPELINE_STEPS: PipelineStep[] = [
  {
    step: '01',
    title: 'Satellite Observation',
    subtitle: 'Dual-Constellation Orbital Pass',
    desc: 'Automated acquisition of Sentinel-1 C-Band SAR and Sentinel-2 10m multispectral optical imagery across registered project polygons.',
    icon: Satellite,
    color: 'text-sky-400',
  },
  {
    step: '02',
    title: 'Optical Analysis',
    subtitle: 'Sentinel-2 Multispectral',
    desc: '13-band surface reflectance extraction, harmonic cloud masking, and NDVI/EVI vegetative health computation.',
    icon: Eye,
    color: 'text-emerald-400',
  },
  {
    step: '03',
    title: 'SAR Analysis',
    subtitle: 'Sentinel-1 Dual-Pol Radar',
    desc: 'Cloud-penetrating backscatter (VV/VH) coherence analysis to detect mechanical tree felling and biomass collapse in tropical zones.',
    icon: Radio,
    color: 'text-cyan-400',
  },
  {
    step: '04',
    title: 'Registry Baseline',
    subtitle: 'Verra & Gold Standard Ledgers',
    desc: 'Ingestion of Project Design Documents (PDD), verified boundary GeoJSON polygons, additionality assumptions, and crediting buffer pools.',
    icon: Database,
    color: 'text-indigo-400',
  },
  {
    step: '05',
    title: 'Data Fusion',
    subtitle: 'Spatiotemporal Alignment',
    desc: 'Co-registration of optical reflectance, radar backscatter, topography (SRTM DEM), and historical deforestation baselines.',
    icon: Layers,
    color: 'text-teal-400',
  },
  {
    step: '06',
    title: 'Anomaly Detection',
    subtitle: 'Change-Point Statistical Engine',
    desc: 'Continuous moving-average deviation algorithms detect sustained canopy loss exceeding 3-sigma statistical thresholds.',
    icon: Sparkles,
    color: 'text-amber-400',
  },
  {
    step: '07',
    title: 'Confidence Scoring',
    subtitle: 'Bayesian Evidence Synthesis',
    desc: 'Probabilistic fusion of sensor agreement, cloud contamination probabilities, and historical sensor noise to assign a 0–100% confidence rating.',
    icon: ShieldCheck,
    color: 'text-emerald-400',
  },
  {
    step: '08',
    title: 'Portfolio Exposure',
    subtitle: 'Corporate Liability Mapping',
    desc: 'Translation of physical tree loss into corporate balance sheet exposure, unhedged financial liability ($M), and CSRD compliance risk.',
    icon: Scale,
    color: 'text-rose-400',
  },
];

export type SecurityCard = {
  title: string;
  badge: string;
  icon: Component;
  color: string;
  status: string;
  desc: string;
  disclaimer: string;
};

export const SECURITY_CARDS: SecurityCard[] = [
  {
    title: 'SOC 2 Readiness & Architecture',
    badge: 'Controls Standard',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    status: 'Audit Architecture Ready',
    desc: 'Engineered according to AICPA SOC 2 Type II Trust Services Criteria for Security, Confidentiality, and Processing Integrity. Built with automated evidence collection across infrastructure and source pipelines.',
    disclaimer:
      'Prototype architecture aligns with SOC 2 requirements; active commercial certification pending third-party audit.',
  },
  {
    title: 'SAML 2.0 & OIDC Enterprise SSO',
    badge: 'Identity Federation',
    icon: KeyRound,
    color: 'text-cyan-400',
    status: 'Federated Auth Active',
    desc: 'Native integration with Okta, Microsoft Entra ID (Azure AD), Ping Identity, and Google Workspace. Enforces hardware-backed WebAuthn/FIDO2 MFA and automatic SCIM user de-provisioning.',
    disclaimer: 'Enterprise SSO connectors ready for sandbox federation.',
  },
  {
    title: 'Tenant Data Isolation',
    badge: 'Zero-Leakage Architecture',
    icon: Server,
    color: 'text-indigo-400',
    status: 'Strict Namespace Boundary',
    desc: 'Multi-tenant architecture enforces hard logical database segregation, row-level security (RLS), and isolated object storage buckets for each corporate customer.',
    disclaimer: 'No cross-tenant data sharing or leakage across portfolio boundaries.',
  },
  {
    title: 'End-to-End Encryption Standards',
    badge: 'Cryptographic Security',
    icon: Lock,
    color: 'text-teal-400',
    status: 'AES-256 & TLS 1.3',
    desc: 'All satellite observations, polygon boundaries, and buyer disclosures are encrypted in transit via TLS 1.3 and at rest with envelope-wrapped AES-256 keys (AWS KMS / Cloud KMS).',
    disclaimer: 'Customer-Managed Encryption Keys (CMEK) supported on Enterprise tier.',
  },
  {
    title: 'Immutable Cryptographic Audit Logs',
    badge: 'Verifiable Integrity',
    icon: ScrollText,
    color: 'text-sky-400',
    status: 'Tamper-Evident Ledger',
    desc: 'All user sessions, risk threshold modifications, and analyst escalation notes are recorded to append-only, tamper-evident audit logs with hash chaining for legal defensibility.',
    disclaimer: 'Exportable for corporate compliance and SEC/CSRD legal filings.',
  },
  {
    title: 'Granular Role-Based Access Control (RBAC)',
    badge: 'Access Governance',
    icon: Users,
    color: 'text-emerald-400',
    status: 'Least-Privilege Enforcement',
    desc: 'Pre-configured institutional roles (Admin, Lead Analyst, ESG Legal Reviewer, Read-Only Auditor) ensure strict adherence to the principle of least privilege across teams.',
    disclaimer: 'Custom role definitions supported for internal corporate compliance workflows.',
  },
  {
    title: 'Data Retention & Sovereignty Controls',
    badge: 'Regulatory Compliance',
    icon: Database,
    color: 'text-amber-400',
    status: 'EU & US Data Residency',
    desc: 'Granular data lifecycle policies allow compliance teams to enforce automated deletion or indefinite archive retention. Data residency guarantees available within EU (Frankfurt/Dublin) and US zones.',
    disclaimer: 'Compliant with GDPR and international data transfer frameworks.',
  },
  {
    title: 'Continuous Security & Telemetry Monitoring',
    badge: 'Threat Surveillance',
    icon: Radio,
    color: 'text-rose-400',
    status: 'Real-Time Telemetry',
    desc: '24/7 automated monitoring of API ingestion pipelines, anomalous query detection, container image vulnerability scanning, and infrastructure drift tracking.',
    disclaimer: 'Continuous automated security posture telemetry.',
  },
];

export const ONBOARDING_INITIAL_ORG = {
  orgName: 'Horizon Climate Capital',
  orgIndustry: 'Asset Management & Infrastructure',
  orgHq: 'London, United Kingdom',
  portfolioSize: '$250M Monitored Offset Assets',
} as const;

export const ONBOARDING_INITIAL_TEAM = [
  { email: 'sarah.jenkins@horizon.com', role: 'Admin' },
  { email: 'd.chen@horizon.com', role: 'Analyst' },
];

export const ONBOARDING_SLIDER_DEFAULTS = {
  alertSensitivity: 85,
  confidenceCutoff: 90,
  criticalExposureThreshold: 20,
} as const;

export const SETTINGS_INITIAL_ORG = {
  orgName: 'Global Carbon Holdings',
  orgIndustry: 'Financial Services & ESG Asset Management',
  orgHq: 'Zurich, Switzerland',
  portfolioSize: '$140M Monitored Exposure',
} as const;

export const SETTINGS_INITIAL_TEAM = [
  {
    name: 'Dr. Elena Vance',
    email: 'elena.vance@carbonwatchdog.internal',
    role: 'Admin (Chief Risk Officer)',
  },
  {
    name: 'Marcus Holloway',
    email: 'm.holloway@carbonwatchdog.internal',
    role: 'Lead Remote Sensing Analyst',
  },
  {
    name: 'Sarah Chen, JD',
    email: 's.chen@carbonwatchdog.internal',
    role: 'General Counsel & ESG Assurance',
  },
  { name: 'David Kalu', email: 'd.kalu@carbonwatchdog.internal', role: 'Portfolio Manager' },
];

export const SETTINGS_SLIDER_DEFAULTS = {
  alertSensitivity: 85,
  confidenceCutoff: 90,
  criticalThresholdMillions: 25,
} as const;

export const SETTINGS_WEBHOOK_DEFAULT = 'https://hooks.slack.com/services/T00/B00/X00';
