import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSystemStatus } from "@/hooks/useQueries";
import { statusColor, statusDot, formatTime } from "@/utils/format";
import type { OperationalStatus } from "@/types/api";
import type { ComponentStatus } from "@/types/runtime";

// Map runtime status strings to UI OperationalStatus
function toStatus(s: string): OperationalStatus {
  if (s === "operational") return "online";
  if (s === "degraded")    return "degraded";
  if (s === "offline")     return "offline";
  if (s === "warning")     return "warning";
  return "online";
}

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
    <section aria-label="System Health" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">System Health</h2>
        {data && (
          <span className={`text-xs font-bold ${statusColor(toStatus(data.overall_status))}`}>
            {data.overall_status}
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-7 bg-slate-700/50 rounded" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load system health</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">
            Retry
          </button>
        </div>
      )}

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
    </section>
  );
}
