import { memo } from "react";
import { Play, CheckCircle, Pause, XCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRuntimeDashboard } from "@/hooks/useQueries";
import { formatRelativeTime } from "@/utils/format";
import type { ReplayState } from "@/types/api";
import type { RuntimeSession } from "@/types/runtime";

function toReplayState(s: string): ReplayState {
  if (s === "active")    return "running";
  if (s === "completed") return "completed";
  if (s === "failed")    return "failed";
  if (s === "idle")      return "idle";
  return "idle";
}

const STATE_CONFIG: Record<ReplayState, { icon: React.ElementType; color: string; bar: string }> = {
  running:   { icon: Play,        color: "text-blue-400",    bar: "bg-blue-500" },
  completed: { icon: CheckCircle, color: "text-emerald-400", bar: "bg-emerald-500" },
  paused:    { icon: Pause,       color: "text-yellow-400",  bar: "bg-yellow-500" },
  failed:    { icon: XCircle,     color: "text-red-400",     bar: "bg-red-500" },
  idle:      { icon: Clock,       color: "text-slate-400",   bar: "bg-slate-500" },
};

const SessionRow = memo(({ session }: { session: RuntimeSession }) => {
  const state = toReplayState(session.status);
  const cfg = STATE_CONFIG[state];
  const Icon = cfg.icon;
  const progress = Math.min(100, Math.max(0, session.progress));

  return (
    <div className="bg-slate-700/30 rounded p-2.5 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon size={12} className={cfg.color} />
          <span className="text-xs text-slate-200 font-medium line-clamp-1">
            {session.current_operation ?? session.session_id.slice(0, 16)}
          </span>
        </div>
        <span className={`text-xs font-semibold capitalize shrink-0 ${cfg.color}`}>{session.status}</span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-slate-500">
          <span>{session.events_processed.toLocaleString()} events</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${cfg.bar}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex justify-between text-xs text-slate-600">
        <span>ID: {session.session_id.slice(0, 8)}</span>
        <span>Started {formatRelativeTime(session.started_at)}</span>
      </div>
    </div>
  );
});

export default function ReplayStatus() {
  const { data, isLoading, isError, refetch } = useRuntimeDashboard();

  return (
    <section aria-label="Replay Status" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Runtime Sessions</h2>
        {data && (
          <span className="text-xs text-slate-500">{data.active_sessions} active</span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-20 bg-slate-700/50 rounded" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load runtime sessions</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-2">
          {data.sessions.length === 0
            ? <p className="text-xs text-slate-500 text-center py-4">No active sessions</p>
            : data.sessions.map((s) => <SessionRow key={s.session_id} session={s} />)}
        </div>
      )}
    </section>
  );
}
