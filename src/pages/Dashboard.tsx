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

const ForecastPanel = lazy(() => import("@/components/dashboard/ForecastPanel"));

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-2.5">

        {/* Row 1 — Executive Summary (full width) */}
        <div className="col-span-12">
          <ExecutiveSummary />
        </div>

        {/* Row 2 — Grid Status + Alert Queue */}
        <div className="col-span-12 lg:col-span-7">
          <NationalGridStatus />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <LiveAlertQueue />
        </div>

        {/* Row 3 — Risk Heatmap + Forecast */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <RiskHeatmap />
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-8">
          <Suspense fallback={<Skeleton className="h-64 rounded-lg" />}>
            <ForecastPanel />
          </Suspense>
        </div>

        {/* Row 4 — Incident Queue + Operational Timeline */}
        <div className="col-span-12 md:col-span-6">
          <IncidentQueue />
        </div>
        <div className="col-span-12 md:col-span-6">
          <OperationalTimeline />
        </div>

        {/* Row 5 — System Health + Replay Status */}
        <div className="col-span-12 md:col-span-7">
          <SystemHealth />
        </div>
        <div className="col-span-12 md:col-span-5">
          <ReplayStatus />
        </div>

        {/* Row 6 — Evidence Panel (full width) */}
        <div className="col-span-12">
          <EvidencePanel />
        </div>

      </div>
    </DashboardLayout>
  );
}
