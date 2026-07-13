import { memo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export interface TelemetrySeries {
  name: string;
  dataKey: string;
  color: string;
}

export interface TelemetrySummaryMetric {
  label: string;
  value: string | number;
  unit?: string;
}

export interface TelemetryCardProps {
  /** Array of data points, must include a key for the X-axis (usually 'time') */
  data: any[];
  /** Name of the key to use for the X-axis */
  xAxisKey?: string;
  /** Series configurations to render */
  series: TelemetrySeries[];
  /** Array of summary metrics to display above the chart */
  summaryMetrics?: TelemetrySummaryMetric[];
  /** Height of the chart component in pixels */
  chartHeight?: number;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900/95 backdrop-blur border border-slate-700 shadow-xl rounded-md p-2 text-xs space-y-1.5 z-50">
      <p className="text-slate-400 font-medium pb-1 border-b border-slate-800/50">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-300">{p.name}</span>
          </div>
          <span className="font-semibold text-slate-100" style={{ color: p.color }}>
            {typeof p.value === 'number' ? p.value.toFixed(1) : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export const TelemetryCard = memo(function TelemetryCard({
  data,
  xAxisKey = "time",
  series,
  summaryMetrics,
  chartHeight = 130,
}: TelemetryCardProps) {
  const hasData = data && data.length > 0;

  return (
    <div className="flex flex-col gap-3 w-full">
      {summaryMetrics && summaryMetrics.length > 0 && (
        <div className={`grid gap-2 grid-cols-${Math.min(summaryMetrics.length, 4)}`}>
          {summaryMetrics.map((sm, i) => (
            <div key={i} className="bg-slate-700/30 border border-slate-600/30 rounded p-2">
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{sm.label}</p>
              <p className="text-sm font-bold text-slate-200 mt-0.5">
                {sm.value}
                {sm.unit && <span className="text-[10px] font-normal text-slate-500 ml-1">{sm.unit}</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      {hasData ? (
        <ResponsiveContainer width="100%" height={chartHeight}>
          <AreaChart data={data} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
            <defs>
              {series.map((s, i) => (
                <linearGradient key={s.dataKey} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={s.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <XAxis 
              dataKey={xAxisKey} 
              tick={{ fontSize: 9, fill: "#64748b" }} 
              tickLine={false} 
              axisLine={false} 
              interval="preserveEnd"
              minTickGap={20}
            />
            <YAxis 
              tick={{ fontSize: 9, fill: "#64748b" }} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip content={<CustomTooltip />} />
            {series.map((s, i) => (
              <Area 
                key={s.dataKey}
                type="monotone" 
                dataKey={s.dataKey} 
                name={s.name}
                stroke={s.color} 
                strokeWidth={1.5} 
                fill={`url(#gradient-${i})`} 
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center w-full" style={{ height: chartHeight }}>
          <p className="text-xs text-slate-500">No telemetry data available</p>
        </div>
      )}

      <div className="flex gap-4 justify-end flex-wrap mt-1">
        {series.map(s => (
          <span key={s.dataKey} className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span className="w-2.5 h-0.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
});
