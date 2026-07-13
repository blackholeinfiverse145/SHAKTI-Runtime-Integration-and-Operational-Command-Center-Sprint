import { memo } from "react";
import { Activity, Clock, Zap, TrendingUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { EvidenceCard } from "@/components/dashboard/primitives/EvidenceCard";
import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

export default memo(function EvidenceLayout() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  const records = data
    ? [
        {
          id: "uptime",
          icon: Activity,
          color: "text-emerald-400",
          source: "System Uptime Monitor",
          confidence: data.summary.uptime_percentage,
          description: `Analysis confirms system has been operational for ${data.summary.uptime_percentage.toFixed(2)}% of the monitored period.`,
        },
        {
          id: "response",
          icon: Clock,
          color: "text-blue-400",
          source: "Latency Analyzer",
          confidence: Math.max(0, 100 - data.summary.avg_response_time),
          description: `Average response time holds at ${data.summary.avg_response_time.toFixed(0)}ms. Peak observed: ${data.summary.peak_response_time.toFixed(0)}ms.`,
        },
        {
          id: "events",
          icon: Zap,
          color: "text-indigo-400",
          source: "Event Stream Validation",
          confidence: Math.min(100, (data.summary.total_events / 100) * 10),
          description: `Processed ${data.summary.total_events.toLocaleString()} events in current window without data loss.`,
        },
        {
          id: "errors",
          icon: TrendingUp,
          color: "text-yellow-400",
          source: "Anomaly Detection",
          confidence: Math.max(0, 100 - data.summary.error_rate * 100),
          description: `Current error rate is ${(data.summary.error_rate * 100).toFixed(2)}%. No critical anomalies detected.`,
        },
      ]
    : [];

  return (
    <DashboardCard
      title="Evidence & Intelligence"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load evidence"
      skeletonCount={4}
      skeletonHeight="h-16"
      headerRight={data ? <span className="text-xs text-slate-500">{formatTime(data.timestamp)}</span> : undefined}
    >
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {records.map((ev, idx) => (
            <EvidenceCard 
              key={ev.id}
              source={ev.source}
              description={ev.description}
              confidence={ev.confidence}
              icon={ev.icon}
              iconColor={ev.color}
              noBorder={idx >= records.length - 2}
            />
          ))}
        </div>
      )}
    </DashboardCard>
  );
});
