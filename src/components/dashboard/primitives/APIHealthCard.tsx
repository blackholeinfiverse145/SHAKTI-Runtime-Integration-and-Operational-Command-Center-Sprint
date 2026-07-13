import { memo } from "react";
import { Activity, Clock, AlertTriangle } from "lucide-react";
import { statusColor } from "@/utils/format";
import type { OperationalStatus } from "@/types/api";

export interface APIHealthCardProps {
  /** API Endpoint Name */
  endpoint: string;
  /** Current Status */
  status: OperationalStatus;
  /** Uptime percentage */
  uptime: number;
  /** Error rate percentage */
  errorRate: number;
  /** Average latency ms */
  latency: number;
  /** Request volume per minute */
  rpm?: number;
}

export const APIHealthCard = memo(function APIHealthCard({
  endpoint,
  status,
  uptime,
  errorRate,
  latency,
  rpm,
}: APIHealthCardProps) {
  return (
    <div className="p-3 bg-slate-800/40 border border-slate-700/50 rounded-lg">
      <div className="flex items-center justify-between mb-3 border-b border-slate-700/50 pb-2">
        <span className="text-xs font-semibold text-slate-200 font-mono truncate">{endpoint}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider ${statusColor(status)}`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[9px] text-slate-500 uppercase"><Activity size={9} /> Uptime</span>
          <span className={`text-xs font-semibold ${uptime >= 99.9 ? "text-emerald-400" : "text-yellow-400"}`}>
            {uptime.toFixed(2)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[9px] text-slate-500 uppercase"><AlertTriangle size={9} /> Errors</span>
          <span className={`text-xs font-semibold ${errorRate > 1 ? "text-red-400" : "text-slate-300"}`}>
            {errorRate.toFixed(2)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[9px] text-slate-500 uppercase"><Clock size={9} /> Latency</span>
          <span className="text-xs font-semibold text-slate-300">
            {latency.toFixed(0)}<span className="text-[9px] text-slate-500 ml-0.5">ms</span>
          </span>
        </div>
        {rpm != null && (
          <div className="flex flex-col gap-1 border-l border-slate-700/50 pl-2">
            <span className="text-[9px] text-slate-500 uppercase">RPM</span>
            <span className="text-xs font-semibold text-slate-300">{rpm.toLocaleString()}</span>
          </div>
        )}
      </div>
    </div>
  );
});
