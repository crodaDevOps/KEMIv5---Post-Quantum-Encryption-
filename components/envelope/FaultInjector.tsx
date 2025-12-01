export default function FaultInjector({
  faultEnabled,
  envelope,
  setEnvelope,
}: {
  faultEnabled: boolean;
  envelope: any;
  setEnvelope: (e: any) => void;
}) {
  function injectCorruptCipher() {
    if (!envelope) return;
    const corrupted = { ...envelope, aead_ct: "CORRUPTED_" + Math.random().toString(36).slice(2, 8).toUpperCase() };
    setEnvelope(corrupted);
  }
  function truncateKem() {
    if (!envelope) return;
    const ct = envelope?.kem_ct ?? "";
    const truncated = ct.slice(0, Math.max(8, Math.floor(ct.length / 3)));
    setEnvelope({ ...envelope, kem_ct: truncated });
  }
  function flipSignature() {
    if (!envelope) return;
    setEnvelope({ ...envelope, signature: (envelope.signature ?? "sig") + "_INVALID" });
  }

  if (!faultEnabled) return null;

  return (
    <div className="p-4 border border-red-900/30 bg-red-950/5 mt-4">
      <div className="text-[10px] text-red-400 font-mono uppercase tracking-widest mb-3 flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        Fault Injection Mode
      </div>

      <div className="grid grid-cols-1 gap-2">
        <button onClick={injectCorruptCipher} className="px-3 py-2 border border-red-900/50 hover:bg-red-900/20 text-red-300 text-xs text-left transition-colors">
          ⚠ Corrupt AEAD Ciphertext
        </button>
        <button onClick={truncateKem} className="px-3 py-2 border border-red-900/50 hover:bg-red-900/20 text-red-300 text-xs text-left transition-colors">
          ⚠ Truncate ML-KEM Key
        </button>
        <button onClick={flipSignature} className="px-3 py-2 border border-red-900/50 hover:bg-red-900/20 text-red-300 text-xs text-left transition-colors">
          ⚠ Invalidate Signature
        </button>
      </div>
    </div>
  );
}