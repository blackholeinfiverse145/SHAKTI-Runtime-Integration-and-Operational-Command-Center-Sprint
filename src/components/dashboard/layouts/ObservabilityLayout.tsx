import { memo, useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { TelemetryCard } from "@/components/dashboard/primitives/TelemetryCard";

import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

export default memo(function ObservabilityLayout() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  // Map telemetry data points to chart series
  const chartData = useMemo(() => data
    ? (data.metrics?.response_times ?? []).map((rt, i) => ({
        time: rt ? formatTime(rt.timestamp) : "",
        response: rt && rt.value != null ? +rt.value.toFixed(1) : 0,
        rate: data.metrics?.event_rates?.[i]?.value != null ? +(data.metrics.event_rates[i].value).toFixed(1) : 0,
      }))
    : [], [data]);

  const series = useMemo(() => [
    { name: "Response (ms)", dataKey: "response", color: "#6366f1" },
    { name: "Event Rate", dataKey: "rate", color: "#10b981" },
  ], []);

  const summaryMetrics = useMemo(() => data ? [
    { label: "Avg Response", value: (data.summary?.avg_response_time ?? 0).toFixed(0), unit: "ms" },
    { label: "Total Events", value: (data.summary?.total_events ?? 0).toLocaleString() },
    { label: "Error Rate", value: ((data.summary?.error_rate ?? 0) * 100).toFixed(2), unit: "%" },
  ] : [], [data]);

  return (
    <DashboardCard
      title="Observability & Telemetry"
      ariaLabel="Observability Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load telemetry"
      skeletonCount={1}
      skeletonHeight="h-48"
      headerRight={
        data ? (
          <span className="text-xs text-slate-500">
            Uptime:{" "}
            <span className="text-emerald-400 font-medium">
              {(data.summary?.uptime_percentage ?? 100).toFixed(1)}%
            </span>
          </span>
        ) : undefined
      }
    >
      {data && (
        <div className="flex flex-col flex-1 min-h-0">
          <TelemetryCard 
            data={chartData}
            xAxisKey="time"
            series={series}
            summaryMetrics={summaryMetrics}
            chartHeight={120}
          />
        </div>
      )}
    </DashboardCard>
  );
});
