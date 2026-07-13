import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { TelemetryCard } from "@/components/dashboard/primitives/TelemetryCard";
import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

export default memo(function ObservabilityLayout() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  // Map telemetry data points to chart series
  const chartData = data
    ? data.metrics.response_times.map((rt, i) => ({
        time: formatTime(rt.timestamp),
        response: +rt.value.toFixed(1),
        rate: +(data.metrics.event_rates[i]?.value ?? 0).toFixed(1),
      }))
    : [];

  const series = [
    { name: "Response (ms)", dataKey: "response", color: "#6366f1" },
    { name: "Event Rate", dataKey: "rate", color: "#10b981" },
  ];

  const summaryMetrics = data ? [
    { label: "Avg Response", value: data.summary.avg_response_time.toFixed(0), unit: "ms" },
    { label: "Total Events", value: data.summary.total_events.toLocaleString() },
    { label: "Error Rate", value: (data.summary.error_rate * 100).toFixed(2), unit: "%" },
  ] : [];

  return (
    <DashboardCard
      title="Observability & Telemetry"
      ariaLabel="Observability Layout"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load telemetry"
      skeletonCount={1}
      skeletonHeight="h-48"
      headerRight={
        data ? (
          <span className="text-xs text-slate-500">
            Uptime:{" "}
            <span className="text-emerald-400 font-medium">
              {data.summary.uptime_percentage.toFixed(1)}%
            </span>
          </span>
        ) : undefined
      }
    >
      {data && (
        <TelemetryCard 
          data={chartData}
          xAxisKey="time"
          series={series}
          summaryMetrics={summaryMetrics}
          chartHeight={140}
        />
      )}
    </DashboardCard>
  );
});
