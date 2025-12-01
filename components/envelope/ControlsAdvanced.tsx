import React from "react";

export default function ControlsAdvanced({
  onStepBack,
  onStepForward,
  onAutoToggle,
  playing,
  onReset,
  onExport,
  onToggleFault,
  faultEnabled,
}: {
  onStepBack: () => void;
  onStepForward: () => void;
  onAutoToggle: () => void;
  playing: boolean;
  onReset: () => void;
  onExport: () => void;
  onToggleFault: () => void;
  faultEnabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center" role="toolbar" aria-label="Simulation Controls">
      <button onClick={onStepBack} aria-label="Step Back" className="px-3 py-2 border border-neutral-800 bg-neutral-900 text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors">
        ‹ Step
      </button>
      <button onClick={onStepForward} aria-label="Step Forward" className="px-3 py-2 border border-neutral-800 bg-neutral-900 text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors">
        Step ›
      </button>

      <button onClick={onAutoToggle} aria-pressed={playing} className="px-3 py-2 border border-neutral-800 bg-neutral-900 text-xs uppercase tracking-wider hover:bg-neutral-800 transition-colors min-w-[60px]">
        {playing ? "Pause" : "Play"}
      </button>

      <button onClick={onReset} className="px-3 py-2 bg-coral text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
        Reset
      </button>

      <button onClick={onExport} className="px-3 py-2 border border-coral text-coral text-xs uppercase tracking-wider hover:text-white hover:border-white transition-colors">
        Export JSON
      </button>

      <button
        onClick={onToggleFault}
        aria-pressed={faultEnabled}
        className={`px-3 py-2 text-[10px] font-mono border uppercase tracking-wider transition-colors ${faultEnabled ? "border-red-500 text-red-400 bg-red-950/20" : "border-neutral-800 text-neutral-500 hover:text-neutral-300"}`}
      >
        {faultEnabled ? "Fault: ON" : "Fault: OFF"}
      </button>
    </div>
  );
}