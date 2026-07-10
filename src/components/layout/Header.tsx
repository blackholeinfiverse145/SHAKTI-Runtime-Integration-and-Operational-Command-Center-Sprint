import { useState, useEffect } from "react";
import { Bell, Activity, Zap } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bg-slate-900 border-b border-slate-700/60 px-4 py-2.5 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-amber-400" />
          <span className="text-base font-bold text-slate-100 tracking-tight">SHAKTI</span>
        </div>
        <span className="text-slate-600 text-sm hidden sm:block">|</span>
        <span className="text-xs text-slate-500 hidden sm:block">Operational Command Center</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold">LIVE</span>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-xs font-mono text-slate-300">{time.toLocaleTimeString("en-IN")}</p>
          <p className="text-xs text-slate-600">{time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</p>
        </div>

        <button className="relative text-slate-500 hover:text-slate-300 transition-colors" aria-label="Notifications">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">OP</span>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-semibold text-slate-300">Operator</p>
            <p className="text-xs text-slate-600">Grid Control</p>
          </div>
        </div>
      </div>
    </header>
  );
}
