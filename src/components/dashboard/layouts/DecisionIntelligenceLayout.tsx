import { memo, useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { DecisionCard } from "@/components/dashboard/primitives/DecisionCard";
import { CapabilityCard } from "@/components/dashboard/primitives/CapabilityCard";

import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity } from "@/utils/format";

export default memo(function DecisionIntelligenceLayout() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  // Map real operations directly — no fabricated text
  const decisions = useMemo(() => (data?.operations ?? []).map(op => ({
    id: op.id,
    action: op.description,
    actor: op.agent,
    reason: `Priority: ${op.priority}. Progress: ${op.progress}%.`,
    status: op.status === "completed" ? "executed" as const : "pending_approval" as const,
    severity: toSeverity(op.priority),
    isAutomated: true,
  })), [data?.operations]);

  const loadSheddingActive = useMemo(() => data ? data.system_load > 85 : false, [data?.system_load]);
  const autoScalingActive = useMemo(() => data ? data.active_operations > 5 : false, [data?.active_operations]);

  return (
    <DashboardCard
      title="Decision Intelligence"
      ariaLabel="Decision Intelligence Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load intelligence data"
      skeletonCount={4}
      skeletonHeight="h-20"
      isEmpty={data !== undefined && decisions.length === 0}
      emptyMessage="No Runtime Data Available"
    >
      {data && decisions.length > 0 && (
        <div className="flex flex-col gap-2.5 h-full">
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
              status="online"
              isEngaged={loadSheddingActive}
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-sm font-semibold text-slate-300 mb-1.5 border-b border-slate-700/60 pb-0.5">Recent Decisions</h3>
            <div className="space-y-1 overflow-y-auto flex-1 min-h-0">
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
