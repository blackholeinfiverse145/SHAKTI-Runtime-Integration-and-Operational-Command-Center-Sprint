import { ReactNode } from "react";
import Header from "@/components/layout/Header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      <Header />
      <main className="flex-1 overflow-auto p-3">{children}</main>
    </div>
  );
}
