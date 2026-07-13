import { memo } from "react";
import { AlertTriangle, AlertCircle, Info, CheckCircle, LucideIcon } from "lucide-react";
import { severityColor, severityBg } from "@/utils/format";
import type { Severity } from "@/types/api";

export interface AlertCardProps {
  /** The primary alert message */
  message: string;
  /** Severity level (critical, high, medium, low, info) */
  severity: Severity;
  /** Source or system component generating the alert */
  source: string;
  /** Category or classification of the alert */
  category?: string;
  /** Display timestamp (e.g. relative time "2m ago") */
  timestamp?: string;
  /** True if operator has acknowledged the alert */
  acknowledged?: boolean;
}

const SEVERITY_ICONS: Record<Severity, LucideIcon> = {
  critical: AlertTriangle,
  high: AlertCircle,
  medium: AlertCircle,
  low: Info,
  info: Info,
};

export const AlertCard = memo(function AlertCard({
  message,
  severity,
  source,
  category,
  timestamp,
  acknowledged = false,
}: AlertCardProps) {
  const Icon = SEVERITY_ICONS[severity] ?? Info;
  
  return (
    <div className={`flex gap-2 p-2 rounded border transition-opacity ${severityBg(severity)} ${acknowledged ? "opacity-50" : "opacity-100"}`}>
      <Icon size={14} className={`shrink-0 mt-0.5 ${severityColor(severity)}`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-200 leading-snug line-clamp-2" title={message}>
          {message}
        </p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${severityColor(severity)}`}>
            {severity}
          </span>
          <span className="text-[10px] text-slate-400 px-1.5 py-0.5 bg-slate-800/50 rounded">
            {source}
          </span>
          {category && (
            <span className="text-[10px] text-slate-500">
              {category}
            </span>
          )}
          {timestamp && (
            <span className="text-[10px] text-slate-500 ml-auto font-mono">
              {timestamp}
            </span>
          )}
        </div>
      </div>
      {acknowledged && (
        <div className="shrink-0 flex items-start" title="Acknowledged">
          <CheckCircle size={12} className="text-slate-500 mt-0.5" />
        </div>
      )}
    </div>
  );
});
