import { memo } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useAlertsDashboard } from "@/hooks/useQueries";
import { toSeverity, severityColor, severityBg, formatRelativeTime } from "@/utils/format";
import type { Severity } from "@/types/api";
import type { AlertItem } from "@/types/runtime";

const SEVERITY_ICONS: Record<Severity, React.ElementType> = {
  critical: AlertTriangle,
  high: AlertCircle,
  medium: AlertCircle,
  low: Info,
  info: Info,
};

const AlertRow = memo(({ alert }: { alert: AlertItem }) => {
  const severity = toSeverity(alert.severity);
  const Icon = SEVERITY_ICONS[severity];
  return (
    <div className={`flex gap-2 p-2 rounded border ${severityBg(severity)} ${alert.acknowledged ? "opacity-50" : ""}`}>
      <Icon size={13} className={`shrink-0 mt-0.5 ${severityColor(severity)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-200 leading-snug line-clamp-2">{alert.message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-semibold uppercase ${severityColor(severity)}`}>{severity}</span>
          <span className="text-xs text-slate-500">{alert.source}</span>
          <span className="text-xs text-slate-500">{alert.category}</span>
          <span className="text-xs text-slate-600 ml-auto">{formatRelativeTime(alert.timestamp)}</span>
        </div>
      </div>
      {alert.acknowledged && <CheckCircle size={11} className="text-slate-500 shrink-0 mt-0.5" />}
    </div>
  );
});

export default function LiveAlertQueue() {
  const { data, isLoading, isError, refetch } = useAlertsDashboard();

  const unacked = data?.unacknowledged ?? 0;

  return (
    <DashboardCard
      title="Live Alerts"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load alerts"
      skeletonCount={4}
      skeletonHeight="h-14"
      isEmpty={data?.alerts.length === 0}
      emptyMessage="No active alerts"
      headerRight={
        unacked > 0 ? (
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-1.5 py-0.5 rounded-full border border-red-500/30">
            {unacked} new
          </span>
        ) : undefined
      }
    >
      {data && (
        <div className="space-y-1.5 overflow-y-auto max-h-64 pr-0.5">
          {data.alerts.map((a) => <AlertRow key={a.id} alert={a} />)}
        </div>
      )}
    </DashboardCard>
  );
}
