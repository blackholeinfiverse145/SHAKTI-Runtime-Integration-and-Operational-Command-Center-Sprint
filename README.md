# SHAKTI Executive Dashboard Capability

A production-grade, highly resilient, and configuration-driven React dashboard capability designed for government enterprise and high-stakes operations.

## Overview
This is **NOT** a bespoke dashboard. This is a reusable, composable dashboard *capability* powered by a robust configuration schema (`DashboardProvider.tsx`). It provides 10 standardized `Layouts` and 15 reusable `Primitives`, allowing rapid assembly of diverse command center interfaces without touching backend services.

## Core Tenets
- **Configuration-Driven:** Layout visibility and structural spans are controlled via the central `DashboardProvider`.
- **Graceful Degradation:** The frontend will never crash if the backend fails. Caching, retries, and offline banners ensure maximum data retention during outages.
- **Strict Architecture:** Adheres to a strict `Primitive -> Layout -> Grid` pattern.
- **Performance First:** Aggressive use of `React.lazy`, `<Suspense>`, and `useMemo` ensures lightning-fast renders.

## Features
- **10 Assembled Layouts:** Executive, Operations, Integrations, Evidence, Observability, etc.
- **Resilience:** Global Error Boundaries, Exponential API Backoff, and 8000ms timeouts.
- **Accessibility:** ARIA-live announcements for background updates and focus management.
- **Responsive:** Built on Tailwind CSS Grid, adapting elegantly from mobile to 4K displays.

## Stack
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS + shadcn/ui**
- **TanStack Query (React Query v5)**
- **Zustand**

## Getting Started
```bash
npm install
npm run dev
```

## Documentation Directory
Please refer to the `/docs` folder for deep-dive technical documentation:
1. `ARCHITECTURE.md` - Core structural paradigms.
2. `COMPONENT_LIBRARY.md` - Available primitives and usage.
3. `DASHBOARD_CAPABILITY.md` - How to configure the DashboardProvider.
4. `RUNTIME_INTEGRATION.md` - Control Plane API hook integration.
5. `INTEGRATION_GUIDE.md` - Connecting to the backend.
6. `DEPLOYMENT_GUIDE.md` - CI/CD and Production build steps.
7. `TESTING_GUIDE.md` - Quality assurance requirements.
8. `REVIEW_PACKET.md` - Executive review and sign-off criteria.
9. `CODE_PACKET.md` - Handover documentation.
