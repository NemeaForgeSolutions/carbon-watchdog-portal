import type { Buyer, Project, Report } from '../types';

export const fallbackProjects: Project[] = [
  {
    id: 'proj_001',
    name: 'Amazon Forest Reserve',
    country: 'Brazil',
    status: 'Monitoring active',
    riskLevel: 'medium',
    creditType: 'Forest',
    coordinates: [-3.4653, -62.2159],
    buyerIds: ['buyer_001', 'buyer_003'],
  },
  {
    id: 'proj_002',
    name: 'Mangrove Protection Zone',
    country: 'Indonesia',
    status: 'Escalated review',
    riskLevel: 'high',
    creditType: 'Mangrove',
    coordinates: [-2.5489, 140.7181],
    buyerIds: ['buyer_002'],
  },
  {
    id: 'proj_003',
    name: 'Savannah Carbon Belt',
    country: 'Kenya',
    status: 'Stable',
    riskLevel: 'low',
    creditType: 'Agroforest',
    coordinates: [-0.0917, 34.768],
    buyerIds: ['buyer_001'],
  },
  {
    id: 'proj_004',
    name: 'Andes Watershed Shield',
    country: 'Peru',
    status: 'Watchlist',
    riskLevel: 'medium',
    creditType: 'Watershed',
    coordinates: [-11.5167, -72.3314],
    buyerIds: ['buyer_003'],
  },
];

export const fallbackBuyers: Buyer[] = [
  { id: 'buyer_001', name: 'Delta Air Lines', region: 'North America', exposure: 180000 },
  { id: 'buyer_002', name: 'Nestlé', region: 'Europe', exposure: 125000 },
  { id: 'buyer_003', name: 'Gucci', region: 'Europe', exposure: 76000 },
  { id: 'buyer_004', name: 'Aesop', region: 'Asia Pacific', exposure: 52000 },
];

export const fallbackReports: Report[] = [
  {
    reportId: 'rep_2026_08',
    projectId: 'proj_001',
    summary:
      'No major reversal detected in the current monitoring window, but increased fire risk was observed in a small area near the project boundary.',
    overallRisk: 'medium',
    alerts: [
      {
        type: 'fire-risk',
        severity: 'medium',
        location: 'north-west boundary',
        confidence: 0.82,
        detectedAt: '2026-08-18T00:00:00Z',
      },
    ],
  },
  {
    reportId: 'rep_2026_08_b',
    projectId: 'proj_002',
    summary:
      'Persistent land-use change was observed near the eastern fringe, which raises concern about long-term project integrity.',
    overallRisk: 'high',
    alerts: [
      {
        type: 'land-use-change',
        severity: 'high',
        location: 'eastern fringe',
        confidence: 0.91,
        detectedAt: '2026-08-17T12:00:00Z',
      },
    ],
  },
  {
    reportId: 'rep_2026_08_c',
    projectId: 'proj_003',
    summary:
      'The site remains stable with no material degradation signal during the latest observation cycle.',
    overallRisk: 'low',
    alerts: [],
  },
  {
    reportId: 'rep_2026_08_d',
    projectId: 'proj_004',
    summary:
      'The watershed remains intact, though infrastructure expansion near the upper catchment should be watched closely.',
    overallRisk: 'medium',
    alerts: [
      {
        type: 'infrastructure-expansion',
        severity: 'medium',
        location: 'upper catchment road access',
        confidence: 0.74,
        detectedAt: '2026-08-19T06:00:00Z',
      },
    ],
  },
];

export const portfolioThemes = [
  {
    label: 'Forest integrity',
    title: 'Crown cover, fire pressure, and fragmentation',
    body: 'Track how the canopy changes around issuance and expose any pressure that would weaken claim quality.',
  },
  {
    label: 'Coastal buffers',
    title: 'Mangrove stability and shoreline drift',
    body: 'Monitor erosion, sediment changes, and encroachment across the fragile blue-carbon frontier.',
  },
  {
    label: 'Buyer exposure',
    title: 'Credits mapped to the companies carrying the risk',
    body: 'Translate project integrity into actual portfolio exposure so sustainability teams can act with confidence.',
  },
];

export const methodologySteps = [
  {
    step: '01',
    title: 'Acquire',
    body: 'Pull Sentinel-1 radar and Sentinel-2 optical scenes for the project boundary and a wider context window.',
  },
  {
    step: '02',
    title: 'Detect',
    body: 'Compare vegetation, soil, and land-use signatures against the baseline and flag abnormal movement.',
  },
  {
    step: '03',
    title: 'Explain',
    body: 'Turn raw signal changes into plain-language notes, linked to coordinates, confidence, and likely cause.',
  },
  {
    step: '04',
    title: 'Escalate',
    body: 'Route high-risk events into the buyer workflow so claims can be reviewed before they become liabilities.',
  },
];

export const complianceMilestones = [
  {
    date: 'Sep 2026',
    title: 'Carbon-neutral claim ban',
    body: 'Offset-based carbon-neutral claims are no longer acceptable without direct substantiation.',
  },
  {
    date: 'Q4 2026',
    title: 'Portfolio evidence packs',
    body: 'Teams need living evidence packs that show claim lineage, risk history, and remediation actions.',
  },
  {
    date: 'Ongoing',
    title: 'Audit trail readiness',
    body: 'Each alert must keep a clear path from image, to signal, to explanation, to buyer decision.',
  },
];
