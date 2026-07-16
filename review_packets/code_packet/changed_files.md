# Changed Files

Summary of all frontend files changed in the `shakti-command-center/` repository during these sprints.

## Components

1.  **[`DecisionIntelligenceLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/DecisionIntelligenceLayout.tsx)**
    *   *Role*: Dashboard layout zone for AI predictive scaling and recent decisions feed.
    *   *Updates*: Sorted decisions descending by `started_at` timestamp; removed the "View All" toggle button; mapped decisions directly inside a custom scrollable container with a `max-h-[250px]` height boundary.
2.  **[`OperationsLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/OperationsLayout.tsx)**
    *   *Role*: Active operations and node compute dashboard layout.
    *   *Updates*: Removed `.slice(0, 4)` limitation; replaced the `+X more` indicator with a total operations badge; capped container lists with a `max-h-[200px]` scroll boundary.
3.  **[`IntegrationLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/IntegrationLayout.tsx)**
    *   *Role*: Live alerts feed and system component tiles layout.
    *   *Updates*: Set integrations components grid max-height to `140px` to make 2 rows fully visible; capped the alerts list feed in a `max-h-[200px]` scroll wrapper.
4.  **[`WorkflowLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/WorkflowLayout.tsx)**
    *   *Role*: Table showing pipeline stages and step progress.
    *   *Updates*: Removed `.slice(0, 8)` slicing and toggle buttons; styled the table headers to be sticky (`sticky top-0 bg-slate-800 z-10`); wrapped the table body in a `max-h-[230px]` scroll wrapper.
5.  **[`OperatorConsoleLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/OperatorConsoleLayout.tsx)**
    *   *Role*: Operator profiling cards and console timeline logs layout.
    *   *Updates*: Constrained the console timeline logs container height to `max-h-[200px]`.
6.  **[`RuntimeHealthLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/RuntimeHealthLayout.tsx)**
    *   *Role*: Component health bar and status indicators layout.
    *   *Updates*: Removed `.slice(0, 6)` slicing and toggle; made table headers sticky; wrapped the table inside a `max-h-[200px]` scroll wrapper.
7.  **[`ReplayLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/ReplayLayout.tsx)**
    *   *Role*: Replay session validation lists layout.
    *   *Updates*: Removed default `.slice(0, 6)` slicing, toggle button, and the actions/metadata index block (Performance index and Validation signature) completely; made table headers sticky; wrapped the sessions list table inside a `max-h-[220px]` scroll container.
8.  **[`EvidenceLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/EvidenceLayout.tsx)**
    *   *Role*: Validation signals and code blueprint details layout.
    *   *Updates*: Constrained the Bucket Evidence container to `max-h-[300px]` and the Artifact Viewer details block to `max-h-[250px]`.
9.  **[`ObservabilityLayout.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/layouts/ObservabilityLayout.tsx)**
    *   *Role*: Main area chart layout for API performance tracking.
    *   *Updates*: Removed the hardcoded `chartHeight` constraint to allow the chart wrapper to scale responsively.
10. **[`TelemetryCard.tsx`](file:///c:/Pratik_Bhuwad/shakti-command-center/src/components/dashboard/primitives/TelemetryCard.tsx)**
    *   *Role*: Stateless AreaChart primitive for telemetry metrics.
    *   *Updates*: Customized curve interpolation to `monotone`; added Cartesian grids; aligned the legend inside bottom-right; implemented a styled custom hover tooltip showing timestamp, event rates, response latency, and `traceId`.

## Hooks
No custom react hooks files were created or modified during these sprints. All layouts consume standard hooks from `src/hooks/useQueries.ts`.

## Pages
No pages were created or modified. `src/pages/Dashboard.tsx` layout columns remain unchanged.

## Utilities
No utility files were modified.

## Documentation
- **`review_packets/REVIEW_PACKET.md`**: Master reviewer submission pack.
- **`review_packets/code_packet/changed_files.md`**: Documentation listing files changed.
- **`review_packets/code_packet/runtime_validation.md`**: Summary of scroll limits and metrics.
- **`review_packets/code_packet/deployment_guide.md`**: Environment and build setup rules.
- **`review_packets/code_packet/dashboard_walkthrough.md`**: Functional zoning definitions.
- **`review_packets/code_packet/Reviewer_Feedback_Resolution.md`**: Resolutions checklist tracker.
- **`review_packets/code_packet/Evidence_Guide.md`**: Proof screenshots mapping.
- **`review_packets/code_packet/api_samples/README.md`**: Backend mock verification.
- **`review_packets/code_packet/browser_network/README.md`**: Network verification directions.
- **`review_packets/code_packet/runtime_screenshots/README.md`**: UI screenshots guide.
- **`review_packets/code_packet/deployment_screenshots/README.md`**: Build screenshot placeholder.
