import React, { useState } from 'react';
import { Terminal, CheckCircle2, Play, RefreshCw, Clock, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';
import { SCENARIOS } from '../data';

export const SimulatorSection: React.FC = () => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<string>('network');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(4); // default all displayed

  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS.network;

  const handleScenarioChange = (key: string) => {
    setSelectedScenarioKey(key);
    setActiveStepIndex(4);
    setIsSimulating(false);
  };

  const runLiveSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setActiveStepIndex(current);
      if (current >= currentScenario.steps.length) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <section id="simulator" className="pt-10 scroll-mt-20">
      <div className="p-6 sm:p-8 rounded-3xl bg-white text-neutral-950 shadow-md space-y-6 border border-neutral-200">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                Interactive Support Sandbox
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
              Awonke's IT Resolution Approach Simulator
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Diagnosing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Step Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Selector & Details */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label htmlFor="scenarioSelect" className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Select Incident Scenario:
              </label>
              <select
                id="scenarioSelect"
                value={selectedScenarioKey}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-950 text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-medium cursor-pointer"
              >
                <option value="network">Network & Connectivity Bottleneck (CCNA)</option>
                <option value="database">SQL Database Query / Data Discrepancy</option>
                <option value="m365">Microsoft 365 Role-Based Access & Licensing</option>
                <option value="workflow">Departmental Administrative Bottleneck</option>
              </select>
            </div>

            {/* Scenario Description Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-950 font-bold">
                <span className="uppercase">{currentScenario.category}</span>
                <span className="flex items-center gap-1 text-neutral-700">
                  <Clock className="w-3 h-3" />
                  <span>Target SLA: {currentScenario.resolutionTime}</span>
                </span>
              </div>
              <p className="text-xs text-neutral-800 leading-relaxed font-medium">
                {currentScenario.description}
              </p>
            </div>

            {/* Resolution Strategy Philosophy */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-[11px] text-neutral-800 flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" />
              <span>
                <strong className="text-neutral-950">Dual-layer execution:</strong> Combines CCNA/SQL technical diagnostics with administrative business process checks to ensure sustained resolution.
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Terminal / Output Steps */}
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-300 font-mono text-xs space-y-3 shadow-inner">
            <div className="text-neutral-700 border-b border-neutral-300 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-neutral-950 font-bold">
                <Terminal className="w-4 h-4 text-neutral-950" />
                <span>// AWONKE_IT_SOP_RESOLUTION_LOGS</span>
              </span>
              <span className="text-neutral-950 text-[11px] font-bold">
                {activeStepIndex} of {currentScenario.steps.length} Steps Active
              </span>
            </div>

            <div className="space-y-2.5 pt-1">
              {currentScenario.steps.map((stepText, idx) => {
                const isExecuted = idx < activeStepIndex;
                const isCurrent = idx === activeStepIndex && isSimulating;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border transition-all ${
                      isExecuted
                        ? 'bg-white border-neutral-300 text-neutral-950 font-medium'
                        : isCurrent
                        ? 'bg-neutral-200 border-neutral-400 text-neutral-950 animate-pulse font-bold'
                        : 'bg-neutral-100/60 border-neutral-200 text-neutral-500'
                    } flex items-start gap-2.5`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isExecuted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-neutral-950 animate-spin" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center text-[10px] text-neutral-500">
                          {idx + 1}
                        </span>
                      )}
                    </div>
                    <div className="leading-relaxed">
                      {stepText}
                    </div>
                  </div>
                );
              })}
            </div>

            {activeStepIndex >= currentScenario.steps.length && (
              <div className="pt-2 text-[11px] text-emerald-700 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Status: Incident fully resolved with root cause documented & verified.</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
