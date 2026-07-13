import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ReplayCard } from "@/components/dashboard/primitives/ReplayCard";
import { useRuntimeDashboard } from "@/hooks/useQueries";
import { toReplayState, formatRelativeTime } from "@/utils/format";

export default memo(function ReplayLayout() {
  const { data, isLoading, isError, refetch } = useRuntimeDashboard();

  return (
    <DashboardCard
      title="Simulation & Replay"
      ariaLabel="Replay Layout"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load replay sessions"
      skeletonCount={2}
      skeletonHeight="h-24"
      isEmpty={data?.sessions.length === 0}
      emptyMessage="No active simulations"
      headerRight={data ? <span className="text-xs text-slate-500">{data.active_sessions} active</span> : undefined}
    >
      {data && (
        <div className="space-y-2">
          {data.sessions.map((s) => (
            <ReplayCard 
              key={s.session_id}
              title={s.current_operation ?? "Simulation Sequence"}
              state={toReplayState(s.status)}
              progress={s.progress}
              metricText={`${s.events_processed.toLocaleString()} events`}
              sessionId={s.session_id.slice(0, 8)}
              timeSubtext={`Started ${formatRelativeTime(s.started_at)}`}
            />
          ))}
        </div>
      )}
    </DashboardCard>
  );
});
