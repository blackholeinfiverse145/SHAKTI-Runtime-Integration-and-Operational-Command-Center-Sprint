import { memo, useState } from "react";
import { Play, CheckCircle, AlertOctagon } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useRuntimeDashboard } from "@/hooks/useQueries";
import { formatRelativeTime } from "@/utils/format";

type ReplayStatus = "running" | "completed" | "failed" | "idle";

const STATE_CONFIG: Record<ReplayStatus, { icon: React.ElementType; color: string; bar: string }> = {
  running:   { icon: Play,         color: "text-blue-400 animate-pulse", bar: "bg-blue-500" },
  completed: { icon: CheckCircle,  color: "text-emerald-400",             bar: "bg-emerald-500" },
  failed:    { icon: AlertOctagon, color: "text-red-400 animate-bounce",  bar: "bg-red-500" },
  idle:      { icon: Play,         color: "text-slate-500",               bar: "bg-slate-700" },
};

function toReplayState(status: string): ReplayStatus {
  if (status === "active" || status === "running") return "running";
  if (status === "completed" || status === "success") return "completed";
  if (status === "failed" || status === "error") return "failed";
  return "idle";
}

export default memo(function ReplayLayout() {
  const { data, isLoading, isError, refetch } = useRuntimeDashboard();

  const [showAll, setShowAll] = useState(false);

  const allSessions = data?.sessions ?? [];
  const sessions = showAll ? allSessions : allSessions.slice(0, 6);

  return (
    <DashboardCard
      title="Simulation & Replay"
      ariaLabel="Replay Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load replay sessions"
      skeletonCount={2}
      skeletonHeight="h-10"
      isEmpty={data !== undefined && allSessions.length === 0}
      emptyMessage="No Runtime Data Available"
      headerRight={data ? <span className="text-xs text-slate-500">{(data.active_sessions ?? 0)} active</span> : undefined}
    >
      {data && allSessions.length > 0 && (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="overflow-y-auto flex-1 min-h-0 pr-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/60 text-[12px] font-semibold text-slate-400">
                <th className="py-1 pb-1.5">Session</th>
                <th className="py-1 pb-1.5">Operation</th>
                <th className="py-1 pb-1.5">Progress</th>
                <th className="py-1 pb-1.5 text-right">Events</th>
                <th className="py-1 pb-1.5 text-right">Started</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const state = toReplayState(s.status);
                const cfg = STATE_CONFIG[state] ?? STATE_CONFIG.idle;
                const Icon = cfg.icon;
                const clampedProgress = Math.min(100, Math.max(0, s.progress ?? 0));
                
                return (
                  <tr key={s.session_id} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 text-[13px] text-slate-200">
                    <td className="py-1 font-mono text-[11px] text-slate-350">
                      <div className="flex items-center gap-1">
                        <Icon size={10} className={`${cfg.color} shrink-0`} />
                        <span title={s.session_id}>{s.session_id.slice(0, 6)}</span>
                      </div>
                    </td>
                    <td className="py-1 font-semibold text-slate-250 truncate max-w-[110px]" title={s.current_operation ?? "Simulation Sequence"}>
                      {s.current_operation ?? "Simulation Sequence"}
                    </td>
                    <td className="py-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-10 h-1 bg-slate-850 rounded-full overflow-hidden shrink-0 bg-slate-900">
                          <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${clampedProgress}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-slate-400 shrink-0">{clampedProgress}%</span>
                      </div>
                    </td>
                    <td className="py-1 text-right font-mono text-[11px] text-slate-450">
                      {(s.events_processed ?? 0).toLocaleString()}
                    </td>
                    <td className="py-1 text-right text-slate-500 text-[11px]">
                      {s.started_at ? formatRelativeTime(s.started_at) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          {allSessions.length > 6 && (
            <div className="flex justify-between items-center pt-1 border-t border-slate-700/40">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
              >
                {showAll ? "Show Less" : `View All (${allSessions.length})`}
              </button>
              <span className="text-[10px] text-slate-500 font-mono">{allSessions.length} sessions</span>
            </div>
          )}
        </div>
      )}
    </DashboardCard>
  );
});
