import { useQuery } from "@tanstack/react-query";
import {
  fetchExecutiveMetrics,
  fetchKPIs,
  fetchAlerts,
  fetchGridStatus,
  fetchRiskScores,
  fetchForecast,
  fetchIncidents,
  fetchTimeline,
  fetchSystemHealth,
  fetchReplayJobs,
  fetchEvidence,
} from "@/services/api";

const REFETCH_INTERVAL = 30_000;

export const useExecutiveMetrics = () =>
  useQuery({ queryKey: ["executive-metrics"], queryFn: fetchExecutiveMetrics, refetchInterval: REFETCH_INTERVAL });

export const useKPIs = () =>
  useQuery({ queryKey: ["kpis"], queryFn: fetchKPIs, refetchInterval: REFETCH_INTERVAL });

export const useAlerts = () =>
  useQuery({ queryKey: ["alerts"], queryFn: fetchAlerts, refetchInterval: 15_000 });

export const useGridStatus = () =>
  useQuery({ queryKey: ["grid-status"], queryFn: fetchGridStatus, refetchInterval: REFETCH_INTERVAL });

export const useRiskScores = () =>
  useQuery({ queryKey: ["risk-scores"], queryFn: fetchRiskScores, refetchInterval: REFETCH_INTERVAL });

export const useForecast = () =>
  useQuery({ queryKey: ["forecast"], queryFn: fetchForecast, refetchInterval: 60_000 });

export const useIncidents = () =>
  useQuery({ queryKey: ["incidents"], queryFn: fetchIncidents, refetchInterval: REFETCH_INTERVAL });

export const useTimeline = () =>
  useQuery({ queryKey: ["timeline"], queryFn: fetchTimeline, refetchInterval: 15_000 });

export const useSystemHealth = () =>
  useQuery({ queryKey: ["system-health"], queryFn: fetchSystemHealth, refetchInterval: 20_000 });

export const useReplayJobs = () =>
  useQuery({ queryKey: ["replay"], queryFn: fetchReplayJobs, refetchInterval: 10_000 });

export const useEvidence = () =>
  useQuery({ queryKey: ["evidence"], queryFn: fetchEvidence, refetchInterval: 60_000 });
