import { useState } from "react";
import { jsonDiff } from "../../lib/envelopeUtils";
import { motion } from "framer-motion";

export default function DiffView({ before, after }: { before: any; after: any }) {
  const [leftRaw, setLeftRaw] = useState(JSON.stringify(before ?? {}, null, 2));
  const [rightRaw, setRightRaw] = useState(JSON.stringify(after ?? {}, null, 2));
  // Re-parse to allow user editing if desired, though primarily display
  const diffs = jsonDiff(JSON.parse(leftRaw || "{}"), JSON.parse(rightRaw || "{}"));

  return (
    <div className="p-4 border border-neutral-800 bg-neutral-900 mt-6">
      <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-3">Payload Transformation Diff</div>
      
      <div className="grid grid-cols-2 gap-4 h-48">
        <textarea 
            className="bg-neutral-950 p-3 text-[10px] font-mono text-neutral-400 border border-neutral-800 focus:border-neutral-600 outline-none resize-none" 
            value={leftRaw} 
            onChange={(e) => setLeftRaw(e.target.value)}
            readOnly
        />
        <textarea 
            className="bg-neutral-950 p-3 text-[10px] font-mono text-neutral-300 border border-neutral-800 focus:border-neutral-600 outline-none resize-none" 
            value={rightRaw} 
            onChange={(e) => setRightRaw(e.target.value)} 
            readOnly
        />
      </div>

      <div className="mt-3 text-[10px] font-mono border-t border-neutral-800 pt-2">
        {diffs.length === 0 ? (
          <div className="text-neutral-600 uppercase tracking-wider">No structural differences</div>
        ) : (
          diffs.map((d, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="py-1 flex gap-4">
              <div className="text-coral w-1/4 truncate">{d.path}</div>
              <div className="flex gap-2 w-3/4">
                <div className="w-1/2 text-neutral-500 truncate line-through decoration-red-500/50">{String(d.a).slice(0,30)}</div>
                <div className="w-1/2 text-leaf truncate">{String(d.b).slice(0,30)}</div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}