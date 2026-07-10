import { ReactNode } from "react";
import Header from "@/components/layout/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      {children}
    </div>
  );
}