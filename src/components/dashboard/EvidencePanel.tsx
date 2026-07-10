import { memo } from "react";
import { Cpu, FileText, User, BarChart2, Globe } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvidence } from "@/hooks/useQueries";
import { formatRelativeTime } from "@/utils/format";
import type { Evidence } from "@/types/api";

const TYPE_ICONS: Record<Evidence["type"], React.ElementType> = {
  sensor: Cpu,
  log: FileText,
  operator: User,
  model: BarChart2,
  external: Globe,
};

const TYPE_COLOR: Record<Evidence["type"], string> = {
  sensor: "text-blue-400",
  log: "text-slate-400",
  operator: "text-purple-400",
  model: "text-indigo-400",
  external: "text-teal-400",
};

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-emerald-500" : value >= 70 ? "bg-yellow-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-slate-400">{value}%</span>
    </div>
  );
}

const EvidenceRow = memo(({ ev }: { ev: Evidence }) => {
  const Icon = TYPE_ICONS[ev.type];
  return (
    <div className="flex gap-2.5 items-start py-2 border-b border-slate-700/30 last:border-0">
      <Icon size={13} className={`shrink-0 mt-0.5 ${TYPE_COLOR[ev.type]}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-xs font-medium text-slate-300 truncate">{ev.source}</span>
          <ConfidenceBar value={ev.confidence} />
        </div>
        <p className="text-xs text-slate-400 leading-snug line-clamp-2">{ev.description}</p>
        <div className="flex items-center gap-2 mt-1">
          {ev.relatedIncidentId && (
            <span className="text-xs font-mono text-slate-600">{ev.relatedIncidentId}</span>
          )}
          <span className="text-xs text-slate-600 ml-auto">{formatRelativeTime(ev.timestamp)}</span>
        </div>
      </div>
    </div>
  );
});

export default function EvidencePanel() {
  const { data, isLoading, isError, refetch } = useEvidence();

  return (
    <section aria-label="Evidence Panel" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Evidence Panel</h2>
        {data && <span className="text-xs text-slate-500">{data.length} records</span>}
      </div>

      {isLoading && (
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-16 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-4 gap-2">
          <p className="text-xs text-red-400">Failed to load evidence</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {data.map((e) => <EvidenceRow key={e.id} ev={e} />)}
        </div>
      )}
    </section>
  );
}
