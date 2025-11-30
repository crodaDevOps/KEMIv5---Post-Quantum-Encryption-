import React from "react";

export function Controls({
  onStepBack,
  onStepForward,
  onAutoToggle,
  playing,
  onReset,
  onExport,
}: {
  onStepBack: () => void;
  onStepForward: () => void;
  onAutoToggle: () => void;
  playing: boolean;
  onReset: () => void;
  onExport: () => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={onStepBack}
        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm transition-colors text-white"
      >
        ‹ Step
      </button>
      <button
        onClick={onStepForward}
        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm transition-colors text-white"
      >
        Step ›
      </button>

      <button
        onClick={onAutoToggle}
        className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-sm transition-colors text-white min-w-[60px]"
      >
        {playing ? "Pause" : "Play"}
      </button>

      <button onClick={onReset} className="px-3 py-2 bg-coral hover:bg-white text-black text-sm font-semibold transition-colors">
        Reset
      </button>

      <button
        onClick={onExport}
        className="px-3 py-2 bg-transparent border border-coral text-coral hover:text-white hover:border-white text-sm transition-colors"
      >
        Export JSON
      </button>
    </div>
  );
}