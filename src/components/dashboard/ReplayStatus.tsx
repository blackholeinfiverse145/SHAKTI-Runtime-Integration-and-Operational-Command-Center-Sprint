import { memo } from "react";
import { Play, CheckCircle, Pause, XCircle, Clock } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useRuntimeDashboard } from "@/hooks/useQueries";
import { toReplayState, formatRelativeTime } from "@/utils/format";
import type { ReplayState } from "@/types/api";
import type { RuntimeSession } from "@/types/runtime";

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
    <DashboardCard
      title="Runtime Sessions"
      ariaLabel="Replay Status"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load runtime sessions"
      skeletonCount={2}
      skeletonHeight="h-20"
      isEmpty={data?.sessions.length === 0}
      emptyMessage="No active sessions"
      headerRight={data ? <span className="text-xs text-slate-500">{data.active_sessions} active</span> : undefined}
    >
      {data && (
        <div className="space-y-2">
          {data.sessions.map((s) => <SessionRow key={s.session_id} session={s} />)}
        </div>
      )}
    </DashboardCard>
  );
}
