import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { useOperationsDashboard } from "@/hooks/useQueries";
import { toSeverity, severityColor } from "@/utils/format";

const RISK_BAR: Record<string, string> = {
  critical: "bg-red-500",
  high:     "bg-orange-500",
  medium:   "bg-yellow-500",
  low:      "bg-emerald-500",
};

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
    <DashboardCard
      title="Risk Heatmap"
      isLoading={isLoading}
      isError={isError}
      onRetry={refetch}
      errorMessage="Failed to load risk data"
      skeletonCount={5}
      skeletonHeight="h-10"
      isEmpty={data !== undefined && riskRows.length === 0}
      emptyMessage="No risk data available"
    >
      <div className="space-y-3">
        {riskRows.map((r) => (
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
        ))}
      </div>
    </DashboardCard>
  );
}
