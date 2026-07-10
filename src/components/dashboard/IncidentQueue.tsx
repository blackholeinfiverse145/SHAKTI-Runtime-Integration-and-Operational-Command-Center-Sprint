import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { severityColor, severityBg, formatRelativeTime } from "@/utils/format";
import type { Severity, IncidentStatus } from "@/types/api";
import type { OperationItem } from "@/types/runtime";

function toSeverity(p: string): Severity {
  if (p === "critical" || p === "high" || p === "medium" || p === "low") return p;
  return "info";
}

function toIncidentStatus(s: string): IncidentStatus {
  if (s === "running")   return "investigating";
  if (s === "completed") return "resolved";
  if (s === "failed")    return "closed";
  if (s === "pending")   return "open";
  if (s === "paused")    return "open";
  return "open";
}

const STATUS_COLOR: Record<IncidentStatus, string> = {
  open: "text-red-400",
  investigating: "text-yellow-400",
  resolved: "text-emerald-400",
  closed: "text-slate-500",
};

const OperationRow = memo(({ op }: { op: OperationItem }) => {
  const severity = toSeverity(op.priority);
  const status = toIncidentStatus(op.status);
  return (
    <div className={`p-2 rounded border ${severityBg(severity)}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-mono text-slate-500">{op.id.slice(0, 12)}</span>
            <span className={`text-xs font-semibold uppercase ${severityColor(severity)}`}>{op.priority}</span>
          </div>
          <p className="text-xs text-slate-200 leading-snug line-clamp-1">{op.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">{op.type}</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500">{op.agent}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-xs font-medium capitalize ${STATUS_COLOR[status]}`}>{op.status}</p>
          <p className="text-xs text-slate-600 mt-0.5">{formatRelativeTime(op.started_at)}</p>
          {op.progress > 0 && op.progress < 100 && (
            <p className="text-xs text-slate-600">{op.progress}%</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default function IncidentQueue() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  const active = data?.active_operations ?? 0;

  return (
    <section aria-label="Incident Queue" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Operations Queue</h2>
        {data && (
          <span className="text-xs text-slate-500">{active} active</span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-16 bg-slate-700/50 rounded" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load operations</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-1.5 overflow-y-auto max-h-64">
          {data.operations.length === 0
            ? <p className="text-xs text-slate-500 text-center py-4">No active operations</p>
            : data.operations.map((op) => <OperationRow key={op.id} op={op} />)}
        </div>
      )}
    </section>
  );
}
