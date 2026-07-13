# Architecture

## 1. System Topology
The SHAKTI Executive Dashboard is a standalone Frontend Single Page Application (SPA) built on React 19. It acts as a passive consumer of the external Control Plane API.

## 2. The Golden Rule of Architecture
**"Primitive -> Layout -> Dashboard Grid"**
We do not build monolithic zone components. We assemble decoupled layers.

### Layer 1: Primitives (`src/components/dashboard/primitives/`)
Dumb, stateless presentation components. They know nothing about APIs or layouts.
*Example: `ExecutiveMetricCard.tsx`, `StatusCard.tsx`*

### Layer 2: Reusable Wrappers (`src/components/dashboard/DashboardCard.tsx`)
A standardized container that provides uniform padding, titles, Error Boundaries, loading skeletons, and graceful degradation (stale data warnings). All layouts MUST wrap their content in a `DashboardCard`.

### Layer 3: Layouts (`src/components/dashboard/layouts/`)
Smart components that integrate React Query hooks. They fetch data, use `useMemo` to map data into Primitive props, and render the Primitives inside a `DashboardCard`.
*Example: `ExecutiveLayout.tsx` calls `useExecutiveDashboard()`*

### Layer 4: The Grid (`src/pages/Dashboard.tsx`)
The root orchestrator. It uses `React.lazy` and `Suspense` to code-split the Layouts. It consumes the `DashboardProvider` configuration to decide which layouts to render and what CSS grid span to apply.

## 3. Resilience Architecture
- **Error Boundaries:** Every single Layout inside the Grid is wrapped in a discrete `<ErrorBoundary>`. If `WorkflowLayout` crashes due to malformed API data, only that zone crashes. The rest of the dashboard remains operational.
- **Graceful Degradation:** React Query is configured globally with `placeholderData: keepPreviousData`. If a query fails in the background (e.g. backend goes offline), the UI does not blank out. It retains the cached data and `DashboardCard` displays an offline warning.
- **Timeouts & Backoff:** Axios enforces an 8000ms timeout. React Query utilizes exponential backoff for up to 3 retries.

## 4. Performance Optimizations
- **Code Splitting:** All 10 Layouts are lazy-loaded.
- **Memoization:** Expensive data mapping inside Layouts is wrapped in `useMemo` strictly tied to data dependencies.
- **Observability:** Custom `logger.ts` and `performance.ts` intercept critical path metrics.
