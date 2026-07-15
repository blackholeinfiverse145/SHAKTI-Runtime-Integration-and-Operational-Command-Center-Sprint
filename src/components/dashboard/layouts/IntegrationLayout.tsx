import { memo, useMemo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { IntegrationCard } from "@/components/dashboard/primitives/IntegrationCard";
import { AlertCard } from "@/components/dashboard/primitives/AlertCard";
import { useAlertsDashboard, useSystemStatus } from "@/hooks/useQueries";
import { toSeverity, toStatus, formatRelativeTime } from "@/utils/format";
import type { OperationalStatus } from "@/types/api";

export default memo(function IntegrationLayout() {
  const alerts = useAlertsDashboard();
  const status = useSystemStatus();

  const unacked = alerts.data?.unacknowledged ?? 0;

  // Derive integration cards from real /system/status components
  const integrations = useMemo(() =>
    (status.data?.components ?? []).map((c) => ({
      name: c.name,
      status: toStatus(c.status) as OperationalStatus,
      latency: c.response_time_ms ?? undefined,
      syncStatus: c.details || undefined,
    })), [status.data?.components]);

  const isLoading = alerts.isLoading || status.isLoading;
  const isError = !isLoading && (alerts.isError || status.isError);
  const hasData = alerts.data !== undefined || status.data !== undefined;

  return (
    <DashboardCard
      title="Integrations & Alerts"
      ariaLabel="Integration Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={hasData}
      onRetry={() => { alerts.refetch(); status.refetch(); }}
      errorMessage="Failed to load alerts"
      skeletonCount={4}
      skeletonHeight="h-14"
      headerRight={
        unacked > 0 ? (
          <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30">
            {unacked} new alerts
          </span>
        ) : undefined
      }
    >
      {hasData && (
        <div className="flex flex-col gap-4 h-full">
          {integrations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {integrations.map(int => (
                <IntegrationCard 
                  key={int.name}
                  systemName={int.name}
                  status={int.status}
                  latency={int.latency}
                  syncStatus={int.syncStatus}
                />
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-3">No Runtime Data Available</p>
          )}

          <div className="flex-1 flex flex-col min-h-0">
            <h3 className="text-sm font-semibold text-slate-300 mb-2 border-b border-slate-700/60 pb-1">Live Alert Feed</h3>
            {(alerts.data?.alerts ?? []).length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No Runtime Data Available</p>
            ) : (
              <div className="space-y-1.5 overflow-y-auto flex-1 min-h-0 pr-1">
                {(alerts.data?.alerts ?? []).map((a) => (
                  <AlertCard 
                    key={a.id}
                    message={a.message}
                    severity={toSeverity(a.severity)}
                    source={a.source}
                    category={a.category}
                    timestamp={formatRelativeTime(a.timestamp)}
                    acknowledged={a.acknowledged}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
