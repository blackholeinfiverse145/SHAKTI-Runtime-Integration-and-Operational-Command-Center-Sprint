import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { OperatorCard } from "@/components/dashboard/primitives/OperatorCard";
import { TimelineCard } from "@/components/dashboard/primitives/TimelineCard";
import { useAlertsDashboard } from "@/hooks/useQueries";
import { toSeverity, formatRelativeTime } from "@/utils/format";

export default memo(function OperatorConsoleLayout() {
  const { data, isLoading, isError, refetch } = useAlertsDashboard();

  // Synthesize operators for the layout
  const operators = [
    { name: "P. Bhuwad", role: "Grid Controller", status: "active" as const, taskCount: 3, assignment: "Load Balancing Sector 4" },
    { name: "A. System", role: "AI Supervisor", status: "active" as const, taskCount: 12, assignment: "Predictive Analytics" },
  ];

  return (
    <DashboardCard
      title="Operator Console"
      ariaLabel="Operator Console Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load timeline"
      skeletonCount={5}
      skeletonHeight="h-10"
      isEmpty={data?.alerts.length === 0}
      emptyMessage="No events in timeline"
    >
      {data && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {operators.map(op => (
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

          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 border-b border-slate-700/50 pb-1">Activity Log</h3>
            <div className="space-y-0 overflow-y-auto max-h-64 pr-2">
              {[...data.alerts]
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((a, i, arr) => (
                  <TimelineCard 
                    key={a.id}
                    message={a.message}
                    source={a.source}
                    category={a.category ?? "alert"}
                    timestamp={formatRelativeTime(a.timestamp)}
                    severity={toSeverity(a.severity)}
                    isLast={i === arr.length - 1}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
