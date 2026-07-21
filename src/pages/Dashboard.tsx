import { lazy, Suspense } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
const ExecutiveLayout = lazy(() => import("@/components/dashboard/layouts/ExecutiveLayout"));
const OperationsLayout = lazy(() => import("@/components/dashboard/layouts/OperationsLayout"));
const IntegrationLayout = lazy(() => import("@/components/dashboard/layouts/IntegrationLayout"));
const DecisionIntelligenceLayout = lazy(() => import("@/components/dashboard/layouts/DecisionIntelligenceLayout"));
const WorkflowLayout = lazy(() => import("@/components/dashboard/layouts/WorkflowLayout"));
const OperatorConsoleLayout = lazy(() => import("@/components/dashboard/layouts/OperatorConsoleLayout"));
const RuntimeHealthLayout = lazy(() => import("@/components/dashboard/layouts/RuntimeHealthLayout"));
const ReplayLayout = lazy(() => import("@/components/dashboard/layouts/ReplayLayout"));
const EvidenceLayout = lazy(() => import("@/components/dashboard/layouts/EvidenceLayout"));
const RepositoryRegistryLayout = lazy(() => import("@/components/dashboard/layouts/RepositoryRegistryLayout"));
const BuildRegistryLayout = lazy(() => import("@/components/dashboard/layouts/BuildRegistryLayout"));
const MigrationQueueLayout = lazy(() => import("@/components/dashboard/layouts/MigrationQueueLayout"));
const ReviewQueueLayout = lazy(() => import("@/components/dashboard/layouts/ReviewQueueLayout"));
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardConfig } from "@/components/dashboard/DashboardProvider";

const ObservabilityLayout = lazy(() => import("@/components/dashboard/layouts/ObservabilityLayout"));

function DashboardGrid() {
  const { zones } = useDashboardConfig();

  return (
    <div className="grid grid-cols-12 gap-2">

      {/* Row 1 — Executive */}
      {zones.executiveSummary.visible && (
        <div className={zones.executiveSummary.colSpan}>
          <ErrorBoundary fallbackTitle="Executive Summary Crashed">
            <Suspense fallback={<Skeleton className="h-32 rounded-lg bg-slate-800/40" />}>
              <ExecutiveLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 2 — Operations + Integrations */}
      {zones.operationsGrid.visible && (
        <div className={zones.operationsGrid.colSpan}>
          <ErrorBoundary fallbackTitle="Operations Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <OperationsLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.liveAlerts.visible && (
        <div className={zones.liveAlerts.colSpan}>
          <ErrorBoundary fallbackTitle="Integrations Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <IntegrationLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 3 — Decision Intelligence + Observability */}
      {zones.riskHeatmap.visible && (
        <div className={zones.riskHeatmap.colSpan}>
          <ErrorBoundary fallbackTitle="Intelligence Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <DecisionIntelligenceLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.telemetry.visible && (
        <div className={zones.telemetry.colSpan}>
          <ErrorBoundary fallbackTitle="Observability Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <ObservabilityLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 4 — Workflows + Operator Console */}
      {zones.incidentQueue.visible && (
        <div className={zones.incidentQueue.colSpan}>
          <ErrorBoundary fallbackTitle="Workflows Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <WorkflowLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.operationalTimeline.visible && (
        <div className={zones.operationalTimeline.colSpan}>
          <ErrorBoundary fallbackTitle="Operator Console Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <OperatorConsoleLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 5 — Runtime Health + Replay */}
      {zones.systemHealth.visible && (
        <div className={zones.systemHealth.colSpan}>
          <ErrorBoundary fallbackTitle="Health Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <RuntimeHealthLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.runtimeSessions.visible && (
        <div className={zones.runtimeSessions.colSpan}>
          <ErrorBoundary fallbackTitle="Replay Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <ReplayLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 6 — Evidence */}
      {zones.evidencePanel.visible && (
        <div className={zones.evidencePanel.colSpan}>
          <ErrorBoundary fallbackTitle="Evidence Crashed">
            <Suspense fallback={<Skeleton className="h-48 rounded-lg bg-slate-800/40" />}>
              <EvidenceLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 7 — BHEX Operational Surface: Repository & Build Registries */}
      {zones.repositoryRegistry?.visible && (
        <div className={zones.repositoryRegistry.colSpan}>
          <ErrorBoundary fallbackTitle="Repository Registry Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <RepositoryRegistryLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.buildRegistry?.visible && (
        <div className={zones.buildRegistry.colSpan}>
          <ErrorBoundary fallbackTitle="Build Registry Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <BuildRegistryLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Row 8 — BHEX Operational Surface: Migration & Review Queues */}
      {zones.migrationQueue?.visible && (
        <div className={zones.migrationQueue.colSpan}>
          <ErrorBoundary fallbackTitle="Migration Queue Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <MigrationQueueLayout />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      {zones.reviewQueue?.visible && (
        <div className={zones.reviewQueue.colSpan}>
          <ErrorBoundary fallbackTitle="Review Queue Crashed">
            <Suspense fallback={<Skeleton className="h-64 rounded-lg bg-slate-800/40" />}>
              <ReviewQueueLayout />
            </Suspense>
          </ErrorBoundary>
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
