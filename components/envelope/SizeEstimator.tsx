import { estimateEnvelopeSize } from "../../lib/envelopeUtils";

export default function SizeEstimator({ envelope, plaintext }: { envelope: any; plaintext: string }) {
  const size = estimateEnvelopeSize(envelope ?? {});
  const ptLen = new TextEncoder().encode(plaintext || "").length;
  const overhead = ptLen ? Math.round(((size - ptLen) / ptLen) * 100) : 0;
  
  return (
    <div className="p-4 border border-neutral-800 bg-neutral-900 h-full">
      <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-3">Metrics</div>
      <div className="text-xs font-mono text-neutral-300 space-y-1">
        <div className="flex justify-between"><span>Total Size:</span> <span className="text-white">{size} B</span></div>
        <div className="flex justify-between"><span>Payload:</span> <span className="text-neutral-500">{ptLen} B</span></div>
        <div className="flex justify-between"><span>Overhead:</span> <span className={overhead > 50 ? "text-yellow-500" : "text-green-500"}>{isFinite(overhead) ? `${overhead}%` : "—"}</span></div>
      </div>
      
      <div className="mt-4 w-full bg-neutral-950 h-1">
         <div className="bg-coral h-full transition-all duration-300" style={{ width: `${Math.min(100, (size / 2000) * 100)}%`}}></div>
      </div>
    </div>
  );
}