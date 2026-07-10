import { memo } from "react";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Zap, Bell, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useExecutiveDashboard, useMetrics } from "@/hooks/useQueries";
import { statusColor, trendColor, trendIcon } from "@/utils/format";
import type { TrendDirection, OperationalStatus } from "@/types/api";

// ─── Helpers — map runtime strings to UI types ────────────────────────────────

function toTrend(t: string): TrendDirection {
  if (t === "up" || t === "down" || t === "stable") return t;
  return "stable";
}

function toStatus(s: string): OperationalStatus {
  if (s === "normal" || s === "operational") return "online";
  if (s === "warning") return "warning";
  if (s === "critical" || s === "offline") return "offline";
  if (s === "degraded") return "degraded";
  return "online";
}

const ICONS: Record<string, React.ElementType> = {
  AlertTriangle, Zap, Bell, Activity,
};

const METRIC_ICONS: Record<number, React.ElementType> = {
  0: AlertTriangle,
  1: Zap,
  2: Bell,
  3: Activity,
};

// ─── Sub-components (unchanged UI) ───────────────────────────────────────────

function TrendBadge({ trend, value }: { trend: TrendDirection; value: string }) {
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendColor(trend)}`}>
      <Icon size={11} />
      {value}
    </span>
  );
}

const MetricCard = memo(({
  title, value, unit, trend, status, icon: Icon,
}: {
  title: string; value: string | number; unit?: string;
  trend: TrendDirection; status: OperationalStatus; icon: React.ElementType;
}) => (
  <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{title}</span>
      <Icon size={14} className={statusColor(status)} />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-slate-100 leading-none">
        {value}
        {unit && <span className="text-sm text-slate-400 ml-1">{unit}</span>}
      </span>
      <TrendBadge trend={trend} value={trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} />
    </div>
  </div>
));

const KPICard = memo(({
  title, value, unit, trend,
}: {
  title: string; value: string | number; unit: string; trend: TrendDirection;
}) => (
  <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-3 flex items-center justify-between">
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="text-lg font-semibold text-slate-200 mt-0.5">
        {value ?? "—"}
        <span className="text-xs text-slate-400 ml-1">{unit}</span>
      </p>
    </div>
    <span className={`text-sm font-medium ${trendColor(trend)}`}>
      {trendIcon(trend)}
    </span>
  </div>
));

// ─── Zone component ───────────────────────────────────────────────────────────

export default function ExecutiveSummary() {
  const exec = useExecutiveDashboard();
  const metrics = useMetrics();

  // Map /dashboard/executive summary[] → metric cards
  const metricCards = exec.data?.summary.map((item, i) => ({
    id: item.metric,
    title: item.metric.replace(/_/g, " "),
    value: item.value,
    trend: toTrend(item.trend),
    status: toStatus(item.status),
    icon: METRIC_ICONS[i % 4] ?? Activity,
  })) ?? [];

  // Map /metrics → KPI cards
  const m = metrics.data;
  const kpiCards = m
    ? [
        { id: "requests",  title: "Total Requests",   value: m.total_requests,                                    unit: "req",  trend: "stable" as TrendDirection },
        { id: "success",   title: "Success Rate",     value: m.success_rate != null ? m.success_rate.toFixed(1) : "—", unit: "%", trend: (m.success_rate ?? 100) >= 95 ? "up" : "down" as TrendDirection },
        { id: "resp_time", title: "Avg Response",     value: m.average_response_time_ms != null ? m.average_response_time_ms.toFixed(0) : "—", unit: "ms", trend: "stable" as TrendDirection },
        { id: "events",    title: "Events Processed", value: m.events_processed,                                  unit: "evt",  trend: "up" as TrendDirection },
      ]
    : [];

  const isLoading = exec.isLoading || metrics.isLoading;

  return (
    <section aria-label="Executive Summary" className="col-span-12 space-y-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg bg-slate-700/50" />
            ))
          : metricCards.length > 0
            ? metricCards.map((mc) => (
                <MetricCard key={mc.id} title={mc.title} value={mc.value} trend={mc.trend} status={mc.status} icon={mc.icon} />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 rounded-lg bg-slate-700/30" />
              ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-lg bg-slate-700/50" />
            ))
          : kpiCards.map((k) => (
              <KPICard key={k.id} title={k.title} value={k.value} unit={k.unit} trend={k.trend} />
            ))}
      </div>
    </section>
  );
}
