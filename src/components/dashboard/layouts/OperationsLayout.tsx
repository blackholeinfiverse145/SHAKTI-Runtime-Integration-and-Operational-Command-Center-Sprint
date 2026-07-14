import { memo } from "react";
import { RefreshCw } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatusCard } from "@/components/dashboard/primitives/StatusCard";
import { RuntimeCard } from "@/components/dashboard/primitives/RuntimeCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { formatTime, toSeverity } from "@/utils/format";

export default memo(function OperationsLayout() {
  const { data, isLoading, isError, refetch, isFetching } = useOperationsDashboard();

  return (
    <DashboardCard
      title="Operations & Compute"
      ariaLabel="Operations Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load operations"
      skeletonCount={5}
      skeletonHeight="h-7"
      headerRight={
        <div className="flex items-center gap-2">
          {data && <span className="text-xs text-slate-500">{formatTime(data.timestamp)}</span>}
          <button onClick={() => refetch()} className="text-slate-500 hover:text-slate-300 transition-colors">
            <RefreshCw size={12} className={isFetching ? "animate-spin" : ""} />
          </button>
        </div>
      }
    >
      {data && (
        <div className="flex flex-col gap-4 h-full">
          <div className="grid grid-cols-2 gap-2">
            <RuntimeCard 
              id="node-primary" 
              status="active" 
              cpuUsage={data.system_load} 
              memoryUsage={data.system_load * 0.8} 
              connections={data.active_operations * 14} 
            />
            <RuntimeCard 
              id="node-replica" 
              status={data.system_load > 80 ? "active" : "standby"} 
              cpuUsage={data.system_load > 80 ? 40 : 5} 
              memoryUsage={12} 
              connections={data.queue_depth} 
            />
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center justify-between border-b border-slate-700/60 mb-1.5 pb-0.5">
              <h3 className="text-sm font-semibold text-slate-300">Active Operations</h3>
              {data.operations.length > 4 && (
                <span className="text-[10px] text-indigo-400 font-mono font-bold">
                  +{data.operations.length - 4} more
                </span>
              )}
            </div>
            <div className="space-y-0.5 overflow-y-auto flex-1 min-h-0 pr-1">
              {data.operations.length === 0
                ? <p className="text-xs text-slate-500 text-center py-3">No operations running</p>
                : data.operations.slice(0, 4).map((op) => (
                    <StatusCard 
                      key={op.id}
                      label={op.type}
                      severity={toSeverity(op.priority)}
                      progress={op.progress}
                      statusTheme={op.status === "running" ? "running" : op.status === "failed" ? "failed" : "pending"}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
