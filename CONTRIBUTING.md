# Contributing to Carbon Watchdog Portal 🌐

Thanks for your interest in contributing to the **Carbon Watchdog Portal**! This document provides frontend-specific guidelines for building components, managing themes, and ensuring code quality.

---

## 🎨 UI & Frontend Philosophy

1. **Aesthetics & Premium Polish**:
   - Interfaces must feel modern, responsive, and institutional-grade.
   - Use semantic design tokens (`bg-card/85`, `text-card-foreground`, `border-border/80`, `text-muted-foreground`) rather than hardcoded colors like `bg-slate-950` or `text-white`.
   - Ensure all views render with high readability in both **Light** and **Dark** modes.
2. **Typography**:
   - Use font tokens: `Outfit` for headings and display labels, `Plus Jakarta Sans` for body copy, and `JetBrains Mono` for telemetry and numbers.
3. **Accessibility**:
   - All interactive elements must maintain WCAG AA color contrast (minimum 4.5:1 for normal text).
   - Ensure keyboard navigability and clear focus rings (`var(--focus-ring)`).
4. **SEO & Discoverability**:
   - Every page route must supply descriptive `meta.title` and `meta.description` in `src/router.ts`.
   - The reactive `useSeo` composable automatically keeps `<title>`, `<meta name="description">`, Open Graph (`og:*`), Twitter Cards (`twitter:*`), and `<link rel="canonical">` in sync with the active route.
   - Any new public page must be registered in `public/sitemap.xml` with appropriate change frequency and indexing priority.
5. **Performance**:
   - Keep components modular and leverage Vite's fast HMR.
   - Avoid oversized client-side bundles; import icons on-demand from `@lucide/vue`.

---

## 🛠️ Local Development

### Installation

```bash
cd carbon-watchdog-portal
npm install
cp .env.example .env
npm run dev
```

The portal runs by default on `http://localhost:5173`.

---

## 📐 Component & Route Guidelines

- Place reusable UI primitives in `src/components/ui/` (using Reka UI / Radix Vue abstractions).
- Domain-specific cards and visualizers belong in `src/components/` (e.g., `MetricCard.vue`, `ProjectCard.vue`, `BuyerCard.vue`, `CarbonOrbit.vue`).
- Page components live in `src/pages/` and must be declared in `src/router.ts` with appropriate `meta` properties (`title`, `description`, `theme`).
- Reusable state and platform utilities reside in `src/composables/` (e.g., `useSeo.ts`, `usePortalData.ts`).
- Store static constants and data in `src/data/` or `src/config/`.

---

## 🧪 Quality Gates Before Committing

Before creating a commit or opening a PR, run the local verification suite:

```bash
# 1. Format code
npm run format

# 2. Run ESLint
npm run lint

# 3. Type-check with vue-tsc
npm run typecheck

# 4. Test production build
npm run build
```

---

## 🌿 Commit & PR Workflow

- **Branching**: Branch from `main` using `feat/` or `fix/` prefixes.
- **Commit Messages**: Use [Conventional Commits](https://www.conventionalcommits.org/):
  ```
  feat(watchlist): add responsive status filter pills and table sort indicator
  fix(theme): balance light mode contrast on buyer cards
  ```
- **PR Description**: Include screenshots or recordings demonstrating UI appearance in both **Light** and **Dark** modes across desktop and mobile viewports.

Thank you for helping build Carbon Watchdog! 🛰️🌲
