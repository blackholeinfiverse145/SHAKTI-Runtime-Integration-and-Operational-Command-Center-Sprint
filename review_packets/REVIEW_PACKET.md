# REVIEW PACKET

SHAKTI Command Center Operational Dashboard Front-End review package.

---

## 1. Executive Summary
This project implements the frontend dashboard for the **SHAKTI Operational Command Center**, designed with a dynamic 10-zone CSS grid, layout error boundaries, universal loading states, and offline cached-data displays.

During these sprints, we successfully improved visual balance and page stability:
- Converted all variable-length data lists and tables to use **internal vertical scrolling** with custom max-height boundaries, locking default heights and preventing grid rows or sibling cards from stretching when database records scale up.
- Removed all "View All / Show Less" toggle button states.
- Enhanced the Telemetry Area Chart with monotone interpolation, cartesian grids, inside-right legends, and tooltips listing formatted times and trace IDs.
- Extended the integrations components container height to `140px` so that 2 full rows of integration tiles are properly visible without clipping.

---

## 2. Architecture Overview
The frontend is built using **React 19**, **Vite 8**, **TypeScript 6**, **Tailwind CSS 4**, and **TanStack Query 5**.

### Subfolder Structure
All documentation for reviewer review is organized inside the [`review_packets/`](file:///c:/Pratik_Bhuwad/shakti-command-center/review_packets/) directory:
```
review_packets/
├── REVIEW_PACKET.md                      # Master reviewer packet summary
└── code_packet/
    ├── architecture_overview.md          # Guide to components, directories, and data integration
    ├── changed_files.md                  # Summary of layout and test changes
    ├── runtime_validation.md             # Summary of scroll limits and state validation
    ├── deployment_guide.md               # Guide to compile, run, and preview
    ├── dashboard_walkthrough.md          # Layout walkthrough of the 10 grid zones
    ├── Reviewer_Feedback_Resolution.md   # Resolution checklist tracker
    ├── Evidence_Guide.md                 # Mapping of screenshot files to requirements
    ├── api_samples/
    │   └── README.md                     # Backend API endpoint descriptions
    ├── browser_network/
    │   └── README.md                     # Browser dev tools network checks
    ├── runtime_screenshots/
    │   └── README.md                     # Pointers to UI screenshots in evidence/
    └── deployment_screenshots/
        └── README.md                     # Description of build step captures
```

---

## 3. Frontend Runtime Integration Summary
- **Universal DashboardCard wrapper**: Controls skeleton loaders, error blocks, offline alerts, and caching details uniformly.
- **Scroll Constraints**: Custom max-height bounds limit the layout boxes (e.g. `max-h-[250px]` for Recent Decisions, `max-h-[230px]` for Active Workflows) to prevent dashboard resizing.
- **Sticky Table Headers**: Sticky `thead` elements with solid backgrounds ensure header labels remain fixed at the top of lists during internal scrolls.

---

## 4. Backend Services Consumed
*Platform Team Dependency*: The frontend queries the mock FastAPI backend server (usually hosted on `http://localhost:8009`). All database records, operations lists, and telemetry values originate from endpoints configured by the backend development team. No backend controllers or Python files are owned by the frontend team.

---

## 5. API Integration Summary
Endpoints queried via Axios client:
*   `GET /health` (polling: 10s)
*   `GET /system/status` (polling: 5s)
*   `GET /metrics` (polling: 10s)
*   `GET /dashboard/executive` (polling: 15s)
*   `GET /dashboard/operations` (polling: 5s)
*   `GET /dashboard/alerts` (polling: 5s)
*   `GET /dashboard/runtime` (polling: 5s)
*   `GET /dashboard/telemetry` (polling: 10s)

---

## 6. Screenshot Checklist
Refer to [`Evidence_Guide.md`](file:///c:/Pratik_Bhuwad/shakti-command-center/review_packets/code_packet/Evidence_Guide.md) for full descriptions of these captures located in the root-level [`evidence/`](file:///c:/Pratik_Bhuwad/shakti-command-center/evidence) directory:
- [x] **`04_operations_compute.png`**: Verifies node computer statuses.
- [x] **`05_integrations_alerts.png`**: Verifies 2 rows of integrations tiles.
- [x] **`06_decision_intelligence.png`**: Verifies AI capabilities grid.
- [x] **`07_live_telemetry.png`**: Verifies monotone curve telemetry AreaChart.
- [x] **`08_workflow_monitoring.png`**: Verifies workflow table.
- [x] **`9_operator_timeline.png`**: Verifies console logs activity log.
- [x] **`10_runtime_health.png`**: Verifies registry statuses and latencies.
- [x] **`11_replay_view.png`**: Verifies replay session list selection.
- [x] **`12_evidence_intelligence.png`**: Verifies blueprint view columns.
- [x] **`17_loading_state.png`** / **`18_empty_state.png`**: Verifies skeleton and empty fallbacks.
- [x] **`19_error_recovery.png`** / **`20_offline_banner.png`**: Verifies error banners and cached-data warning layouts.
- [x] **`27_lighthouse_report.png`**: Verifies Lighthouse audit compliance ratings.

---

## 7. Browser Network Validation
Reviewers can use Chrome/Firefox DevTools (F12) Network tab to verify:
- Endpoints return `HTTP 200 OK`.
- Poll requests are triggered periodically.
- Offline banner triggers when network connections are severed.

Detailed verification instructions are logged in [`browser_network/README.md`](file:///c:/Pratik_Bhuwad/shakti-command-center/review_packets/code_packet/browser_network/README.md).

---

## 8. Runtime Validation Summary
Layout lists scroll internally when item count exceeds:
*   4 operations (Operations Layout)
*   6 integration tiles (Integration Layout)
*   3 decisions (Decision Intelligence)
*   8 workflows (Workflow Layout)
*   6 registry components (Runtime Health Layout)
*   6 simulation replays (Replay Layout)

Header heights, chart bounds, and footers remain fixed.

---

## 9. Testing Summary
- **Unit Test framework**: Vitest.
- **Result**: 18/18 tests in 4 test suites pass successfully.
- **Integration**: Mocks verify exact component rendering, empty indicators, and loading skeletons.

---

## 10. Deployment Instructions
1. Run `npm install` inside the project root directory.
2. Ensure the backend FastAPI server is running on `http://localhost:8009`.
3. Launch development server using `npm run dev`.
4. Compile production assets using `npm run build`.

Detailed environment instructions are documented in [`deployment_guide.md`](file:///c:/Pratik_Bhuwad/shakti-command-center/review_packets/code_packet/deployment_guide.md).

---

## 11. Known Limitations
- **Pull-Based Alerts**: The alerts widget uses standard polling fetches rather than server-sent push protocols.
- **Mock Fallbacks**: If backend API endpoints fail or return empty lists, the dashboard falls back to placeholder layouts.

---

## 12. Team Responsibilities
- **Frontend Dashboard Team (Our Team)**: Accountable for visual rendering, React layouts, styling, components, charts, and API integrations.
- **Control Plane & Microservices Team (Platform Team)**: Accountable for backend Python controllers, FastAPI uvicorn deployment, JSON contracts, data structures, and database status logs.

---

## 13. Reviewer Notes
All dashboard cards are fully constrained and scrollable. Chart tooltip hovers, sticky table headers, components card layouts, and unit test suites are fully verified and ready for production staging.
