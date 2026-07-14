import { memo } from "react";
import { Server, Cpu, Activity, AlertTriangle } from "lucide-react";
import { severityColor } from "@/utils/format";
import type { Severity } from "@/types/api";

export interface RuntimeCardProps {
  /** Identifier or name of the runtime node/process */
  id: string;
  /** Primary runtime status */
  status: "active" | "standby" | "terminating" | "failed";
  /** Optional severity override for styling */
  severity?: Severity;
  /** Compute utilization (0-100) */
  cpuUsage?: number;
  /** Memory utilization (0-100) */
  memoryUsage?: number;
  /** Active connections or threads */
  connections?: number;
}

export const RuntimeCard = memo(function RuntimeCard({
  id,
  status,
  severity = "info",
  cpuUsage = 0,
  memoryUsage = 0,
  connections = 0,
}: RuntimeCardProps) {
  const isFailed = status === "failed";
  const badgeColor = 
    isFailed ? "bg-red-500/20 text-red-400 border-red-500/30" : 
    status === "active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
    "bg-slate-500/20 text-slate-400 border-slate-500/30";

  return (
    <div className={`p-2.5 rounded-lg border bg-slate-800/40 ${isFailed ? "border-red-500/30" : "border-slate-700/50"}`}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <Server size={14} className={severityColor(severity)} />
          <span className="text-xs font-mono text-slate-200">{id}</span>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeColor}`}>
          {status}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase">
            <Cpu size={10} /> CPU
          </div>
          <span className="text-sm font-semibold text-slate-300">
            {typeof cpuUsage === 'number' ? cpuUsage.toFixed(1) : '0.0'}%
          </span>
        </div>
        <div className="flex flex-col gap-1 border-l border-slate-700/50 pl-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase">
            <Activity size={10} /> RAM
          </div>
          <span className="text-sm font-semibold text-slate-300">
            {typeof memoryUsage === 'number' ? memoryUsage.toFixed(1) : '0.0'}%
          </span>
        </div>
        <div className="flex flex-col gap-1 border-l border-slate-700/50 pl-2">
          <div className="flex items-center gap-1 text-[10px] text-slate-500 uppercase">
            <AlertTriangle size={10} /> Conn
          </div>
          <span className="text-sm font-semibold text-slate-300">{connections ?? 0}</span>
        </div>
      </div>
    </div>
  );
});
