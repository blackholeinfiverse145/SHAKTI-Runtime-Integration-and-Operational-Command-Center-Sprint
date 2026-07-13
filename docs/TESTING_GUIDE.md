# Testing Guide

## Philosophy
We do not test React internal states. We test UI rendering, error boundaries, and integration resilience.

## 1. Component Testing
Primitives should be tested using Storybook or Vitest + React Testing Library to ensure they render correctly based on props.
- Do they support dark mode?
- Does the `StatusCard` render a red dot when `status="critical"`?

## 2. Resilience Testing (Chaos Engineering)
Because the SHAKTI Dashboard is built for high-stakes environments, you must test failure modes.

### Test 1: API Timeout
1. Start the UI.
2. In Chrome DevTools > Network tab, throttle the network to "Slow 3G" or intentionally block requests to the `/dashboard/*` endpoints.
3. **Expected Result:** The global Axios 8000ms timeout should trigger. The `<DashboardCard>` wrappers should display the red "Failed to load data" error state, but the app should not crash.

### Test 2: Mid-Session Outage
1. Let the dashboard load successfully.
2. Disconnect your internet (or toggle Offline in DevTools).
3. **Expected Result:** The `useNetworkState` hook triggers. A red "Offline Mode" banner drops from the top. The layouts do NOT blank out; they continue showing the last cached data with a yellow "Using cached data" warning on each card.

### Test 3: Zone Crash
1. Hardcode a `throw new Error()` inside `WorkflowLayout.tsx`.
2. **Expected Result:** Only the Workflow zone should crash, displaying the localized ErrorBoundary fallback. The Executive and Operations zones should continue updating normally.
