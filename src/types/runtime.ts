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
}
