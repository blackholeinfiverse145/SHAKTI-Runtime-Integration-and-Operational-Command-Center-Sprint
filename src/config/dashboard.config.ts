// ─── SHAKTI Default Configuration ─────────────────────────────────────────────
// This config reproduces the exact current SHAKTI dashboard UI.
// It serves as the reference implementation for all future system integrations.
//
// To create a new system config, copy this file and change only the fields
// that differ. The DashboardProvider deep-merges your overrides with these defaults.

import { Zap } from "lucide-react";
import type { DashboardConfig } from "@/types/dashboard.types";

export const defaultDashboardConfig: DashboardConfig = {
  branding: {
    systemName: "SHAKTI",
    subtitle: "Operational Command Center",
    logoIcon: Zap,
    operatorLabel: "Operator",
    roleLabel: "Grid Control",
    operatorInitials: "OP",
  },

  zones: {
    executiveSummary: {
      visible: true,
      label: "Executive Summary",
      colSpan: "col-span-12",
    },
    operationsGrid: {
      visible: true,
      label: "Operations Grid",
      colSpan: "col-span-12 lg:col-span-7",
    },
    liveAlerts: {
      visible: true,
      label: "Live Alerts",
      colSpan: "col-span-12 lg:col-span-5",
    },
    riskHeatmap: {
      visible: true,
      label: "Risk Heatmap",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-4",
    },
    telemetry: {
      visible: true,
      label: "Telemetry",
      colSpan: "col-span-12 md:col-span-6 lg:col-span-8",
    },
    incidentQueue: {
      visible: true,
      label: "Operations Queue",
      colSpan: "col-span-12 md:col-span-6",
    },
    operationalTimeline: {
      visible: true,
      label: "Operational Timeline",
      colSpan: "col-span-12 md:col-span-6",
    },
    systemHealth: {
      visible: true,
      label: "System Health",
      colSpan: "col-span-12 md:col-span-7",
    },
    runtimeSessions: {
      visible: true,
      label: "Runtime Sessions",
      colSpan: "col-span-12 md:col-span-5",
    },
    evidencePanel: {
      visible: true,
      label: "Evidence Panel",
      colSpan: "col-span-12",
    },
  },

  features: {
    notifications: true,
    liveBadge: true,
    userMenu: true,
    clock: true,
  },
};
