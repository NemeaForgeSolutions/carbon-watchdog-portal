import { buildPhases, nextActions, targetWatchlist } from './planData';
import { complianceMilestones, methodologySteps } from './portalData';

type SummaryStat = {
  label: string;
  value: string;
};

type SelectOption = {
  value: string;
  label: string;
};

export const carbonOrbitBadges: Array<{ label: string; value: string }> = [
  { label: 'Sentinel-2', value: 'Optical feed' },
  { label: 'Sentinel-1', value: 'Radar feed' },
  { label: 'Buyer map', value: 'Exposure layer' },
  { label: 'Alert engine', value: 'Claim review' },
];

export const aboutSummaryStats: SummaryStat[] = [
  { label: 'Primary teams', value: 'Sustainability + legal' },
  { label: 'Review surface', value: 'Project and buyer' },
  { label: 'Output', value: 'Evidence-ready brief' },
];

export const aboutOperatingPrinciples: string[] = [
  'Translate project-level monitoring into a buyer-facing evidence trail, not a research dashboard.',
  'Keep every risk decision tied to a boundary, a confidence score, and a plain-English explanation.',
  'Support cross-functional review across sustainability, procurement, legal, and executive stakeholders.',
];

export const actionsSummaryStats: SummaryStat[] = [
  { label: 'Actions', value: String(nextActions.length) },
  { label: 'Target projects', value: String(targetWatchlist.length) },
  { label: 'Build phases', value: String(buildPhases.length) },
];

export const complianceSummaryStats: SummaryStat[] = [
  { label: 'Milestones tracked', value: String(complianceMilestones.length) },
  { label: 'Review mode', value: 'Evidence-first' },
  { label: 'Escalation path', value: 'Buyer and claim owner' },
];

export const complianceClaimChecklist: string[] = [
  'Evidence pack attached to every public climate claim.',
  'Project alerts linked directly to affected buyer exposure.',
  'Clear remediation path when a signal turns critical.',
  'Human-readable summary for legal, sustainability, and executive review.',
];

export const methodsSummaryStats: SummaryStat[] = [
  { label: 'Observation feeds', value: '3' },
  { label: 'Review stages', value: String(methodologySteps.length) },
  { label: 'Report output', value: 'Audit-ready' },
];

export const methodsDataSources = [
  {
    title: 'Sentinel-2 optical',
    body: 'Vegetation cover, land-use boundaries, and visible disturbance cues across the project perimeter.',
  },
  {
    title: 'Sentinel-1 radar',
    body: 'Cloud-tolerant monitoring for structure and moisture changes when weather blocks optical imagery.',
  },
  {
    title: 'Project documents',
    body: 'Baseline boundaries, issuance data, and claim language required to explain the signal.',
  },
];

export const methodsModelChecks: string[] = [
  'False-positive review against seasonal and regional drift.',
  'Boundary-aware alerting to avoid off-site noise and registry mismatch.',
  'Confidence scoring attached to every escalation and narrative.',
  'Claim-ready summaries for non-technical reviewers.',
];

export const notFoundRecoveryLinks: Array<{ label: string; to: string }> = [
  { label: 'Return to Overview', to: '/' },
  { label: 'Open Watchlist', to: '/watchlist' },
  { label: 'See How It Works', to: '/how-it-works' },
];

export const onboardingSteps: Array<{ key: string; label: string }> = [
  { key: 'organization', label: 'Organization' },
  { key: 'users', label: 'Reviewers' },
  { key: 'imports', label: 'Imports' },
  { key: 'thresholds', label: 'Thresholds' },
  { key: 'baseline-report', label: 'Baseline report' },
];

export const onboardingIndustryOptions: SelectOption[] = [
  { value: 'aviation', label: 'Aviation' },
  { value: 'consumer-goods', label: 'Consumer goods' },
  { value: 'energy', label: 'Energy' },
  { value: 'financial-services', label: 'Financial services' },
  { value: 'manufacturing', label: 'Manufacturing' },
];

export const onboardingRegionOptions: SelectOption[] = [
  { value: 'north-america', label: 'North America' },
  { value: 'europe', label: 'Europe' },
  { value: 'india', label: 'India' },
  { value: 'apac', label: 'APAC' },
  { value: 'global', label: 'Global' },
];

export const onboardingInviteRoleOptions: SelectOption[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'viewer', label: 'Viewer' },
];

export const onboardingImportSourceOptions: SelectOption[] = [
  { value: 'csv', label: 'CSV upload' },
  { value: 'registry-api', label: 'Registry API' },
  { value: 's3-drop', label: 'S3 drop' },
];

export const planSummaryStats: SummaryStat[] = [
  { label: 'Build phases', value: String(buildPhases.length) },
  { label: 'Target projects', value: String(targetWatchlist.length) },
  { label: 'Immediate actions', value: String(nextActions.length) },
];

export const planSectionLinks: Array<{ label: string; href: string }> = [
  { label: 'Build phases', href: '#phases' },
  { label: 'Target watchlist', href: '#watchlist' },
  { label: 'Buyer spotlight', href: '#spotlight' },
  { label: 'Next actions', href: '#actions' },
];

export const planDestinationCards: Array<{ title: string; description: string; to: string }> = [
  {
    title: 'Target watchlist',
    description:
      'The 13 projects worth monitoring first, filtered by buyer exposure and scrutiny status.',
    to: '/watchlist',
  },
  {
    title: 'Buyer spotlight',
    description:
      'Delta and Shell views that turn raw project integrity into a concrete outreach narrative.',
    to: '/spotlight',
  },
  {
    title: 'Execution sequence',
    description:
      'The immediate actions needed to move from plan to proof and then into buyer conversations.',
    to: '/actions',
  },
];

export const pricingPlans = [
  {
    name: 'Pilot',
    price: '$4,500',
    cadence: '/month',
    fit: 'Single team validating monitoring coverage, buyer mapping, and internal claim review workflow.',
    features: [
      'Up to 25 projects',
      'Daily monitoring cycle',
      '2 buyer entities',
      'Weekly risk brief',
    ],
    cta: 'Book pilot scoping',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$12,000',
    cadence: '/month',
    fit: 'Regional portfolio operations with active sustainability, legal, and procurement review loops.',
    features: [
      'Up to 125 projects',
      'Near-daily alerts',
      '10 buyer entities',
      'API and Slack notifications',
    ],
    cta: 'Discuss rollout',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    fit: 'Global assurance programs with multi-team governance, customer diligence, and regulated disclosures.',
    features: ['Unlimited projects', 'SAML and RBAC', 'Custom SLAs', 'Dedicated analyst channel'],
    cta: 'Contact commercial team',
    featured: false,
  },
];

export const pricingSummaryStats: SummaryStat[] = [
  { label: 'Plans', value: String(pricingPlans.length) },
  { label: 'Commercial model', value: 'Portfolio-based' },
  { label: 'Time to pilot', value: '2-4 weeks' },
];

export const pricingIncludedInEveryPlan: string[] = [
  'Project-level monitoring with buyer mapping and risk summaries.',
  'Readable evidence outputs for sustainability, legal, and procurement review.',
  'Support for claim substantiation, escalation decisions, and operating handoff.',
];

export const pricingCommercialNotes: string[] = [
  'Plans scale with the number of monitored projects, buyer entities, and integration depth.',
  'The pilot is designed to prove signal quality and workflow fit before broader rollout.',
  'Enterprise engagements include governance design, onboarding support, and control reviews.',
];

export const requestDemoSummaryStats: SummaryStat[] = [
  { label: 'Response SLA', value: '1 business day' },
  { label: 'Briefing length', value: '30 minutes' },
  { label: 'Pilot readout', value: '48 hours' },
];

export const requestDemoBriefingAgenda: string[] = [
  'Current project mix, buyer concentration, and known exposure hotspots.',
  'Monitoring design for the first operating portfolio and alert thresholds.',
  'Recommended pilot scope, integration path, and stakeholder review workflow.',
];

export const requestDemoSubmissionHighlights: SummaryStat[] = [
  { label: 'Routing', value: 'CRM or customer success queue' },
  { label: 'Prepared output', value: 'Portfolio risk briefing' },
  { label: 'Expected response', value: 'Within 1 business day' },
];

export const requestDemoAttendeeGuidance: string[] = [
  'Sustainability or carbon program owner',
  'Legal or compliance reviewer',
  'Procurement, portfolio, or buyer operations lead',
];

export const requestDemoTeamRoleOptions: SelectOption[] = [
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'legal', label: 'Legal and compliance' },
  { value: 'procurement', label: 'Procurement' },
  { value: 'operations', label: 'Portfolio operations' },
];

export const requestDemoPortfolioSizeOptions: SelectOption[] = [
  { value: 'under-50000', label: 'Under 50,000' },
  { value: '50000-250000', label: '50,000 to 250,000' },
  { value: '250000-1000000', label: '250,000 to 1,000,000' },
  { value: '1000000-plus', label: 'More than 1,000,000' },
];

export const requestDemoTimelineOptions: SelectOption[] = [
  { value: 'this-month', label: 'This month' },
  { value: 'this-quarter', label: 'This quarter' },
  { value: 'next-quarter', label: 'Next quarter' },
  { value: 'exploring', label: 'Exploring options' },
];

export const securityControls = [
  {
    domain: 'Identity and access',
    items: [
      'Tenant-scoped access controls',
      'Admin-only ingestion endpoints',
      'Role model: admin, analyst, viewer',
    ],
  },
  {
    domain: 'Data protection',
    items: [
      'Tenant header isolation in API layer',
      'Optional persisted state for continuity',
      'Audit trail for privileged actions',
    ],
  },
  {
    domain: 'Operational resilience',
    items: [
      'Environment flags for sandbox/production behavior',
      'Explicit fallback messaging in UI',
      'OpenAPI contract for integration validation',
    ],
  },
];

export const securitySummaryStats: SummaryStat[] = [
  { label: 'Control domains', value: String(securityControls.length) },
  { label: 'Audit endpoints', value: '2' },
  { label: 'Tenant strategy', value: 'Header-scoped' },
];

export const spotlightReasons: string[] = [
  'Seven flagged watchlist projects already connect to Delta through retirement records.',
  'The buyer carries a public lawsuit narrative, which makes the claim-review story immediately understandable.',
  'The exposure case can be shown from retirements and linked projects rather than ownership inference.',
];

export const spotlightRunnerUpHighlights: Array<{
  label: string;
  value: string;
  detail: string;
}> = [
  {
    label: 'Runner-up buyer',
    value: 'Shell',
    detail: 'The larger scale narrative if total retired tonnes is the main commercial hook.',
  },
  {
    label: 'Scale signal',
    value: '35.3M',
    detail: 'Tonnes tied to Shell across the broader retirement set.',
  },
  {
    label: 'Distinct projects',
    value: '38',
    detail: 'Projects linked to Shell retirement history.',
  },
];