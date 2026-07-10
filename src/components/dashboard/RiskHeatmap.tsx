import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRiskScores } from "@/hooks/useQueries";
import { severityColor } from "@/utils/format";
import type { RiskScore } from "@/types/api";

const RISK_BAR_COLOR: Record<RiskScore["riskLevel"], string> = {
  critical: "bg-red-500",
  high: "bg-orange-500",
  medium: "bg-yellow-500",
  low: "bg-emerald-500",
  info: "bg-slate-500",
};

const RiskRow = memo(({ risk }: { risk: RiskScore }) => (
  <div className="space-y-1">
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-300">{risk.regionName}</span>
      <span className={`text-xs font-semibold uppercase ${severityColor(risk.riskLevel)}`}>
        {risk.riskLevel} · {risk.score}
      </span>
    </div>
    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${RISK_BAR_COLOR[risk.riskLevel]}`}
        style={{ width: `${risk.score}%` }}
      />
    </div>
    <p className="text-xs text-slate-600 truncate">{risk.factors.join(" · ")}</p>
  </div>
));

export default function RiskHeatmap() {
  const { data, isLoading, isError, refetch } = useRiskScores();

  const sorted = data ? [...data].sort((a, b) => b.score - a.score) : [];

  return (
    <section aria-label="Risk Heatmap" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Risk Heatmap</h2>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 bg-slate-700/50 rounded" />)}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load risk data</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">Retry</button>
        </div>
      )}

      {data && (
        <div className="space-y-3">
          {sorted.map((r) => <RiskRow key={r.regionId} risk={r} />)}
        </div>
      )}
    </section>
  );
}
