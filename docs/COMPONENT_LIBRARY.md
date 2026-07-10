# COMPONENT_LIBRARY.md

**Project:** SHAKTI Runtime Integration and Operational Command Center
**Owner:** Pratik Bhuwad
**Module:** Component Library Reference
**Version:** 1.0
**Last Updated:** 2025

---

## 1. Overview

This document is the component library reference for the SHAKTI Operational Command Center. It covers every reusable component, its props interface, usage patterns, styling conventions, and accessibility considerations.

All components are located in `src/components/` and are written in TypeScript with strict typing. No `any` types are used.

---

## 2. Component Catalog

| Component | File | Category | Reusable |
|---|---|---|---|
| `Header` | `layout/Header.tsx` | Layout | No (singleton) |
| `DashboardLayout` | `layouts/DashboardLayout.tsx` | Layout | Yes |
| `Skeleton` | `ui/skeleton.tsx` | UI Primitive | Yes |
| `ExecutiveSummary` | `dashboard/ExecutiveSummary.tsx` | Dashboard Zone | No |
| `MetricCard` | inside ExecutiveSummary | Sub-component | Yes |
| `KPICard` | inside ExecutiveSummary | Sub-component | Yes |
| `TrendBadge` | inside ExecutiveSummary | Sub-component | Yes |
| `NationalGridStatus` | `dashboard/NationalGridStatus.tsx` | Dashboard Zone | No |
| `RegionRow` | inside NationalGridStatus | Sub-component | Yes |
| `LiveAlertQueue` | `dashboard/LiveAlertQueue.tsx` | Dashboard Zone | No |
| `AlertRow` | inside LiveAlertQueue | Sub-component | Yes |
| `RiskHeatmap` | `dashboard/RiskHeatmap.tsx` | Dashboard Zone | No |
| `RiskRow` | inside RiskHeatmap | Sub-component | Yes |
| `ForecastPanel` | `dashboard/ForecastPanel.tsx` | Dashboard Zone | No |
| `IncidentQueue` | `dashboard/IncidentQueue.tsx` | Dashboard Zone | No |
| `IncidentRow` | inside IncidentQueue | Sub-component | Yes |
| `OperationalTimeline` | `dashboard/OperationalTimeline.tsx` | Dashboard Zone | No |
| `EventRow` | inside OperationalTimeline | Sub-component | Yes |
| `SystemHealth` | `dashboard/SystemHealth.tsx` | Dashboard Zone | No |
| `ServiceRow` | inside SystemHealth | Sub-component | Yes |
| `ReplayStatus` | `dashboard/ReplayStatus.tsx` | Dashboard Zone | No |
| `ReplayRow` | inside ReplayStatus | Sub-component | Yes |
| `EvidencePanel` | `dashboard/EvidencePanel.tsx` | Dashboard Zone | No |
| `EvidenceRow` | inside EvidencePanel | Sub-component | Yes |
| `ConfidenceBar` | inside EvidencePanel | Sub-component | Yes |

---

## 3. UI Primitive Components

### Skeleton

**File:** `src/components/ui/skeleton.tsx`

**Purpose:** Animated loading placeholder that matches the shape of the content it replaces.

**Props:**
```typescript
interface SkeletonProps extends React.ComponentProps<"div"> {
  className?: string;
}
```

**Base styles:** `animate-pulse rounded-md bg-slate-700/50`

**Usage examples:**

```tsx
// Single row placeholder
<Skeleton className="h-7 rounded" />

// Card placeholder
<Skeleton className="h-20 rounded-lg" />

// Chart placeholder
<Skeleton className="h-36 rounded" />

// Grid of placeholders
{Array.from({ length: 4 }).map((_, i) => (
  <Skeleton key={i} className="h-14 rounded-lg bg-slate-700/50" />
))}
```

**Accessibility:** Skeleton elements are purely visual. They do not require ARIA attributes. The parent zone component carries the `aria-label` for the section.

---

## 4. Layout Components

### DashboardLayout

**File:** `src/layouts/DashboardLayout.tsx`

**Purpose:** Root layout wrapper. Provides the dark background, full-height flex column, and scrollable main content area.

**Props:**
```typescript
interface DashboardLayoutProps {
  children: ReactNode;
}
```

**Usage:**
```tsx
<DashboardLayout>
  <YourPageContent />
</DashboardLayout>
```

**Rendered structure:**
```html
<div class="min-h-screen bg-slate-950 flex flex-col text-slate-100">
  <Header />
  <main class="flex-1 overflow-auto p-3">
    {children}
  </main>
</div>
```

---

### Header

**File:** `src/components/layout/Header.tsx`

**Purpose:** Application top bar. Displays branding, live clock, LIVE status indicator, notification bell, and user identity.

**Props:** None

**Internal state:**
```typescript
const [time, setTime] = useState(new Date());
// Updated every 1000ms via setInterval
```

**Sections:**
- Left: Zap icon + "SHAKTI" wordmark + "Operational Command Center" subtitle
- Right: LIVE pulse indicator, live clock (HH:MM:SS), date, notification bell with red dot, user avatar + role

**Accessibility:**
- Notification bell has `aria-label="Notifications"`
- LIVE indicator uses semantic color (emerald) with text label — not color alone

---

## 5. Dashboard Zone Components

All zone components follow the same structural contract:

```tsx
<section aria-label="[Zone Name]" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
  <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">[Zone Title]</h2>
  {isLoading && <LoadingState />}
  {isError && <ErrorState />}
  {data && <DataState />}
</section>
```

### ExecutiveSummary

**Props:** None

**Renders:**
- Row 1: 4× `MetricCard` — Active Incidents, Grid Availability, Critical Alerts, System Health
- Row 2: 4× `KPICard` — Total Load, Renewable Mix, Grid Frequency, Transmission Loss

**MetricCard variants by status:**

| Status | Icon Color |
|---|---|
| online | `text-emerald-400` |
| warning | `text-yellow-400` |
| degraded | `text-orange-400` |
| offline | `text-red-400` |

**TrendBadge variants:**

| Trend | Icon | Color |
|---|---|---|
| up | TrendingUp | emerald (positive) or red (inverse) |
| down | TrendingDown | red (positive) or emerald (inverse) |
| stable | Minus | slate-400 |

---

### NationalGridStatus

**Props:** None

**RegionRow props:**
```typescript
{ region: GridRegion }
```

**Load bar color thresholds:**

| Load % | Bar Color |
|---|---|
| < 75% | `bg-emerald-500` |
| 75–90% | `bg-yellow-500` |
| > 90% | `bg-red-500` |

**Header action:** Refresh button with spinning animation during `isFetching`.

---

### LiveAlertQueue

**Props:** None

**AlertRow props:**
```typescript
{ alert: Alert }
```

**Severity icon mapping:**

| Severity | Icon |
|---|---|
| critical | AlertTriangle |
| high | AlertCircle |
| medium | AlertCircle |
| low | Info |
| info | Info |

**Acknowledged state:** Row rendered at `opacity-50` with `CheckCircle` icon.

**Unacknowledged badge:** Shown in header when `unacked > 0` — `bg-red-500/20 text-red-400 border-red-500/30`.

---

### RiskHeatmap

**Props:** None

**RiskRow props:**
```typescript
{ risk: RiskScore }
```

Data is sorted by `score` descending before rendering — highest risk regions appear first.

**Bar color mapping:**

| Risk Level | Bar Color |
|---|---|
| critical | `bg-red-500` |
| high | `bg-orange-500` |
| medium | `bg-yellow-500` |
| low | `bg-emerald-500` |

---

### ForecastPanel

**Props:** None

**Chart configuration:**
- Type: `AreaChart` (Recharts)
- Series: `Demand` (indigo `#6366f1`), `Renewable` (emerald `#10b981`)
- Both series use gradient fills (`linearGradient` defs)
- Custom tooltip renders in `bg-slate-900 border-slate-700`
- X-axis: time labels every 2 data points
- Y-axis: auto-scaled, no axis line

**Bundle note:** This component is lazy-loaded. It will not appear in the main JS bundle.

---

### IncidentQueue

**Props:** None

**IncidentRow props:**
```typescript
{ incident: Incident }
```

**Status color mapping:**

| Status | Color |
|---|---|
| open | `text-red-400` |
| investigating | `text-yellow-400` |
| resolved | `text-emerald-400` |
| closed | `text-slate-500` |

Each row uses `severityBg()` for the border and background, providing immediate visual severity identification.

---

### OperationalTimeline

**Props:** None

**EventRow props:**
```typescript
{ event: TimelineEvent }
```

**Category icon and color mapping:**

| Category | Icon | Color |
|---|---|---|
| system | Cpu | `text-blue-400 bg-blue-500/10` |
| operator | User | `text-slate-400 bg-slate-500/10` |
| alert | AlertCircle | `text-orange-400 bg-orange-500/10` |
| incident | FileText | `text-red-400 bg-red-500/10` |

---

### SystemHealth

**Props:** None

**ServiceRow props:**
```typescript
{ svc: ServiceHealth }
```

Columns: Service name, Latency (ms), Uptime (%), Status label.

Overall health score bar: `bg-emerald-500` fill, width = `overallScore%`.

---

### ReplayStatus

**Props:** None

**ReplayRow props:**
```typescript
{ job: ReplayJob }
```

**State configuration:**

| State | Icon | Color | Bar |
|---|---|---|---|
| running | Play | `text-blue-400` | `bg-blue-500` |
| completed | CheckCircle | `text-emerald-400` | `bg-emerald-500` |
| paused | Pause | `text-yellow-400` | `bg-yellow-500` |
| failed | XCircle | `text-red-400` | `bg-red-500` |
| idle | Clock | `text-slate-400` | `bg-slate-500` |

---

### EvidencePanel

**Props:** None

**EvidenceRow props:**
```typescript
{ ev: Evidence }
```

**ConfidenceBar thresholds:**

| Confidence | Bar Color |
|---|---|
| ≥ 90% | `bg-emerald-500` |
| 70–89% | `bg-yellow-500` |
| < 70% | `bg-red-500` |

**Evidence type icon mapping:**

| Type | Icon |
|---|---|
| sensor | Cpu |
| log | FileText |
| operator | User |
| model | BarChart2 |
| external | Globe |

Renders in a 2-column grid on `md:` and above.

---

## 6. Styling Conventions

### Zone Card Base

```
bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2
```

### Zone Header

```
text-xs font-semibold text-slate-300 uppercase tracking-wide
```

### Data Labels

```
text-xs text-slate-500 uppercase tracking-wide
```

### Primary Values

```
text-sm font-bold text-slate-200
```

### Muted / Timestamp Text

```
text-xs text-slate-600
```

### Error State

```tsx
<div className="flex flex-col items-center justify-center py-6 gap-2">
  <p className="text-xs text-red-400">Failed to load [zone name]</p>
  <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">
    Retry
  </button>
</div>
```

### Empty State

```tsx
<p className="text-xs text-slate-500 text-center py-4">No active [items]</p>
```

---

## 7. Accessibility Considerations

| Element | Implementation |
|---|---|
| Zone sections | `<section aria-label="[Zone Name]">` on every dashboard zone |
| Zone headings | `<h2>` for zone titles — maintains document outline |
| Notification button | `aria-label="Notifications"` |
| Refresh button | `aria-label="Refresh [zone name]"` |
| Status indicators | Color is always accompanied by a text label — never color alone |
| Severity | Text label always present alongside color coding |
| Loading state | Skeleton elements are visual only — no ARIA required |
| Interactive elements | All buttons use native `<button>` elements for keyboard accessibility |

---

## 8. Reusability Guidelines

- **Zone components** are not reusable — they are tightly coupled to a specific API endpoint and dashboard position.
- **Sub-components** (`RegionRow`, `AlertRow`, `IncidentRow`, etc.) are reusable within their domain. They accept typed props and have no side effects.
- **`Skeleton`** is fully reusable — pass any `className` to control size and shape.
- **`DashboardLayout`** is reusable for any future page that requires the same header + dark background structure.
- **Utility functions** in `src/utils/format.ts` are pure and reusable anywhere in the application.
- **Color functions** (`severityColor`, `statusColor`, etc.) must be the single source of truth — never hardcode color classes in components.
