# Reviewer Feedback Resolution

The table below logs the resolution and status of all reviewer feedback tickets for the SHAKTI Command Center dashboard:

| Reviewer Feedback | Resolution Status | Evidence | Notes |
|---|---|---|---|
| Recent Decisions list display makes card excessively tall and pushes operational panels below the fold. | **Completed** | Sorted by `started_at` descending; set max decisions list scroll height to `250px` inside `DecisionIntelligenceLayout.tsx`. | Decisions scroll internally. |
| Improve the Observability & Telemetry card with smooth curves, legends inside chart, and hover tooltip. | **Completed** | Mapped monotone curves, Cartesian grids, inside-right legends, and trace ID tooltip hovers in `TelemetryCard.tsx`. | Enhanced telemetry readability. |
| Convert all data-heavy dashboard cards to use fixed-height containers with internal scrolling instead of expanding layout. | **Completed** | Set height constraints (`max-h-[...]` classes) and `overflow-y-auto` on all layout tables and lists. | Dashboard remains visually stable. |
| Integrations & Alerts cards layout spacing should allow at least 2 rows of components to be properly visible. | **Completed** | Set integrations components grid wrapper max-height to `140px` inside `IntegrationLayout.tsx`. | Both rows are visible without clipping. |
| Add a custom telemetry metrics graph filter panel. | **Blocked (Backend Dependency)** | None | Requires updates to `/dashboard/telemetry` FastAPI endpoint filters owned by another team. |
| Implement custom interactive controls or actions on live backend records. | **Blocked (Backend Dependency)** | None | Depends on Control Plane APIs and backend service handlers owned by another team. |
| Real-time push alert notifications. | **Blocked (Backend Dependency)** | None | Requires server-sent events (SSE) or WebSockets from backend services maintained by another team. |
