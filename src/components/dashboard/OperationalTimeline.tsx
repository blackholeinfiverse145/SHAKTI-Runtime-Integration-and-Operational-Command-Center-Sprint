import { memo } from "react";
import { Cpu, User, AlertCircle, FileText } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useTimeline } from "@/hooks/useQueries";
import { severityColor, formatRelativeTime, formatTime } from "@/utils/format";
import type { TimelineEvent } from "@/types/api";

const CATEGORY_ICONS: Record<TimelineEvent["category"], React.ElementType> = {
  system: Cpu,
  operator: User,
  alert: AlertCircle,
  incident: FileText,
};

const CATEGORY_COLOR: Record<TimelineEvent["category"], string> = {
  system: "text-blue-400 bg-blue-500/10",
  operator: "text-slate-400 bg-slate-500/10",
  alert: "text-orange-400 bg-orange-500/10",
  incident: "text-red-400 bg-red-500/10",
};

const EventRow = memo(({ event }: { event: TimelineEvent }) => {
  const Icon = CATEGORY_ICONS[event.category];
  return (
    <div className="flex gap-2.5 items-start">
      <div className={`p-1 rounded shrink-0 mt-0.5 ${CATEGORY_COLOR[event.category]}`}>
        <Icon size={10} />
      </div>
      <div className="flex-1 min-w-0 border-b border-slate-700/30 pb-2">
        <p className="text-xs text-slate-200 leading-snug">{event.event}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-600">{event.source}</span>
          {event.severity && (
            <span className={`text-xs font-medium uppercase ${severityColor(event.severity)}`}>{event.severity}</span>
          )}
          <span className="text-xs text-slate-600 ml-auto">{formatRelativeTime(event.timestamp)}</span>
        </div>
      </div>
    </div>
  );
});

export default function OperationalTimeline() {
  const { data, isLoading, isError, refetch } = useTimeline();

  return (
    <section aria-label="Operational Timeline" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Operational Timeline</h2>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load timeline</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-2 overflow-y-auto max-h-64">
          {data.map((e) => <EventRow key={e.id} event={e} />)}
        </div>
      )}
    </section>
  );
}
