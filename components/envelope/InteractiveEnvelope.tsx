import React, { useEffect, useState, useRef } from "react";
import { Controls } from "./Controls";
import EnvelopeCanvas from "./EnvelopeCanvas";
import {
  simulateKeyGen,
  simulateEncapsulate,
  deriveAeadKey,
  simulatedAeadEncrypt,
} from "../../lib/cryptoSim";

export default function InteractiveEnvelope() {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  const [envelope, setEnvelope] = useState<any>(null);
  const [payload, setPayload] = useState<string>("Hello from OswegoLabs — demo payload");

  // Steps 0..5
  useEffect(() => {
    if (playing) {
      timerRef.current = window.setInterval(() => {
        setStage((s) => {
          if (s >= 5) {
             setPlaying(false);
             return 5;
          }
          return s + 1;
        });
      }, 1200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [playing]);

  useEffect(() => {
    // run action for current stage
    (async () => {
      if (stage === 0) {
        // reset and keygen
        const kp = await simulateKeyGen();
        setEnvelope({ keypair: kp, meta: { timestamp: Date.now(), topic: "secure-events" } });
      } else if (stage === 1) {
        // encapsulate to recipientPub (demo: use same pk)
        const recipient = envelope?.keypair?.publicKey ?? (await simulateKeyGen()).publicKey;
        const enc = await simulateEncapsulate(recipient);
        setEnvelope((e: any) => ({ ...e, kem_ct: enc.kem_ct, sharedSecretBlob: enc.sharedSecret }));
      } else if (stage === 2) {
        // "sign" metadata => just produce a short token
        const fakeSig = btoa(Math.random().toString(36)).slice(0, 32);
        setEnvelope((e: any) => ({ ...e, signature: fakeSig }));
      } else if (stage === 3) {
        // derive AEAD key and encrypt
        const shared = envelope?.sharedSecretBlob;
        if (shared) {
          const aeadKey = await deriveAeadKey(shared, "KEMIv5.15|demo");
          const enc = await simulatedAeadEncrypt(aeadKey, payload);
          setEnvelope((e: any) => ({
            ...e,
            aead_key_hint: btoa(Array.from(new Uint8Array(aeadKey)).slice(0, 8).map((b) => b.toString(16)).join("")),
            nonce: enc.nonce,
            aead_ct: enc.ciphertext,
          }));
        }
      } else if (stage === 4) {
        // assemble
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
        // transmit (simulate)
        setEnvelope((e: any) => ({ ...e, transmitted: true }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  function stepForward() {
    setStage((s) => Math.min(s + 1, 5));
  }
  function stepBack() {
    setStage((s) => Math.max(s - 1, 0));
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row items-start gap-6">
        <div className="flex-1 w-full">
          <EnvelopeCanvas stage={stage} envelope={envelope} />
        </div>

        <aside className="w-full lg:w-80">
          <div className="p-4 border border-neutral-800 bg-neutral-900">
            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Input Payload</div>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              rows={4}
              className="w-full bg-neutral-950 text-neutral-200 p-3 text-sm border border-neutral-800 focus:border-coral outline-none transition-colors"
            />
          </div>

          <div className="mt-4 p-4 border border-neutral-800 bg-neutral-900">
            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-3">Controls</div>
            <Controls
              onStepBack={stepBack}
              onStepForward={stepForward}
              onAutoToggle={toggleAuto}
              playing={playing}
              onReset={reset}
              onExport={exportJson}
            />

            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500 font-mono space-y-1">
              <div>Stage: {stage} / 5</div>
              <div>Auto: {playing ? "ON" : "OFF"}</div>
              <div>Envelope size: {envelope?.assembledJson?.length ?? 0} bytes</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}