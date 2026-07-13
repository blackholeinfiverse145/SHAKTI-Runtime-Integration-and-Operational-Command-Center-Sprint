import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity, toIncidentStatus, severityColor, severityBg, formatRelativeTime } from "@/utils/format";
import type { IncidentStatus } from "@/types/api";
import type { OperationItem } from "@/types/runtime";

const STATUS_COLOR: Record<IncidentStatus, string> = {
  open: "text-red-400",
  investigating: "text-yellow-400",
  resolved: "text-emerald-400",
  closed: "text-slate-500",
};

const OperationRow = memo(({ op }: { op: OperationItem }) => {
  const severity = toSeverity(op.priority);
  const status = toIncidentStatus(op.status);
  return (
    <div className={`p-2 rounded border ${severityBg(severity)}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-mono text-slate-500">{op.id.slice(0, 12)}</span>
            <span className={`text-xs font-semibold uppercase ${severityColor(severity)}`}>{op.priority}</span>
          </div>
          <p className="text-xs text-slate-200 leading-snug line-clamp-1">{op.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-slate-500">{op.type}</span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500">{op.agent}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className={`text-xs font-medium capitalize ${STATUS_COLOR[status]}`}>{op.status}</p>
          <p className="text-xs text-slate-600 mt-0.5">{formatRelativeTime(op.started_at)}</p>
          {op.progress > 0 && op.progress < 100 && (
            <p className="text-xs text-slate-600">{op.progress}%</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default function IncidentQueue() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  const active = data?.active_operations ?? 0;

  return (
    <DashboardCard
      title="Operations Queue"
      ariaLabel="Incident Queue"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load operations"
      skeletonCount={4}
      skeletonHeight="h-16"
      isEmpty={data?.operations.length === 0}
      emptyMessage="No active operations"
      headerRight={data ? <span className="text-xs text-slate-500">{active} active</span> : undefined}
    >
      {data && (
        <div className="space-y-1.5 overflow-y-auto max-h-64">
          {data.operations.map((op) => <OperationRow key={op.id} op={op} />)}
        </div>
      )}
    </DashboardCard>
  );
}
