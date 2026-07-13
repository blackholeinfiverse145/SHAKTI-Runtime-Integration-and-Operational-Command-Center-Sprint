import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import { DashboardProvider } from "@/components/dashboard/DashboardProvider";
import type { DashboardConfigOverride } from "@/types/dashboard.types";

interface DashboardLayoutProps {
  children: ReactNode;
  /** Partial config overrides — deep-merged with defaults */
  config?: DashboardConfigOverride;
}

export default function DashboardLayout({ children, config }: DashboardLayoutProps) {
  return (
    <DashboardProvider config={config}>
      <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
        <Header />
        <main className="flex-1 overflow-auto p-3">{children}</main>
      </div>
    </DashboardProvider>
  );
}
