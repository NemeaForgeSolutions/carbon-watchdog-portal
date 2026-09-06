export type NavItem = {
  label: string;
  to: string;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

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
    title: 'Platform',
    items: [
      { label: 'Overview', to: '/' },
      { label: 'Portfolio', to: '/portfolio' },
      { label: 'Exposure', to: '/buyers' },
      { label: 'Onboarding', to: '/onboarding' },
      { label: 'Watchlist', to: '/watchlist' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Methodology', to: '/how-it-works' },
      { label: 'About', to: '/about' },
      { label: 'Plans', to: '/pricing' },
      { label: 'Trust Center', to: '/security' },
      { label: 'Book Briefing', to: '/request-demo' },
    ],
  },
];
