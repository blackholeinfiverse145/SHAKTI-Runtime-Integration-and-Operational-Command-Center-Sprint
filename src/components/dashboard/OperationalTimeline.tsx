import { memo } from "react";
import { AlertTriangle, AlertCircle, Info, Bell } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useAlertsDashboard } from "@/hooks/useQueries";
import { toSeverity, severityColor, formatRelativeTime } from "@/utils/format";
import type { AlertItem } from "@/types/runtime";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  system:    AlertCircle,
  operator:  Info,
  alert:     AlertTriangle,
  incident:  Bell,
};

const CATEGORY_COLOR: Record<string, string> = {
  system:   "text-blue-400 bg-blue-500/10",
  operator: "text-slate-400 bg-slate-500/10",
  alert:    "text-orange-400 bg-orange-500/10",
  incident: "text-red-400 bg-red-500/10",
};

const EventRow = memo(({ alert }: { alert: AlertItem }) => {
  const cat = alert.category ?? "alert";
  const Icon = CATEGORY_ICONS[cat] ?? AlertCircle;
  const colorClass = CATEGORY_COLOR[cat] ?? CATEGORY_COLOR.alert;
  const severity = toSeverity(alert.severity);

  return (
    <div className="flex gap-2.5 items-start">
      <div className={`p-1 rounded shrink-0 mt-0.5 ${colorClass}`}>
        <Icon size={10} />
      </div>
      <div className="flex-1 min-w-0 border-b border-slate-700/30 pb-2">
        <p className="text-xs text-slate-200 leading-snug">{alert.message}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs text-slate-600">{alert.source}</span>
          <span className={`text-xs font-medium uppercase ${severityColor(severity)}`}>
            {severity}
          </span>
          <span className="text-xs text-slate-600 ml-auto">
            {formatRelativeTime(alert.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default function OperationalTimeline() {
  const { data, isLoading, isError, refetch } = useAlertsDashboard();

  return (
    <DashboardCard
      title="Operational Timeline"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load timeline"
      skeletonCount={5}
      skeletonHeight="h-10"
      isEmpty={data?.alerts.length === 0}
      emptyMessage="No events"
    >
      {data && (
        <div className="space-y-2 overflow-y-auto max-h-64">
          {[...data.alerts]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .map((a) => <EventRow key={a.id} alert={a} />)}
        </div>
      )}
    </DashboardCard>
  );
}
