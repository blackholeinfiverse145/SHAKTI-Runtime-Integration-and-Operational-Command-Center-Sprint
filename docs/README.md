# README.md

# SHAKTI Operational Command Center

A production-grade frontend operational command center for real-time monitoring of the national power grid. Built for grid operators, regional controllers, and executive users who require immediate situational awareness.

---

## Overview

The SHAKTI Operational Command Center is a React-based single-page application that consolidates live grid status, operational alerts, risk analysis, demand forecasting, incident tracking, system health, replay status, and operational evidence into a single information-dense dashboard.

The application is designed as a **command center**, not a reporting tool. All critical operational information is visible within the initial viewport. The interface is dark-themed, compact, and optimized for sustained operational use.

---

## Features

- **Executive Summary** — 4 operational metrics and 4 live KPIs with trend indicators
- **National Grid Status** — Per-region load bars, frequency, and operational status for 5 grid regions
- **Live Alert Queue** — Real-time severity-coded alerts with acknowledgement state (15s refresh)
- **Risk Heatmap** — Per-region risk scores sorted by severity with contributing factors
- **Forecast Panel** — 24-hour demand and renewable generation area chart with peak demand summary
- **Incident Queue** — Active incidents with severity, status, location, and assigned operator
- **Operational Timeline** — Chronological event feed categorized by system, operator, alert, and incident events
- **System Health** — Per-service latency, uptime, and status for 6 backend services
- **Replay Status** — Replay job progress bars with event counts and state indicators
- **Evidence Panel** — Confidence-scored evidence records linked to incidents
- **Dark theme** — Full `slate-950` dark theme throughout
- **Loading skeletons** — Every zone has animated skeleton placeholders during data fetch
- **Error states** — Every zone independently handles API failures with inline retry
- **Empty states** — Every list zone handles zero-record responses gracefully
- **Responsive layout** — Adapts from desktop (1440px) to tablet (768px) to mobile

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build toolchain with HMR |
| TypeScript | 6.x | Static type safety |
| Tailwind CSS | 4.x | Utility-first styling |
| TanStack Query | 5.x | Server state, caching, refetch |
| Axios | 1.x | HTTP client |
| Recharts | 3.x | Chart rendering (lazy-loaded) |
| Lucide React | 1.x | Icon library |
| React Router DOM | 7.x | Client-side routing |
| clsx + tailwind-merge | latest | Class name composition |

---

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

---

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd shakti-command-center

# Install dependencies
npm install
```

---

## Running the Project

### Development server

```bash
npm run dev
```

Opens at `http://localhost:5173` with Hot Module Replacement enabled.

By default, the application runs with **mock API data**. All 11 API endpoints return realistic mock data with a simulated 400ms network delay.

### Production build

```bash
npm run build
```

Outputs to `dist/`. The build produces two chunks:
- `index.js` — Main application bundle (~338KB minified, ~105KB gzip)
- `ForecastPanel.js` — Recharts chart bundle (~344KB minified, ~100KB gzip, lazy-loaded)

### Preview production build

```bash
npm run preview
```

### Type check

```bash
npx tsc --noEmit
```

### Lint

```bash
npm run lint
```

---

## Environment Variables

Create a `.env` file in the project root to configure the API base URL:

```env
VITE_API_BASE_URL=https://your-api-server.example.com
```

When `VITE_API_BASE_URL` is set, all API calls are routed to the live backend. When it is not set or empty, the mock data layer activates automatically.

---

## Folder Structure

```
shakti-command-center/
├── src/
│   ├── components/
│   │   ├── dashboard/          # All 10 dashboard zone components
│   │   │   ├── ExecutiveSummary.tsx
│   │   │   ├── NationalGridStatus.tsx
│   │   │   ├── LiveAlertQueue.tsx
│   │   │   ├── RiskHeatmap.tsx
│   │   │   ├── ForecastPanel.tsx
│   │   │   ├── IncidentQueue.tsx
│   │   │   ├── OperationalTimeline.tsx
│   │   │   ├── SystemHealth.tsx
│   │   │   ├── ReplayStatus.tsx
│   │   │   └── EvidencePanel.tsx
│   │   ├── layout/
│   │   │   └── Header.tsx      # Top navigation bar
│   │   └── ui/
│   │       └── skeleton.tsx    # Loading placeholder component
│   ├── hooks/
│   │   └── useQueries.ts       # All 11 TanStack Query hooks
│   ├── layouts/
│   │   └── DashboardLayout.tsx # Root layout wrapper
│   ├── lib/
│   │   └── utils.ts            # cn() class name utility
│   ├── pages/
│   │   └── Dashboard.tsx       # Main dashboard page with CSS Grid
│   ├── services/
│   │   └── api.ts              # Axios API client + mock data layer
│   ├── types/
│   │   └── api.ts              # All TypeScript interfaces and types
│   ├── utils/
│   │   └── format.ts           # Formatting and color utility functions
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point with QueryClientProvider
│   └── index.css               # Tailwind import + dark theme base styles
├── docs/
│   ├── dashboard_architecture.md
│   ├── dashboard_zoning.md
│   ├── component_inventory.md
│   ├── README.md
│   ├── UI_ARCHITECTURE.md
│   ├── COMPONENT_LIBRARY.md
│   ├── RUNTIME_INTEGRATION.md
│   ├── TESTING_GUIDE.md
│   └── REVIEW_PACKET.md
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── components.json
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | TypeScript check + production bundle |
| Preview | `npm run preview` | Serve production build locally |
| Lint | `npm run lint` | Run ESLint across all source files |
| Type Check | `npx tsc --noEmit` | TypeScript type check without emitting |

---

## Development Workflow

1. Run `npm run dev` to start the development server.
2. All API calls use mock data by default — no backend required.
3. To connect to a live backend, set `VITE_API_BASE_URL` in `.env`.
4. Add new dashboard zones by:
   - Creating a component in `src/components/dashboard/`
   - Adding a fetch function to `src/services/api.ts`
   - Adding a hook to `src/hooks/useQueries.ts`
   - Placing the component in the grid in `src/pages/Dashboard.tsx`
5. Run `npx tsc --noEmit` before committing to catch type errors.

---

## Deployment Notes

- The application is a static SPA — deploy the `dist/` folder to any static hosting service (S3, CloudFront, Nginx, etc.).
- Set `VITE_API_BASE_URL` as a build-time environment variable pointing to the production API server.
- Configure your web server to serve `index.html` for all routes (SPA fallback).
- Both JS chunks (`index.js` and `ForecastPanel.js`) must be served — the forecast chart is lazy-loaded on demand.
- No server-side rendering is required.

---

## Documentation

Full technical documentation is available in the `docs/` folder:

| Document | Description |
|---|---|
| `dashboard_architecture.md` | Architecture overview, component hierarchy, data flow |
| `dashboard_zoning.md` | Grid layout, zone specifications, responsive behavior |
| `component_inventory.md` | Complete component catalog with props and state |
| `UI_ARCHITECTURE.md` | UI principles, CSS Grid, theme, state management |
| `COMPONENT_LIBRARY.md` | Component catalog, usage examples, styling conventions |
| `RUNTIME_INTEGRATION.md` | API integration, data flow, caching, mock strategy |
| `TESTING_GUIDE.md` | Testing strategy, manual checklist, failure scenarios |
| `REVIEW_PACKET.md` | Project summary, architecture overview, evidence checklist |
