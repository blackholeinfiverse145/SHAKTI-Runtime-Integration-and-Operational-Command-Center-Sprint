import { memo } from "react";
import type { Severity } from "@/types/api";

export interface StatusCardProps {
  /** Identifier or name of the status */
  label: string;
  /** Severity/priority of the item */
  severity: Severity;
  /** Current progress or completion state (0-100) */
  progress?: number;
  /** Visual theme mapping for the progress bar */
  statusTheme?: "running" | "completed" | "failed" | "pending" | "paused";
  /** Optional supplementary string right-aligned */
  secondaryText?: string;
}

const PRIORITY_DOT: Record<string, string> = {
  critical: "bg-red-400",
  high:     "bg-orange-400",
  medium:   "bg-yellow-400",
  low:      "bg-emerald-400",
  info:     "bg-slate-400",
};

const PRIORITY_TEXT: Record<string, string> = {
  critical: "text-red-400",
  high:     "text-orange-400",
  medium:   "text-yellow-400",
  low:      "text-emerald-400",
  info:     "text-slate-400",
};

const STATUS_BAR: Record<string, string> = {
  running:   "bg-blue-500",
  completed: "bg-emerald-500",
  failed:    "bg-red-500",
  pending:   "bg-yellow-500",
  paused:    "bg-slate-500",
};

export const StatusCard = memo(function StatusCard({
  label,
  severity,
  progress = 0,
  statusTheme = "running",
  secondaryText,
}: StatusCardProps) {
  const dot = PRIORITY_DOT[severity] ?? PRIORITY_DOT.info;
  const text = PRIORITY_TEXT[severity] ?? PRIORITY_TEXT.info;
  const bar = STATUS_BAR[statusTheme] ?? STATUS_BAR.paused;
  const pct = Math.min(100, Math.max(0, progress));

  return (
    <div className="flex items-center gap-3 py-1.5 border-b border-slate-700/40 last:border-0">
      <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
      <span className="text-[13px] font-medium text-slate-200 w-24 shrink-0 truncate" title={label}>{label}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${bar}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] text-slate-400 w-10 text-right font-mono">{pct}%</span>
      {secondaryText ? (
        <span className={`text-[11.5px] font-bold w-16 text-right capitalize ${text}`}>
          {secondaryText}
        </span>
      ) : (
        <span className={`text-[11.5px] font-bold w-16 text-right capitalize ${text}`}>
          {severity}
        </span>
      )}
    </div>
  );
});
