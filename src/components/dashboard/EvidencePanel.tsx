import { Activity, Zap, Clock, TrendingUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

function ConfidenceBar({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  const color = clamped >= 90 ? "bg-emerald-500" : clamped >= 70 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${clamped}%` }} />
      </div>
      <span className="text-xs text-slate-400">{clamped.toFixed(1)}%</span>
    </div>
  );
}

export default function EvidencePanel() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  // Build evidence-style rows from telemetry summary
  const records = data
    ? [
        {
          id: "uptime",
          icon: Activity,
          color: "text-emerald-400",
          source: "System Uptime",
          confidence: data.summary.uptime_percentage,
          description: `System has been operational for ${data.summary.uptime_percentage.toFixed(2)}% of the monitored period.`,
        },
        {
          id: "response",
          icon: Clock,
          color: "text-blue-400",
          source: "Avg Response Time",
          confidence: Math.max(0, 100 - data.summary.avg_response_time),
          description: `Average response time: ${data.summary.avg_response_time.toFixed(0)}ms. Peak: ${data.summary.peak_response_time.toFixed(0)}ms.`,
        },
        {
          id: "events",
          icon: Zap,
          color: "text-indigo-400",
          source: "Event Processing",
          confidence: Math.min(100, (data.summary.total_events / 100) * 10),
          description: `Total events processed in current window: ${data.summary.total_events.toLocaleString()}.`,
        },
        {
          id: "errors",
          icon: TrendingUp,
          color: "text-yellow-400",
          source: "Error Rate",
          confidence: Math.max(0, 100 - data.summary.error_rate * 100),
          description: `Current error rate: ${(data.summary.error_rate * 100).toFixed(2)}%. Target: <1%.`,
        },
      ]
    : [];

  return (
    <DashboardCard
      title="Evidence Panel"
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
          {records.map((ev) => (
            <div key={ev.id} className="flex gap-2.5 items-start py-2 border-b border-slate-700/30 last:border-0">
              <ev.icon size={13} className={`shrink-0 mt-0.5 ${ev.color}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="text-xs font-medium text-slate-300 truncate">{ev.source}</span>
                  <ConfidenceBar value={ev.confidence} />
                </div>
                <p className="text-xs text-slate-400 leading-snug line-clamp-2">{ev.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardCard>
  );
}
