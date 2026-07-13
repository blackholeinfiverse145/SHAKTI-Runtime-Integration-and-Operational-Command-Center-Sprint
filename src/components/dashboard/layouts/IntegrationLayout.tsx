import { memo } from "react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { IntegrationCard } from "@/components/dashboard/primitives/IntegrationCard";
import { AlertCard } from "@/components/dashboard/primitives/AlertCard";
import { useAlertsDashboard } from "@/hooks/useQueries";
import { toSeverity, formatRelativeTime } from "@/utils/format";

export default memo(function IntegrationLayout() {
  const { data, isLoading, isError, refetch } = useAlertsDashboard();

  const unacked = data?.unacknowledged ?? 0;

  // Synthesize some integration cards to showcase the IntegrationCard primitive
  const integrations = [
    { name: "National Grid API", status: "online" as const, latency: 45, protocol: "REST" },
    { name: "Emergency Dispatch", status: "online" as const, latency: 120, protocol: "Webhook" },
    { name: "Weather Service", status: "offline" as const, syncStatus: "Last sync 2h ago" },
  ];

  return (
    <DashboardCard
      title="Integrations & Alerts"
      ariaLabel="Integration Layout"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
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
      {data && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {integrations.map(int => (
              <IntegrationCard 
                key={int.name}
                systemName={int.name}
                status={int.status}
                latency={int.latency}
                protocol={int.protocol}
                syncStatus={int.syncStatus}
              />
            ))}
          </div>

          <div>
            <h3 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 border-b border-slate-700/50 pb-1">Live Alert Feed</h3>
            {data.alerts.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No active alerts</p>
            ) : (
              <div className="space-y-1.5 overflow-y-auto max-h-64 pr-1">
                {data.alerts.map((a) => (
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
