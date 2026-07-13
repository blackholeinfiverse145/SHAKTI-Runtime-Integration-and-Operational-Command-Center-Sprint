import { lazy, Suspense } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import ExecutiveLayout from "@/components/dashboard/layouts/ExecutiveLayout";
import OperationsLayout from "@/components/dashboard/layouts/OperationsLayout";
import IntegrationLayout from "@/components/dashboard/layouts/IntegrationLayout";
import DecisionIntelligenceLayout from "@/components/dashboard/layouts/DecisionIntelligenceLayout";
import WorkflowLayout from "@/components/dashboard/layouts/WorkflowLayout";
import OperatorConsoleLayout from "@/components/dashboard/layouts/OperatorConsoleLayout";
import RuntimeHealthLayout from "@/components/dashboard/layouts/RuntimeHealthLayout";
import ReplayLayout from "@/components/dashboard/layouts/ReplayLayout";
import EvidenceLayout from "@/components/dashboard/layouts/EvidenceLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardConfig } from "@/components/dashboard/DashboardProvider";

const ObservabilityLayout = lazy(() => import("@/components/dashboard/layouts/ObservabilityLayout"));

function DashboardGrid() {
  const { zones } = useDashboardConfig();

  return (
    <div className="grid grid-cols-12 gap-2.5">

      {/* Row 1 — Executive */}
      {zones.executiveSummary.visible && (
        <div className={zones.executiveSummary.colSpan}>
          <ExecutiveLayout />
        </div>
      )}

      {/* Row 2 — Operations + Integrations */}
      {zones.operationsGrid.visible && (
        <div className={zones.operationsGrid.colSpan}>
          <OperationsLayout />
        </div>
      )}
      {zones.liveAlerts.visible && (
        <div className={zones.liveAlerts.colSpan}>
          <IntegrationLayout />
        </div>
      )}

      {/* Row 3 — Decision Intelligence + Observability */}
      {zones.riskHeatmap.visible && (
        <div className={zones.riskHeatmap.colSpan}>
          <DecisionIntelligenceLayout />
        </div>
      )}
      {zones.telemetry.visible && (
        <div className={zones.telemetry.colSpan}>
          <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
            <ObservabilityLayout />
          </Suspense>
        </div>
      )}

      {/* Row 4 — Workflows + Operator Console */}
      {zones.incidentQueue.visible && (
        <div className={zones.incidentQueue.colSpan}>
          <WorkflowLayout />
        </div>
      )}
      {zones.operationalTimeline.visible && (
        <div className={zones.operationalTimeline.colSpan}>
          <OperatorConsoleLayout />
        </div>
      )}

      {/* Row 5 — Runtime Health + Replay */}
      {zones.systemHealth.visible && (
        <div className={zones.systemHealth.colSpan}>
          <RuntimeHealthLayout />
        </div>
      )}
      {zones.runtimeSessions.visible && (
        <div className={zones.runtimeSessions.colSpan}>
          <ReplayLayout />
        </div>
      )}

      {/* Row 6 — Evidence */}
      {zones.evidencePanel.visible && (
        <div className={zones.evidencePanel.colSpan}>
          <EvidenceLayout />
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
