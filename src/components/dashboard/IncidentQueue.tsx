import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useIncidents } from "@/hooks/useQueries";
import { severityColor, severityBg, formatRelativeTime } from "@/utils/format";
import type { Incident } from "@/types/api";

const STATUS_COLOR: Record<Incident["status"], string> = {
  open: "text-red-400",
  investigating: "text-yellow-400",
  resolved: "text-emerald-400",
  closed: "text-slate-500",
};

const IncidentRow = memo(({ incident }: { incident: Incident }) => (
  <div className={`p-2 rounded border ${severityBg(incident.severity)}`}>
    <div className="flex items-start justify-between gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs font-mono text-slate-500">{incident.id}</span>
          <span className={`text-xs font-semibold uppercase ${severityColor(incident.severity)}`}>{incident.severity}</span>
        </div>
        <p className="text-xs text-slate-200 leading-snug line-clamp-1">{incident.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-slate-500">{incident.location}</span>
          <span className="text-xs text-slate-600">·</span>
          <span className="text-xs text-slate-500">{incident.assignedOperator}</span>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className={`text-xs font-medium capitalize ${STATUS_COLOR[incident.status]}`}>{incident.status}</p>
        <p className="text-xs text-slate-600 mt-0.5">{formatRelativeTime(incident.createdAt)}</p>
      </div>
    </div>
  </div>
));

export default function IncidentQueue() {
  const { data, isLoading, isError, refetch } = useIncidents();

  return (
    <section aria-label="Incident Queue" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Incident Queue</h2>
        {data && (
          <span className="text-xs text-slate-500">{data.filter(i => i.status !== "closed").length} active</span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load incidents</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-1.5 overflow-y-auto max-h-64">
          {data.length === 0
            ? <p className="text-xs text-slate-500 text-center py-4">No active incidents</p>
            : data.map((i) => <IncidentRow key={i.id} incident={i} />)}
        </div>
      )}
    </section>
  );
}
