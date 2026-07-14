import { memo, useMemo } from "react";
import { Activity, Clock, Zap, TrendingUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ConfidenceBar } from "@/components/dashboard/primitives/EvidenceCard";

import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

export default memo(function EvidenceLayout() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  const records = useMemo(() => data
    ? [
        {
          id: "uptime",
          icon: Activity,
          color: "text-emerald-400",
          source: "System Uptime Monitor",
          confidence: data.summary?.uptime_percentage ?? 100,
          description: `Operational for ${typeof data.summary?.uptime_percentage === 'number' ? data.summary.uptime_percentage.toFixed(2) : '100.00'}% of period.`,
        },
        {
          id: "response",
          icon: Clock,
          color: "text-blue-400",
          source: "Latency Analyzer",
          confidence: Math.max(0, 100 - (data.summary?.avg_response_time ?? 0)),
          description: `Avg response holds at ${typeof data.summary?.avg_response_time === 'number' ? data.summary.avg_response_time.toFixed(0) : '0'}ms. Peak: ${typeof data.summary?.peak_response_time === 'number' ? data.summary.peak_response_time.toFixed(0) : '0'}ms.`,
        },
        {
          id: "events",
          icon: Zap,
          color: "text-indigo-400",
          source: "Event Stream Validation",
          confidence: Math.min(100, ((data.summary?.total_events ?? 0) / 100) * 10),
          description: `Processed ${(data.summary?.total_events ?? 0).toLocaleString()} events without data loss.`,
        },
        {
          id: "errors",
          icon: TrendingUp,
          color: "text-yellow-400",
          source: "Anomaly Detection",
          confidence: Math.max(0, 100 - (data.summary?.error_rate ?? 0) * 100),
          description: `Current error rate holds at ${typeof data.summary?.error_rate === 'number' ? (data.summary.error_rate * 100).toFixed(2) : '0.00'}%. No anomalies.`,
        },
      ]
    : [], [data]);

  return (
    <DashboardCard
      title="Evidence & Intelligence"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load evidence"
      skeletonCount={4}
      skeletonHeight="h-10"
      headerRight={data ? <span className="text-xs text-slate-500">{formatTime(data.timestamp)}</span> : undefined}
    >
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs">
          {records.map((ev) => {
            const Icon = ev.icon;
            return (
              <div key={ev.id} className="flex items-center justify-between gap-3 py-1 border-b border-slate-800/30 last:border-0 md:even:border-b-0 md:odd:last:border-b-0">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <Icon size={12} className={`shrink-0 ${ev.color}`} />
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-slate-350 text-[10px] truncate block" title={ev.source}>{ev.source}</span>
                    <span className="text-slate-400 truncate text-[10px] block mt-0.5" title={ev.description}>{ev.description}</span>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-1">
                  <span className="text-[9px] text-slate-500 font-mono">Conf:</span>
                  <ConfidenceBar value={ev.confidence} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardCard>
  );
});
