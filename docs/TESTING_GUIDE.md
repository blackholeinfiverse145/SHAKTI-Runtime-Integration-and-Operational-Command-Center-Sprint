# TESTING_GUIDE.md

**Project:** SHAKTI Runtime Integration and Operational Command Center
**Owner:** Pratik Bhuwad
**Module:** Testing Guide
**Version:** 1.0
**Last Updated:** 2025

---

## 1. Testing Strategy

The SHAKTI Operational Command Center testing strategy covers four layers:

| Layer | Scope | Tools |
|---|---|---|
| Unit | Utility functions, type guards | Vitest |
| Component | Individual zone components in isolation | Vitest + React Testing Library |
| Integration | Full dashboard with mocked API responses | Vitest + MSW (Mock Service Worker) |
| Manual | Visual, responsive, dark mode, failure scenarios | Browser DevTools |

The current implementation is production-ready for manual testing. Automated test scaffolding follows the patterns described in this document.

---

## 2. Unit Testing — Utility Functions

All functions in `src/utils/format.ts` are pure functions with no side effects and are straightforward to unit test.

### Test file location
```
src/utils/format.test.ts
```

### Test cases

```typescript
import { describe, it, expect } from "vitest";
import {
  formatRelativeTime,
  formatTime,
  severityColor,
  severityBg,
  statusColor,
  statusDot,
  trendIcon,
  trendColor,
  clamp,
} from "./format";

describe("formatRelativeTime", () => {
  it("returns 'just now' for timestamps less than 1 minute ago", () => {
    const iso = new Date(Date.now() - 30000).toISOString();
    expect(formatRelativeTime(iso)).toBe("just now");
  });

  it("returns minutes for timestamps less than 1 hour ago", () => {
    const iso = new Date(Date.now() - 300000).toISOString();
    expect(formatRelativeTime(iso)).toBe("5m ago");
  });

  it("returns hours for timestamps less than 24 hours ago", () => {
    const iso = new Date(Date.now() - 7200000).toISOString();
    expect(formatRelativeTime(iso)).toBe("2h ago");
  });
});

describe("severityColor", () => {
  it("returns red for critical", () => {
    expect(severityColor("critical")).toBe("text-red-400");
  });
  it("returns orange for high", () => {
    expect(severityColor("high")).toBe("text-orange-400");
  });
});

describe("trendColor", () => {
  it("returns emerald for up trend (positive)", () => {
    expect(trendColor("up")).toBe("text-emerald-400");
  });
  it("returns red for up trend (inverse)", () => {
    expect(trendColor("up", true)).toBe("text-red-400");
  });
  it("returns slate for stable", () => {
    expect(trendColor("stable")).toBe("text-slate-400");
  });
});

describe("clamp", () => {
  it("clamps value to minimum", () => {
    expect(clamp(-5, 0, 100)).toBe(0);
  });
  it("clamps value to maximum", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });
  it("returns value when within range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });
});
```

---

## 3. Component Testing

### Test file location
```
src/components/dashboard/__tests__/
```

### Testing pattern

Each zone component should be tested with three scenarios: loading, success, and error.

```typescript
// Example: LiveAlertQueue.test.tsx
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import LiveAlertQueue from "../LiveAlertQueue";
import * as api from "@/services/api";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
    {children}
  </QueryClientProvider>
);

describe("LiveAlertQueue", () => {
  it("renders loading skeletons on initial load", () => {
    vi.spyOn(api, "fetchAlerts").mockReturnValue(new Promise(() => {})); // never resolves
    render(<LiveAlertQueue />, { wrapper });
    expect(document.querySelectorAll("[data-slot='skeleton']").length).toBeGreaterThan(0);
  });

  it("renders alert messages when data loads", async () => {
    vi.spyOn(api, "fetchAlerts").mockResolvedValue([
      { id: "a1", severity: "critical", message: "Test alert", timestamp: new Date().toISOString(),
        source: "SCADA", region: "North", acknowledged: false },
    ]);
    render(<LiveAlertQueue />, { wrapper });
    expect(await screen.findByText("Test alert")).toBeInTheDocument();
  });

  it("renders error state and retry button on failure", async () => {
    vi.spyOn(api, "fetchAlerts").mockRejectedValue(new Error("Network error"));
    render(<LiveAlertQueue />, { wrapper });
    expect(await screen.findByText("Failed to load alerts")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();
  });

  it("renders empty state when no alerts exist", async () => {
    vi.spyOn(api, "fetchAlerts").mockResolvedValue([]);
    render(<LiveAlertQueue />, { wrapper });
    expect(await screen.findByText("No active alerts")).toBeInTheDocument();
  });
});
```

### Components requiring empty state tests

| Component | Empty State Text |
|---|---|
| `LiveAlertQueue` | "No active alerts" |
| `IncidentQueue` | "No active incidents" |
| `ReplayStatus` | "No replay jobs" |

---

## 4. Integration Testing

Integration tests render the full `Dashboard` page with all zones and verify that the complete data flow works end-to-end.

### Recommended tool: MSW (Mock Service Worker)

```typescript
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/alerts", () => HttpResponse.json([
    { id: "a1", severity: "critical", message: "Integration test alert",
      timestamp: new Date().toISOString(), source: "TEST", region: "North", acknowledged: false },
  ])),
  http.get("/api/grid-status", () => HttpResponse.json({
    overallStatus: "online", totalLoad: 140, totalCapacity: 165,
    frequency: 50.0, regions: [], lastUpdated: new Date().toISOString(),
  })),
  // ... handlers for all 11 endpoints
];
```

### Integration test

```typescript
// src/pages/Dashboard.test.tsx
import { render, screen } from "@testing-library/react";
import { server } from "@/mocks/server";
import Dashboard from "./Dashboard";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders all dashboard zone headings", async () => {
  render(<Dashboard />);
  expect(await screen.findByText(/national grid status/i)).toBeInTheDocument();
  expect(await screen.findByText(/live alerts/i)).toBeInTheDocument();
  expect(await screen.findByText(/risk heatmap/i)).toBeInTheDocument();
  expect(await screen.findByText(/forecast/i)).toBeInTheDocument();
  expect(await screen.findByText(/incident queue/i)).toBeInTheDocument();
});
```

---

## 5. Responsive Testing

Test the dashboard at the following viewport widths using browser DevTools (F12 → Device Toolbar):

| Viewport | Expected Layout |
|---|---|
| 1440 × 900 | Full desktop layout — all zones in designed column spans |
| 1280 × 800 | Desktop layout — verify no horizontal overflow |
| 1024 × 768 | Desktop breakpoint — lg: classes activate |
| 768 × 1024 | Tablet — md: classes activate, zones pair into 2 columns |
| 375 × 812 | Mobile — all zones stack to single column |
| 320 × 568 | Minimum mobile — verify no content clipping |

### Checklist

- [ ] No horizontal scrollbar at any breakpoint
- [ ] Executive Summary shows 4 columns on desktop, 2 on mobile
- [ ] National Grid Status and Alert Queue are side-by-side on desktop, stacked on mobile
- [ ] Risk Heatmap and Forecast Panel are side-by-side on tablet and above
- [ ] Evidence Panel spans full width at all breakpoints
- [ ] Header remains readable at all widths (subtitle hides on small screens)
- [ ] Scrollable zones (alerts, incidents, timeline) scroll correctly within their containers

---

## 6. Dark Mode Testing

The application is dark-mode only. Verify the following:

- [ ] Page background is `#020817` (slate-950) — no white flash on load
- [ ] All card surfaces are `slate-800/60` — no pure white or light backgrounds
- [ ] All text is readable against dark backgrounds (minimum contrast ratio 4.5:1 for body text)
- [ ] Critical alerts (red) are visible against dark card backgrounds
- [ ] Emerald (online/positive) indicators are clearly distinguishable from yellow (warning)
- [ ] Skeleton loaders use `slate-700/50` — visible against `slate-800/60` cards
- [ ] Chart tooltip uses `bg-slate-900 border-slate-700` — readable on dark background
- [ ] Custom scrollbars are visible (`#334155` thumb on transparent track)

---

## 7. API Testing

### Testing with mock data (default)

No configuration required. Run `npm run dev` and all zones populate with mock data.

Verify:
- [ ] All 10 zones render data within 1 second of page load
- [ ] Loading skeletons appear briefly before data renders
- [ ] No console errors on initial load

### Testing with a live backend

Set `VITE_API_BASE_URL` in `.env`:

```env
VITE_API_BASE_URL=https://your-api-server.example.com
```

Verify:
- [ ] All 11 API calls appear in the Network tab
- [ ] Responses match the TypeScript interfaces in `src/types/api.ts`
- [ ] Data renders correctly in all zones
- [ ] Background refetches appear in the Network tab at the configured intervals

### Testing API response validation

The TypeScript compiler validates response shapes at build time. At runtime, verify that:
- [ ] `timestamp` fields are valid ISO 8601 strings
- [ ] `severity` values are one of: `critical`, `high`, `medium`, `low`, `info`
- [ ] `status` values are one of: `online`, `offline`, `warning`, `degraded`
- [ ] Numeric fields (`load`, `capacity`, `frequency`, `confidence`) are numbers, not strings

---

## 8. Failure Scenario Testing

### Simulate API failure in browser DevTools

1. Open DevTools → Network tab
2. Right-click a request → Block request URL
3. Wait for the next refetch interval
4. Verify the affected zone shows the error state with a Retry button

### Failure scenarios to test

| Scenario | Expected Behavior |
|---|---|
| Single endpoint fails | Only the affected zone shows error state; all other zones continue normally |
| All endpoints fail | All zones show independent error states; header and layout remain intact |
| Slow network (3G throttle) | Skeleton loaders remain visible until data arrives |
| Request timeout (>10s) | Zone enters error state after 10s timeout |
| User clicks Retry | Zone immediately re-fetches and either shows data or error |
| Backend returns empty array | Zone shows empty state message (not error state) |
| Backend returns malformed JSON | Zone enters error state |

### Simulating slow network

In DevTools → Network → Throttling → Slow 3G:
- [ ] All zones show skeleton loaders simultaneously
- [ ] Zones populate progressively as responses arrive
- [ ] No zone blocks another zone from loading

---

## 9. Loading State Testing

For each zone, verify:

- [ ] Skeleton placeholders match the approximate shape of the loaded content
- [ ] Skeleton count matches the expected number of items (e.g., 5 skeletons for 5 regions)
- [ ] Skeletons animate with `animate-pulse`
- [ ] No layout shift when data replaces skeletons
- [ ] Background refetches do not show skeletons (data remains visible)

---

## 10. Manual Testing Checklist

### Pre-test setup
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:5173` in Chrome or Firefox
- [ ] Open DevTools Console — verify zero errors on load

### Header
- [ ] SHAKTI branding visible
- [ ] Live clock updates every second
- [ ] LIVE indicator pulses
- [ ] Notification bell visible with red dot
- [ ] User identity visible

### Executive Summary
- [ ] 4 metric cards render with values, units, and trend indicators
- [ ] 4 KPI cards render with values and trend arrows
- [ ] Trend colors: emerald for positive, red for negative, slate for stable

### National Grid Status
- [ ] 5 regions render with load bars
- [ ] Load bar colors reflect load percentage (green/yellow/red)
- [ ] Status dots match region status colors
- [ ] Total load, frequency, and overall status display correctly
- [ ] Refresh button spins during refetch

### Live Alert Queue
- [ ] Alerts render with severity-appropriate border colors
- [ ] Unacknowledged count badge appears in header
- [ ] Acknowledged alerts appear dimmed with checkmark
- [ ] Relative timestamps display correctly ("2m ago", "8m ago")

### Risk Heatmap
- [ ] Regions sorted by risk score (highest first)
- [ ] Bar colors match risk level (red/orange/yellow/green)
- [ ] Risk factors display below each bar

### Forecast Panel
- [ ] Area chart renders with two series (Demand, Renewable)
- [ ] Chart tooltip appears on hover
- [ ] Peak demand and peak time display correctly
- [ ] Confidence percentage displays correctly
- [ ] Legend shows Demand and Renewable labels

### Incident Queue
- [ ] Incidents render with severity-coded borders
- [ ] Status labels use correct colors (red/yellow/green/slate)
- [ ] Incident IDs display in monospace font
- [ ] Assigned operator and location display correctly

### Operational Timeline
- [ ] Events render in chronological order (most recent first)
- [ ] Category icons display correctly (Cpu/User/AlertCircle/FileText)
- [ ] Category background colors match category type
- [ ] Severity labels appear for alert and incident events

### System Health
- [ ] Overall health score bar fills correctly
- [ ] 6 services render with latency, uptime, and status
- [ ] Status dots match service status colors
- [ ] Last checked timestamp displays correctly

### Replay Status
- [ ] Progress bars fill to correct percentage
- [ ] State icons match job state (Play/CheckCircle/Pause/XCircle/Clock)
- [ ] Event counts display correctly (processed / total)
- [ ] Duration and start time display correctly

### Evidence Panel
- [ ] Evidence records render in 2-column grid on desktop
- [ ] Confidence bars fill to correct percentage
- [ ] Confidence bar colors reflect confidence level (green/yellow/red)
- [ ] Evidence type icons display correctly
- [ ] Related incident IDs display in monospace font

### Responsive
- [ ] Resize to 768px — zones pair into 2-column layout
- [ ] Resize to 375px — all zones stack to single column
- [ ] No horizontal overflow at any width
