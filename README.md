# Carbon Watchdog Portal

Frontend web application for Carbon Watchdog, built with Vue 3, TypeScript, Vite, and Tailwind CSS.

## Features

- **Project Watchlist**: Monitor and filter satellite-verified carbon projects by status and risk signals.
- **Buyer Exposure**: View portfolio concentration metrics connecting corporate credit retirements to project ground truth.
- **Compliance & Methodology**: Access evidence pipelines and audit documentation under emerging climate frameworks.
- **Telemetry Visualizer**: Interactive orbital display tracking satellite passes and monitored coordinates.
- **Theme Support**: Light and dark mode with customizable theme presets.

## Quickstart

### Prerequisites

- Node.js 26+
- npm 10+

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The portal runs at [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Build production bundle in `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run `vue-tsc` type-checking |
| `npm run lint` | Run ESLint |
| `npm run format` | Check formatting with Prettier |

## Environment Variables

Configured in `.env` (see `.env.example`):

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://localhost:8090` | API backend base URL |
| `VITE_TENANT_ID` | `sandbox-demo` | Active tenant identifier |
| `VITE_SANDBOX_MODE` | `true` | Offline mock dataset flag |
| `VITE_ZITADEL_ISSUER` | `http://localhost:8085` | Zitadel OIDC issuer endpoint |
| `VITE_ZITADEL_CLIENT_ID` | `carbon-watchdog-portal` | Zitadel application client ID |
| `VITE_SITE_URL` | `https://carbonwatchdog.org` | Canonical site URL |

## License

MIT
