import axios from "axios";
import type {
  ExecutiveMetric,
  KPI,
  Alert,
  GridStatus,
  RiskScore,
  Forecast,
  Incident,
  TimelineEvent,
  SystemHealth,
  ReplayJob,
  Evidence,
} from "@/types/api";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ─── Mock data ────────────────────────────────────────────────────────────────

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

async function mockGet<T>(data: T): Promise<T> {
  await delay();
  return data;
}

// ─── API functions ────────────────────────────────────────────────────────────

export async function fetchExecutiveMetrics(): Promise<ExecutiveMetric[]> {
  if (BASE_URL) {
    const { data } = await api.get<ExecutiveMetric[]>("/api/executive-metrics");
    return data;
  }
  return mockGet([
    { id: "em1", title: "Active Incidents", value: 7, unit: "", trend: "up", trendValue: "+2", status: "warning", icon: "AlertTriangle" },
    { id: "em2", title: "Grid Availability", value: "98.4", unit: "%", trend: "down", trendValue: "-0.3%", status: "online", icon: "Zap" },
    { id: "em3", title: "Critical Alerts", value: 3, unit: "", trend: "up", trendValue: "+1", status: "warning", icon: "Bell" },
    { id: "em4", title: "System Health", value: "92", unit: "/100", trend: "stable", trendValue: "0", status: "online", icon: "Activity" },
  ]);
}

export async function fetchKPIs(): Promise<KPI[]> {
  if (BASE_URL) {
    const { data } = await api.get<KPI[]>("/api/kpis");
    return data;
  }
  return mockGet([
    { id: "k1", title: "Total Load", value: 142.6, unit: "GW", trend: "up", trendValue: "+1.2", previousValue: 141.4 },
    { id: "k2", title: "Renewable Mix", value: 34.2, unit: "%", trend: "up", trendValue: "+2.1%", previousValue: 32.1 },
    { id: "k3", title: "Grid Frequency", value: 49.98, unit: "Hz", trend: "stable", trendValue: "0", previousValue: 49.98 },
    { id: "k4", title: "Transmission Loss", value: 2.3, unit: "%", trend: "down", trendValue: "-0.1%", previousValue: 2.4 },
  ]);
}

export async function fetchAlerts(): Promise<Alert[]> {
  if (BASE_URL) {
    const { data } = await api.get<Alert[]>("/api/alerts");
    return data;
  }
  return mockGet([
    { id: "a1", severity: "critical", message: "Voltage deviation detected at Northern Substation 4", timestamp: new Date(Date.now() - 120000).toISOString(), source: "SCADA-N4", region: "North", acknowledged: false },
    { id: "a2", severity: "high", message: "Transformer overload warning — Eastern Grid Zone 2", timestamp: new Date(Date.now() - 480000).toISOString(), source: "EMS-E2", region: "East", acknowledged: false },
    { id: "a3", severity: "high", message: "Frequency deviation exceeds threshold in Western region", timestamp: new Date(Date.now() - 900000).toISOString(), source: "PMU-W1", region: "West", acknowledged: true },
    { id: "a4", severity: "medium", message: "Renewable generation forecast mismatch — Solar Farm 7", timestamp: new Date(Date.now() - 1800000).toISOString(), source: "DERMS-S7", region: "South", acknowledged: false },
    { id: "a5", severity: "low", message: "Scheduled maintenance window starting in 2 hours", timestamp: new Date(Date.now() - 3600000).toISOString(), source: "OMS", region: "Central", acknowledged: true },
  ]);
}

export async function fetchGridStatus(): Promise<GridStatus> {
  if (BASE_URL) {
    const { data } = await api.get<GridStatus>("/api/grid-status");
    return data;
  }
  return mockGet({
    overallStatus: "warning",
    totalLoad: 142.6,
    totalCapacity: 165.0,
    frequency: 49.98,
    lastUpdated: new Date().toISOString(),
    regions: [
      { id: "r1", name: "North", status: "warning", load: 38.2, capacity: 42.0, frequency: 49.95 },
      { id: "r2", name: "South", status: "online", load: 31.4, capacity: 38.0, frequency: 50.01 },
      { id: "r3", name: "East", status: "online", load: 29.8, capacity: 35.0, frequency: 50.00 },
      { id: "r4", name: "West", status: "degraded", load: 27.1, capacity: 30.0, frequency: 49.92 },
      { id: "r5", name: "Central", status: "online", load: 16.1, capacity: 20.0, frequency: 50.02 },
    ],
  });
}

export async function fetchRiskScores(): Promise<RiskScore[]> {
  if (BASE_URL) {
    const { data } = await api.get<RiskScore[]>("/api/risk-scores");
    return data;
  }
  return mockGet([
    { regionId: "r1", regionName: "North", riskLevel: "high", score: 78, factors: ["Voltage deviation", "High load"] },
    { regionId: "r2", regionName: "South", riskLevel: "low", score: 22, factors: ["Stable generation"] },
    { regionId: "r3", regionName: "East", riskLevel: "medium", score: 45, factors: ["Transformer stress"] },
    { regionId: "r4", regionName: "West", riskLevel: "critical", score: 91, factors: ["Frequency deviation", "Overload", "Degraded lines"] },
    { regionId: "r5", regionName: "Central", riskLevel: "low", score: 18, factors: ["Normal operations"] },
  ]);
}

export async function fetchForecast(): Promise<Forecast> {
  if (BASE_URL) {
    const { data } = await api.get<Forecast>("/api/forecast");
    return data;
  }
  const now = Date.now();
  return mockGet({
    horizon: "24h",
    confidence: 87,
    peakDemand: 158.4,
    peakTime: new Date(now + 6 * 3600000).toISOString(),
    points: Array.from({ length: 12 }, (_, i) => ({
      timestamp: new Date(now + i * 2 * 3600000).toISOString(),
      demand: 140 + Math.sin(i * 0.5) * 15 + Math.random() * 3,
      renewable: 45 + Math.cos(i * 0.4) * 10 + Math.random() * 2,
      conventional: 95 + Math.sin(i * 0.3) * 8 + Math.random() * 2,
    })),
  });
}

export async function fetchIncidents(): Promise<Incident[]> {
  if (BASE_URL) {
    const { data } = await api.get<Incident[]>("/api/incidents");
    return data;
  }
  return mockGet([
    { id: "INC-2847", severity: "critical", title: "Major voltage collapse risk — Northern corridor", location: "Substation N-4", region: "North", status: "investigating", assignedOperator: "Operator A", createdAt: new Date(Date.now() - 3600000).toISOString(), updatedAt: new Date(Date.now() - 600000).toISOString() },
    { id: "INC-2846", severity: "high", title: "Transformer overload — Eastern zone", location: "Transformer E-2B", region: "East", status: "open", assignedOperator: "Operator B", createdAt: new Date(Date.now() - 7200000).toISOString(), updatedAt: new Date(Date.now() - 1800000).toISOString() },
    { id: "INC-2845", severity: "high", title: "Frequency instability — Western region", location: "PMU W-1", region: "West", status: "investigating", assignedOperator: "Operator C", createdAt: new Date(Date.now() - 10800000).toISOString(), updatedAt: new Date(Date.now() - 900000).toISOString() },
    { id: "INC-2844", severity: "medium", title: "Solar generation mismatch", location: "Solar Farm 7", region: "South", status: "open", assignedOperator: "Unassigned", createdAt: new Date(Date.now() - 14400000).toISOString(), updatedAt: new Date(Date.now() - 3600000).toISOString() },
  ]);
}

export async function fetchTimeline(): Promise<TimelineEvent[]> {
  if (BASE_URL) {
    const { data } = await api.get<TimelineEvent[]>("/api/timeline");
    return data;
  }
  return mockGet([
    { id: "t1", timestamp: new Date(Date.now() - 120000).toISOString(), event: "Critical alert raised: Voltage deviation N-4", source: "SCADA", category: "alert", severity: "critical" },
    { id: "t2", timestamp: new Date(Date.now() - 600000).toISOString(), event: "Operator A acknowledged INC-2847", source: "OMS", category: "operator" },
    { id: "t3", timestamp: new Date(Date.now() - 1800000).toISOString(), event: "Automatic load shedding initiated — West zone", source: "EMS", category: "system", severity: "high" },
    { id: "t4", timestamp: new Date(Date.now() - 3600000).toISOString(), event: "INC-2847 created — Northern corridor voltage risk", source: "OMS", category: "incident", severity: "critical" },
    { id: "t5", timestamp: new Date(Date.now() - 5400000).toISOString(), event: "Forecast model updated — 24h horizon", source: "DERMS", category: "system" },
    { id: "t6", timestamp: new Date(Date.now() - 7200000).toISOString(), event: "Transformer E-2B load exceeded 95% threshold", source: "SCADA", category: "alert", severity: "high" },
  ]);
}

export async function fetchSystemHealth(): Promise<SystemHealth> {
  if (BASE_URL) {
    const { data } = await api.get<SystemHealth>("/api/system-health");
    return data;
  }
  return mockGet({
    overallScore: 92,
    lastUpdated: new Date().toISOString(),
    services: [
      { name: "SCADA Gateway", status: "online", latency: 12, uptime: 99.98, lastChecked: new Date().toISOString() },
      { name: "EMS Core", status: "online", latency: 8, uptime: 99.95, lastChecked: new Date().toISOString() },
      { name: "DERMS API", status: "warning", latency: 145, uptime: 98.2, lastChecked: new Date().toISOString() },
      { name: "Forecast Engine", status: "online", latency: 34, uptime: 99.7, lastChecked: new Date().toISOString() },
      { name: "OMS Service", status: "online", latency: 21, uptime: 99.9, lastChecked: new Date().toISOString() },
      { name: "PMU Collector", status: "degraded", latency: 320, uptime: 96.1, lastChecked: new Date().toISOString() },
    ],
  });
}

export async function fetchReplayJobs(): Promise<ReplayJob[]> {
  if (BASE_URL) {
    const { data } = await api.get<ReplayJob[]>("/api/replay");
    return data;
  }
  return mockGet([
    { id: "rpl-001", name: "Grid Fault Analysis — 2024-12-15", progress: 73, duration: "4h 22m", state: "running", startTime: new Date(Date.now() - 15720000).toISOString(), estimatedEnd: new Date(Date.now() + 5820000).toISOString(), eventsProcessed: 18250, totalEvents: 25000 },
    { id: "rpl-002", name: "Peak Load Simulation — Q4 2024", progress: 100, duration: "2h 10m", state: "completed", startTime: new Date(Date.now() - 86400000).toISOString(), estimatedEnd: new Date(Date.now() - 78600000).toISOString(), eventsProcessed: 12400, totalEvents: 12400 },
  ]);
}

export async function fetchEvidence(): Promise<Evidence[]> {
  if (BASE_URL) {
    const { data } = await api.get<Evidence[]>("/api/evidence");
    return data;
  }
  return mockGet([
    { id: "ev1", source: "SCADA Sensor N-4-V", confidence: 96, timestamp: new Date(Date.now() - 120000).toISOString(), description: "Voltage reading 11.2kV below nominal threshold for 3 consecutive samples", relatedIncidentId: "INC-2847", type: "sensor" },
    { id: "ev2", source: "EMS Event Log", confidence: 88, timestamp: new Date(Date.now() - 600000).toISOString(), description: "Automatic protection relay triggered at N-4 bus bar", relatedIncidentId: "INC-2847", type: "log" },
    { id: "ev3", source: "Forecast Model v3.2", confidence: 82, timestamp: new Date(Date.now() - 1800000).toISOString(), description: "Load forecast deviation exceeds 8% — Western region demand surge predicted", type: "model" },
    { id: "ev4", source: "Operator Log", confidence: 100, timestamp: new Date(Date.now() - 3600000).toISOString(), description: "Manual inspection confirmed transformer E-2B operating at 97% rated capacity", relatedIncidentId: "INC-2846", type: "operator" },
  ]);
}
