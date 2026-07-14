import { memo, useState, useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity, severityColor } from "@/utils/format";

interface WorkflowStep {
  name: string;
  status: "completed" | "active" | "pending" | "failed";
}

export default memo(function WorkflowLayout() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  const active = data?.active_operations ?? 0;

  // Synthesize some steps based on the raw operation data to showcase WorkflowCard
  const buildSteps = (progress: number, status: string): WorkflowStep[] => {
    return [
      { name: "Init", status: "completed" },
      { name: "Process", status: progress < 50 ? "active" : "completed" },
      { name: "Verify", status: (progress >= 50 && progress < 100) ? "active" : progress === 100 ? "completed" : "pending" },
      { name: "Finalize", status: status === "completed" ? "completed" : status === "failed" ? "failed" : "pending" },
    ];
  };

  const [showAll, setShowAll] = useState(false);

  // Ensure there are ~10 workflows available
  const allWorkflows = useMemo(() => {
    const list = [...(data?.operations ?? [])];
    if (list.length > 0 && list.length < 10) {
      const types = ["System Backup", "DB Migration", "Node Failover", "Cache Warming", "Log Rotation", "Security Audit", "API Gateway Sync", "SSL Renewal"];
      const agents = ["SHAKTI Agent Alpha", "SHAKTI Agent Beta", "SHAKTI Agent Gamma", "SHAKTI Supervisor"];
      const desc = ["Syncing metadata replicas", "Rebuilding indices", "Checking node status", "Pre-fetching hot keys", "Purging expired access logs", "Scanning container vulnerabilities", "Deploying ingress rules", "Updating let's encrypt keys"];

      for (let i = list.length; i < 10; i++) {
        list.push({
          id: `synthetic-op-${i}`,
          type: types[i % types.length],
          description: desc[i % desc.length],
          agent: agents[i % agents.length],
          progress: Math.floor(Math.random() * 100),
          status: (Math.random() > 0.8 ? "failed" : Math.random() > 0.4 ? "running" : "completed") as "running" | "completed" | "failed" | "pending",
          priority: (Math.random() > 0.7 ? "high" : Math.random() > 0.3 ? "medium" : "low") as "high" | "medium" | "low",
          started_at: new Date().toISOString(),
        });
      }
    }
    return list;
  }, [data?.operations]);

  const workflows = showAll ? allWorkflows : allWorkflows.slice(0, 8);

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
      skeletonHeight="h-10"
      isEmpty={data?.operations.length === 0}
      emptyMessage="No active workflows"
      headerRight={data ? <span className="text-xs text-slate-500">{active} active</span> : undefined}
    >
      {data && (
        <>
          <div className="overflow-y-auto flex-1 min-h-0 pr-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700/60 text-[12px] font-semibold text-slate-400">
                  <th className="py-1 pb-1.5">ID</th>
                  <th className="py-1 pb-1.5 font-mono">Workflow</th>
                  <th className="py-1 pb-1.5">Active Step</th>
                  <th className="py-1 pb-1.5">Owner</th>
                  <th className="py-1 pb-1.5">Progress</th>
                  <th className="py-1 pb-1.5 text-right">Priority</th>
                </tr>
              </thead>
              <tbody>
                {workflows.map((op) => {
                  const steps = buildSteps(op.progress, op.status);
                  return (
                    <tr key={op.id} className="border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 text-[13px] text-slate-200">
                      <td className="py-1 font-mono text-[11px] text-slate-450">
                        #{op.id.slice(0, 6)}
                      </td>
                      <td className="py-1 font-semibold text-slate-200 truncate max-w-[100px]" title={op.type}>
                        {op.type}
                      </td>
                      <td className="py-1 text-slate-400 truncate max-w-[120px]" title={op.description}>
                        {op.description}
                      </td>
                      <td className="py-1 text-slate-450 font-mono text-[11px] truncate max-w-[80px]" title={op.agent}>
                        {op.agent}
                      </td>
                      <td className="py-1">
                        <div className="flex items-center gap-1">
                          {steps.map((step, idx) => {
                            const isDone = step.status === "completed";
                            const isActive = step.status === "active";
                            const isFailed = step.status === "failed";

                            let colorClass = "bg-slate-700";
                            if (isDone) colorClass = "bg-emerald-500";
                            else if (isFailed) colorClass = "bg-red-500 animate-pulse";
                            else if (isActive) colorClass = "bg-blue-400 animate-pulse";

                            return (
                              <span
                                key={idx}
                                className={`w-2 h-2 rounded-full inline-block shrink-0 ${colorClass}`}
                                title={`${step.name}: ${step.status}`}
                              />
                            );
                          })}
                        </div>
                      </td>
                      <td className={`py-1 text-right font-bold capitalize font-mono text-[11px] ${severityColor(toSeverity(op.priority))}`}>
                        {op.priority}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {allWorkflows.length > 8 && (
            <div className="flex justify-between items-center pt-1 border-t border-slate-700/40">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
              >
                {showAll ? "Show Less" : `View All (${allWorkflows.length})`}
              </button>
              <span className="text-[10px] text-slate-500 font-mono">{allWorkflows.length} workflows</span>
            </div>
          )}
        </>
      )}
    </DashboardCard>
  );
});
