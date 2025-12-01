import { motion } from "framer-motion";
import { short } from "../../lib/envelopeUtils";
import { TreeIcon } from "../oswego/TreeIcon";
import { FlaskIcon } from "../oswego/FlaskIcon";
import { LatticeIcon } from "../oswego/LatticeIcon";

export default function EnvelopeCanvasAdvanced({
  stage,
  envelope,
}: {
  stage: number;
  envelope: any;
}) {
  const steps = [
    { id: "keygen", label: "KeyGen", icon: <TreeIcon /> },
    { id: "encaps", label: "Encapsulate", icon: <LatticeIcon /> },
    { id: "sign", label: "Sign", icon: <FlaskIcon /> },
    { id: "encrypt", label: "Encrypt", icon: <div className="text-coral text-lg leading-none">●</div> },
    { id: "assemble", label: "Assemble", icon: <div className="text-neutral-400 text-lg leading-none">▦</div> },
    { id: "transmit", label: "Transmit", icon: <div className="text-neutral-400 text-lg leading-none">→</div> },
  ];

  return (
    <div className="border border-neutral-800 bg-neutral-950 p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {steps.map((s, i) => {
          const active = i === stage;
          const passed = i < stage;
          return (
            <motion.div 
                key={s.id} 
                initial={{ opacity: 0.5, y: 4 }} 
                animate={{ opacity: active || passed ? 1 : 0.4, y: active ? 0 : 4, borderColor: active ? "rgba(255, 107, 90, 0.4)" : "rgba(38, 38, 38, 1)" }} 
                transition={{ duration: 0.3 }} 
                className={`p-4 border bg-neutral-900 transition-colors relative overflow-hidden`}
            >
              {active && <div className="absolute top-0 left-0 w-full h-0.5 bg-coral" />}
              <div className="flex flex-col justify-between h-full gap-3">
                <div className="flex justify-between items-start">
                    <div className="opacity-80 scale-90 origin-top-left">{s.icon}</div>
                    <div className="text-[10px] font-mono text-neutral-600">0{i+1}</div>
                </div>
                <div>
                  <div className={`text-[10px] uppercase tracking-wider font-bold ${active ? "text-white" : "text-neutral-500"}`}>{s.label}</div>
                  <div className="text-[10px] text-neutral-400 mt-1 font-mono truncate">
                    {renderMiniDetail(s.id, envelope)}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6">
        <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-2 flex justify-between items-center">
            <span>Envelope JSON Preview</span>
            {envelope?.assembled && <span className="text-coral">Ready</span>}
        </div>
        <div className="p-3 border border-neutral-800 bg-neutral-900 h-40 overflow-auto">
             <pre className="text-[10px] text-neutral-300 font-mono leading-relaxed">
                {JSON.stringify(envelope?.assembled ?? (envelope ?? {}), null, 2)}
             </pre>
        </div>
      </div>
    </div>
  );
}

function renderMiniDetail(id: string, envelope: any) {
  switch (id) {
    case "keygen":
      return envelope?.keypair ? `Pub: ${short(envelope.keypair.publicKey)}` : "Wait: ML-KEM KeyGen";
    case "encaps":
      return envelope?.kem_ct ? `CT: ${short(envelope.kem_ct)}` : "Wait: Encapsulate";
    case "sign":
      return envelope?.signature ? `Sig: ${short(envelope.signature)}` : "Wait: Sign meta";
    case "encrypt":
      return envelope?.aead_ct ? `Nonce: ${short(envelope.nonce)}` : "Wait: AEAD Encrypt";
    case "assemble":
      return envelope?.assembled ? `Size: ${envelope.assembledJson?.length ?? 0} B` : "Wait: Packing";
    case "transmit":
      return envelope?.transmitted ? "State: Sent" : "State: Idle";
    default:
      return "";
  }
}