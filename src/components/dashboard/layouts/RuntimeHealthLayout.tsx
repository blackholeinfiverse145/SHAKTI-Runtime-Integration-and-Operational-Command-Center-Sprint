import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { HealthIndicator } from "@/components/dashboard/primitives/HealthIndicator";
import { APIHealthCard } from "@/components/dashboard/primitives/APIHealthCard";
import { useSystemStatus } from "@/hooks/useQueries";
import { toStatus, statusColor, formatTime } from "@/utils/format";
import type { ComponentStatus } from "@/types/runtime";

function toScore(components: ComponentStatus[]): number {
  if (!components.length) return 0;
  const operational = components.filter((c) => c.status === "operational").length;
  return Math.round((operational / components.length) * 100);
}

export default memo(function RuntimeHealthLayout() {
  const { data, isLoading, isError, refetch } = useSystemStatus();
  const score = data ? toScore(data.components) : 0;

  return (
    <DashboardCard
      title="Runtime Health"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load system health"
      skeletonCount={6}
      skeletonHeight="h-7"
      headerRight={
        data ? (
          <span className={`text-xs font-bold ${statusColor(toStatus(data.overall_status))}`}>
            {data.overall_status}
          </span>
        ) : undefined
      }
    >
      {data && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="text-xs text-slate-400">{score}%</span>
          </div>

          <APIHealthCard 
            endpoint="/api/v1/shakti/core"
            status={toStatus(data.overall_status)}
            uptime={99.98}
            errorRate={0.02}
            latency={data.components.find(c => c.response_time_ms != null)?.response_time_ms ?? 45}
            rpm={14500}
          />

          <div>
            <div className="flex items-center gap-1 text-xs text-slate-600 mb-1 px-0.5">
              <span className="flex-1">Component</span>
              <span className="w-14 text-right">Response</span>
              <span className="w-16 text-right">Detail</span>
              <span className="w-20 text-right">Status</span>
            </div>
            {data.components.map((c, i) => (
              <HealthIndicator 
                key={c.name}
                name={c.name}
                status={toStatus(c.status)}
                responseTime={c.response_time_ms}
                detail={c.details}
                noBorder={i === data.components.length - 1}
              />
            ))}
          </div>

          <p className="text-xs text-slate-600 text-right mt-1">
            Checked {formatTime(data.timestamp)}
          </p>
        </div>
      )}
    </DashboardCard>
  );
});
