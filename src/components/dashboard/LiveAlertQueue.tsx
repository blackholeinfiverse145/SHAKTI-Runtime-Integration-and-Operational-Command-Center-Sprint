import { memo } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAlerts } from "@/hooks/useQueries";
import { severityColor, severityBg, formatRelativeTime } from "@/utils/format";
import type { Alert, Severity } from "@/types/api";

const SEVERITY_ICONS: Record<Severity, React.ElementType> = {
  critical: AlertTriangle,
  high: AlertCircle,
  medium: AlertCircle,
  low: Info,
  info: Info,
};

const AlertRow = memo(({ alert }: { alert: Alert }) => {
  const Icon = SEVERITY_ICONS[alert.severity];
  return (
    <div className={`flex gap-2 p-2 rounded border ${severityBg(alert.severity)} ${alert.acknowledged ? "opacity-50" : ""}`}>
      <Icon size={13} className={`shrink-0 mt-0.5 ${severityColor(alert.severity)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-200 leading-snug line-clamp-2">{alert.message}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-semibold uppercase ${severityColor(alert.severity)}`}>{alert.severity}</span>
          <span className="text-xs text-slate-500">{alert.source}</span>
          <span className="text-xs text-slate-600 ml-auto">{formatRelativeTime(alert.timestamp)}</span>
        </div>
      </div>
      {alert.acknowledged && <CheckCircle size={11} className="text-slate-500 shrink-0 mt-0.5" />}
    </div>
  );
});

export default function LiveAlertQueue() {
  const { data, isLoading, isError, refetch } = useAlerts();

  const unacked = data?.filter((a) => !a.acknowledged).length ?? 0;

  return (
    <section aria-label="Live Alert Queue" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Live Alerts</h2>
        {unacked > 0 && (
          <span className="bg-red-500/20 text-red-400 text-xs font-bold px-1.5 py-0.5 rounded-full border border-red-500/30">
            {unacked} new
          </span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load alerts</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-1.5 overflow-y-auto max-h-64 pr-0.5">
          {data.length === 0
            ? <p className="text-xs text-slate-500 text-center py-4">No active alerts</p>
            : data.map((a) => <AlertRow key={a.id} alert={a} />)}
        </div>
      )}
    </section>
  );
}
