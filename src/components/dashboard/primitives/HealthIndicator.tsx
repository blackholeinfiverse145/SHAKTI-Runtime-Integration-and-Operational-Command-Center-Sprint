import { memo } from "react";
import { statusColor, statusDot } from "@/utils/format";
import type { OperationalStatus } from "@/types/api";

export interface HealthIndicatorProps {
  /** Name of the component, service, or API */
  name: string;
  /** Current operational state */
  status: OperationalStatus;
  /** Optional response time in ms */
  responseTime?: number;
  /** Optional detail or error string */
  detail?: string;
  /** True to hide the border-bottom (default false) */
  noBorder?: boolean;
}

export const HealthIndicator = memo(function HealthIndicator({
  name,
  status,
  responseTime,
  detail,
  noBorder = false,
}: HealthIndicatorProps) {
  return (
    <div className={`flex items-center gap-2 py-1.5 ${noBorder ? "" : "border-b border-slate-700/30 last:border-0"}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot(status)}`} />
      <span className="text-xs text-slate-300 flex-1 truncate" title={name}>{name}</span>
      <span className="text-xs text-slate-500 w-14 text-right">
        {responseTime != null ? `${responseTime}ms` : "—"}
      </span>
      <span className="text-xs text-slate-500 w-16 text-right truncate" title={detail}>
        {detail ? detail : "—"}
      </span>
      <span className={`text-xs font-medium w-20 text-right capitalize ${statusColor(status)}`}>
        {status}
      </span>
    </div>
  );
});
