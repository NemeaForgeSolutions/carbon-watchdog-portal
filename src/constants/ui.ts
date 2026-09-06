import { MonitorSmartphone, MoonStar, SunMedium } from '@lucide/vue';
import type { Component } from 'vue';
import type { ThemeMode } from '@/config/theme';
import type { Alert, MetricAccent, Project, RiskLevel } from '@/types';

export type ThemeOption = {
  value: ThemeMode;
  label: string;
  icon: Component;
};

export const themeOptions: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: SunMedium },
  { value: 'dark', label: 'Dark', icon: MoonStar },
  { value: 'system', label: 'System', icon: MonitorSmartphone },
];

export const alertSeverityStyles: Record<Alert['severity'], string> = {
  high: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium',
  medium: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium',
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium',
};

export const alertSeverityLabels: Record<Alert['severity'], string> = {
  high: 'Critical',
  medium: 'Moderate',
  low: 'Low',
};

export const metricAccentClasses: Record<MetricAccent, string> = {
  slate: 'border-border/80 bg-card/80 text-card-foreground hover:border-slate-400/40 dark:hover:border-slate-500/40',
  emerald: 'border-emerald-500/30 bg-card/80 text-card-foreground hover:border-emerald-500/60',
  blue: 'border-sky-500/30 bg-card/80 text-card-foreground hover:border-sky-500/60',
  amber: 'border-amber-500/30 bg-card/80 text-card-foreground hover:border-amber-500/60',
};

export const projectRiskStyles: Record<Project['riskLevel'], string> = {
  low: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium',
  medium: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium',
  high: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium',
};

export const riskLevelPriority: Record<RiskLevel, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export const alertSeverityDotClasses: Record<Alert['severity'] | 'critical', string> = {
  critical: 'bg-rose-500 text-rose-500',
  high: 'bg-rose-500 text-rose-500',
  medium: 'bg-amber-500 text-amber-500',
  low: 'bg-emerald-500 text-emerald-500',
};

export const spotlightStatusStyles: Record<string, string> = {
  Flagged: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium',
  default: 'border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300 font-medium',
};