import { memo } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { trendColor, statusColor, trendIcon } from "@/utils/format";
import type { TrendDirection, OperationalStatus } from "@/types/api";

export interface ExecutiveMetricCardProps {
  /** Metric label (e.g. "Active Incidents") */
  title: string;
  /** Primary metric value */
  value: string | number;
  /** Optional unit (e.g. "%", "GW") */
  unit?: string;
  /** Trend direction (up, down, stable) */
  trend: TrendDirection;
  /** String to show next to trend (e.g. "+2") */
  trendValue?: string;
  /** Optional status for the top-right icon */
  status?: OperationalStatus;
  /** Icon component */
  icon?: React.ElementType;
  /** Visual variant (primary with background, or compact KPI style) */
  variant?: "primary" | "compact";
}

export const ExecutiveMetricCard = memo(function ExecutiveMetricCard({
  title,
  value,
  unit,
  trend,
  trendValue,
  status = "online",
  icon: Icon,
  variant = "primary",
}: ExecutiveMetricCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  
  if (variant === "compact") {
    return (
      <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-lg font-semibold text-slate-200 mt-0.5">
            {value ?? "—"}
            {unit && <span className="text-xs text-slate-400 ml-1">{unit}</span>}
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-sm font-medium ${trendColor(trend)}`}>
            {trendIcon(trend)}
          </span>
          {trendValue && (
            <span className="text-xs text-slate-500">{trendValue}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{title}</span>
        {Icon && <Icon size={14} className={statusColor(status)} />}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-100 leading-none">
          {value}
          {unit && <span className="text-sm text-slate-400 ml-1">{unit}</span>}
        </span>
        <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendColor(trend)}`}>
          <TrendIcon size={11} />
          {trendValue || (trend === "up" ? "↑" : trend === "down" ? "↓" : "→")}
        </span>
      </div>
    </div>
  );
});
