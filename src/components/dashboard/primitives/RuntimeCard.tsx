import { memo } from "react";
import { Server, Activity, Clock, Layers, RotateCcw, FileText, Zap } from "lucide-react";
import { formatRelativeTime } from "@/utils/format";

export interface RuntimeCardProps {
  /** BHIV Ecosystem Capability Name (e.g., "Bucket", "Replay", "PRANA", "KARMA", etc.) */
  id: string;
  /** Health status string */
  status?: string;
  /** Response latency in ms or string */
  latency?: number | string | null;
  /** Total events processed */
  events?: number | string | null;
  /** Dependencies list, count, or string */
  dependencies?: string[] | number | string | null;
  /** Replay Availability boolean or status string */
  replayAvailable?: boolean | string | null;
  /** Evidence artifact count */
  evidenceCount?: number | string | null;
  /** Timestamp or string of last activity */
  lastActivity?: string | null;
  /** Whether live runtime data is available from backend */
  hasRuntimeData?: boolean;
}

export const RuntimeCard = memo(function RuntimeCard({
  id,
  status = "unknown",
  latency = null,
  events = null,
  dependencies = null,
  replayAvailable = null,
  evidenceCount = null,
  lastActivity = null,
  hasRuntimeData = true,
}: RuntimeCardProps) {
  const isHealthy = status === "healthy" || status === "operational" || status === "active" || status === "ok";
  const isOffline = status === "offline" || status === "failed" || status === "unhealthy";

  const statusBadgeColor = isHealthy
    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    : isOffline
    ? "bg-red-500/15 text-red-400 border-red-500/30"
    : "bg-amber-500/15 text-amber-400 border-amber-500/30";

  const statusDotColor = isHealthy
    ? "bg-emerald-400"
    : isOffline
    ? "bg-red-400"
    : "bg-amber-400";

  // Format dependencies display
  const depDisplay = Array.isArray(dependencies)
    ? dependencies.join(", ")
    : dependencies != null
    ? String(dependencies)
    : "—";

  // Format replay availability display
  const replayDisplay =
    typeof replayAvailable === "boolean"
      ? replayAvailable
        ? "Available"
        : "Unavailable"
      : replayAvailable != null
      ? String(replayAvailable)
      : "—";

  return (
    <div className={`p-3 rounded-lg border bg-slate-900/60 backdrop-blur ${isOffline ? "border-red-500/30" : "border-slate-800"}`}>
      {/* Capability Header */}
      <div className="flex justify-between items-center mb-2.5">
        <div className="flex items-center gap-2">
          <Server size={14} className="text-cyan-400 shrink-0" />
          <span className="text-xs font-mono font-semibold text-slate-100">{id}</span>
        </div>
        {hasRuntimeData ? (
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadgeColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor} ${isHealthy ? "animate-pulse" : ""}`} />
            {status}
          </span>
        ) : (
          <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/40">
            NO DATA
          </span>
        )}
      </div>

      {!hasRuntimeData ? (
        <div className="py-4 border border-dashed border-slate-800 rounded bg-slate-950/40 text-center">
          <p className="text-[11px] font-mono text-slate-500">No Runtime Data Available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono bg-slate-950/40 p-2 rounded border border-slate-800/80">
          {/* Latency */}
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider">
              <Activity size={10} className="text-slate-400" /> Latency
            </div>
            <span className="font-semibold text-slate-200">
              {latency != null ? (typeof latency === "number" ? `${latency}ms` : latency) : "—"}
            </span>
          </div>

          {/* Events */}
          <div className="flex flex-col gap-0.5 border-l border-slate-800 pl-2">
            <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider">
              <Zap size={10} className="text-amber-400" /> Events
            </div>
            <span className="font-semibold text-slate-200">
              {events != null ? events.toLocaleString() : "—"}
            </span>
          </div>

          {/* Replay Availability */}
          <div className="flex flex-col gap-0.5 border-l border-slate-800 pl-2">
            <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider">
              <RotateCcw size={10} className="text-purple-400" /> Replay
            </div>
            <span className={`font-semibold ${replayDisplay === "Available" ? "text-emerald-400" : "text-slate-400"}`}>
              {replayDisplay}
            </span>
          </div>

          {/* Evidence Count */}
          <div className="flex flex-col gap-0.5 pt-1.5 border-t border-slate-800">
            <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider">
              <FileText size={10} className="text-blue-400" /> Evidence
            </div>
            <span className="font-semibold text-slate-200">
              {evidenceCount != null ? String(evidenceCount) : "—"}
            </span>
          </div>

          {/* Dependencies */}
          <div className="flex flex-col gap-0.5 pt-1.5 border-t border-l border-slate-800 pl-2 col-span-1 sm:col-span-2">
            <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase tracking-wider">
              <Layers size={10} className="text-cyan-400" /> Dependencies
            </div>
            <span className="font-semibold text-slate-300 truncate max-w-[180px]" title={depDisplay}>
              {depDisplay}
            </span>
          </div>

          {/* Last Activity */}
          <div className="flex items-center gap-1 text-[10px] text-slate-500 pt-1 border-t border-slate-800/60 col-span-2 sm:col-span-3 mt-0.5">
            <Clock size={10} /> Last Activity:
            <span className="text-slate-400 font-semibold">{lastActivity ? formatRelativeTime(lastActivity) : "—"}</span>
          </div>
        </div>
      )}
    </div>
  );
});
