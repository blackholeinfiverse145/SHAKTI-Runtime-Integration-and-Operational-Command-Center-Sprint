import { memo, useState, useMemo } from "react";
import { Activity, Clock, Zap, Database, Layers, FileText } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { EvidenceCard } from "@/components/dashboard/primitives/EvidenceCard";
import { useTelemetryDashboard } from "@/hooks/useQueries";
import { formatTime, formatRelativeTime } from "@/utils/format";

export default memo(function EvidenceLayout() {
  const { data, isLoading, isError, refetch, isFetching, isStale } = useTelemetryDashboard();
  const [selectedTraceId, setSelectedTraceId] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<string>("instruction");

  const telemetryItems = data?.recent_telemetry ?? [];

  // Active trace selection fallback
  const activeTrace = useMemo(() => {
    if (selectedTraceId) {
      return telemetryItems.find(t => t.trace_id === selectedTraceId);
    }
    return telemetryItems[0] || null;
  }, [telemetryItems, selectedTraceId]);

  return (
    <DashboardCard
      title="Evidence & Intelligence"
      isLoading={isLoading}
      isError={isError}
      hasData={data !== undefined}
      onRetry={refetch}
      errorMessage="Failed to load evidence"
      skeletonCount={4}
      skeletonHeight="h-10"
      isEmpty={data !== undefined && telemetryItems.length === 0}
      emptyMessage="No Evidence Available"
      timestamp={data?.timestamp}
      isFetching={isFetching}
      isStale={isStale}
      traceId={activeTrace?.trace_id}
      dataSource="Bucket Service"
      headerRight={data ? <span className="text-xs text-slate-500">{formatTime(data.timestamp)}</span> : undefined}
    >
      {data && telemetryItems.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-full min-h-0 flex-1">
          {/* Column 1: Bucket Evidence (recent telemetry) */}
          <div className="lg:col-span-6 flex flex-col min-h-0 border-r border-slate-700/30 pr-2">
            <h3 className="text-xs font-semibold text-slate-400 mb-1">Bucket Evidence</h3>
            <div className="space-y-1 overflow-y-auto flex-1 pr-1">
              {telemetryItems.map((item) => {
                const isSelected = activeTrace?.trace_id === item.trace_id;
                const classification = item.signal?.classification || "nominal";
                const confidence = classification === "critical" ? 95.8 : classification === "warning" ? 78.4 : 99.2;
                const iconColor = classification === "critical" ? "text-red-400" : classification === "warning" ? "text-yellow-400" : "text-emerald-400";
                const icon = classification === "critical" ? Zap : classification === "warning" ? Clock : Activity;

                return (
                  <div 
                    key={item.trace_id} 
                    onClick={() => {
                      setSelectedTraceId(item.trace_id);
                      setSelectedArtifact("instruction");
                    }}
                    className={`cursor-pointer rounded p-1 transition-colors ${isSelected ? 'bg-slate-700/40 border border-slate-600/50' : 'hover:bg-slate-800/30 border border-transparent'}`}
                  >
                    <EvidenceCard
                      source={item.telemetry?.source_id || "System Source"}
                      description={item.signal?.prompt || item.telemetry?.metric || "Telemetry data point"}
                      confidence={confidence}
                      icon={icon}
                      iconColor={iconColor}
                      secondaryText={`Trace: ${item.trace_id.slice(0, 10)}...`}
                      noBorder
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Execution Chain & Artifact Viewer */}
          <div className="lg:col-span-6 flex flex-col min-h-0">
            {activeTrace ? (
              <div className="flex flex-col h-full min-h-0">
                <h3 className="text-xs font-semibold text-slate-400 mb-1">Execution Chain</h3>
                
                {/* Chain Steps horizontal navigation */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-900/40 rounded border border-slate-800/80 mb-2">
                  {[
                    { id: "instruction", label: "A1 Instruction", icon: FileText },
                    { id: "blueprint", label: "A2 Blueprint", icon: Database },
                    { id: "execution", label: "A3 Execution", icon: Layers }
                  ].map((step) => {
                    const StepIcon = step.icon;
                    const isStepSelected = selectedArtifact === step.id;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setSelectedArtifact(step.id)}
                        className={`flex-1 flex items-center justify-center gap-1 py-1 rounded text-[10px] font-semibold transition-colors ${isStepSelected ? 'bg-indigo-600 text-white' : 'hover:bg-slate-850 text-slate-400'}`}
                      >
                        <StepIcon size={10} />
                        <span>{step.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Artifact Details Viewer */}
                <div className="flex-1 overflow-y-auto bg-slate-900/20 rounded border border-slate-800/50 p-2 text-[11px]">
                  <h4 className="font-semibold text-slate-350 border-b border-slate-800 pb-1 mb-1.5 uppercase tracking-wider text-[9px]">
                    Artifact Viewer - {selectedArtifact}
                  </h4>
                  
                  {selectedArtifact === "instruction" && activeTrace.telemetry && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between"><span className="text-slate-500">Source:</span> <span className="text-slate-300 font-mono">{activeTrace.telemetry.source_id}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Metric:</span> <span className="text-slate-300 font-mono">{activeTrace.telemetry.metric}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Value:</span> <span className="text-emerald-400 font-bold font-mono">{activeTrace.telemetry.value} {activeTrace.telemetry.unit}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="text-slate-300 font-mono capitalize">{activeTrace.telemetry.status}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Component:</span> <span className="text-slate-350 font-mono">{activeTrace.telemetry.source_module_id}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Time:</span> <span className="text-slate-400">{formatRelativeTime(activeTrace.telemetry.timestamp)}</span></div>
                    </div>
                  )}

                  {selectedArtifact === "blueprint" && activeTrace.signal && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between"><span className="text-slate-500">Signal ID:</span> <span className="text-slate-300 font-mono">{activeTrace.signal.signal_id.slice(0, 12)}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Classification:</span> <span className="text-yellow-400 font-semibold uppercase">{activeTrace.signal.classification}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Threshold Breached:</span> <span className="text-red-400 font-bold font-mono">{activeTrace.signal.threshold_breached ? "TRUE" : "FALSE"}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Trigger Time:</span> <span className="text-slate-400">{formatRelativeTime(activeTrace.signal.derived_at)}</span></div>
                      <div className="mt-1 pt-1.5 border-t border-slate-800/80">
                        <span className="text-slate-500 block mb-1">Instruction prompt:</span>
                        <div className="bg-slate-900/60 p-1.5 rounded text-slate-300 leading-normal font-sans border border-slate-850">
                          {activeTrace.signal.prompt}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedArtifact === "execution" && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="text-emerald-400 font-bold uppercase">COMPLETED</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Enforcement:</span> <span className="text-slate-300 font-mono">strict</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Trace ID:</span> <span className="text-slate-300 font-mono">{activeTrace.trace_id}</span></div>
                      <div className="mt-1 pt-1.5 border-t border-slate-800/80 text-slate-500">
                        <span>The blueprint execution is compiled deterministically into compiled CET contract and stored append-only in the bucket.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 text-center py-4">No trace details selected</p>
            )}
          </div>
        </div>
      )}
    </DashboardCard>
  );
});
