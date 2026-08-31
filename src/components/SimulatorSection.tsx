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
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-6 border border-slate-800">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                Interactive Support Sandbox
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Awonke's IT Resolution Approach Simulator
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md shadow-sky-600/30"
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
              <label htmlFor="scenarioSelect" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Select Incident Scenario:
              </label>
              <select
                id="scenarioSelect"
                value={selectedScenarioKey}
                onChange={(e) => handleScenarioChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white text-sm rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium cursor-pointer"
              >
                <option value="network">Network & Connectivity Bottleneck (CCNA)</option>
                <option value="database">SQL Database Query / Data Discrepancy</option>
                <option value="m365">Microsoft 365 Role-Based Access & Licensing</option>
                <option value="workflow">Departmental Administrative Bottleneck</option>
              </select>
            </div>

            {/* Scenario Description Card */}
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
                <span className="uppercase">{currentScenario.category}</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Target SLA: {currentScenario.resolutionTime}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>

            {/* Resolution Strategy Philosophy */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-200">Dual-layer execution:</strong> Combines CCNA/SQL technical diagnostics with administrative business process checks to ensure sustained resolution.
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Terminal / Output Steps */}
          <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3 shadow-inner">
            <div className="text-slate-400 border-b border-slate-800 pb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-300">
                <Terminal className="w-4 h-4 text-sky-400" />
                <span>// AWONKE_IT_SOP_RESOLUTION_LOGS</span>
              </span>
              <span className="text-sky-400 text-[11px] font-bold">
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
                        ? 'bg-slate-900/90 border-slate-800 text-slate-200'
                        : isCurrent
                        ? 'bg-sky-950/40 border-sky-600/60 text-sky-200 animate-pulse'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    } flex items-start gap-2.5`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isExecuted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">
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
              <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-2">
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
