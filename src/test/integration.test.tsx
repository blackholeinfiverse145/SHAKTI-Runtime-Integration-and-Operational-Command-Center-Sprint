import { describe, test, expect, vi } from "vitest";
import { fetchSystemStatus, fetchMetrics, fetchOperationsDashboard, fetchRuntimeDashboard, fetchAlertsDashboard, fetchTelemetryDashboard } from "@/api/endpoints";
import { apiClient } from "@/api/client";

vi.mock("@/api/client", () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe("Control Plane Integration Endpoint Normalization", () => {
  test("fetchSystemStatus transforms services map into components array", async () => {
    (apiClient.get as any).mockResolvedValueOnce({
      data: {
        timestamp: "2026-07-24T05:20:44.685855+00:00",
        overall_status: "degraded",
        uptime_seconds: 3963.619,
        services: {
          prompt_runner: { status: "healthy", pid: 26472, port: 8003, restarts: 2, healthy: true },
          bhiv_core: { status: "CRASH_LOOPING", pid: 25548, port: 8001, restarts: 2, healthy: false },
        },
        active_alerts: 0,
      },
    });

    const res = await fetchSystemStatus();

    expect(res.overall_status).toBe("degraded");
    expect(res.components).toHaveLength(2);
    expect(res.components[0].name).toBe("prompt_runner");
    expect(res.components[0].status).toBe("operational");
    expect(res.components[1].name).toBe("bhiv_core");
    expect(res.components[1].status).toBe("crash_looping");
  });

  test("fetchMetrics maps nested requests and latency_ms correctly", async () => {
    (apiClient.get as any).mockResolvedValueOnce({
      data: {
        timestamp: "2026-07-24T05:20:52.807577+00:00",
        uptime_seconds: 3963.619,
        services: { total: 10, healthy: 9, degraded: 1 },
        requests: { total: 150, errors: 0, per_minute: 10, error_rate_pct: 0, success_rate_pct: 100 },
        latency_ms: { p50: 12, p95: 45 },
        alerts: { active_count: 0 },
        replay: { queue_depth: 0 },
      },
    });

    const res = await fetchMetrics();

    expect(res.total_requests).toBe(150);
    expect(res.success_rate).toBe(100);
    expect(res.failed_requests).toBe(0);
    expect(res.average_response_time_ms).toBe(45);
    expect(res.services?.healthy).toBe(9);
  });

  test("fetchOperationsDashboard transforms runtime_services into operations", async () => {
    (apiClient.get as any).mockResolvedValueOnce({
      data: {
        timestamp: "2026-07-24T05:21:02.969607+00:00",
        pipeline: { total_traces: 10, total_artifacts: 5 },
        requests: { total: 100, errors: 2, per_minute: 5, error_rate_pct: 2, success_rate_pct: 98 },
        latency_ms: { p50: 10, p95: 30 },
        runtime_services: {
          prompt_runner: { status: "healthy", pid: 26472, port: 8003, restarts: 2 },
          bhiv_core: { status: "CRASH_LOOPING", pid: 25548, port: 8001, restarts: 2 },
        },
      },
    });

    const res = await fetchOperationsDashboard();

    expect(res.operations).toHaveLength(2);
    expect(res.operations[0].id).toBe("prompt_runner");
    expect(res.operations[0].status).toBe("running");
    expect(res.operations[1].id).toBe("bhiv_core");
    expect(res.operations[1].status).toBe("failed");
  });

  test("fetchRuntimeDashboard transforms services into sessions", async () => {
    (apiClient.get as any).mockResolvedValueOnce({
      data: {
        timestamp: "2026-07-24T05:21:05.012084+00:00",
        uptime_seconds: 3963.619,
        services: {
          creator_core: { status: "healthy", pid: 17232, port: 8000, restarts: 3 },
        },
        summary: { total: 10, healthy: 9, degraded: 1 },
      },
    });

    const res = await fetchRuntimeDashboard();

    expect(res.sessions).toHaveLength(1);
    expect(res.sessions[0].session_id).toBe("creator_core");
    expect(res.sessions[0].status).toBe("active");
    expect(res.active_sessions).toBe(9);
  });
});
