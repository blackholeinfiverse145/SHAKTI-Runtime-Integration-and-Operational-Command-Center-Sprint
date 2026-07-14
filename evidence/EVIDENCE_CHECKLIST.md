# SHAKTI Command Center — Evidence Checklist

> **Instructions:** Capture each screenshot listed below and save it in this `evidence/` folder using the exact filename specified. Use Chrome DevTools device toolbar to set viewport dimensions where indicated. All screenshots should be in PNG format.

---

## 1. Dashboard Startup

| Field | Value |
|---|---|
| **Filename** | `01_dashboard_startup.png` |
| **Navigate to** | `http://localhost:5173` — perform a hard refresh (Ctrl+Shift+R) |
| **How to trigger** | Clear browser cache, then reload. Capture within the first 1–2 seconds before data loads. |
| **Caption** | SHAKTI dashboard cold start — skeleton loading placeholders visible across all zones before live API data arrives. |
| **Mandatory** | ✅ Yes |

---

## 2. Executive Overview

| Field | Value |
|---|---|
| **Filename** | `02_executive_overview.png` |
| **Navigate to** | `http://localhost:5173` — wait for all zones to populate with live data |
| **How to trigger** | No special trigger. Ensure backend is running. Set viewport to exactly 1920×1080 via DevTools device toolbar. Capture the full page without scrolling. |
| **Caption** | Full executive overview at 1920×1080 — all 10 dashboard zones visible with live operational data. |
| **Mandatory** | ✅ Yes |

---

## 3. Executive Summary KPI Row

| Field | Value |
|---|---|
| **Filename** | `03_executive_kpis.png` |
| **Navigate to** | `http://localhost:5173` — focus on the top KPI row (Row 1) |
| **How to trigger** | No special trigger. Zoom or crop to the Executive Summary row showing all KPI cards. |
| **Caption** | Executive Summary KPI cards — 30px metric values with trend indicators, 12.5px labels, and secondary unit suffixes. |
| **Mandatory** | ✅ Yes |

---

## 4. Operations & Compute

| Field | Value |
|---|---|
| **Filename** | `04_operations_compute.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 2, left column |
| **How to trigger** | No special trigger. Capture the Operations & Compute card showing API health tiles and the "Active Operations" list with "+N more" indicator. |
| **Caption** | Operations & Compute zone — API health cards with uptime/latency and active operations limited to top 4 with overflow indicator. |
| **Mandatory** | ✅ Yes |

---

## 5. Integrations & Alerts

| Field | Value |
|---|---|
| **Filename** | `05_integrations_alerts.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 2, right column |
| **How to trigger** | No special trigger. Capture the integration tile grid and "Live Alert Feed" section below it. |
| **Caption** | Integrations & Alerts — 3-column integration tile grid with connection status and live alert feed with severity-coded entries. |
| **Mandatory** | ✅ Yes |

---

## 6. Decision Intelligence

| Field | Value |
|---|---|
| **Filename** | `06_decision_intelligence.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 3, left column |
| **How to trigger** | No special trigger. Capture the Decision Intelligence card showing capability cards and the "Recent Decisions" section. |
| **Caption** | Decision Intelligence — capability engagement indicators and latest autonomous decision with execution status badge. |
| **Mandatory** | ✅ Yes |

---

## 7. Observability & Live Telemetry

| Field | Value |
|---|---|
| **Filename** | `07_live_telemetry.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 3, right column |
| **How to trigger** | Hover over a data point on the area chart to make the tooltip visible before capturing. |
| **Caption** | Observability & Telemetry — Recharts area chart with gradient fills, 11px axis labels, summary metrics, and hover tooltip at 12.5px. |
| **Mandatory** | ✅ Yes |

---

## 8. Active Workflows

| Field | Value |
|---|---|
| **Filename** | `08_workflow_monitoring.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 4, left column |
| **How to trigger** | No special trigger. Capture showing the default 8 visible workflow rows. Ensure the "View All (10)" link is visible at the bottom. |
| **Caption** | Active Workflows table — 8 visible rows with ID, workflow name, active step, owner, 4-step pipeline dots, and priority badges. |
| **Mandatory** | ✅ Yes |

---

## 9. Workflow View All Expanded

| Field | Value |
|---|---|
| **Filename** | `09_workflow_view_all.png` |
| **Navigate to** | `http://localhost:5173` — Active Workflows card |
| **How to trigger** | Click the "View All (10)" link at the bottom of the Active Workflows table. Capture after the table expands to show all rows. The link should now read "Show Less". |
| **Caption** | Active Workflows expanded — all 10 workflow rows visible after clicking View All, with "Show Less" toggle. |
| **Mandatory** | ✅ Yes |

---

## 10. Operator Console & Timeline

| Field | Value |
|---|---|
| **Filename** | `10_operator_timeline.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 4, right column |
| **How to trigger** | No special trigger. Capture the Operator Console showing 2 agent cards at the top and the Activity Log timeline below. |
| **Caption** | Operator Console — agent status cards with role/task badges and activity timeline feed with 8 blended events. |
| **Mandatory** | ✅ Yes |

---

## 11. Runtime Health

| Field | Value |
|---|---|
| **Filename** | `11_runtime_health.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 5, left column |
| **How to trigger** | No special trigger. Capture the Runtime Health card showing the health progress bar, 4-column KPI strip, and 6 visible component rows with "View All" link. |
| **Caption** | Runtime Health — health score progress bar, summary KPIs (uptime/errors/latency/RPM), and 6 component statuses with View All toggle. |
| **Mandatory** | ✅ Yes |

---

## 12. Simulation & Replay

| Field | Value |
|---|---|
| **Filename** | `12_replay_view.png` |
| **Navigate to** | `http://localhost:5173` — focus on Row 5, right column |
| **How to trigger** | No special trigger. Capture the Simulation & Replay card showing 6 session rows with progress bars and "View All" link. |
| **Caption** | Simulation & Replay — 6 active sessions with status icons, operation names, progress bars, event counts, and View All toggle. |
| **Mandatory** | ✅ Yes |

---

## 13. Evidence & Intelligence

| Field | Value |
|---|---|
| **Filename** | `13_evidence_intelligence.png` |
| **Navigate to** | `http://localhost:5173` — scroll to Row 6 (bottom of page) |
| **How to trigger** | No special trigger. Capture the full-width Evidence & Intelligence section. |
| **Caption** | Evidence & Intelligence — full-width evidence cards with category icons, confidence scores, and operational intelligence data. |
| **Mandatory** | ✅ Yes |

---

## 14. Desktop 1920×1080

| Field | Value |
|---|---|
| **Filename** | `14_desktop_1920x1080.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Set DevTools device toolbar to exactly 1920×1080. Capture the full viewport. This should show ~90–95% of the dashboard without scrolling. |
| **Caption** | Desktop viewport at 1920×1080 — primary target resolution showing the full executive dashboard layout. |
| **Mandatory** | ✅ Yes |

---

## 15. Tablet 768×1024

| Field | Value |
|---|---|
| **Filename** | `15_tablet_768x1024.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Set DevTools device toolbar to 768×1024 (iPad portrait). Capture the visible viewport. |
| **Caption** | Tablet viewport at 768×1024 — zones reflow to stacked layout, integration tiles in 2-column grid. |
| **Mandatory** | ✅ Yes |

---

## 16. Mobile 375×667

| Field | Value |
|---|---|
| **Filename** | `16_mobile_375x667.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Set DevTools device toolbar to 375×667 (iPhone SE). Capture the visible viewport. |
| **Caption** | Mobile viewport at 375×667 — all zones stack to single column, header elements collapse, no horizontal overflow. |
| **Mandatory** | ✅ Yes |

---

## 17. Loading State

| Field | Value |
|---|---|
| **Filename** | `17_loading_state.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Open DevTools → Network tab → set throttling to "Offline". Hard-refresh the page (Ctrl+Shift+R). Quickly switch throttling back to "Online". Capture during the brief window when skeleton placeholders are visible but data has not yet arrived. Alternative: block `/dashboard/*` requests, reload, and capture any card showing skeletons. |
| **Caption** | Loading state — DashboardCard skeleton placeholders displayed while API data is in transit. |
| **Mandatory** | ✅ Yes |

---

## 18. Empty State

| Field | Value |
|---|---|
| **Filename** | `18_empty_state.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Temporarily modify the backend to return an empty array for one endpoint (e.g., `/dashboard/operations` returns `{ "operations": [], "active_operations": 0 }`). Reload the dashboard. Capture the affected card showing its empty state message (e.g., "No active workflows"). |
| **Caption** | Empty state — informational message displayed inside a card when the backend returns zero items for that zone. |
| **Mandatory** | ✅ Yes |

---

## 19. Error State & Recovery

| Field | Value |
|---|---|
| **Filename** | `19_error_recovery.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Open DevTools → Network tab → right-click any `/dashboard/*` request → "Block request URL". Wait for the next refetch cycle (5–15 seconds). Capture when the affected card shows the red error panel with the "Retry" button. Other zones should remain functional. |
| **Caption** | Error state — red "Failed to load data" panel with Retry button; unaffected zones continue displaying live data. |
| **Mandatory** | ✅ Yes |

---

## 20. Offline Banner

| Field | Value |
|---|---|
| **Filename** | `20_offline_banner.png` |
| **Navigate to** | `http://localhost:5173` — let data load first |
| **How to trigger** | Open DevTools → Network tab → check "Offline" checkbox. Wait 1–2 seconds for the `useNetworkState` hook to detect the change. Capture showing the red "System Offline" banner at the top of the page with the WifiOff icon. |
| **Caption** | Offline detection — red banner with animated WifiOff icon, dashboard retains last cached data below. |
| **Mandatory** | ✅ Yes |

---

## 21. Zone Crash & ErrorBoundary

| Field | Value |
|---|---|
| **Filename** | `21_zone_crash.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | Temporarily add `throw new Error("Test crash")` as the first line inside the `WorkflowLayout` render function. Reload the page. Capture showing the ErrorBoundary fallback ("Zone Crashed" + "Reload Zone" button) in the Workflow zone while all other zones render normally. **Revert the change after capturing.** |
| **Caption** | Zone-isolated crash — ErrorBoundary contains the failure to one zone; "Reload Zone" button enables recovery without full page refresh. |
| **Mandatory** | ✅ Yes |

---

## 22. API Success (DevTools)

| Field | Value |
|---|---|
| **Filename** | `22_api_success.png` |
| **Navigate to** | `http://localhost:5173` — open DevTools → Network tab |
| **How to trigger** | Filter the Network tab by "XHR". Wait for at least one full polling cycle (~15 seconds) so all 8 endpoints have fired. Capture the Network tab showing 200 OK responses for `/health`, `/system/status`, `/metrics`, `/dashboard/executive`, `/dashboard/operations`, `/dashboard/alerts`, `/dashboard/runtime`, and `/dashboard/telemetry`. |
| **Caption** | API integration — Chrome DevTools Network tab showing successful 200 responses from all 8 SHAKTI backend endpoints. |
| **Mandatory** | ✅ Yes |

---

## 23. Authentication Surface

| Field | Value |
|---|---|
| **Filename** | `23_authentication.png` |
| **Navigate to** | `http://localhost:5173` — focus on the header, top-right area |
| **How to trigger** | No special trigger. Capture the user avatar badge, operator name, and role label in the header. |
| **Caption** | Authentication surface — operator identity badge in header; useAuth and useAuthorization hooks are structurally ready for provider integration. |
| **Mandatory** | ⚠️ Applicable only — no login gate exists; capture the user menu UI as evidence of auth hook readiness |

---

## 24. Dark Theme (Default)

| Field | Value |
|---|---|
| **Filename** | `24_dark_theme.png` |
| **Navigate to** | `http://localhost:5173` |
| **How to trigger** | No special trigger. The dashboard uses dark theme (slate-950 background) by default. Capture the full viewport at 1920×1080. |
| **Caption** | Dark theme — the standard and only implemented theme variant, matching operational monitoring dashboard conventions. |
| **Mandatory** | ✅ Yes |

---

## 25. Light Theme

| Field | Value |
|---|---|
| **Filename** | `25_light_theme.png` |
| **Navigate to** | N/A |
| **How to trigger** | N/A — light theme is **not implemented** in the current build. |
| **Caption** | Light theme is not available. Only dark mode is supported. |
| **Mandatory** | ⚠️ Not applicable — capture not required. Document as "Not Implemented" in the evidence submission. |

---

## 26. Typography Hierarchy

| Field | Value |
|---|---|
| **Filename** | `26_typography_hierarchy.png` |
| **Navigate to** | `http://localhost:5173` — zoom into a section that shows the header title, a card title, a section header, table headers, and body text simultaneously |
| **How to trigger** | No special trigger. Crop or annotate the screenshot to highlight the 7-level typography scale: Dashboard Title (21px) → Card Title (13.5px) → Section Header (14px) → KPI Value (30px) → Table Header (12px) → Body Text (13px) → Secondary Text (11px). |
| **Caption** | Typography hierarchy — 7-level type scale from 21px dashboard title to 11px secondary text for consistent visual scanning. |
| **Mandatory** | ✅ Yes |

---

## Summary Table

| # | Filename | Category | Mandatory |
|---|---|---|---|
| 1 | `01_dashboard_startup.png` | Startup | ✅ |
| 2 | `02_executive_overview.png` | Executive Overview | ✅ |
| 3 | `03_executive_kpis.png` | KPI Cards | ✅ |
| 4 | `04_operations_compute.png` | Operations | ✅ |
| 5 | `05_integrations_alerts.png` | Integrations | ✅ |
| 6 | `06_decision_intelligence.png` | Decision Intelligence | ✅ |
| 7 | `07_live_telemetry.png` | Telemetry Chart | ✅ |
| 8 | `08_workflow_monitoring.png` | Workflow Table | ✅ |
| 9 | `09_workflow_view_all.png` | Workflow Expanded | ✅ |
| 10 | `10_operator_timeline.png` | Operator Console | ✅ |
| 11 | `11_runtime_health.png` | Runtime Health | ✅ |
| 12 | `12_replay_view.png` | Simulation & Replay | ✅ |
| 13 | `13_evidence_intelligence.png` | Evidence | ✅ |
| 14 | `14_desktop_1920x1080.png` | Responsive — Desktop | ✅ |
| 15 | `15_tablet_768x1024.png` | Responsive — Tablet | ✅ |
| 16 | `16_mobile_375x667.png` | Responsive — Mobile | ✅ |
| 17 | `17_loading_state.png` | Loading State | ✅ |
| 18 | `18_empty_state.png` | Empty State | ✅ |
| 19 | `19_error_recovery.png` | Error Recovery | ✅ |
| 20 | `20_offline_banner.png` | Offline Detection | ✅ |
| 21 | `21_zone_crash.png` | ErrorBoundary | ✅ |
| 22 | `22_api_success.png` | API Integration | ✅ |
| 23 | `23_authentication.png` | Authentication | ⚠️ If applicable |
| 24 | `24_dark_theme.png` | Dark Theme | ✅ |
| 25 | `25_light_theme.png` | Light Theme | ⚠️ Not implemented |
| 26 | `26_typography_hierarchy.png` | Typography | ✅ |

**Total: 26 items (23 mandatory, 2 conditional, 1 not applicable)**
