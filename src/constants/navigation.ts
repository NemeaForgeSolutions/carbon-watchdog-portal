import type { Component } from 'vue';
import {
  Building2,
  Compass,
  FileCheck2,
  Layers,
  LayoutDashboard,
  Lock,
  Orbit,
  Scale,
  Settings,
  Tag,
  Users,
} from 'lucide-vue-next';

export type NavItem = {
  label: string;
  to: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type SidebarNavItem = {
  label: string;
  to: string;
  icon: Component;
};

export type SidebarNavGroup = {
  title: string;
  items: SidebarNavItem[];
};

export const SIDEBAR_NAV_GROUPS: SidebarNavGroup[] = [
  {
    title: 'Command',
    items: [
      { label: 'Overview', to: '/', icon: LayoutDashboard },
      { label: 'Watchlist', to: '/watchlist', icon: Compass },
      { label: 'Portfolio', to: '/portfolio', icon: Layers },
    ],
  },
  {
    title: 'Exposure',
    items: [
      { label: 'Buyers', to: '/buyers', icon: Users },
      { label: 'Spotlight', to: '/spotlight', icon: Scale },
    ],
  },
  {
    title: 'Assurance',
    items: [
      { label: 'Compliance', to: '/compliance', icon: FileCheck2 },
      { label: 'How It Works', to: '/how-it-works', icon: Orbit },
    ],
  },
  {
    title: 'Workspace',
    items: [
      { label: 'Onboarding', to: '/onboarding', icon: Building2 },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
  {
    title: 'Commercial',
    items: [
      { label: 'Pricing', to: '/pricing', icon: Tag },
      { label: 'Security', to: '/security', icon: Lock },
    ],
  },
];

export const PRIMARY_NAV_ITEMS: NavItem[] = [
  { label: 'Overview', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Exposure', to: '/buyers' },
  { label: 'Onboarding', to: '/onboarding' },
  { label: 'Plans', to: '/pricing' },
  { label: 'Trust Center', to: '/security' },
  { label: 'Methodology', to: '/how-it-works' },
  { label: 'Book Briefing', to: '/request-demo' },
];

export const FOOTER_NAV_SECTIONS: NavSection[] = [
  {
    title: 'Surveillance & Atlas',
    items: [
      { label: 'Global Overview', to: '/' },
      { label: 'Spatial Portfolio', to: '/portfolio' },
      { label: 'Target Watchlist', to: '/watchlist' },
      { label: 'Satellite Methodology', to: '/how-it-works' },
      { label: 'Execution Roadmap', to: '/plan' },
    ],
  },
  {
    title: 'Exposure & Counterparties',
    items: [
      { label: 'Buyer Concentration', to: '/buyers' },
      { label: 'Corporate Spotlight', to: '/spotlight' },
      { label: 'Remediation Actions', to: '/actions' },
      { label: 'Organization Onboarding', to: '/onboarding' },
      { label: 'Commercial Plans', to: '/pricing' },
    ],
  },
  {
    title: 'Assurance & Standards',
    items: [
      { label: 'CSRD Article 29a Hub', to: '/compliance' },
      { label: 'Green Claims Directive', to: '/compliance' },
      { label: 'SEC Climate Disclosures', to: '/compliance' },
      { label: 'Registry Synchronization', to: '/how-it-works' },
      { label: 'Claim Substantiation', to: '/about' },
    ],
  },
  {
    title: 'Governance & Trust',
    items: [
      { label: 'Trust & Security Center', to: '/security' },
      { label: 'SOC 2 Type II Controls', to: '/security' },
      { label: 'ISO 14064-2 Standards', to: '/security' },
      { label: 'Workspace Configuration', to: '/settings' },
      { label: 'Book Diligence Briefing', to: '/request-demo' },
    ],
  },
];
