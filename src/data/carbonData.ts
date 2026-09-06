export interface ProjectAnomalies {
  deforestationSignal: string;
  vegetationAnomaly: string;
  seasonalAdjustment: string;
  baselineDeviation: string;
  affectedAreaKm2: number;
}

export interface SatelliteObservation {
  id: string;
  date: string;
  sensor: 'Sentinel-1 SAR' | 'Sentinel-2 Optical' | 'Planet NICFI';
  type: 'SAR Backscatter' | 'Optical Multispectral' | 'High-Res Mosaic';
  resolution: string;
  confidence: number;
  status: 'Nominal' | 'Anomaly Detected' | 'Cloud Obscured' | 'Signal Drift';
  note: string;
}

export interface InvestigationEvent {
  id: string;
  timestamp: string;
  author: string;
  role: string;
  action: string;
  details: string;
}

export interface ProjectData {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  creditType: string;
  registry: string;
  registryId: string;
  status: 'Stable' | 'Monitoring Active' | 'Escalated Review' | 'Investigation';
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  riskScore: number; // 0-100
  confidence: number; // 0-100
  buyers: string[];
  credits: number;
  financialExposure: number; // in USD
  lastObservation: string;
  satelliteSource: string;
  ndviTrend: Array<{ month: string; value: number; baseline: number }>;
  radarTrend: Array<{ month: string; dbDeviation: number }>;
  anomalies: ProjectAnomalies;
  claims: string[];
  satelliteTimeline: SatelliteObservation[];
  investigationTimeline: InvestigationEvent[];
}

export interface FlaggedClaim {
  claim: string;
  verificationStatus:
    'Verified' | 'Under Review' | 'Flagged Non-Compliant' | 'Substantiation Required';
  evidenceScore: number;
  riskNote: string;
}

export interface BuyerConcentration {
  projectName: string;
  tonnes: number;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  pct: number;
}

export interface BuyerData {
  id: string;
  name: string;
  initials: string;
  industry: string;
  creditsHeld: number;
  creditsRetired: number;
  financialExposure: number; // in USD
  highRiskPercentage: number;
  projects: string[];
  claims: FlaggedClaim[];
  remediationUrgency: 'Immediate' | 'Elevated' | 'Moderate' | 'Low';
  portfolioHealth: 'Critical Exposure' | 'Elevated Risk' | 'Monitored / Stable' | 'Exemplary';
  concentration: BuyerConcentration[];
  recommendedActions: string[];
}

export interface RiskReportEvent {
  id: string;
  timestamp: string;
  timeAgo: string;
  type:
    | 'SAR Anomaly'
    | 'NDVI Deviation'
    | 'Exposure Recalculated'
    | 'Claim Evidence Review'
    | 'Registry Notice';
  title: string;
  projectOrBuyer: string;
  location?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  details: string;
  iconType: 'radar' | 'leaf' | 'dollar' | 'shield' | 'alert';
}

export interface RegulatoryFramework {
  id: string;
  name: string;
  authority: string;
  status: 'Enacted' | 'Pending Final Rule' | 'Guidance Active' | 'Implementation Phase';
  effectiveDate: string;
  relevance: string;
  evidenceRequirement: string;
  internalReviewStatus:
    'Audit Ready' | 'Review in Progress' | 'Gaps Identified' | 'Remediation Active';
  scopeNote: string;
}

export interface AuditChecklistItem {
  id: string;
  title: string;
  category: 'Additionality' | 'Registry' | 'Telemetry' | 'Accounting' | 'Claims' | 'Legal';
  status: 'Verified' | 'Needs Review' | 'Missing Evidence' | 'Escalated';
  evidenceRef: string;
  lastUpdated: string;
  assignee: string;
  notes: string;
}

// -------------------------------------------------------------
// CENTRALIZED DATASET
// -------------------------------------------------------------

export const CARBON_PROJECTS: ProjectData[] = [
  {
    id: 'VCS-902',
    name: 'Amazon Forest Reserve',
    country: 'Brazil',
    coordinates: [-3.4653, -62.2159],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-902-AMZ',
    status: 'Escalated Review',
    riskTier: 'high',
    riskScore: 78,
    confidence: 94,
    buyers: ['Delta Air Lines', 'Shell', 'Nestlé'],
    credits: 4860000,
    financialExposure: 48600000,
    lastObservation: '2026-09-06T17:14:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 MSI',
    ndviTrend: [
      { month: 'Oct 25', value: 0.84, baseline: 0.83 },
      { month: 'Nov 25', value: 0.83, baseline: 0.83 },
      { month: 'Dec 25', value: 0.81, baseline: 0.82 },
      { month: 'Jan 26', value: 0.79, baseline: 0.82 },
      { month: 'Feb 26', value: 0.77, baseline: 0.81 },
      { month: 'Mar 26', value: 0.75, baseline: 0.82 },
      { month: 'Apr 26', value: 0.74, baseline: 0.83 },
      { month: 'May 26', value: 0.72, baseline: 0.83 },
      { month: 'Jun 26', value: 0.71, baseline: 0.84 },
      { month: 'Jul 26', value: 0.69, baseline: 0.84 },
      { month: 'Aug 26', value: 0.67, baseline: 0.83 },
      { month: 'Sep 26', value: 0.64, baseline: 0.83 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.2 },
      { month: 'Nov 25', dbDeviation: -0.3 },
      { month: 'Dec 25', dbDeviation: -0.4 },
      { month: 'Jan 26', dbDeviation: -0.8 },
      { month: 'Feb 26', dbDeviation: -1.2 },
      { month: 'Mar 26', dbDeviation: -1.5 },
      { month: 'Apr 26', dbDeviation: -1.9 },
      { month: 'May 26', dbDeviation: -2.3 },
      { month: 'Jun 26', dbDeviation: -2.7 },
      { month: 'Jul 26', dbDeviation: -3.1 },
      { month: 'Aug 26', dbDeviation: -3.5 },
      { month: 'Sep 26', dbDeviation: -4.2 },
    ],
    anomalies: {
      deforestationSignal: 'Sustained canopy loss across north-west boundary perimeter',
      vegetationAnomaly: '-22.9% drop relative to 2019-2023 harmonic baseline',
      seasonalAdjustment: 'Normalized for dry season; anomaly exceeds 3.4 standard deviations',
      baselineDeviation: 'Project boundary buffer shows 2.8 km² clearcut logging expansion',
      affectedAreaKm2: 2.8,
    },
    claims: ['Carbon Neutral Flight Operations (Delta)', 'Nature-Positive Logistics'],
    satelliteTimeline: [
      {
        id: 'OBS-AMZ-01',
        date: '2026-09-06 17:14 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 96,
        status: 'Anomaly Detected',
        note: 'Coherence loss detected along road buffer spur. Volume scattering collapsed by 4.2 dB.',
      },
      {
        id: 'OBS-AMZ-02',
        date: '2026-09-04 14:02 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 92,
        status: 'Anomaly Detected',
        note: 'Cloud-free acquisition confirms canopy opening across 2.8 km² parcel.',
      },
      {
        id: 'OBS-AMZ-03',
        date: '2026-08-29 17:14 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 94,
        status: 'Signal Drift',
        note: 'Progressive backscatter reduction observed over past 3 orbital passes.',
      },
      {
        id: 'OBS-AMZ-04',
        date: '2026-08-25 13:58 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 78,
        status: 'Cloud Obscured',
        note: 'Partial cloud cover (42%). SAR sensor cross-validation engaged.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-AMZ-01',
        timestamp: '2026-09-06 18:05 UTC',
        author: 'Automated Watchdog Fusion Engine',
        role: 'Detection Core',
        action: 'Escalation Triggered',
        details:
          'Threshold exceeded: >2.5 km² degradation detected with 94% multi-sensor confidence.',
      },
      {
        id: 'INV-AMZ-02',
        timestamp: '2026-09-06 18:30 UTC',
        author: 'Dr. Marcus Holloway',
        role: 'Lead Remote Sensing Analyst',
        action: 'Analyst Triage Completed',
        details:
          'Confirmed anthropogenic disturbance. Road expansion matches illegal timber extraction pattern. Escalate to Legal & Buyer Risk teams.',
      },
      {
        id: 'INV-AMZ-03',
        timestamp: '2026-09-06 19:10 UTC',
        author: 'Sarah Chen, JD',
        role: 'Head of ESG Assurance',
        action: 'Buyer Exposure Flagged',
        details:
          'Notified Delta Air Lines sustainability counsel. Recommended freeze on retirement substantiation claims.',
      },
    ],
  },
  {
    id: 'VCS-934',
    name: 'The Mai Ndombe REDD+ Project',
    country: 'DR Congo',
    coordinates: [-2.0234, 18.3129],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-934-MND',
    status: 'Investigation',
    riskTier: 'critical',
    riskScore: 88,
    confidence: 97,
    buyers: ['Shell', 'Eni Upstream'],
    credits: 5780000,
    financialExposure: 39500000,
    lastObservation: '2026-09-06T18:28:00Z',
    satelliteSource: 'Sentinel-1 SAR',
    ndviTrend: [
      { month: 'Oct 25', value: 0.82, baseline: 0.84 },
      { month: 'Nov 25', value: 0.81, baseline: 0.84 },
      { month: 'Dec 25', value: 0.79, baseline: 0.83 },
      { month: 'Jan 26', value: 0.76, baseline: 0.83 },
      { month: 'Feb 26', value: 0.73, baseline: 0.82 },
      { month: 'Mar 26', value: 0.7, baseline: 0.83 },
      { month: 'Apr 26', value: 0.67, baseline: 0.83 },
      { month: 'May 26', value: 0.65, baseline: 0.84 },
      { month: 'Jun 26', value: 0.62, baseline: 0.84 },
      { month: 'Jul 26', value: 0.59, baseline: 0.84 },
      { month: 'Aug 26', value: 0.57, baseline: 0.83 },
      { month: 'Sep 26', value: 0.53, baseline: 0.83 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.5 },
      { month: 'Nov 25', dbDeviation: -0.9 },
      { month: 'Dec 25', dbDeviation: -1.4 },
      { month: 'Jan 26', dbDeviation: -2.1 },
      { month: 'Feb 26', dbDeviation: -2.8 },
      { month: 'Mar 26', dbDeviation: -3.4 },
      { month: 'Apr 26', dbDeviation: -3.9 },
      { month: 'May 26', dbDeviation: -4.5 },
      { month: 'Jun 26', dbDeviation: -5.1 },
      { month: 'Jul 26', dbDeviation: -5.8 },
      { month: 'Aug 26', dbDeviation: -6.4 },
      { month: 'Sep 26', dbDeviation: -7.2 },
    ],
    anomalies: {
      deforestationSignal:
        'Industrial-scale forest clearing spreading from southern concession limit',
      vegetationAnomaly: '-36.1% drop against long-term multi-annual baseline',
      seasonalAdjustment:
        'Persistent across wet and dry cycles; cloud-penetrating SAR validates tree loss',
      baselineDeviation:
        'Project claimed zero baseline deforestation; reality reveals 4.1 km² cleared',
      affectedAreaKm2: 4.1,
    },
    claims: ['Net-Zero Product Line Neutralization (Shell)', 'Upstream Scope 1 Mitigation'],
    satelliteTimeline: [
      {
        id: 'OBS-MND-01',
        date: '2026-09-06 18:28 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 97,
        status: 'Anomaly Detected',
        note: 'Major radar backscatter collapse (-7.2 dB). Rapid clearfelling detected in sector 4B.',
      },
      {
        id: 'OBS-MND-02',
        date: '2026-08-31 09:12 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 95,
        status: 'Anomaly Detected',
        note: 'Visible burn scars and access corridors intersecting protected core zone.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-MND-01',
        timestamp: '2026-09-06 18:40 UTC',
        author: 'System Sentinel Pipeline',
        role: 'Autonomous Alert',
        action: 'Critical Anomaly Raised',
        details: 'SAR cross-polarization drop confirms continuous biomass extraction.',
      },
    ],
  },
  {
    id: 'VCS-674',
    name: 'Rimba Raya Biodiversity Reserve',
    country: 'Indonesia',
    coordinates: [-2.9167, 112.2833],
    creditType: 'Peatland',
    registry: 'Verra VCS',
    registryId: 'VCS-674-RRB',
    status: 'Monitoring Active',
    riskTier: 'medium',
    riskScore: 54,
    confidence: 89,
    buyers: ['Audi AG', 'Volkswagen', 'Delta Air Lines'],
    credits: 2420000,
    financialExposure: 18200000,
    lastObservation: '2026-09-06T15:20:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 Optical',
    ndviTrend: [
      { month: 'Oct 25', value: 0.81, baseline: 0.82 },
      { month: 'Nov 25', value: 0.8, baseline: 0.82 },
      { month: 'Dec 25', value: 0.79, baseline: 0.81 },
      { month: 'Jan 26', value: 0.78, baseline: 0.81 },
      { month: 'Feb 26', value: 0.77, baseline: 0.8 },
      { month: 'Mar 26', value: 0.76, baseline: 0.81 },
      { month: 'Apr 26', value: 0.77, baseline: 0.81 },
      { month: 'May 26', value: 0.76, baseline: 0.82 },
      { month: 'Jun 26', value: 0.75, baseline: 0.82 },
      { month: 'Jul 26', value: 0.74, baseline: 0.82 },
      { month: 'Aug 26', value: 0.73, baseline: 0.81 },
      { month: 'Sep 26', value: 0.72, baseline: 0.81 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.1 },
      { month: 'Nov 25', dbDeviation: -0.2 },
      { month: 'Dec 25', dbDeviation: -0.3 },
      { month: 'Jan 26', dbDeviation: -0.5 },
      { month: 'Feb 26', dbDeviation: -0.8 },
      { month: 'Mar 26', dbDeviation: -1.0 },
      { month: 'Apr 26', dbDeviation: -0.9 },
      { month: 'May 26', dbDeviation: -1.1 },
      { month: 'Jun 26', dbDeviation: -1.3 },
      { month: 'Jul 26', dbDeviation: -1.5 },
      { month: 'Aug 26', dbDeviation: -1.7 },
      { month: 'Sep 26', dbDeviation: -1.9 },
    ],
    anomalies: {
      deforestationSignal: 'Peatland canal drainage detected near eastern palm-oil buffer',
      vegetationAnomaly: '-11.1% localized moisture and canopy drying in fringe zones',
      seasonalAdjustment:
        'Within expected dry-season variance, but drainage canals indicate artificial drawdown',
      baselineDeviation: 'Canal construction violates PDD wetland protection covenants',
      affectedAreaKm2: 1.4,
    },
    claims: ['Scope 3 Neutrality Program', 'Biodiversity Positive Pledge'],
    satelliteTimeline: [
      {
        id: 'OBS-RRB-01',
        date: '2026-09-06 15:20 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 90,
        status: 'Signal Drift',
        note: 'Soil dielectric constant suggests localized water table drop.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-RRB-01',
        timestamp: '2026-09-05 11:20 UTC',
        author: 'Automated Watchdog',
        role: 'Peat Subsystem',
        action: 'Hydrology Alert',
        details: 'Surface moisture index deviated by -18% over 30-day window.',
      },
    ],
  },
  {
    id: 'VCS-1477',
    name: 'Katingan Peatland Restoration',
    country: 'Indonesia',
    coordinates: [-2.5489, 113.7181],
    creditType: 'Peatland',
    registry: 'Verra VCS',
    registryId: 'VCS-1477-KTG',
    status: 'Escalated Review',
    riskTier: 'high',
    riskScore: 74,
    confidence: 93,
    buyers: ['Shell', 'Larsen & Toubro'],
    credits: 11930000,
    financialExposure: 95440000,
    lastObservation: '2026-09-06T12:44:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 MSI',
    ndviTrend: [
      { month: 'Oct 25', value: 0.83, baseline: 0.84 },
      { month: 'Nov 25', value: 0.82, baseline: 0.84 },
      { month: 'Dec 25', value: 0.81, baseline: 0.83 },
      { month: 'Jan 26', value: 0.79, baseline: 0.83 },
      { month: 'Feb 26', value: 0.76, baseline: 0.82 },
      { month: 'Mar 26', value: 0.74, baseline: 0.83 },
      { month: 'Apr 26', value: 0.72, baseline: 0.83 },
      { month: 'May 26', value: 0.7, baseline: 0.84 },
      { month: 'Jun 26', value: 0.68, baseline: 0.84 },
      { month: 'Jul 26', value: 0.65, baseline: 0.84 },
      { month: 'Aug 26', value: 0.62, baseline: 0.83 },
      { month: 'Sep 26', value: 0.6, baseline: 0.83 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.4 },
      { month: 'Nov 25', dbDeviation: -0.7 },
      { month: 'Dec 25', dbDeviation: -1.1 },
      { month: 'Jan 26', dbDeviation: -1.6 },
      { month: 'Feb 26', dbDeviation: -2.2 },
      { month: 'Mar 26', dbDeviation: -2.8 },
      { month: 'Apr 26', dbDeviation: -3.2 },
      { month: 'May 26', dbDeviation: -3.8 },
      { month: 'Jun 26', dbDeviation: -4.3 },
      { month: 'Jul 26', dbDeviation: -4.9 },
      { month: 'Aug 26', dbDeviation: -5.4 },
      { month: 'Sep 26', dbDeviation: -6.0 },
    ],
    anomalies: {
      deforestationSignal: 'Accelerated peat subsidence and vegetation dieback in eastern block',
      vegetationAnomaly: '-27.7% drop in multi-spectral moisture and NDVI',
      seasonalAdjustment: 'Drying exceeds previous 5-year historic maximums',
      baselineDeviation:
        'Project issuance rate based on avoided emissions now contradicted by active emissions',
      affectedAreaKm2: 3.6,
    },
    claims: ['Shell Drive Carbon Neutral Claims', 'Corporate Net-Zero Strategy'],
    satelliteTimeline: [
      {
        id: 'OBS-KTG-01',
        date: '2026-09-06 12:44 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 93,
        status: 'Anomaly Detected',
        note: 'Backscatter drop (-6.0 dB) correlated with dry peat subsidence and boundary clearing.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-KTG-01',
        timestamp: '2026-09-05 16:30 UTC',
        author: 'Dr. Marcus Holloway',
        role: 'Lead Remote Sensing Analyst',
        action: 'Baseline Audit Flag',
        details:
          'Issued technical report documenting that Katingan carbon claims face 45% non-permanence risk.',
      },
    ],
  },
  {
    id: 'VCS-612',
    name: 'Kasigau Corridor — Phase II',
    country: 'Kenya',
    coordinates: [-3.8167, 38.6833],
    creditType: 'Agroforestry',
    registry: 'Verra VCS',
    registryId: 'VCS-612-KSG',
    status: 'Monitoring Active',
    riskTier: 'medium',
    riskScore: 48,
    confidence: 86,
    buyers: ['Shell', 'Netflix', 'BHP'],
    credits: 1960000,
    financialExposure: 15680000,
    lastObservation: '2026-09-06T09:15:00Z',
    satelliteSource: 'Sentinel-2 Optical',
    ndviTrend: [
      { month: 'Oct 25', value: 0.55, baseline: 0.56 },
      { month: 'Nov 25', value: 0.58, baseline: 0.58 },
      { month: 'Dec 25', value: 0.6, baseline: 0.61 },
      { month: 'Jan 26', value: 0.56, baseline: 0.58 },
      { month: 'Feb 26', value: 0.52, baseline: 0.54 },
      { month: 'Mar 26', value: 0.5, baseline: 0.52 },
      { month: 'Apr 26', value: 0.54, baseline: 0.56 },
      { month: 'May 26', value: 0.57, baseline: 0.59 },
      { month: 'Jun 26', value: 0.53, baseline: 0.55 },
      { month: 'Jul 26', value: 0.49, baseline: 0.52 },
      { month: 'Aug 26', value: 0.47, baseline: 0.5 },
      { month: 'Sep 26', value: 0.45, baseline: 0.49 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.1 },
      { month: 'Nov 25', dbDeviation: 0.0 },
      { month: 'Dec 25', dbDeviation: -0.2 },
      { month: 'Jan 26', dbDeviation: -0.4 },
      { month: 'Feb 26', dbDeviation: -0.6 },
      { month: 'Mar 26', dbDeviation: -0.7 },
      { month: 'Apr 26', dbDeviation: -0.5 },
      { month: 'May 26', dbDeviation: -0.4 },
      { month: 'Jun 26', dbDeviation: -0.6 },
      { month: 'Jul 26', dbDeviation: -0.8 },
      { month: 'Aug 26', dbDeviation: -1.1 },
      { month: 'Sep 26', dbDeviation: -1.3 },
    ],
    anomalies: {
      deforestationSignal: 'Charcoal production clusters detected near grazing border',
      vegetationAnomaly: '-8.2% biomass density reduction in scrub woodland',
      seasonalAdjustment: 'Drought-adjusted model flags moderate anthropogenic pressure',
      baselineDeviation: 'Localized leakage around community trust land boundary',
      affectedAreaKm2: 0.9,
    },
    claims: ['Production Carbon Offset (Netflix)', 'Scope 1 Compliance Buffer'],
    satelliteTimeline: [
      {
        id: 'OBS-KSG-01',
        date: '2026-09-06 09:15 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 86,
        status: 'Signal Drift',
        note: 'Patchy canopy thinning identified along northern boundary fence.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-KSG-01',
        timestamp: '2026-08-20 14:00 UTC',
        author: 'Field Telemetry Feed',
        role: 'Ranger Station Sync',
        action: 'Patrol Verified',
        details: 'Community scouts dispatched to inspect charcoal burning reports.',
      },
    ],
  },
  {
    id: 'VCS-944',
    name: 'Alto Mayo Conservation Initiative',
    country: 'Peru',
    coordinates: [-5.75, -77.4167],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-944-ALM',
    status: 'Escalated Review',
    riskTier: 'high',
    riskScore: 79,
    confidence: 95,
    buyers: ['Disney', 'Gucci', 'Church & Dwight'],
    credits: 1520000,
    financialExposure: 18240000,
    lastObservation: '2026-09-06T16:04:00Z',
    satelliteSource: 'Sentinel-1 SAR + Planet NICFI',
    ndviTrend: [
      { month: 'Oct 25', value: 0.85, baseline: 0.86 },
      { month: 'Nov 25', value: 0.84, baseline: 0.86 },
      { month: 'Dec 25', value: 0.82, baseline: 0.85 },
      { month: 'Jan 26', value: 0.8, baseline: 0.85 },
      { month: 'Feb 26', value: 0.77, baseline: 0.84 },
      { month: 'Mar 26', value: 0.75, baseline: 0.85 },
      { month: 'Apr 26', value: 0.73, baseline: 0.85 },
      { month: 'May 26', value: 0.71, baseline: 0.86 },
      { month: 'Jun 26', value: 0.69, baseline: 0.86 },
      { month: 'Jul 26', value: 0.67, baseline: 0.86 },
      { month: 'Aug 26', value: 0.65, baseline: 0.85 },
      { month: 'Sep 26', value: 0.62, baseline: 0.85 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.3 },
      { month: 'Nov 25', dbDeviation: -0.6 },
      { month: 'Dec 25', dbDeviation: -1.0 },
      { month: 'Jan 26', dbDeviation: -1.5 },
      { month: 'Feb 26', dbDeviation: -2.1 },
      { month: 'Mar 26', dbDeviation: -2.7 },
      { month: 'Apr 26', dbDeviation: -3.3 },
      { month: 'May 26', dbDeviation: -3.9 },
      { month: 'Jun 26', dbDeviation: -4.5 },
      { month: 'Jul 26', dbDeviation: -5.1 },
      { month: 'Aug 26', dbDeviation: -5.7 },
      { month: 'Sep 26', dbDeviation: -6.3 },
    ],
    anomalies: {
      deforestationSignal:
        'Coffee plantation encroachment eating into protected cloud forest reserve',
      vegetationAnomaly: '-27.1% vegetation canopy loss across indigenous community buffer',
      seasonalAdjustment: 'Cloud penetration radar confirms ongoing clearings through cloud layer',
      baselineDeviation:
        'Project baseline did not anticipate road-access coffee settlement expansion',
      affectedAreaKm2: 2.3,
    },
    claims: ['Disney Cruise Line Carbon Offset', 'Gucci Nature-Positive Supply Chain'],
    satelliteTimeline: [
      {
        id: 'OBS-ALM-01',
        date: '2026-09-06 16:04 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 95,
        status: 'Anomaly Detected',
        note: 'SAR radar backscatter decline (-6.3 dB). Cloud forest canopy replaced with agricultural ground scatter.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-ALM-01',
        timestamp: '2026-09-04 19:45 UTC',
        author: 'Global Risk Desk',
        role: 'Compliance Auditor',
        action: 'Legal Exposure Note',
        details:
          'Alert sent to Disney ESG disclosure team: project cited in public media investigation on phantom credits.',
      },
    ],
  },
  {
    id: 'VCS-985',
    name: 'Cordillera Azul National Park',
    country: 'Peru',
    coordinates: [-8.5167, -76.0833],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-985-CAZ',
    status: 'Escalated Review',
    riskTier: 'critical',
    riskScore: 85,
    confidence: 96,
    buyers: ['Shell', 'Delta Air Lines', 'TotalEnergies'],
    credits: 7020000,
    financialExposure: 56160000,
    lastObservation: '2026-09-06T14:18:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 Optical',
    ndviTrend: [
      { month: 'Oct 25', value: 0.86, baseline: 0.87 },
      { month: 'Nov 25', value: 0.85, baseline: 0.87 },
      { month: 'Dec 25', value: 0.83, baseline: 0.86 },
      { month: 'Jan 26', value: 0.8, baseline: 0.86 },
      { month: 'Feb 26', value: 0.77, baseline: 0.85 },
      { month: 'Mar 26', value: 0.74, baseline: 0.86 },
      { month: 'Apr 26', value: 0.71, baseline: 0.86 },
      { month: 'May 26', value: 0.68, baseline: 0.87 },
      { month: 'Jun 26', value: 0.65, baseline: 0.87 },
      { month: 'Jul 26', value: 0.62, baseline: 0.87 },
      { month: 'Aug 26', value: 0.59, baseline: 0.86 },
      { month: 'Sep 26', value: 0.56, baseline: 0.86 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.6 },
      { month: 'Nov 25', dbDeviation: -1.1 },
      { month: 'Dec 25', dbDeviation: -1.7 },
      { month: 'Jan 26', dbDeviation: -2.4 },
      { month: 'Feb 26', dbDeviation: -3.1 },
      { month: 'Mar 26', dbDeviation: -3.8 },
      { month: 'Apr 26', dbDeviation: -4.5 },
      { month: 'May 26', dbDeviation: -5.3 },
      { month: 'Jun 26', dbDeviation: -6.0 },
      { month: 'Jul 26', dbDeviation: -6.8 },
      { month: 'Aug 26', dbDeviation: -7.5 },
      { month: 'Sep 26', dbDeviation: -8.1 },
    ],
    anomalies: {
      deforestationSignal:
        'Extensive road cutting and selective logging along Huallaga river valley',
      vegetationAnomaly: '-34.8% canopy degradation across contiguous protected core',
      seasonalAdjustment:
        'Anomalies persistent throughout rainy season, confirming mechanical logging',
      baselineDeviation:
        'PDD claimed deforestation was 100% avoided; actual forest loss is 3.7 km²',
      affectedAreaKm2: 3.7,
    },
    claims: ['Shell Carbon Compensated Fuel', 'Aviation Neutrality Claim'],
    satelliteTimeline: [
      {
        id: 'OBS-CAZ-01',
        date: '2026-09-06 14:18 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 96,
        status: 'Anomaly Detected',
        note: 'Backscatter decline reaches -8.1 dB along river corridors. Timber extraction ramps visible.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-CAZ-01',
        timestamp: '2026-09-06 15:00 UTC',
        author: 'Senior Carbon Analyst',
        role: 'Assurance Team',
        action: 'Formal Escalation',
        details: 'Flagged for regulatory disclosure under EU Green Claims Directive Art. 6.',
      },
    ],
  },
  {
    id: 'VCS-1408',
    name: 'Chyulu Hills REDD+ Project',
    country: 'Kenya',
    coordinates: [-2.6, 37.75],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-1408-CYH',
    status: 'Stable',
    riskTier: 'low',
    riskScore: 18,
    confidence: 98,
    buyers: ['Gucci', 'Apple', 'Salesforce'],
    credits: 1305000,
    financialExposure: 10440000,
    lastObservation: '2026-09-06T08:30:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 MSI',
    ndviTrend: [
      { month: 'Oct 25', value: 0.62, baseline: 0.62 },
      { month: 'Nov 25', value: 0.64, baseline: 0.63 },
      { month: 'Dec 25', value: 0.66, baseline: 0.65 },
      { month: 'Jan 26', value: 0.63, baseline: 0.63 },
      { month: 'Feb 26', value: 0.6, baseline: 0.6 },
      { month: 'Mar 26', value: 0.59, baseline: 0.59 },
      { month: 'Apr 26', value: 0.63, baseline: 0.62 },
      { month: 'May 26', value: 0.65, baseline: 0.64 },
      { month: 'Jun 26', value: 0.62, baseline: 0.62 },
      { month: 'Jul 26', value: 0.59, baseline: 0.59 },
      { month: 'Aug 26', value: 0.58, baseline: 0.58 },
      { month: 'Sep 26', value: 0.59, baseline: 0.59 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: 0.0 },
      { month: 'Nov 25', dbDeviation: 0.1 },
      { month: 'Dec 25', dbDeviation: 0.1 },
      { month: 'Jan 26', dbDeviation: 0.0 },
      { month: 'Feb 26', dbDeviation: -0.1 },
      { month: 'Mar 26', dbDeviation: -0.1 },
      { month: 'Apr 26', dbDeviation: 0.0 },
      { month: 'May 26', dbDeviation: 0.1 },
      { month: 'Jun 26', dbDeviation: 0.0 },
      { month: 'Jul 26', dbDeviation: 0.0 },
      { month: 'Aug 26', dbDeviation: -0.1 },
      { month: 'Sep 26', dbDeviation: 0.0 },
    ],
    anomalies: {
      deforestationSignal: 'Zero material canopy disturbance detected',
      vegetationAnomaly: '+0.4% healthy vegetative vitality tracking rain events',
      seasonalAdjustment: 'All signals align with natural volcanic mist and seasonal precipitation',
      baselineDeviation: 'Permanence intact; zero baseline breach across entire project perimeter',
      affectedAreaKm2: 0.0,
    },
    claims: ['Apple Net-Zero 2030 Portfolio', 'Gucci High-Integrity Reserve'],
    satelliteTimeline: [
      {
        id: 'OBS-CYH-01',
        date: '2026-09-06 08:30 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 98,
        status: 'Nominal',
        note: 'Pristine canopy integrity verified. Zero degradation anomalies.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-CYH-01',
        timestamp: '2026-09-01 10:00 UTC',
        author: 'Audit Intelligence Core',
        role: 'Assurance Engine',
        action: 'Verification Pack Generated',
        details:
          'Annual satellite permanence substantiated. Meets ICVCM Core Carbon Principles criteria.',
      },
    ],
  },
  {
    id: 'VCS-1650',
    name: 'Keo Seima Wildlife Sanctuary',
    country: 'Cambodia',
    coordinates: [12.45, 106.85],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-1650-KSM',
    status: 'Stable',
    riskTier: 'low',
    riskScore: 22,
    confidence: 96,
    buyers: ['Grab', 'Disney', 'Salesforce'],
    credits: 1038000,
    financialExposure: 8304000,
    lastObservation: '2026-09-06T06:12:00Z',
    satelliteSource: 'Sentinel-1 SAR',
    ndviTrend: [
      { month: 'Oct 25', value: 0.78, baseline: 0.78 },
      { month: 'Nov 25', value: 0.77, baseline: 0.77 },
      { month: 'Dec 25', value: 0.75, baseline: 0.75 },
      { month: 'Jan 26', value: 0.73, baseline: 0.73 },
      { month: 'Feb 26', value: 0.71, baseline: 0.71 },
      { month: 'Mar 26', value: 0.7, baseline: 0.7 },
      { month: 'Apr 26', value: 0.73, baseline: 0.73 },
      { month: 'May 26', value: 0.76, baseline: 0.76 },
      { month: 'Jun 26', value: 0.77, baseline: 0.77 },
      { month: 'Jul 26', value: 0.78, baseline: 0.78 },
      { month: 'Aug 26', value: 0.78, baseline: 0.78 },
      { month: 'Sep 26', value: 0.78, baseline: 0.77 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: 0.0 },
      { month: 'Nov 25', dbDeviation: 0.0 },
      { month: 'Dec 25', dbDeviation: -0.1 },
      { month: 'Jan 26', dbDeviation: -0.2 },
      { month: 'Feb 26', dbDeviation: -0.2 },
      { month: 'Mar 26', dbDeviation: -0.1 },
      { month: 'Apr 26', dbDeviation: 0.0 },
      { month: 'May 26', dbDeviation: 0.1 },
      { month: 'Jun 26', dbDeviation: 0.1 },
      { month: 'Jul 26', dbDeviation: 0.0 },
      { month: 'Aug 26', dbDeviation: 0.0 },
      { month: 'Sep 26', dbDeviation: 0.1 },
    ],
    anomalies: {
      deforestationSignal: 'Negligible edge encroachment contained by indigenous patrol posts',
      vegetationAnomaly: '+0.2% seasonal balance with no sustained negative trends',
      seasonalAdjustment: 'Strict conformity to monsoon phenology cycles',
      baselineDeviation:
        'Conservative baseline confirmed; project performance superior to baseline expectations',
      affectedAreaKm2: 0.1,
    },
    claims: ['Disney Clean Portfolio Control', 'Southeast Asia Carbon Offset Integrity'],
    satelliteTimeline: [
      {
        id: 'OBS-KSM-01',
        date: '2026-09-06 06:12 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 96,
        status: 'Nominal',
        note: 'Dense canopy volume scattering stable. No unauthorized road openings.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-KSM-01',
        timestamp: '2026-08-15 08:30 UTC',
        author: 'Lead Forest Ecologist',
        role: 'Validation Lead',
        action: 'Clean Audit Verdict',
        details: 'Benchmark control asset confirmed. Strong community governance prevents leakage.',
      },
    ],
  },
  {
    id: 'VCS-1382',
    name: 'Envira Amazonia Project',
    country: 'Brazil',
    coordinates: [-8.0, -70.25],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-1382-ENV',
    status: 'Escalated Review',
    riskTier: 'high',
    riskScore: 76,
    confidence: 93,
    buyers: ['Geopost', 'Delta Air Lines'],
    credits: 3086884,
    financialExposure: 24695072,
    lastObservation: '2026-09-06T13:10:00Z',
    satelliteSource: 'Sentinel-1 SAR + Sentinel-2 MSI',
    ndviTrend: [
      { month: 'Oct 25', value: 0.84, baseline: 0.85 },
      { month: 'Nov 25', value: 0.83, baseline: 0.85 },
      { month: 'Dec 25', value: 0.81, baseline: 0.84 },
      { month: 'Jan 26', value: 0.78, baseline: 0.84 },
      { month: 'Feb 26', value: 0.75, baseline: 0.83 },
      { month: 'Mar 26', value: 0.73, baseline: 0.84 },
      { month: 'Apr 26', value: 0.71, baseline: 0.84 },
      { month: 'May 26', value: 0.69, baseline: 0.85 },
      { month: 'Jun 26', value: 0.67, baseline: 0.85 },
      { month: 'Jul 26', value: 0.64, baseline: 0.85 },
      { month: 'Aug 26', value: 0.62, baseline: 0.84 },
      { month: 'Sep 26', value: 0.59, baseline: 0.84 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.4 },
      { month: 'Nov 25', dbDeviation: -0.8 },
      { month: 'Dec 25', dbDeviation: -1.3 },
      { month: 'Jan 26', dbDeviation: -1.9 },
      { month: 'Feb 26', dbDeviation: -2.6 },
      { month: 'Mar 26', dbDeviation: -3.2 },
      { month: 'Apr 26', dbDeviation: -3.8 },
      { month: 'May 26', dbDeviation: -4.4 },
      { month: 'Jun 26', dbDeviation: -5.0 },
      { month: 'Jul 26', dbDeviation: -5.6 },
      { month: 'Aug 26', dbDeviation: -6.2 },
      { month: 'Sep 26', dbDeviation: -6.9 },
    ],
    anomalies: {
      deforestationSignal: 'Clearings documented along Acre-state river transportation corridor',
      vegetationAnomaly: '-29.8% multi-temporal vegetation decrease',
      seasonalAdjustment: 'Significant deforestation detected independent of seasonal moisture',
      baselineDeviation: 'Baselines grossly inflated relative to regional deforestation rates',
      affectedAreaKm2: 2.9,
    },
    claims: ['Postal Delivery Carbon Neutral Claims', 'Delta Legacy Retirements'],
    satelliteTimeline: [
      {
        id: 'OBS-ENV-01',
        date: '2026-09-06 13:10 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 93,
        status: 'Anomaly Detected',
        note: 'C-Band radar shows sustained biomass loss (-6.9 dB) across northern parcels.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-ENV-01',
        timestamp: '2026-09-05 18:20 UTC',
        author: 'Compliance Review Board',
        role: 'Legal Lead',
        action: 'Risk Escalation Notice',
        details:
          'Notice delivered to Geopost governance board. Baseline overcrediting risk assessed at 68%.',
      },
    ],
  },
  {
    id: 'VCS-2404',
    name: 'MTPL Reforestation',
    country: 'India',
    coordinates: [22.7196, 75.8577],
    creditType: 'Reforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-2404-IND',
    status: 'Monitoring Active',
    riskTier: 'medium',
    riskScore: 42,
    confidence: 91,
    buyers: ['11 Indian Corporate Buyers', 'JPMorgan'],
    credits: 210000,
    financialExposure: 2100000,
    lastObservation: '2026-09-06T07:45:00Z',
    satelliteSource: 'Sentinel-2 Optical',
    ndviTrend: [
      { month: 'Oct 25', value: 0.44, baseline: 0.45 },
      { month: 'Nov 25', value: 0.46, baseline: 0.46 },
      { month: 'Dec 25', value: 0.47, baseline: 0.47 },
      { month: 'Jan 26', value: 0.45, baseline: 0.46 },
      { month: 'Feb 26', value: 0.42, baseline: 0.43 },
      { month: 'Mar 26', value: 0.4, baseline: 0.41 },
      { month: 'Apr 26', value: 0.39, baseline: 0.4 },
      { month: 'May 26', value: 0.41, baseline: 0.42 },
      { month: 'Jun 26', value: 0.45, baseline: 0.45 },
      { month: 'Jul 26', value: 0.48, baseline: 0.48 },
      { month: 'Aug 26', value: 0.49, baseline: 0.49 },
      { month: 'Sep 26', value: 0.48, baseline: 0.49 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: 0.0 },
      { month: 'Nov 25', dbDeviation: 0.1 },
      { month: 'Dec 25', dbDeviation: 0.0 },
      { month: 'Jan 26', dbDeviation: -0.1 },
      { month: 'Feb 26', dbDeviation: -0.2 },
      { month: 'Mar 26', dbDeviation: -0.3 },
      { month: 'Apr 26', dbDeviation: -0.2 },
      { month: 'May 26', dbDeviation: 0.0 },
      { month: 'Jun 26', dbDeviation: 0.2 },
      { month: 'Jul 26', dbDeviation: 0.3 },
      { month: 'Aug 26', dbDeviation: 0.2 },
      { month: 'Sep 26', dbDeviation: 0.1 },
    ],
    anomalies: {
      deforestationSignal: 'Sapling survival rate lower than initial project design documents',
      vegetationAnomaly: '-7.4% slower canopy closure due to summer heatwaves in central belt',
      seasonalAdjustment: 'Survival rate corrected for monsoon delay; growth trajectory recovering',
      baselineDeviation: 'Issuance volume slightly overprojected, but no illegal felling detected',
      affectedAreaKm2: 0.5,
    },
    claims: ['Domestic India ESG Disclosure', 'Corporate Green Asset Holding'],
    satelliteTimeline: [
      {
        id: 'OBS-IND-01',
        date: '2026-09-06 07:45 UTC',
        sensor: 'Sentinel-2 Optical',
        type: 'Optical Multispectral',
        resolution: '10m 13-Band MSI',
        confidence: 91,
        status: 'Nominal',
        note: 'Monsoon green-up detected across target afforestation quadrants.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-IND-01',
        timestamp: '2026-08-10 12:00 UTC',
        author: 'Regional Desk India',
        role: 'Field Coordinator',
        action: 'Sapling Audit',
        details:
          'Survival verification confirmed at 74% vs 85% PDD target. Downgraded risk rating to Medium.',
      },
    ],
  },
  {
    id: 'VCS-1112',
    name: 'The Russas Project',
    country: 'Brazil',
    coordinates: [-9.05, -70.5833],
    creditType: 'Avoided Deforestation',
    registry: 'Verra VCS',
    registryId: 'VCS-1112-RUS',
    status: 'Monitoring Active',
    riskTier: 'medium',
    riskScore: 52,
    confidence: 90,
    buyers: ['4 Named Indian Buyers', 'Unilever'],
    credits: 320000,
    financialExposure: 2560000,
    lastObservation: '2026-09-06T11:22:00Z',
    satelliteSource: 'Sentinel-1 SAR',
    ndviTrend: [
      { month: 'Oct 25', value: 0.82, baseline: 0.83 },
      { month: 'Nov 25', value: 0.81, baseline: 0.83 },
      { month: 'Dec 25', value: 0.8, baseline: 0.82 },
      { month: 'Jan 26', value: 0.78, baseline: 0.82 },
      { month: 'Feb 26', value: 0.76, baseline: 0.81 },
      { month: 'Mar 26', value: 0.75, baseline: 0.82 },
      { month: 'Apr 26', value: 0.74, baseline: 0.82 },
      { month: 'May 26', value: 0.73, baseline: 0.83 },
      { month: 'Jun 26', value: 0.72, baseline: 0.83 },
      { month: 'Jul 26', value: 0.7, baseline: 0.83 },
      { month: 'Aug 26', value: 0.69, baseline: 0.82 },
      { month: 'Sep 26', value: 0.67, baseline: 0.82 },
    ],
    radarTrend: [
      { month: 'Oct 25', dbDeviation: -0.2 },
      { month: 'Nov 25', dbDeviation: -0.4 },
      { month: 'Dec 25', dbDeviation: -0.7 },
      { month: 'Jan 26', dbDeviation: -1.0 },
      { month: 'Feb 26', dbDeviation: -1.3 },
      { month: 'Mar 26', dbDeviation: -1.6 },
      { month: 'Apr 26', dbDeviation: -1.8 },
      { month: 'May 26', dbDeviation: -2.0 },
      { month: 'Jun 26', dbDeviation: -2.3 },
      { month: 'Jul 26', dbDeviation: -2.6 },
      { month: 'Aug 26', dbDeviation: -2.9 },
      { month: 'Sep 26', dbDeviation: -3.2 },
    ],
    anomalies: {
      deforestationSignal: 'Small-scale cattle pasture expansion detected on boundary edges',
      vegetationAnomaly: '-18.3% localized NDVI drop along western fence line',
      seasonalAdjustment: 'Dry season burn marks detected in satellite infrared channel',
      baselineDeviation: 'Moderate leakage into adjacent unregulated public forest parcels',
      affectedAreaKm2: 1.2,
    },
    claims: ['Supply Chain Scope 3 Offset', 'Corporate Neutrality Contribution'],
    satelliteTimeline: [
      {
        id: 'OBS-RUS-01',
        date: '2026-09-06 11:22 UTC',
        sensor: 'Sentinel-1 SAR',
        type: 'SAR Backscatter',
        resolution: '10m C-Band Dual-Pol',
        confidence: 90,
        status: 'Signal Drift',
        note: 'Moderate backscatter thinning (-3.2 dB) on perimeter buffer.',
      },
    ],
    investigationTimeline: [
      {
        id: 'INV-RUS-01',
        timestamp: '2026-08-28 15:10 UTC',
        author: 'Satellite Engine',
        role: 'Detection Pipeline',
        action: 'Automated Watchlist Log',
        details: 'Pasture clearing cluster detected. 1.2 km² flagged for field validation.',
      },
    ],
  },
];

// -------------------------------------------------------------
// CORPORATE BUYERS DIRECTORY
// -------------------------------------------------------------

export const CARBON_BUYERS: BuyerData[] = [
  {
    id: 'buyer-delta',
    name: 'Delta Air Lines',
    initials: 'DL',
    industry: 'Commercial Aviation & Logistics',
    creditsHeld: 3200000,
    creditsRetired: 26500000,
    financialExposure: 48600000,
    highRiskPercentage: 68,
    projects: [
      'Amazon Forest Reserve',
      'Cordillera Azul National Park',
      'Rimba Raya Biodiversity Reserve',
      'Envira Amazonia Project',
      'Kariba REDD+ Project',
    ],
    claims: [
      {
        claim: 'First Carbon-Neutral Airline Globally',
        verificationStatus: 'Flagged Non-Compliant',
        evidenceScore: 24,
        riskNote:
          'Class-action lawsuit in California over Kariba and Amazon Reserve offsets. Violates EU Green Claims guidelines.',
      },
      {
        claim: 'Net-Zero Aviation Flight Plan',
        verificationStatus: 'Substantiation Required',
        evidenceScore: 42,
        riskNote:
          'Heavy reliance on avoided deforestation credits facing active structural reversal.',
      },
    ],
    remediationUrgency: 'Immediate',
    portfolioHealth: 'Critical Exposure',
    concentration: [
      { projectName: 'Amazon Forest Reserve', tonnes: 1840000, riskTier: 'high', pct: 38 },
      { projectName: 'Katingan Peatland', tonnes: 1000000, riskTier: 'high', pct: 21 },
      { projectName: 'Cordillera Azul', tonnes: 750000, riskTier: 'critical', pct: 15 },
      { projectName: 'Rimba Raya', tonnes: 650000, riskTier: 'medium', pct: 13 },
      { projectName: 'Envira Amazonia', tonnes: 620000, riskTier: 'high', pct: 13 },
    ],
    recommendedActions: [
      'Immediately freeze retirement claims citing Amazon Forest Reserve and Kariba VCS-902.',
      'Replace high-risk REDD credits with permanent carbon removal (DACS/Biochar) before SEC 10-K filing.',
      'Audit remaining 3.2M held credits for potential balance sheet write-down.',
      'Prepare defensive legal evidence pack for EU consumer protection inquiries.',
    ],
  },
  {
    id: 'buyer-shell',
    name: 'Shell plc',
    initials: 'SH',
    industry: 'Energy & Petrochemicals',
    creditsHeld: 14200000,
    creditsRetired: 38900000,
    financialExposure: 112400000,
    highRiskPercentage: 74,
    projects: [
      'The Mai Ndombe REDD+ Project',
      'Katingan Peatland Restoration',
      'Cordillera Azul National Park',
      'Kasigau Corridor — Phase II',
    ],
    claims: [
      {
        claim: 'Drive Carbon-Neutral Fuel Offering',
        verificationStatus: 'Flagged Non-Compliant',
        evidenceScore: 18,
        riskNote:
          'UK Advertising Standards Authority (ASA) and Dutch consumer regulator banned claims backed by Katingan.',
      },
      {
        claim: 'Nature-Based Solutions Portfolio Integrity',
        verificationStatus: 'Under Review',
        evidenceScore: 36,
        riskNote:
          'Mai Ndombe satellite anomalies show ongoing industrial clearcutting in claimed avoidance zone.',
      },
    ],
    remediationUrgency: 'Immediate',
    portfolioHealth: 'Critical Exposure',
    concentration: [
      { projectName: 'Katingan Peatland Restoration', tonnes: 11930000, riskTier: 'high', pct: 45 },
      { projectName: 'The Mai Ndombe REDD+', tonnes: 8430000, riskTier: 'critical', pct: 32 },
      {
        projectName: 'Cordillera Azul National Park',
        tonnes: 4200000,
        riskTier: 'critical',
        pct: 16,
      },
      { projectName: 'Kasigau Corridor II', tonnes: 1960000, riskTier: 'medium', pct: 7 },
    ],
    recommendedActions: [
      'Retract marketing claims linking retail fuel purchases to nature-based offset retirement.',
      'Initiate third-party SAR satellite audit across all Congolese and Indonesian concessions.',
      'Reclassify $42M in credit inventory carrying high non-permanence liability.',
    ],
  },
  {
    id: 'buyer-nestle',
    name: 'Nestlé',
    initials: 'NE',
    industry: 'Consumer Packaged Goods & Food',
    creditsHeld: 2800000,
    creditsRetired: 9400000,
    financialExposure: 28200000,
    highRiskPercentage: 42,
    projects: [
      'Amazon Forest Reserve',
      'Chyulu Hills REDD+ Project',
      'Alto Mayo Conservation Initiative',
    ],
    claims: [
      {
        claim: 'Carbon-Neutral Brand Certification',
        verificationStatus: 'Substantiation Required',
        evidenceScore: 54,
        riskNote:
          'Transitioning from off-site offsets toward on-farm insetting; legacy claims still scrutinized.',
      },
    ],
    remediationUrgency: 'Elevated',
    portfolioHealth: 'Elevated Risk',
    concentration: [
      { projectName: 'Amazon Forest Reserve', tonnes: 1250000, riskTier: 'high', pct: 44 },
      { projectName: 'Chyulu Hills', tonnes: 950000, riskTier: 'low', pct: 34 },
      { projectName: 'Alto Mayo', tonnes: 600000, riskTier: 'high', pct: 22 },
    ],
    recommendedActions: [
      'Accelerate phase-out of legacy avoided deforestation credits in favor of verified agricultural insetting.',
      'Substantiate Chyulu Hills holdings with satellite vegetative proof.',
    ],
  },
  {
    id: 'buyer-gucci',
    name: 'Gucci (Kering Group)',
    initials: 'GC',
    industry: 'Luxury Fashion & Retail',
    creditsHeld: 1400000,
    creditsRetired: 5200000,
    financialExposure: 15600000,
    highRiskPercentage: 58,
    projects: [
      'Chyulu Hills REDD+ Project',
      'Kariba REDD+ Project',
      'Alto Mayo Conservation Initiative',
    ],
    claims: [
      {
        claim: 'Entire Operations Entirely Carbon Neutral Since 2018',
        verificationStatus: 'Flagged Non-Compliant',
        evidenceScore: 31,
        riskNote:
          'Kering dropped the blanket carbon-neutral claim in 2023 following Kariba scrutiny; residual legal exposure remains.',
      },
    ],
    remediationUrgency: 'Elevated',
    portfolioHealth: 'Elevated Risk',
    concentration: [
      { projectName: 'Kariba REDD+ Project', tonnes: 2940000, riskTier: 'high', pct: 56 },
      { projectName: 'Chyulu Hills', tonnes: 1500000, riskTier: 'low', pct: 29 },
      { projectName: 'Alto Mayo', tonnes: 760000, riskTier: 'high', pct: 15 },
    ],
    recommendedActions: [
      'Publish comprehensive restatement of historical emission reduction claims.',
      'Ringfence Chyulu Hills as validated high-integrity control baseline.',
    ],
  },
  {
    id: 'buyer-microsoft',
    name: 'Microsoft',
    initials: 'MS',
    industry: 'Enterprise Software & Cloud',
    creditsHeld: 6800000,
    creditsRetired: 4200000,
    financialExposure: 13600000,
    highRiskPercentage: 8,
    projects: ['Chyulu Hills REDD+ Project', 'Keo Seima Wildlife Sanctuary'],
    claims: [
      {
        claim: 'Carbon Negative by 2030',
        verificationStatus: 'Verified',
        evidenceScore: 92,
        riskNote:
          'Strict procurement protocol exclusively focused on verifiable high-durability carbon removal.',
      },
    ],
    remediationUrgency: 'Low',
    portfolioHealth: 'Exemplary',
    concentration: [
      { projectName: 'Keo Seima Wildlife Sanctuary', tonnes: 2400000, riskTier: 'low', pct: 57 },
      { projectName: 'Chyulu Hills', tonnes: 1800000, riskTier: 'low', pct: 43 },
    ],
    recommendedActions: [
      'Maintain existing tier-1 durability criteria and continuous orbital verification monitoring.',
    ],
  },
  {
    id: 'buyer-salesforce',
    name: 'Salesforce',
    initials: 'SF',
    industry: 'Enterprise Cloud CRM',
    creditsHeld: 2100000,
    creditsRetired: 3400000,
    financialExposure: 8500000,
    highRiskPercentage: 12,
    projects: ['Chyulu Hills REDD+ Project', 'Keo Seima Wildlife Sanctuary'],
    claims: [
      {
        claim: 'Net-Zero Residual Compensation',
        verificationStatus: 'Verified',
        evidenceScore: 88,
        riskNote:
          'Rigorous public registry documentation and multi-sensor satellite verification checks.',
      },
    ],
    remediationUrgency: 'Low',
    portfolioHealth: 'Exemplary',
    concentration: [
      { projectName: 'Chyulu Hills', tonnes: 2100000, riskTier: 'low', pct: 62 },
      { projectName: 'Keo Seima', tonnes: 1300000, riskTier: 'low', pct: 38 },
    ],
    recommendedActions: [
      'Expand real-time satellite dashboard integration into public annual ESG reporting.',
    ],
  },
  {
    id: 'buyer-jpmorgan',
    name: 'JPMorgan Chase',
    initials: 'JP',
    industry: 'Financial Services & Investment Banking',
    creditsHeld: 1900000,
    creditsRetired: 2800000,
    financialExposure: 11400000,
    highRiskPercentage: 32,
    projects: ['MTPL Reforestation', 'Chyulu Hills REDD+ Project', 'The Russas Project'],
    claims: [
      {
        claim: 'Operational Neutrality Across Branches',
        verificationStatus: 'Under Review',
        evidenceScore: 68,
        riskNote: 'Audit required for domestic afforestation and forestry holdings.',
      },
    ],
    remediationUrgency: 'Moderate',
    portfolioHealth: 'Monitored / Stable',
    concentration: [
      { projectName: 'Chyulu Hills', tonnes: 1200000, riskTier: 'low', pct: 43 },
      { projectName: 'MTPL Reforestation', tonnes: 850000, riskTier: 'medium', pct: 30 },
      { projectName: 'The Russas Project', tonnes: 750000, riskTier: 'medium', pct: 27 },
    ],
    recommendedActions: [
      'Commission detailed radar biomass verification for developing market forestry assets.',
    ],
  },
  {
    id: 'buyer-unilever',
    name: 'Unilever',
    initials: 'UL',
    industry: 'Consumer Goods & Personal Care',
    creditsHeld: 2400000,
    creditsRetired: 6100000,
    financialExposure: 19500000,
    highRiskPercentage: 38,
    projects: [
      'The Russas Project',
      'Chyulu Hills REDD+ Project',
      'Alto Mayo Conservation Initiative',
    ],
    claims: [
      {
        claim: 'Deforestation-Free Supply Chain & Neutral Brands',
        verificationStatus: 'Under Review',
        evidenceScore: 64,
        riskNote:
          'Supply chain traceability strong; offset holdings need independent satellite recheck.',
      },
    ],
    remediationUrgency: 'Moderate',
    portfolioHealth: 'Monitored / Stable',
    concentration: [
      { projectName: 'Chyulu Hills', tonnes: 1500000, riskTier: 'low', pct: 42 },
      { projectName: 'Alto Mayo', tonnes: 1200000, riskTier: 'high', pct: 33 },
      { projectName: 'The Russas Project', tonnes: 900000, riskTier: 'medium', pct: 25 },
    ],
    recommendedActions: [
      'Re-verify Alto Mayo coffee supply chain credits against latest Sentinel radar detections.',
    ],
  },
];

// -------------------------------------------------------------
// LIVE INTELLIGENCE FEED / RISK REPORTS
// -------------------------------------------------------------

export const LIVE_RISK_REPORTS: RiskReportEvent[] = [
  {
    id: 'EVT-001',
    timestamp: '2026-09-06T19:25:00Z',
    timeAgo: '14 min ago',
    type: 'SAR Anomaly',
    title: 'SAR anomaly detected',
    projectOrBuyer: 'The Mai Ndombe REDD+ Project',
    location: 'DR Congo (Sector 4B)',
    severity: 'critical',
    confidence: 97,
    details:
      'Coherence collapse (-7.2 dB) confirms active mechanical felling across 4.1 km² parcel.',
    iconType: 'radar',
  },
  {
    id: 'EVT-002',
    timestamp: '2026-09-06T18:57:00Z',
    timeAgo: '42 min ago',
    type: 'NDVI Deviation',
    title: 'NDVI deviation above threshold',
    projectOrBuyer: 'Amazon Forest Reserve',
    location: 'Brazil (Boundary Spur)',
    severity: 'high',
    confidence: 94,
    details:
      'Vegetation index dropped 22.9% relative to harmonic baseline; 2.8 km² degradation flagged.',
    iconType: 'leaf',
  },
  {
    id: 'EVT-003',
    timestamp: '2026-09-06T17:39:00Z',
    timeAgo: '2 hr ago',
    type: 'Exposure Recalculated',
    title: 'Buyer exposure recalculated',
    projectOrBuyer: 'Delta Air Lines',
    location: 'Global Portfolio',
    severity: 'high',
    confidence: 99,
    details: 'Portfolio at risk adjusted to $48.6M following Amazon Reserve & Kariba escalation.',
    iconType: 'dollar',
  },
  {
    id: 'EVT-004',
    timestamp: '2026-09-06T14:39:00Z',
    timeAgo: '5 hr ago',
    type: 'Claim Evidence Review',
    title: 'Claim evidence review completed',
    projectOrBuyer: 'Shell plc',
    location: 'European Jurisdiction',
    severity: 'critical',
    confidence: 95,
    details:
      'Regulatory review concluded Drive Carbon Neutral retail claim cannot be legally defended under EU Directives.',
    iconType: 'shield',
  },
  {
    id: 'EVT-005',
    timestamp: '2026-09-06T11:15:00Z',
    timeAgo: '8 hr ago',
    type: 'Registry Notice',
    title: 'Baseline discrepancy logged',
    projectOrBuyer: 'Cordillera Azul National Park',
    location: 'Peru',
    severity: 'high',
    confidence: 92,
    details:
      'Independent auditor report corroborates 3.7 km² unrecorded forest loss in claimed crediting zone.',
    iconType: 'alert',
  },
];

// -------------------------------------------------------------
// COMPLIANCE REGULATIONS (DEMO / REFERENCE MOCK DATA)
// -------------------------------------------------------------

export const REGULATORY_FRAMEWORKS: RegulatoryFramework[] = [
  {
    id: 'REG-EU-GCD',
    name: 'EU Green Claims Directive',
    authority: 'European Commission & Parliament',
    status: 'Pending Final Rule',
    effectiveDate: 'Q3 2026',
    relevance:
      'Prohibits generic claims such as "carbon neutral" or "climate positive" based solely on offsetting.',
    evidenceRequirement:
      'Substantiation requires direct proof of internal emissions reductions and verified permanence of residual offsets.',
    internalReviewStatus: 'Gaps Identified',
    scopeNote:
      'MOCK/REFERENCE DATA: Demonstrates how enterprise portfolios track upcoming EU substantiation standards.',
  },
  {
    id: 'REG-SEC-CR',
    name: 'SEC Climate Disclosure Rules',
    authority: 'U.S. Securities & Exchange Commission',
    status: 'Implementation Phase',
    effectiveDate: 'Fiscal Year 2026 Filings',
    relevance:
      'Mandates disclosure of carbon offsets if used to achieve publicly stated climate targets, including cost and origin.',
    evidenceRequirement:
      'Rigorous registry identification, project location, accounting method, and financial liability disclosure in 10-K filings.',
    internalReviewStatus: 'Review in Progress',
    scopeNote:
      'MOCK/REFERENCE DATA: Illustrates simulated reporting requirements for US-listed public entities.',
  },
  {
    id: 'REG-VCMI',
    name: 'VCMI Claims Code of Practice',
    authority: 'Voluntary Carbon Markets Integrity Initiative',
    status: 'Guidance Active',
    effectiveDate: 'Active Standard',
    relevance:
      'Requires companies to first meet near-term science-based Scope 1-3 targets before claiming Carbon Integrity tiers (Silver/Gold/Platinum).',
    evidenceRequirement:
      'Annual verification by accredited third-party validation and satellite permanence audit.',
    internalReviewStatus: 'Audit Ready',
    scopeNote: 'MOCK/REFERENCE DATA: Standard for voluntary corporate integrity benchmarking.',
  },
  {
    id: 'REG-ICVCM',
    name: 'ICVCM Core Carbon Principles (CCPs)',
    authority: 'Integrity Council for the Voluntary Carbon Market',
    status: 'Enacted',
    effectiveDate: 'Active Standard',
    relevance:
      'Sets global threshold for high-integrity credits: additionality, permanence, robust quantification, and no double counting.',
    evidenceRequirement:
      'CCP-approved tag on registry credits. Non-compliant credits face automatic downgrade in risk scoring.',
    internalReviewStatus: 'Audit Ready',
    scopeNote:
      'MOCK/REFERENCE DATA: Used to cross-reference registry methodology tags with observed integrity.',
  },
];

// -------------------------------------------------------------
// INTERACTIVE AUDIT CHECKLIST
// -------------------------------------------------------------

export const AUDIT_CHECKLIST_DATA: AuditChecklistItem[] = [
  {
    id: 'CHK-001',
    title: 'Project additionality evidence reviewed',
    category: 'Additionality',
    status: 'Verified',
    evidenceRef: 'DOC-ADD-2026-08',
    lastUpdated: '2026-09-02',
    assignee: 'Dr. Marcus Holloway',
    notes:
      'Financial barrier analysis and regulatory additionality verified against historic national policy baselines.',
  },
  {
    id: 'CHK-002',
    title: 'Registry documentation verified',
    category: 'Registry',
    status: 'Verified',
    evidenceRef: 'VERRA-VCS-SERIAL-902',
    lastUpdated: '2026-09-01',
    assignee: 'Elena Vance',
    notes:
      'Issuance serial numbers cross-checked against Verra registry public ledger. No double-issuance flags found.',
  },
  {
    id: 'CHK-003',
    title: 'Satellite baseline substantiated',
    category: 'Telemetry',
    status: 'Needs Review',
    evidenceRef: 'SAT-PASS-2026-09',
    lastUpdated: '2026-09-06',
    assignee: 'Sentinel Data Team',
    notes:
      'Amazon Reserve and Mai Ndombe satellite observations indicate localized baseline deviation. Multi-sensor verification required.',
  },
  {
    id: 'CHK-004',
    title: 'Carbon accounting methodology reviewed',
    category: 'Accounting',
    status: 'Verified',
    evidenceRef: 'VM0007-REV-4.1',
    lastUpdated: '2026-08-28',
    assignee: 'PwC Climate Risk Review',
    notes:
      'Methodology VM0007 applied correctly, but buffer pool allocation (12%) deemed insufficient under revised drought models.',
  },
  {
    id: 'CHK-005',
    title: 'Claim language approved by legal',
    category: 'Claims',
    status: 'Escalated',
    evidenceRef: 'LEGAL-MEMO-2026-88',
    lastUpdated: '2026-09-06',
    assignee: 'Sarah Chen, JD',
    notes:
      'Unsubstantiated "carbon neutral" phrasing flagged on commercial marketing pages. Escalated to General Counsel.',
  },
  {
    id: 'CHK-006',
    title: 'Retirement records reconciled',
    category: 'Registry',
    status: 'Verified',
    evidenceRef: 'REC-LEDGER-Q3',
    lastUpdated: '2026-09-04',
    assignee: 'Elena Vance',
    notes:
      'All historical retirements matched 1-to-1 against corporate ERP procurement line items.',
  },
  {
    id: 'CHK-007',
    title: 'Buyer disclosure reviewed',
    category: 'Legal',
    status: 'Needs Review',
    evidenceRef: 'SEC-10K-DRAFT-V3',
    lastUpdated: '2026-09-05',
    assignee: 'Corporate ESG Counsel',
    notes:
      'Draft footnote disclosures lack required specificity on third-party satellite monitoring methodology.',
  },
  {
    id: 'CHK-008',
    title: 'Legal sign-off completed',
    category: 'Legal',
    status: 'Missing Evidence',
    evidenceRef: 'PENDING-LEGAL-EXEC',
    lastUpdated: '2026-09-06',
    assignee: 'Chief Legal Officer',
    notes:
      'Awaiting revised risk buffer substantiation before final executive sign-off on 2026 sustainability declaration.',
  },
];
