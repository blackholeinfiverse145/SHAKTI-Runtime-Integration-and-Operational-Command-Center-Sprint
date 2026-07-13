import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useSystemStatus } from "@/hooks/useQueries";
import { toStatus, statusColor, statusDot, formatTime } from "@/utils/format";
import type { OperationalStatus } from "@/types/api";
import type { ComponentStatus } from "@/types/runtime";

// Map overall_status to a 0–100 score for the progress bar
function toScore(s: string, components: ComponentStatus[]): number {
  if (!components.length) return 0;
  const operational = components.filter((c) => c.status === "operational").length;
  return Math.round((operational / components.length) * 100);
}

const ServiceRow = memo(({ svc }: { svc: ComponentStatus }) => {
  const status = toStatus(svc.status);
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-slate-700/30 last:border-0">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot(status)}`} />
      <span className="text-xs text-slate-300 flex-1 truncate">{svc.name}</span>
      <span className="text-xs text-slate-500 w-14 text-right">
        {svc.response_time_ms != null ? `${svc.response_time_ms}ms` : "—"}
      </span>
      <span className="text-xs text-slate-500 w-14 text-right truncate" title={svc.details}>
        {svc.details ? svc.details.slice(0, 8) : "—"}
      </span>
      <span className={`text-xs font-medium w-16 text-right capitalize ${statusColor(status)}`}>
        {status}
      </span>
    </div>
  );
});

export default function SystemHealth() {
  const { data, isLoading, isError, refetch } = useSystemStatus();

  const score = data ? toScore(data.overall_status, data.components) : 0;

  return (
    <DashboardCard
      title="System Health"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load system health"
      skeletonCount={6}
      skeletonHeight="h-7"
      headerRight={
        data ? (
          <span className={`text-xs font-bold ${statusColor(toStatus(data.overall_status))}`}>
            {data.overall_status}
          </span>
        ) : undefined
      }
    >
      {data && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs text-slate-400">{score}%</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600 mb-1 px-0.5">
            <span className="flex-1">Component</span>
            <span className="w-14 text-right">Response</span>
            <span className="w-14 text-right">Detail</span>
            <span className="w-16 text-right">Status</span>
          </div>

          {data.components.map((c) => (
            <ServiceRow key={c.name} svc={c} />
          ))}

          <p className="text-xs text-slate-600 text-right">
            Checked {formatTime(data.timestamp)}
          </p>
        </>
      )}
    </DashboardCard>
  );
}
