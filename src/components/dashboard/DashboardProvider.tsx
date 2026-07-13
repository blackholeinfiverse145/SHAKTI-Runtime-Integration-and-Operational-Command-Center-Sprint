import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { DashboardConfig, DashboardConfigOverride } from "@/types/dashboard.types";
import { defaultDashboardConfig } from "@/config/dashboard.config";

// ─── Deep merge utility ───────────────────────────────────────────────────────

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T extends Record<string, unknown>>(base: T, override: Record<string, unknown>): T {
  const result = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];
    if (isPlainObject(baseVal) && isPlainObject(overrideVal)) {
      (result as Record<string, unknown>)[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      );
    } else if (overrideVal !== undefined) {
      (result as Record<string, unknown>)[key] = overrideVal;
    }
  }
  return result;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DashboardConfigContext = createContext<DashboardConfig>(defaultDashboardConfig);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface DashboardProviderProps {
  /** Partial config overrides — deep-merged with SHAKTI defaults */
  config?: DashboardConfigOverride;
  children: ReactNode;
}

export function DashboardProvider({ config: overrides, children }: DashboardProviderProps) {
  const mergedConfig = useMemo<DashboardConfig>(() => {
    if (!overrides) return defaultDashboardConfig;
    return deepMerge(
      defaultDashboardConfig as unknown as Record<string, unknown>,
      overrides as unknown as Record<string, unknown>,
    ) as unknown as DashboardConfig;
  }, [overrides]);

  return (
    <DashboardConfigContext.Provider value={mergedConfig}>
      {children}
    </DashboardConfigContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useDashboardConfig(): DashboardConfig {
  return useContext(DashboardConfigContext);
}
