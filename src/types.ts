export type RiskLevel = 'low' | 'medium' | 'high';
export type CapitalizedRiskLevel = 'Low' | 'Medium' | 'High';
export type AlertSeverity = 'low' | 'medium' | 'high';
export type MetricAccent = 'slate' | 'emerald' | 'blue' | 'amber';
export type ThemeName = 'forest' | 'ember' | 'midnight' | 'glacier' | 'carbon';

export interface Buyer {
  id: string;
  name: string;
  region: string;
  exposure: number;
}

export interface Project {
  id: string;
  name: string;
  country: string;
  status: string;
  riskLevel: RiskLevel;
  creditType: string;
  coordinates: [number, number];
  buyerIds: string[];
}

export interface Alert {
  type: string;
  severity: AlertSeverity;
  location: string;
  confidence: number;
  detectedAt: string;
}

export interface Report {
  reportId: string;
  projectId: string;
  summary: string;
  overallRisk: RiskLevel;
  alerts: Alert[];
}

export type FormatNumberFn = (_value: number | null | undefined) => string;
