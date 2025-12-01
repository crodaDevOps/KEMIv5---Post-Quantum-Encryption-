import { motion } from "framer-motion";

export default function WireView({ envelope }: { envelope: any }) {
  const meta = envelope?.meta ?? {};
  const hash = envelope?.assembledJson ? btoa(envelope.assembledJson).slice(0, 12) : "—";
  return (
    <div className="p-4 border border-neutral-800 bg-neutral-900 h-full">
      <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-3">Wire Transport</div>

      <div className="text-xs font-mono text-neutral-300 space-y-1">
        <div className="flex justify-between"><span>Topic:</span> <span className="text-coral">{meta.topic || "secure-events"}</span></div>
        <div className="flex justify-between"><span>Partition:</span> <span className="text-neutral-500">{meta.partition ?? 0}</span></div>
        <div className="flex justify-between"><span>TS:</span> <span className="text-neutral-500">{meta.timestamp ? new Date(meta.timestamp).toLocaleTimeString() : "--:--:--"}</span></div>
        <div className="flex justify-between"><span>Hash:</span> <span className="text-neutral-500">{hash}</span></div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-800">
        <div className="relative h-6 w-full bg-neutral-950 border border-neutral-800 overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-[9px] text-neutral-600 uppercase">Bus</div>
             <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: envelope?.transmitted ? 200 : 0, opacity: envelope?.transmitted ? 0 : 1 }}
              transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}
              className="absolute top-0.5 bottom-0.5 w-8 bg-coral"
            />
        </div>
      </div>
    </div>
  );
}