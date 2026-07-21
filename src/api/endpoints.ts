import { apiClient } from "./client";
import type {
  HealthResponse,
  SystemStatusResponse,
  MetricsResponse,
  ExecutiveDashboardResponse,
  OperationsDashboardResponse,
  AlertsDashboardResponse,
  RuntimeDashboardResponse,
  TelemetryDashboardResponse,
  RepositoryRegistryResponse,
  BuildRegistryResponse,
} from "@/types/runtime";

export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>("/health");
  return data;
}

export async function fetchSystemStatus(): Promise<SystemStatusResponse> {
  const { data } = await apiClient.get<SystemStatusResponse>("/system/status");
  return data;
}

export async function fetchMetrics(): Promise<MetricsResponse> {
  const { data } = await apiClient.get<MetricsResponse>("/metrics");
  return data;
}

export async function fetchExecutiveDashboard(): Promise<ExecutiveDashboardResponse> {
  const { data } = await apiClient.get<ExecutiveDashboardResponse>("/dashboard/executive");
  return data;
}

export async function fetchOperationsDashboard(): Promise<OperationsDashboardResponse> {
  const { data } = await apiClient.get<OperationsDashboardResponse>("/dashboard/operations");
  return data;
}

export async function fetchAlertsDashboard(): Promise<AlertsDashboardResponse> {
  const { data } = await apiClient.get<AlertsDashboardResponse>("/dashboard/alerts");
  return data;
}

export async function fetchRuntimeDashboard(): Promise<RuntimeDashboardResponse> {
  const { data } = await apiClient.get<RuntimeDashboardResponse>("/dashboard/runtime");
  return data;
}

export async function fetchTelemetryDashboard(): Promise<TelemetryDashboardResponse> {
  const { data } = await apiClient.get<TelemetryDashboardResponse>("/dashboard/telemetry");
  return data;
}

export async function fetchRepositoryRegistry(): Promise<RepositoryRegistryResponse> {
  const { data } = await apiClient.get<RepositoryRegistryResponse>("/registry/repositories");
  return data;
}

export async function fetchBuildRegistry(): Promise<BuildRegistryResponse> {
  const { data } = await apiClient.get<BuildRegistryResponse>("/registry/builds");
  return data;
}
