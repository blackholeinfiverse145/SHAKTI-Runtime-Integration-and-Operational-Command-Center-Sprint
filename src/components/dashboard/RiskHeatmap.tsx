import { Skeleton } from "@/components/ui/skeleton";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { severityColor } from "@/utils/format";
import type { Severity } from "@/types/api";

const RISK_BAR: Record<string, string> = {
  critical: "bg-red-500",
  high:     "bg-orange-500",
  medium:   "bg-yellow-500",
  low:      "bg-emerald-500",
};

function toSeverity(p: string): Severity {
  if (p === "critical" || p === "high" || p === "medium" || p === "low") return p;
  return "info";
}

export default function RiskHeatmap() {
  const { data, isLoading, isError, refetch } = useOperationsDashboard();

  // Derive risk rows: group operations by type, compute avg progress as risk score
  const riskRows = data
    ? Object.entries(
        data.operations.reduce<Record<string, { priority: string; scores: number[] }>>(
          (acc, op) => {
            const key = op.type;
            if (!acc[key]) acc[key] = { priority: op.priority, scores: [] };
            acc[key].scores.push(op.progress);
            return acc;
          },
          {}
        )
      )
        .map(([type, { priority, scores }]) => ({
          id: type,
          name: type,
          riskLevel: toSeverity(priority),
          score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
          count: scores.length,
        }))
        .sort((a, b) => b.score - a.score)
    : [];

  return (
    <section aria-label="Risk Heatmap" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Risk Heatmap</h2>

      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 bg-slate-700/50 rounded" />
          ))}
        </div>
      )}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load risk data</p>
          <button onClick={() => refetch()} className="text-xs text-slate-400 hover:text-slate-200 underline">
            Retry
          </button>
        </div>
      )}

      {data && (
        <div className="space-y-3">
          {riskRows.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">No risk data available</p>
          ) : (
            riskRows.map((r) => (
              <div key={r.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 capitalize">{r.name}</span>
                  <span className={`text-xs font-semibold uppercase ${severityColor(r.riskLevel)}`}>
                    {r.riskLevel} · {r.score}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${RISK_BAR[r.riskLevel] ?? "bg-slate-500"}`}
                    style={{ width: `${r.score}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600">{r.count} operation{r.count !== 1 ? "s" : ""}</p>
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}
