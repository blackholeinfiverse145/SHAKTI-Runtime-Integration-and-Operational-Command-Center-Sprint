import { memo } from "react";
import { RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGridStatus } from "@/hooks/useQueries";
import { statusColor, statusDot, formatTime } from "@/utils/format";
import type { GridRegion } from "@/types/api";

const RegionRow = memo(({ region }: { region: GridRegion }) => {
  const loadPct = Math.round((region.load / region.capacity) * 100);
  const barColor = loadPct > 90 ? "bg-red-500" : loadPct > 75 ? "bg-yellow-500" : "bg-emerald-500";

  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-slate-700/40 last:border-0">
      <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot(region.status)}`} />
      <span className="text-sm text-slate-300 w-16 shrink-0">{region.name}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${loadPct}%` }} />
      </div>
      <span className="text-xs text-slate-400 w-10 text-right">{loadPct}%</span>
      <span className={`text-xs font-medium w-16 text-right ${statusColor(region.status)}`}>
        {region.status}
      </span>
    </div>
  );
});

export default function NationalGridStatus() {
  const { data, isLoading, isError, refetch, isFetching } = useGridStatus();

  return (
    <section aria-label="National Grid Status" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">National Grid Status</h2>
        <button
          onClick={() => refetch()}
          className="text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Refresh grid status"
        >
          <RefreshCw size={12} className={isFetching ? "animate-spin" : ""} />
        </button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-7 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load grid status</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <>
          <div className="grid grid-cols-3 gap-2 mb-1">
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">Total Load</p>
              <p className="text-sm font-bold text-slate-200">{data.totalLoad} <span className="text-xs font-normal text-slate-400">GW</span></p>
            </div>
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">Frequency</p>
              <p className="text-sm font-bold text-slate-200">{data.frequency} <span className="text-xs font-normal text-slate-400">Hz</span></p>
            </div>
            <div className="bg-slate-700/40 rounded p-2 text-center">
              <p className="text-xs text-slate-500">Status</p>
              <p className={`text-sm font-bold capitalize ${statusColor(data.overallStatus)}`}>{data.overallStatus}</p>
            </div>
          </div>
          <div>
            {data.regions.map((r) => <RegionRow key={r.id} region={r} />)}
          </div>
          <p className="text-xs text-slate-600 text-right">Updated {formatTime(data.lastUpdated)}</p>
        </>
      )}
    </section>
  );
}
