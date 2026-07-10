import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSystemHealth } from "@/hooks/useQueries";
import { statusColor, statusDot, formatTime } from "@/utils/format";
import type { ServiceHealth } from "@/types/api";

const ServiceRow = memo(({ svc }: { svc: ServiceHealth }) => (
  <div className="flex items-center gap-2 py-1.5 border-b border-slate-700/30 last:border-0">
    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot(svc.status)}`} />
    <span className="text-xs text-slate-300 flex-1 truncate">{svc.name}</span>
    <span className="text-xs text-slate-500 w-14 text-right">{svc.latency}ms</span>
    <span className="text-xs text-slate-500 w-14 text-right">{svc.uptime}%</span>
    <span className={`text-xs font-medium w-16 text-right capitalize ${statusColor(svc.status)}`}>{svc.status}</span>
  </div>
));

export default function SystemHealth() {
  const { data, isLoading, isError, refetch } = useSystemHealth();

  return (
    <section aria-label="System Health" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">System Health</h2>
        {data && (
          <span className="text-xs font-bold text-emerald-400">{data.overallScore}/100</span>
        )}
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-7 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load system health</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${data.overallScore}%` }}
              />
            </div>
            <span className="text-xs text-slate-400">{data.overallScore}%</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-600 mb-1 px-0.5">
            <span className="flex-1">Service</span>
            <span className="w-14 text-right">Latency</span>
            <span className="w-14 text-right">Uptime</span>
            <span className="w-16 text-right">Status</span>
          </div>
          {data.services.map((s) => <ServiceRow key={s.name} svc={s} />)}
          <p className="text-xs text-slate-600 text-right">Checked {formatTime(data.lastUpdated)}</p>
        </>
      )}
    </section>
  );
}
