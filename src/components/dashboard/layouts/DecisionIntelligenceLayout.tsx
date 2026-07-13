import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DecisionCard } from "@/components/dashboard/primitives/DecisionCard";
import { CapabilityCard } from "@/components/dashboard/primitives/CapabilityCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity } from "@/utils/format";

export default memo(function DecisionIntelligenceLayout() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  // Synthesize decisions and capabilities from operations data to showcase layout
  const decisions = data?.operations.slice(0, 2).map(op => ({
    id: op.id,
    action: op.type.includes("Backup") ? "Initiated Failover Sequence" : `Scaled ${op.type} Resources`,
    actor: "SHAKTI AI Supervisor",
    reason: `Automated response to priority ${op.priority} event. Current progress at ${op.progress}%.`,
    status: op.progress === 100 ? "executed" as const : "pending_approval" as const,
    severity: toSeverity(op.priority),
    isAutomated: true,
  })) ?? [];

  const loadSheddingActive = data ? data.system_load > 85 : false;
  const autoScalingActive = data ? data.active_operations > 5 : false;

  return (
    <DashboardCard
      title="Decision Intelligence"
      ariaLabel="Decision Intelligence Layout"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load intelligence data"
      skeletonCount={4}
      skeletonHeight="h-20"
      isEmpty={data !== undefined && decisions.length === 0}
      emptyMessage="No automated decisions active"
    >
      {data && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <CapabilityCard 
              name="Predictive Scaling"
              description="AI-driven resource scaling"
              status="online"
              isEngaged={autoScalingActive}
            />
            <CapabilityCard 
              name="Load Shedding"
              description="Emergency request dropping"
              status={loadSheddingActive ? "online" : "online"}
              isEngaged={loadSheddingActive}
            />
          </div>

          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 border-b border-slate-700/50 pb-1">Recent Decisions</h3>
            <div className="space-y-2">
              {decisions.map(d => (
                <DecisionCard 
                  key={d.id}
                  action={d.action}
                  actor={d.actor}
                  reason={d.reason}
                  status={d.status}
                  severity={d.severity}
                  isAutomated={d.isAutomated}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
