import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── DashboardCard ────────────────────────────────────────────────────────────
// Reusable wrapper for every dashboard zone.
// Handles: card shell, section title, loading skeletons, error + retry, empty state.
// Eliminates the 9× duplicated pattern across zone components.

interface DashboardCardProps {
  /** Section heading displayed in the card header */
  title: string;
  /** Override aria-label for the section; defaults to title */
  ariaLabel?: string;
  /** Optional content rendered to the right of the title (badges, status, refresh) */
  headerRight?: ReactNode;
  /** Show loading skeleton placeholders */
  isLoading?: boolean;
  /** Show error state with retry button */
  isError?: boolean;
  /** Callback for the retry button in error state */
  onRetry?: () => void;
  /** Error message shown in error state */
  errorMessage?: string;
  /** When true, show the empty state message instead of children */
  isEmpty?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Number of skeleton rows during loading */
  skeletonCount?: number;
  /** Tailwind height class for each skeleton row */
  skeletonHeight?: string;
  /** Additional className merged with card base styles */
  className?: string;
  /** Content rendered in success state */
  children?: ReactNode;
}

export function DashboardCard({
  title,
  ariaLabel,
  headerRight,
  isLoading = false,
  isError = false,
  onRetry,
  errorMessage = "Failed to load data",
  isEmpty = false,
  emptyMessage = "No data available",
  skeletonCount = 4,
  skeletonHeight = "h-14",
  className,
  children,
}: DashboardCardProps) {
  return (
    <section
      aria-label={ariaLabel ?? title}
      className={cn(
        "bg-slate-800/60 border border-slate-700/50 rounded-lg p-3 flex flex-col gap-2",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
          {title}
        </h2>
        {headerRight}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton key={i} className={`${skeletonHeight} bg-slate-700/50 rounded`} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <p className="text-xs text-red-400">{errorMessage}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              Retry
            </button>
          )}
        </div>
      ) : isEmpty ? (
        <p className="text-xs text-slate-500 text-center py-4">{emptyMessage}</p>
      ) : (
        children
      )}
    </section>
  );
}
