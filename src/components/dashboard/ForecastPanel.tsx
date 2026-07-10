import { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime } from "@/utils/format";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 border border-slate-700 rounded p-2 text-xs space-y-1">
      <p className="text-slate-400">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: {p.value.toFixed(1)}
        </p>
      ))}
    </div>
  );
};

export default memo(function ForecastPanel() {
  const { data, isLoading, isError, refetch } = useTelemetryDashboard();

  // Map telemetry data points to chart series — align by index
  const chartData = data
    ? data.metrics.response_times.map((rt, i) => ({
        time: formatTime(rt.timestamp),
        "Response (ms)": +rt.value.toFixed(1),
        "Event Rate":    +(data.metrics.event_rates[i]?.value ?? 0).toFixed(1),
      }))
    : undefined;

  return (
    <section aria-label="Forecast Panel" className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">Telemetry</h2>
        {data && (
          <span className="text-xs text-slate-500">
            Uptime:{" "}
            <span className="text-emerald-400 font-medium">
              {data.summary.uptime_percentage.toFixed(1)}%
            </span>
          </span>
        )}
      </div>

      {data && (
        <div className="grid grid-cols-2 gap-2 mb-1">
          <div className="bg-slate-700/40 rounded p-2">
            <p className="text-xs text-slate-500">Avg Response</p>
            <p className="text-sm font-bold text-slate-200">
              {data.summary.avg_response_time.toFixed(0)}
              <span className="text-xs font-normal text-slate-400 ml-1">ms</span>
            </p>
          </div>
          <div className="bg-slate-700/40 rounded p-2">
            <p className="text-xs text-slate-500">Total Events</p>
            <p className="text-sm font-bold text-slate-200">
              {data.summary.total_events.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {isLoading && <Skeleton className="h-36 bg-slate-700/50 rounded" />}

      {isError && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">Failed to load telemetry</p>
          <button
            onClick={() => refetch()}
            className="text-xs text-slate-400 hover:text-slate-200 underline"
          >
            Retry
          </button>
        </div>
      )}

      {chartData && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gResponse" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} interval={2} />
            <YAxis tick={{ fontSize: 9, fill: "#64748b" }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="Response (ms)" stroke="#6366f1" strokeWidth={1.5} fill="url(#gResponse)" dot={false} />
            <Area type="monotone" dataKey="Event Rate"    stroke="#10b981" strokeWidth={1.5} fill="url(#gEvents)"   dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {chartData && chartData.length === 0 && (
        <p className="text-xs text-slate-500 text-center py-8">No telemetry data yet</p>
      )}

      <div className="flex gap-4 justify-end">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className="w-2 h-0.5 bg-indigo-500 inline-block" />Response
        </span>
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className="w-2 h-0.5 bg-emerald-500 inline-block" />Event Rate
        </span>
      </div>
    </section>
  );
});
