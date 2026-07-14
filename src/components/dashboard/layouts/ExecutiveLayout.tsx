import { memo, useMemo } from "react";
import { Activity, AlertTriangle, Bell, Zap } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ExecutiveMetricCard } from "@/components/dashboard/primitives/ExecutiveMetricCard";
import { useExecutiveDashboard, useMetrics } from "@/hooks/useQueries";
import { toTrend, toStatus } from "@/utils/format";

const METRIC_ICONS: Record<number, React.ElementType> = {
  0: AlertTriangle,
  1: Zap,
  2: Bell,
  3: Activity,
};

export default memo(function ExecutiveLayout() {
  const exec = useExecutiveDashboard();
  const metrics = useMetrics();

  const metricCards = useMemo(() => exec.data?.summary.map((item, i) => ({
    id: item.metric,
    title: item.metric.replace(/_/g, " "),
    value: item.value,
    trend: toTrend(item.trend),
    status: toStatus(item.status),
    icon: METRIC_ICONS[i % 4] ?? Activity,
  })) ?? [], [exec.data?.summary]);

  const m = metrics.data;
  const kpiCards = useMemo(() => m
    ? [
        { id: "requests",  title: "Total Requests",   value: m.total_requests ?? 0,                                    unit: "req",  trend: "stable" as const },
        { id: "success",   title: "Success Rate",     value: typeof m.success_rate === 'number' ? m.success_rate.toFixed(1) : "—", unit: "%", trend: ((m.success_rate ?? 100) >= 95 ? "up" : "down") as any },
        { id: "resp_time", title: "Avg Response",     value: typeof m.average_response_time_ms === 'number' ? m.average_response_time_ms.toFixed(0) : "—", unit: "ms", trend: "stable" as const },
        { id: "events",    title: "Events Processed", value: m.events_processed ?? 0,                                  unit: "evt",  trend: "up" as const },
      ]
    : [], [m]);

  const isLoading = exec.isLoading || metrics.isLoading;
  const isError = !isLoading && (exec.isError || metrics.isError);

  return (
    <section aria-label="Executive Layout" className="w-full space-y-2">
      <DashboardCard
        title="Executive Summary"
        isLoading={isLoading}
        isError={isError}
        hasData={exec.data !== undefined && metrics.data !== undefined}
        onRetry={() => { exec.refetch(); metrics.refetch(); }}
        errorMessage="Failed to load executive data"
        skeletonCount={2}
        skeletonHeight="h-20"
        className="border-0 bg-transparent p-0"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
          {metricCards.length > 0
            ? metricCards.map((mc) => (
                <ExecutiveMetricCard 
                  key={mc.id} 
                  title={mc.title} 
                  value={mc.value} 
                  trend={mc.trend} 
                  status={mc.status} 
                  icon={mc.icon} 
                  variant="primary"
                />
              ))
            : <p className="text-xs text-slate-500 text-center py-6 col-span-full">No executive metrics available</p>}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {kpiCards.map((k) => (
            <ExecutiveMetricCard 
              key={k.id} 
              title={k.title} 
              value={k.value} 
              unit={k.unit} 
              trend={k.trend} 
              variant="compact"
            />
          ))}
        </div>
      </DashboardCard>
    </section>
  );
});
