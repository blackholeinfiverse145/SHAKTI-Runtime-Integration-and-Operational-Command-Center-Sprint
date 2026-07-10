import { useQuery } from "@tanstack/react-query";
import {
  fetchHealth,
  fetchSystemStatus,
  fetchMetrics,
  fetchExecutiveDashboard,
  fetchOperationsDashboard,
  fetchAlertsDashboard,
  fetchRuntimeDashboard,
  fetchTelemetryDashboard,
} from "@/api/endpoints";

// GET /health — lightweight liveness probe
export const useHealth = () =>
  useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    refetchInterval: 10_000,
    retry: 1,
  });

// GET /system/status → SystemHealth zone
export const useSystemStatus = () =>
  useQuery({
    queryKey: ["system-status"],
    queryFn: fetchSystemStatus,
    refetchInterval: 5_000,
    retry: 2,
  });

// GET /metrics → Live KPIs zone
export const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: 10_000,
    retry: 2,
  });

// GET /dashboard/executive → Executive Summary zone
export const useExecutiveDashboard = () =>
  useQuery({
    queryKey: ["dashboard-executive"],
    queryFn: fetchExecutiveDashboard,
    refetchInterval: 15_000,
    retry: 2,
  });

// GET /dashboard/operations → Operations / Incident Queue zone
export const useOperationsDashboard = () =>
  useQuery({
    queryKey: ["dashboard-operations"],
    queryFn: fetchOperationsDashboard,
    refetchInterval: 5_000,
    retry: 2,
  });

// GET /dashboard/alerts → Live Alert Queue zone
export const useAlertsDashboard = () =>
  useQuery({
    queryKey: ["dashboard-alerts"],
    queryFn: fetchAlertsDashboard,
    refetchInterval: 5_000,
    retry: 2,
  });

// GET /dashboard/runtime → Replay Status zone
export const useRuntimeDashboard = () =>
  useQuery({
    queryKey: ["dashboard-runtime"],
    queryFn: fetchRuntimeDashboard,
    refetchInterval: 5_000,
    retry: 2,
  });

// GET /dashboard/telemetry → Forecast / Telemetry zone
export const useTelemetryDashboard = () =>
  useQuery({
    queryKey: ["dashboard-telemetry"],
    queryFn: fetchTelemetryDashboard,
    refetchInterval: 10_000,
    retry: 2,
  });
