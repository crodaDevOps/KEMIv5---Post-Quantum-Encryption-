import { motion } from "framer-motion";

export default function EnvelopeCanvas({
  stage,
  envelope,
}: {
  stage: number;
  envelope: any;
}) {
  // stage: 0..5 mapping to steps
  const steps = [
    "KeyGen",
    "Encapsulate",
    "Sign",
    "Encrypt",
    "Assemble",
    "Transmit",
  ];

  function renderStageDetail(stageName: string, envelope: any) {
    switch (stageName) {
      case "KeyGen":
        return envelope?.keypair
          ? `Public: ${short(envelope.keypair.publicKey)}`
          : "Generate ML-KEM public key (simulated)";
      case "Encapsulate":
        return envelope?.kem_ct ? `CT: ${short(envelope.kem_ct)}` : "Encapsulate to recipient -> kem_ct";
      case "Sign":
        return envelope?.signature ? `Sig: ${short(envelope.signature)}` : "Sign metadata (simulated)";
      case "Encrypt":
        return envelope?.aead_ct ? `Nonce: ${short(envelope.nonce)}` : "AEAD encrypt payload";
      case "Assemble":
        return envelope?.assembled ? `Size: ${envelope.assembledJson?.length || 0} bytes` : "Pack envelope fields into JSON";
      case "Transmit":
        return envelope?.transmitted ? `Topic: ${envelope.meta?.topic || "secure-events"}` : "Push to Kafka (simulated)";
      default:
        return "";
    }
  }

  function short(s?: string) {
    if (!s) return "";
    if (s.length < 24) return s;
    return `${s.slice(0, 12)}…${s.slice(-8)}`;
  }

  return (
    <div className="w-full border border-neutral-800 bg-neutral-900 p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div className="flex flex-col gap-4">
            {steps.map((s, i) => {
              const active = i === stage;
              return (
                <motion.div
                  key={s}
                  initial={{ opacity: 0.6, x: -8 }}
                  animate={{ opacity: active ? 1 : 0.6, x: active ? 0 : -8 }}
                  transition={{ duration: 0.35 }}
                  className={`p-3 border ${active ? "border-coral" : "border-neutral-800"} bg-neutral-950 transition-colors duration-300`}
                >
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">{s}</div>
                  <div className="text-sm text-neutral-200 mt-1 font-mono">
                    {renderStageDetail(s, envelope)}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <div className="p-3 border border-neutral-800 bg-neutral-950 h-full">
            <div className="text-xs text-neutral-400 uppercase tracking-wider mb-2">Envelope Preview</div>
            <pre className="text-xs text-neutral-400 max-h-[300px] overflow-auto font-mono whitespace-pre-wrap">
              {JSON.stringify(envelope?.assembled ?? (envelope ?? {}), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}