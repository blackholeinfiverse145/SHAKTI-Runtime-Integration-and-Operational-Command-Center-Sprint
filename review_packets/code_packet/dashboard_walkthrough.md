# Dashboard Walkthrough

Functional walkthrough of all 10 layouts inside the SHAKTI Command Center dashboard.

---

## 1. Executive Overview (`ExecutiveLayout.tsx`)
- **Description**: Displays summary metric cards for active services, alert counts, pipeline executions, and system status ratings.
- **Backend Data Source**: Queries `GET /dashboard/executive` and `GET /metrics`.
- **Unavailable Data Behavior**: If data is missing or query fails, cards render a loader skeleton or fall back to displaying the offline warning banner.

## 2. Operations (`OperationsLayout.tsx`)
- **Description**: Shows primary & replica node CPU, memory, and connection usage metrics, alongside a list of active operations.
- **Backend Data Source**: Queries `GET /dashboard/operations`.
- **Unavailable Data Behavior**: Displays a centralized "No Runtime Data Available" indicator text if operations list is empty, and shows standard query error banners if fetch requests fail.

## 3. Alerts (`IntegrationLayout.tsx` - Alerts Feed)
- **Description**: Displays a chronological timeline of alerts categorized by category and severity.
- **Backend Data Source**: Queries `GET /dashboard/alerts`.
- **Unavailable Data Behavior**: Renders "No Runtime Data Available" text when alerts array length is zero.

## 4. Decision Intelligence (`DecisionIntelligenceLayout.tsx`)
- **Description**: Monitors predictive scaling and load shedding capacities, and lists decisions sorted newest first.
- **Backend Data Source**: Queries `GET /dashboard/operations`.
- **Unavailable Data Behavior**: Shows "No Runtime Data Available" description when operations array is empty, and hides expand toggle buttons completely.

## 5. Telemetry (`ObservabilityLayout.tsx`)
- **Description**: Renders a dynamic monotone AreaChart representing system telemetry success rates and latency.
- **Backend Data Source**: Queries `GET /dashboard/telemetry`.
- **Unavailable Data Behavior**: Displays "No Runtime Data Available" when telemetry datasets are empty, preventing empty chart plots.

## 6. Workflow Monitoring (`WorkflowLayout.tsx`)
- **Description**: A grid table listing active workflow IDs, workflow descriptors, active steps, owners, and step progress.
- **Backend Data Source**: Queries `GET /dashboard/operations`.
- **Unavailable Data Behavior**: Displays a "No Runtime Data Available" table fallback when workflows are empty.

## 7. Runtime Health (`RuntimeHealthLayout.tsx`)
- **Description**: Displays telemetry stats alongside components (e.g. gateway service, data buckets) and response latency.
- **Backend Data Source**: Queries `GET /system/status` and `GET /metrics`.
- **Unavailable Data Behavior**: Renders "No Runtime Data Available" inside the component status grid layout if status queries fail.

## 8. Replay (`ReplayLayout.tsx`)
- **Description**: Simulation replay dashboard including sessions list table and selected session explorer panels.
- **Backend Data Source**: Queries `GET /dashboard/runtime`.
- **Unavailable Data Behavior**: Renders "No Replay Data Available" in the session column table, and "No session selected" in the explorer column if the session array is empty.

## 9. Evidence (`EvidenceLayout.tsx`)
- **Description**: Verification signals details, classification signals (nominal, warning, critical), execution chain navigators, and code blueprint viewers.
- **Backend Data Source**: Queries `GET /dashboard/telemetry`.
- **Unavailable Data Behavior**: Shows "No Evidence Available" description text when recent telemetry signals are empty.

## 10. Operator Console (`OperatorConsoleLayout.tsx`)
- **Description**: Displays profiles of active operators and assignments alongside timeline activity logs.
- **Backend Data Source**: Queries `GET /dashboard/alerts` and `GET /dashboard/runtime`.
- **Unavailable Data Behavior**: Renders "No Runtime Data Available" text within the operator column or the timeline column if telemetry queries return empty lists.
