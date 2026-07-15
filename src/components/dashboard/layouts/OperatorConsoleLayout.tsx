import { memo, useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OperatorCard } from "@/components/dashboard/primitives/OperatorCard";
import { TimelineCard } from "@/components/dashboard/primitives/TimelineCard";

import { useAlertsDashboard, useRuntimeDashboard } from "@/hooks/useQueries";
import { toSeverity, formatRelativeTime } from "@/utils/format";

function toOperatorStatus(status: string): "active" | "away" | "offline" | "busy" {
  if (status === "active") return "active";
  if (status === "failed") return "offline";
  return "away";
}

export default memo(function OperatorConsoleLayout() {
  const alerts = useAlertsDashboard();
  const runtime = useRuntimeDashboard();

  const sortedAlerts = useMemo(() => {
    return [...(alerts.data?.alerts ?? [])].sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }, [alerts.data?.alerts]);

  const activities = useMemo(() => {
    return sortedAlerts.map(a => ({
      id: a.id,
      message: a.message,
      source: a.source,
      category: a.category ?? "alert",
      timestamp: formatRelativeTime(a.timestamp),
      severity: toSeverity(a.severity),
    }));
  }, [sortedAlerts]);

  // Derive operator cards from real /dashboard/runtime sessions
  const operators = useMemo(() =>
    (runtime.data?.sessions ?? []).slice(0, 4).map(s => ({
      name: s.session_id,
      role: s.current_operation ?? "Runtime Session",
      status: toOperatorStatus(s.status),
      taskCount: s.events_processed,
      assignment: s.current_operation ?? undefined,
    })), [runtime.data?.sessions]);

  const isLoading = alerts.isLoading || runtime.isLoading;
  const isError = !isLoading && (alerts.isError || runtime.isError);
  const hasData = alerts.data !== undefined || runtime.data !== undefined;

  return (
    <DashboardCard
      title="Operator Console"
      ariaLabel="Operator Console Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={hasData}
      onRetry={() => { alerts.refetch(); runtime.refetch(); }}
      errorMessage="Failed to load console data"
      skeletonCount={5}
      skeletonHeight="h-10"
    >
      {hasData && (
        <div className="flex flex-col gap-2 h-full">
          {operators.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {operators.slice(0, 2).map(op => (
                <OperatorCard 
                  key={op.name}
                  name={op.name}
                  role={op.role}
                  status={op.status}
                  taskCount={op.taskCount}
                  currentAssignment={op.assignment}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-3">No Runtime Data Available</p>
          )}

          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-sm font-semibold text-slate-300 mb-2 border-b border-slate-700/60 pb-1">Activity Log</h3>
            {activities.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No Runtime Data Available</p>
            ) : (
              <div className="space-y-0 overflow-y-auto flex-1 min-h-0 pr-2">
                {activities.map((a, i, arr) => (
                  <TimelineCard 
                    key={a.id}
                    message={a.message}
                    source={a.source}
                    category={a.category ?? "alert"}
                    timestamp={a.timestamp}
                    severity={a.severity}
                    isLast={i === arr.length - 1}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
