import React, { useState } from "react";
import { motion } from "framer-motion";

const milestones = [
  { id: "now", title: "KEMIv5.15 Release", detail: "PQ streaming envelopes, AEAD micro-messages." },
  { id: "q2", title: "Hybrid Handshakes", detail: "Automatic key rotation; Kafka/Redpanda integration." },
  { id: "q4", title: "Hardware Acceleration", detail: "FPGA/HSM offload pathways." },
];

export default function RoadmapTimeline() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  return (
    <div className="p-4 border border-neutral-800 bg-neutral-900 mt-4">
      <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-3">Engineering Roadmap</div>
      <div className="space-y-1">
        {milestones.map((m, i) => (
          <div key={m.id} className="border-l border-neutral-800 pl-4 py-2 relative">
            <div className="absolute -left-[3px] top-3 w-1.5 h-1.5 bg-neutral-700 rounded-full"></div>
            <div className="flex-1">
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => setOpen((s) => ({ ...s, [m.id]: !s[m.id] }))}
              >
                <div className="text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors uppercase tracking-wide">{m.title}</div>
                <div className={`text-[10px] text-coral transform transition-transform ${open[m.id] ? "rotate-90" : ""}`}>›</div>
              </div>

              <motion.div 
                initial={{ height: 0, opacity: 0 }} 
                animate={{ height: open[m.id] ? "auto" : 0, opacity: open[m.id] ? 1 : 0 }} 
                transition={{ duration: 0.2 }} 
                className="overflow-hidden"
              >
                <div className="text-neutral-500 mt-2 text-[10px] leading-relaxed">{m.detail}</div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}