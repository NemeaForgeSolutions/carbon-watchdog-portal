import { createRouter, createWebHistory } from 'vue-router';
import type { ThemeName } from '@/config/theme';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    theme?: ThemeName;
    description?: string;
  }
}

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: () => import('./pages/OverviewPage.vue'),
      meta: {
        title: 'Overview',
        theme: 'forest',
        description:
          'A satellite-first view of project integrity, buyer exposure, and risk signals across the portfolio.',
      },
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: () => import('./pages/PortfolioPage.vue'),
      meta: {
        title: 'Portfolio',
        theme: 'midnight',
        description: 'A living atlas of credit integrity, claim quality, and concentration risk.',
      },
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('./pages/PlanPage.vue'),
      meta: {
        title: 'Plan',
        theme: 'forest',
        description:
          'The build plan, delivery phases, and execution checklist from the attached document.',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/AboutPage.vue'),
      meta: {
        title: 'About',
        theme: 'carbon',
        description:
          'Why Carbon Watchdog exists and how it turns carbon monitoring into a buyer-facing evidence product.',
      },
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: () => import('./pages/WatchlistPage.vue'),
      meta: {
        title: 'Watchlist',
        theme: 'midnight',
        description:
          'The 13 target projects and the buyer evidence that makes them worth demoing first.',
      },
    },
    {
      path: '/buyers',
      name: 'buyers',
      component: () => import('./pages/BuyersPage.vue'),
      meta: {
        title: 'Exposure',
        theme: 'ember',
        description:
          'Buyer-level exposure, concentration, and remediation priority across the monitored portfolio.',
      },
    },
    {
      path: '/spotlight',
      name: 'spotlight',
      component: () => import('./pages/SpotlightPage.vue'),
      meta: {
        title: 'Buyer Spotlight',
        theme: 'ember',
        description: 'Delta and Shell portfolio views that make exposure obvious fast.',
      },
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: () => import('./pages/MethodsPage.vue'),
      meta: {
        title: 'Methodology',
        theme: 'glacier',
        description:
          'Monitoring inputs, review controls, and evidence generation explained clearly for customer diligence.',
      },
    },
    {
      path: '/methods',
      redirect: '/how-it-works',
    },
    {
      path: '/actions',
      name: 'actions',
      component: () => import('./pages/ActionsPage.vue'),
      meta: {
        title: 'Actions',
        theme: 'carbon',
        description: 'The immediate next steps needed to turn the plan into a working prototype.',
      },
    },
    {
      path: '/compliance',
      name: 'compliance',
      component: () => import('./pages/CompliancePage.vue'),
      meta: {
        title: 'Compliance',
        theme: 'carbon',
        description:
          'Regulatory milestones, claim checks, and substantiation guidance for the post-offset era.',
      },
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('./pages/OnboardingPage.vue'),
      meta: {
        title: 'Onboarding',
        theme: 'forest',
        description: 'Guided setup for organization, users, imports, and tenant go-live readiness.',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./pages/SettingsPage.vue'),
      meta: {
        title: 'Settings',
        theme: 'forest',
        description:
          'Configure workspace parameters, alert thresholds, team RBAC, and telemetry feeds.',
      },
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('./pages/PricingPage.vue'),
      meta: {
        title: 'Plans',
        theme: 'ember',
        description:
          'Commercial plans for pilot validation, scaled monitoring, and enterprise governance.',
      },
    },
    {
      path: '/security',
      name: 'security',
      component: () => import('./pages/SecurityPage.vue'),
      meta: {
        title: 'Trust Center',
        theme: 'midnight',
        description:
          'Security, governance, and operational controls packaged for customer diligence.',
      },
    },
    {
      path: '/request-demo',
      name: 'request-demo',
      component: () => import('./pages/RequestDemoPage.vue'),
      meta: {
        title: 'Book Briefing',
        theme: 'glacier',
        description:
          'Commercial intake for teams that want a portfolio-specific risk briefing and pilot recommendation.',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('./pages/NotFoundPage.vue'),
      meta: {
        title: 'Page Not Found',
        theme: 'midnight',
        description:
          'This route is outside the monitored carbon map. Use the primary links to return to tracked pages.',
      },
    },
  ],
});
