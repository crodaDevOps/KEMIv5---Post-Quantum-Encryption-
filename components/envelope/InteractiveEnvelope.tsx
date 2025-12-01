import { useEffect, useRef, useState } from "react";
import ControlsAdvanced from "./ControlsAdvanced";
import EnvelopeCanvasAdvanced from "./EnvelopeCanvasAdvanced";
import WireView from "./WireView";
import SizeEstimator from "./SizeEstimator";
import DiffView from "./DiffView";
import FaultInjector from "./FaultInjector";
import { simulateKeyGen, simulateEncapsulate, deriveAeadKey, simulatedAeadEncrypt } from "../../lib/cryptoSim";

export default function InteractiveEnvelope() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [envelope, setEnvelope] = useState<any>(null);
  const [payload, setPayload] = useState("Hello from OswegoLabs — demo payload");
  const [faultEnabled, setFaultEnabled] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = window.setInterval(() => {
        setStage((s) => Math.min(5, s + 1));
      }, 1200);
    } else if (timer.current) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  useEffect(() => {
    // stage actions
    (async () => {
      if (stage === 0) {
        const kp = await simulateKeyGen();
        setEnvelope({ keypair: kp, meta: { timestamp: Date.now(), topic: "secure-events" } });
      } else if (stage === 1) {
        const recipient = envelope?.keypair?.publicKey ?? (await simulateKeyGen()).publicKey;
        const enc = await simulateEncapsulate(recipient);
        setEnvelope((e: any) => ({ ...e, kem_ct: enc.kem_ct, sharedSecretBlob: enc.sharedSecret }));
      } else if (stage === 2) {
        const fakeSig = btoa(Math.random().toString(36)).slice(0, 32);
        setEnvelope((e: any) => ({ ...e, signature: fakeSig }));
      } else if (stage === 3) {
        const shared = envelope?.sharedSecretBlob;
        if (shared) {
          const aeadKey = await deriveAeadKey(shared, "KEMIv5.15|demo");
          const enc = await simulatedAeadEncrypt(aeadKey, payload);
          setEnvelope((e: any) => ({ ...e, aead_key_hint: btoa(Array.from(new Uint8Array(aeadKey)).slice(0, 6).map((b) => b.toString(16)).join("")), nonce: enc.nonce, aead_ct: enc.ciphertext }));
        }
      } else if (stage === 4) {
        const assembled = {
          version: "5.15",
          alg: "KEMIv5.15",
          pkid: envelope?.keypair?.publicKey,
          kem_ct: envelope?.kem_ct,
          signature: envelope?.signature,
          nonce: envelope?.nonce,
          aead_ct: envelope?.aead_ct,
          meta: envelope?.meta,
        };
        setEnvelope((e: any) => ({ ...e, assembled, assembledJson: JSON.stringify(assembled) }));
      } else if (stage === 5) {
        // simulate transmit
        setEnvelope((e: any) => ({ ...e, transmitted: true }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  function stepForward() {
    setStage((s) => Math.min(5, s + 1));
  }
  function stepBack() {
    setStage((s) => Math.max(0, s - 1));
  }
  function toggleAuto() {
    setPlaying((p) => !p);
  }
  function reset() {
    setStage(0);
    setPlaying(false);
    setEnvelope(null);
  }

  function exportJson() {
    const data = envelope?.assembled ?? {};
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KEMIv5.15-envelope-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleFault() {
    setFaultEnabled((f) => !f);
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 1. Input Payload */}
      <div className="p-4 border border-neutral-800 bg-neutral-900">
        <label htmlFor="payload-input" className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-2 block">Input Payload</label>
        <textarea 
          id="payload-input"
          value={payload} 
          onChange={(e) => setPayload(e.target.value)} 
          rows={3} 
          className="w-full bg-neutral-950 text-neutral-200 p-3 text-xs border border-neutral-800 focus:border-coral outline-none transition-colors resize-none font-mono" 
          aria-label="Simulation Input Payload"
        />
      </div>

      {/* 2. Simulation Control */}
      <div className="p-4 border border-neutral-800 bg-neutral-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
           <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Simulation Control</div>
           <div className="flex gap-6 text-[10px] text-neutral-500 font-mono" role="status">
              <div className="flex gap-2"><span>Stage:</span> <span className="text-white">{stage} / 5</span></div>
              <div className="flex gap-2"><span>Auto:</span> <span className={playing ? "text-green-500" : "text-neutral-500"}>{playing ? "ON" : "OFF"}</span></div>
              <div className="flex gap-2"><span>Size:</span> <span>{envelope?.assembledJson?.length ?? 0} B</span></div>
           </div>
        </div>
        
        <ControlsAdvanced 
          onStepBack={stepBack} 
          onStepForward={stepForward} 
          onAutoToggle={toggleAuto} 
          playing={playing} 
          onReset={reset} 
          onExport={exportJson} 
          onToggleFault={toggleFault} 
          faultEnabled={faultEnabled} 
        />
        
        <div className="mt-4">
           <FaultInjector faultEnabled={faultEnabled} envelope={envelope} setEnvelope={setEnvelope} />
        </div>
      </div>

      {/* 3. Envelope Module (KeyGen, Encapsulate, etc) */}
      <EnvelopeCanvasAdvanced stage={stage} envelope={envelope} />

      {/* 4. Payload Transformation Diff */}
      <DiffView before={{ payload }} after={envelope?.assembled ?? {}} />

      {/* 5. Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SizeEstimator envelope={envelope} plaintext={payload} />
        <WireView envelope={envelope} />
      </div>

    </div>
  );
}