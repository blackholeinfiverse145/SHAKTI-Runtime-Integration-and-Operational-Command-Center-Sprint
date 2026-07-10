import { memo } from "react";
import { Play, CheckCircle, Pause, XCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useReplayJobs } from "@/hooks/useQueries";
import { formatRelativeTime } from "@/utils/format";
import type { ReplayJob } from "@/types/api";

const STATE_CONFIG: Record<ReplayJob["state"], { icon: React.ElementType; color: string; bar: string }> = {
  running: { icon: Play, color: "text-blue-400", bar: "bg-blue-500" },
  completed: { icon: CheckCircle, color: "text-emerald-400", bar: "bg-emerald-500" },
  paused: { icon: Pause, color: "text-yellow-400", bar: "bg-yellow-500" },
  failed: { icon: XCircle, color: "text-red-400", bar: "bg-red-500" },
  idle: { icon: Clock, color: "text-slate-400", bar: "bg-slate-500" },
};

const ReplayRow = memo(({ job }: { job: ReplayJob }) => {
  const cfg = STATE_CONFIG[job.state];
  const Icon = cfg.icon;
  return (
    <div className="bg-slate-700/30 rounded p-2.5 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <Icon size={12} className={cfg.color} />
          <span className="text-xs text-slate-200 font-medium line-clamp-1">{job.name}</span>
        </div>
        <span className={`text-xs font-semibold capitalize shrink-0 ${cfg.color}`}>{job.state}</span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{job.eventsProcessed.toLocaleString()} / {job.totalEvents.toLocaleString()} events</span>
          <span>{job.progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${cfg.bar}`} style={{ width: `${job.progress}%` }} />
        </div>
      </div>
      <div className="flex justify-between text-xs text-slate-600">
        <span>Duration: {job.duration}</span>
        <span>Started {formatRelativeTime(job.startTime)}</span>
      </div>
    </div>
  );
});

export default function ReplayStatus() {
  const { data, isLoading, isError, refetch } = useReplayJobs();

  return (
    <section aria-label="Replay Status" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Replay Status</h2>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-20 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load replay jobs</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-2">
          {data.length === 0
            ? <p className="text-xs text-slate-500 text-center py-4">No replay jobs</p>
            : data.map((j) => <ReplayRow key={j.id} job={j} />)}
        </div>
      )}
    </section>
  );
}
