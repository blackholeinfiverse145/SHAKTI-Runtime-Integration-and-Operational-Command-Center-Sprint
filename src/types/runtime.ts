// ─── Official Runtime Integration API contracts ───────────────────────────────
// Source: SHAKTI Runtime Integration team
// Base URL: VITE_CONTROL_PLANE_URL (default: http://127.0.0.1:8009)

// ─── GET /health ──────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

// ─── GET /system/status ───────────────────────────────────────────────────────

export interface ComponentStatus {
  name: string;
  status: string;          // "operational" | "degraded" | "offline" | "warning"
  last_check: string;      // ISO 8601
  response_time_ms: number | null;
  details: string;
}

export interface SystemStatusResponse {
  overall_status: string;  // "operational" | "degraded" | "offline"
  timestamp: string;
  components: ComponentStatus[];
  uptime_seconds: number;
}

// ─── GET /metrics ─────────────────────────────────────────────────────────────

export interface MetricsResponse {
  timestamp: string;
  period_seconds: number;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  success_rate: number | null;   // may be null when no requests yet
  average_response_time_ms: number | null;
  active_sessions: number;
  events_processed: number;
  alerts_generated: number;
  cache_hit_rate: number | null;
}

// ─── GET /dashboard/executive ─────────────────────────────────────────────────

export interface ExecutiveSummaryItem {
  metric: string;
  value: string | number;
  status: string;          // "normal" | "warning" | "critical"
  trend: string;           // "up" | "down" | "stable"
  description: string;
}

export interface ExecutiveDashboardResponse {
  timestamp: string;
  summary: ExecutiveSummaryItem[];
  key_metrics: Record<string, string | number | null>;
  alerts_count: number;
  active_sessions: number;
}

// ─── GET /dashboard/operations ────────────────────────────────────────────────

export interface OperationItem {
  id: string;
  type: string;
  status: string;          // "running" | "completed" | "failed" | "pending" | "paused"
  priority: string;        // "critical" | "high" | "medium" | "low"
  started_at: string;
  description: string;
  progress: number;        // 0–100
  agent: string;
}

export interface OperationsDashboardResponse {
  timestamp: string;
  active_operations: number;
  operations: OperationItem[];
  system_load: number;     // 0–100
  queue_depth: number;
  pipeline?: {
    total_traces?: number;
    total_artifacts?: number;
    storage_size_mb?: number;
  };
  latency_ms?: {
    p50?: number;
    p95?: number;
  };
  replay?: {
    total_replays?: number;
    failed_replays?: number;
  };
}

// ─── GET /dashboard/alerts ────────────────────────────────────────────────────

export interface AlertItem {
  id: string;
  severity: string;        // "critical" | "high" | "medium" | "low" | "info"
  message: string;
  timestamp: string;
  source: string;
  acknowledged: boolean;
  category: string;
}

export interface AlertsDashboardResponse {
  timestamp: string;
  total_alerts: number;
  unacknowledged: number;
  alerts: AlertItem[];
  alert_summary: Record<string, number>;
}

// ─── GET /dashboard/runtime ───────────────────────────────────────────────────

export interface RuntimeSession {
  session_id: string;
  status: string;          // "active" | "idle" | "completed" | "failed"
  started_at: string;
  last_activity: string;
  events_processed: number;
  current_operation: string | null;
  progress: number;        // 0–100
}

export interface RuntimeDashboardResponse {
  timestamp: string;
  active_sessions: number;
  total_events_processed: number;
  system_status: string;
  sessions: RuntimeSession[];
  performance: {
    avg_response_time_ms: number;
    events_per_second: number;
    queue_depth: number;
  };
}

// ─── GET /dashboard/telemetry ─────────────────────────────────────────────────

export interface TelemetryDataPoint {
  timestamp: string;
  value: number;
  metric: string;
}

export interface TelemetryDashboardResponse {
  timestamp: string;
  metrics: {
    response_times: TelemetryDataPoint[];
    event_rates: TelemetryDataPoint[];
    error_rates: TelemetryDataPoint[];
    system_load: TelemetryDataPoint[];
  };
  summary: {
    avg_response_time: number;
    peak_response_time: number;
    total_events: number;
    error_rate: number;
    uptime_percentage: number;
  };
  insightflow?: {
    total_events?: number;
    by_component?: Record<string, number>;
    by_event_type?: Record<string, number>;
  };
  recent_telemetry?: {
    trace_id: string;
    telemetry: {
      source_id: string;
      metric: string;
      value: number;
      unit: string;
      timestamp: string;
      trace_id: string;
      source_module_id: string;
      status: string;
    } | null;
    signal: {
      signal_id: string;
      trace_id: string;
      metric: string;
      value: number;
      unit: string;
      classification: string;
      threshold_breached: boolean;
      derived_at: string;
      source_module_id: string;
      status: string;
      prompt: string;
    } | null;
  }[];
  classification_breakdown?: Record<string, number>;
}

// ─── GET /registry/repositories (BHEX Operational Surface) ────────────────────

export interface RepositoryRegistryItem {
  repository: string;
  owner: string;
  layer: string;
  capability: string;
  branch: string;
  status: string;
  last_commit: string;
  last_activity: string;
  review_status: string;
  migration_status: string;
  documentation_status: string;
  integration_status: string;
}

export interface RepositoryRegistryResponse {
  timestamp: string;
  total_repositories: number;
  repositories: RepositoryRegistryItem[];
}

// ─── GET /registry/builds (BHEX Operational Surface) ──────────────────────────

export interface BuildRegistryItem {
  build_id: string;
  repository: string;
  branch: string;
  pipeline_status: string;
  build_duration: string | number;
  deployment_status: string;
  evidence: string;
  release_readiness: string;
}

export interface BuildRegistryResponse {
  timestamp: string;
  total_builds: number;
  builds: BuildRegistryItem[];
}

// ─── GET /queue/migration (Operational Migration Queue) ─────────────────────

export interface MigrationQueueItem {
  migration_token: string;
  repository: string;
  assigned_engineer: string;
  current_stage: string;
  progress: number;
  blocked_reason: string | null;
  evidence_submitted: boolean | string;
  review_status: string;
}

export interface MigrationQueueResponse {
  timestamp: string;
  total_migrations: number;
  migrations: MigrationQueueItem[];
}

// ─── GET /queue/review (Operational Review Queue) ────────────────────────────

export interface ReviewQueueItem {
  submission: string;
  engineer: string;
  reviewer: string;
  review_status: string;
  testing_status: string;
  required_fixes: number | string;
  priority: string;
}

export interface ReviewQueueResponse {
  timestamp: string;
  total_reviews: number;
  reviews: ReviewQueueItem[];
}

// ─── GET /registry/capabilities (BHEX Capability Registry) ───────────────────

export interface CapabilityRegistryItem {
  capability_name: string;
  layer: string;
  consumers: string[] | number | string;
  providers: string[] | number | string;
  owner: string;
  repository: string;
  version: string;
  runtime_health: string;
  integration_status: string;
}

export interface CapabilityRegistryResponse {
  timestamp: string;
  total_capabilities: number;
  capabilities: CapabilityRegistryItem[];
}
