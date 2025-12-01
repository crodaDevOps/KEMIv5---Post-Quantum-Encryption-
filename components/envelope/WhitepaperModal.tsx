import { motion } from "framer-motion";

export default function WhitepaperModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="relative z-50 w-full max-w-2xl bg-charcoal border border-neutral-800 p-8 shadow-2xl shadow-black"
      >
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">KEMIv5.15 — Technical Summary</h3>
            <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">✕</button>
        </div>
        
        <p className="text-neutral-400 text-sm mb-6 leading-relaxed">
            High-assurance post-quantum delivery for distributed systems.
        </p>

        <ul className="space-y-4 text-sm text-neutral-300 font-mono">
          <li className="flex gap-3">
             <span className="text-coral">01.</span>
             <span>Post-quantum KEM envelope format for message-level confidentiality and forward secrecy.</span>
          </li>
          <li className="flex gap-3">
             <span className="text-coral">02.</span>
             <span>Optional post-quantum DSA-based signatures for non-repudiation and audit binding.</span>
          </li>
          <li className="flex gap-3">
             <span className="text-coral">03.</span>
             <span>HKDF-SHA-512 domain-separated key schedule; AEAD (XChaCha20-Poly1305) for payloads.</span>
          </li>
          <li className="flex gap-3">
             <span className="text-coral">04.</span>
             <span>Designed for stream-friendly environments (Kafka, Pulsar, NATS) with explicit envelope reconstruction.</span>
          </li>
        </ul>

        <div className="mt-8 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs uppercase tracking-wider font-semibold transition-colors">Close</button>
        </div>
      </motion.div>
    </div>
  );
}