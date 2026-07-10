import { Bell, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b px-8 py-4 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          SHAKTI
        </h1>

        <p className="text-sm text-slate-500">
          Operational Command Center
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <div className="flex items-center gap-2 text-green-600 font-medium">
          <Activity size={18} />
          Live
        </div>

        <Bell
          size={22}
          className="cursor-pointer text-slate-600"
        />

        <div className="text-right">
          <p className="font-semibold">Operator</p>
          <p className="text-sm text-slate-500">
            Runtime Dashboard
          </p>
        </div>

      </div>
    </header>
  );
}