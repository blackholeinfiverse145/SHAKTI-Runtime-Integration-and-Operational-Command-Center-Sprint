import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {
  fetchHealth,
  fetchSystemStatus,
  fetchMetrics,
  fetchExecutiveDashboard,
  fetchOperationsDashboard,
  fetchAlertsDashboard,
  fetchRuntimeDashboard,
  fetchTelemetryDashboard,
  fetchRepositoryRegistry,
  fetchBuildRegistry,
  fetchMigrationQueue,
  fetchReviewQueue,
} from "@/api/endpoints";

// GET /health — lightweight liveness probe
export const useHealth = () =>
  useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
  });

// GET /system/status → SystemHealth zone
export const useSystemStatus = () =>
  useQuery({
    queryKey: ["system-status"],
    queryFn: fetchSystemStatus,
    refetchInterval: 5_000,
    placeholderData: keepPreviousData,
  });

// GET /metrics → Live KPIs zone
export const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: fetchMetrics,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
  });

// GET /dashboard/executive → Executive Summary zone
export const useExecutiveDashboard = () =>
  useQuery({
    queryKey: ["dashboard-executive"],
    queryFn: fetchExecutiveDashboard,
    refetchInterval: 15_000,
    placeholderData: keepPreviousData,
  });

// GET /dashboard/operations → Operations / Incident Queue zone
export const useOperationsDashboard = () =>
  useQuery({
    queryKey: ["dashboard-operations"],
    queryFn: fetchOperationsDashboard,
    refetchInterval: 5_000,
    placeholderData: keepPreviousData,
  });

// GET /dashboard/alerts → Live Alert Queue zone
export const useAlertsDashboard = () =>
  useQuery({
    queryKey: ["dashboard-alerts"],
    queryFn: fetchAlertsDashboard,
    refetchInterval: 5_000,
    placeholderData: keepPreviousData,
  });

// GET /dashboard/runtime → Replay Status zone
export const useRuntimeDashboard = () =>
  useQuery({
    queryKey: ["dashboard-runtime"],
    queryFn: fetchRuntimeDashboard,
    refetchInterval: 5_000,
    placeholderData: keepPreviousData,
  });

// GET /dashboard/telemetry → Forecast / Telemetry zone
export const useTelemetryDashboard = () =>
  useQuery({
    queryKey: ["dashboard-telemetry"],
    queryFn: fetchTelemetryDashboard,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
  });

// GET /registry/repositories → BHEX Repository Registry
export const useRepositoryRegistry = () =>
  useQuery({
    queryKey: ["registry-repositories"],
    queryFn: fetchRepositoryRegistry,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    retry: 1,
  });

// GET /registry/builds → BHEX Build Registry
export const useBuildRegistry = () =>
  useQuery({
    queryKey: ["registry-builds"],
    queryFn: fetchBuildRegistry,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    retry: 1,
  });

// GET /queue/migration → BHEX Migration Queue
export const useMigrationQueue = () =>
  useQuery({
    queryKey: ["queue-migration"],
    queryFn: fetchMigrationQueue,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    retry: 1,
  });

// GET /queue/review → BHEX Review Queue
export const useReviewQueue = () =>
  useQuery({
    queryKey: ["queue-review"],
    queryFn: fetchReviewQueue,
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    retry: 1,
  });
