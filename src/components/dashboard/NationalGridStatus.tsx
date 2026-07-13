import { memo } from "react";
import { RefreshCw } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";
import type { OperationItem } from "@/types/runtime";

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red-400",
  high:     "bg-orange-400",
  medium:   "bg-yellow-400",
  low:      "bg-emerald-400",
};

const PRIORITY_TEXT: Record<string, string> = {
  critical: "text-red-400",
  high:     "text-orange-400",
  medium:   "text-yellow-400",
  low:      "text-emerald-400",
};

const STATUS_BAR: Record<string, string> = {
  running:   "bg-blue-500",
  completed: "bg-emerald-500",
  failed:    "bg-red-500",
  pending:   "bg-yellow-500",
  paused:    "bg-slate-500",
};

const OperationRow = memo(({ op }: { op: OperationItem }) => {
  const dot  = PRIORITY_DOT[op.priority]  ?? "bg-slate-400";
  const text = PRIORITY_TEXT[op.priority] ?? "text-slate-400";
  const bar  = STATUS_BAR[op.status]      ?? "bg-slate-500";
  const pct  = Math.min(100, Math.max(0, op.progress));

  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-slate-700/40 last:border-0">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
      <span className="text-sm text-slate-300 w-20 shrink-0 truncate">{op.type}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-400 w-10 text-right">{pct}%</span>
      <span className={`text-xs font-medium w-16 text-right capitalize ${text}`}>
        {op.priority}
      </span>
    </div>
  );
});

export default function NationalGridStatus() {
  const { data, isLoading, isError, refetch, isFetching } = useOperationsDashboard();

  return (
    <DashboardCard
      title="Operations Grid"
      ariaLabel="National Grid Status"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load operations"
      skeletonCount={5}
      skeletonHeight="h-7"
      headerRight={
        <button
          onClick={() => refetch()}
          className="text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Refresh operations"
        >
          <RefreshCw size={12} className={isFetching ? "animate-spin" : ""} />
        </button>
      }
    >
      {data && (
        <>
          <div className="grid grid-cols-3 gap-2 mb-1">
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">Active Ops</p>
              <p className="text-sm font-bold text-slate-200">{data.active_operations}</p>
            </div>
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">System Load</p>
              <p className="text-sm font-bold text-slate-200">
                {data.system_load}
                <span className="text-xs font-normal text-slate-400 ml-1">%</span>
              </p>
            </div>
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">Queue Depth</p>
              <p className="text-sm font-bold text-slate-200">{data.queue_depth}</p>
            </div>
          </div>

          <div>
            {data.operations.length === 0
              ? <p className="text-xs text-slate-500 text-center py-3">No operations running</p>
              : data.operations.map((op) => <OperationRow key={op.id} op={op} />)}
          </div>

          <p className="text-xs text-slate-600 text-right">
            Updated {formatTime(data.timestamp)}
          </p>
        </>
      )}
    </DashboardCard>
  );
}
