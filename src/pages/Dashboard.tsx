import { lazy, Suspense } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExecutiveSummary from "@/components/dashboard/ExecutiveSummary";
import NationalGridStatus from "@/components/dashboard/NationalGridStatus";
import LiveAlertQueue from "@/components/dashboard/LiveAlertQueue";
import RiskHeatmap from "@/components/dashboard/RiskHeatmap";
import IncidentQueue from "@/components/dashboard/IncidentQueue";
import OperationalTimeline from "@/components/dashboard/OperationalTimeline";
import SystemHealth from "@/components/dashboard/SystemHealth";
import ReplayStatus from "@/components/dashboard/ReplayStatus";
import EvidencePanel from "@/components/dashboard/EvidencePanel";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardConfig } from "@/components/dashboard/DashboardProvider";

const ForecastPanel = lazy(() => import("@/components/dashboard/ForecastPanel"));

function DashboardGrid() {
  const { zones } = useDashboardConfig();

  return (
    <div className="grid grid-cols-12 gap-2.5">

      {/* Row 1 — Executive Summary (full width) */}
      {zones.executiveSummary.visible && (
        <div className={zones.executiveSummary.colSpan}>
          <ExecutiveSummary />
        </div>
      )}

      {/* Row 2 — Operations Grid + Alert Queue */}
      {zones.operationsGrid.visible && (
        <div className={zones.operationsGrid.colSpan}>
          <NationalGridStatus />
        </div>
      )}
      {zones.liveAlerts.visible && (
        <div className={zones.liveAlerts.colSpan}>
          <LiveAlertQueue />
        </div>
      )}

      {/* Row 3 — Risk Heatmap + Telemetry */}
      {zones.riskHeatmap.visible && (
        <div className={zones.riskHeatmap.colSpan}>
          <RiskHeatmap />
        </div>
      )}
      {zones.telemetry.visible && (
        <div className={zones.telemetry.colSpan}>
          <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
            <ForecastPanel />
          </Suspense>
        </div>
      )}

      {/* Row 4 — Incident Queue + Operational Timeline */}
      {zones.incidentQueue.visible && (
        <div className={zones.incidentQueue.colSpan}>
          <IncidentQueue />
        </div>
      )}
      {zones.operationalTimeline.visible && (
        <div className={zones.operationalTimeline.colSpan}>
          <OperationalTimeline />
        </div>
      )}

      {/* Row 5 — System Health + Runtime Sessions */}
      {zones.systemHealth.visible && (
        <div className={zones.systemHealth.colSpan}>
          <SystemHealth />
        </div>
      )}
      {zones.runtimeSessions.visible && (
        <div className={zones.runtimeSessions.colSpan}>
          <ReplayStatus />
        </div>
      )}

      {/* Row 6 — Evidence Panel (full width) */}
      {zones.evidencePanel.visible && (
        <div className={zones.evidencePanel.colSpan}>
          <EvidencePanel />
        </div>
      )}

    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardGrid />
    </DashboardLayout>
  );
}
