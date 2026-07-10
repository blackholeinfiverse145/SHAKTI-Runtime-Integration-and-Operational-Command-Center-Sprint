import { memo } from "react";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Zap, Bell, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useExecutiveMetrics, useKPIs } from "@/hooks/useQueries";
import { statusColor, trendColor, trendIcon } from "@/utils/format";
import type { ExecutiveMetric, KPI } from "@/types/api";

const ICONS: Record<string, React.ElementType> = {
  AlertTriangle, Zap, Bell, Activity,
};

function TrendBadge({ trend, value, inverse = false }: { trend: ExecutiveMetric["trend"]; value: string; inverse?: boolean }) {
  const Icon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendColor(trend, inverse)}`}>
      <Icon size={11} />
      {value}
    </span>
  );
}

const MetricCard = memo(({ metric }: { metric: ExecutiveMetric }) => {
  const Icon = ICONS[metric.icon] ?? Activity;
  return (
    <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{metric.title}</span>
        <Icon size={14} className={statusColor(metric.status)} />
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-slate-100 leading-none">
          {metric.value}
          {metric.unit && <span className="text-sm text-slate-400 ml-1">{metric.unit}</span>}
        </span>
        <TrendBadge trend={metric.trend} value={metric.trendValue} />
      </div>
    </div>
  );
});

const KPICard = memo(({ kpi }: { kpi: KPI }) => (
  <div className="bg-slate-800/40 border border-slate-700/40 rounded-lg p-3 flex items-center justify-between">
    <div>
      <p className="text-xs text-slate-500 uppercase tracking-wide">{kpi.title}</p>
      <p className="text-lg font-semibold text-slate-200 mt-0.5">
        {kpi.value}
        <span className="text-xs text-slate-400 ml-1">{kpi.unit}</span>
      </p>
    </div>
    <span className={`text-sm font-medium ${trendColor(kpi.trend)}`}>
      {trendIcon(kpi.trend)} {kpi.trendValue}
    </span>
  </div>
));

export default function ExecutiveSummary() {
  const metrics = useExecutiveMetrics();
  const kpis = useKPIs();

  return (
    <section aria-label="Executive Summary" className="col-span-12 space-y-2">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {metrics.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-lg bg-slate-700/50" />)
          : metrics.data?.map((m) => <MetricCard key={m.id} metric={m} />)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {kpis.isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 rounded-lg bg-slate-700/50" />)
          : kpis.data?.map((k) => <KPICard key={k.id} kpi={k} />)}
      </div>
    </section>
  );
}
