import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { WorkflowCard } from "@/components/dashboard/primitives/WorkflowCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity } from "@/utils/format";

export default memo(function WorkflowLayout() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  const active = data?.active_operations ?? 0;

  // Synthesize some steps based on the raw operation data to showcase WorkflowCard
  const buildSteps = (progress: number, status: string) => {
    return [
      { name: "Init", status: "completed" as const },
      { name: "Process", status: progress < 50 ? "active" : "completed" as const },
      { name: "Verify", status: progress >= 50 && progress < 100 ? "active" : progress === 100 ? "completed" : "pending" as const },
      { name: "Finalize", status: status === "completed" ? "completed" : status === "failed" ? "failed" : "pending" as const },
    ];
  };

  return (
    <DashboardCard
      title="Active Workflows"
      ariaLabel="Workflow Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load workflows"
      skeletonCount={3}
      skeletonHeight="h-24"
      isEmpty={data?.operations.length === 0}
      emptyMessage="No active workflows"
      headerRight={data ? <span className="text-xs text-slate-500">{active} active</span> : undefined}
    >
      {data && (
        <div className="space-y-2 overflow-y-auto max-h-[400px]">
          {data.operations.map((op) => (
            <WorkflowCard 
              key={op.id}
              title={op.type}
              currentStep={op.description}
              severity={toSeverity(op.priority)}
              executionId={op.id}
              steps={buildSteps(op.progress, op.status)}
            />
          ))}
        </div>
      )}
    </DashboardCard>
  );
});
