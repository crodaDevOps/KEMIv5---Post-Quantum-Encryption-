import InteractiveEnvelope from "./InteractiveEnvelope";
import { MotionFade } from "../oswego/MotionFade";

export default function EnvelopePage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
      <header className="mb-10 border-b border-charcoalAlt pb-8">
        <MotionFade>
           <h1 className="text-3xl md:text-4xl font-semibold tracking-tightest text-white mb-2">Envelope Simulator <span className="text-coral">KEMIv5.15</span></h1>
           <p className="text-neutral-400 max-w-2xl leading-relaxed">
            Interactive demonstration of KEMIv5.15 envelope construction. 
            Visualizes the linear progression from ML-KEM KeyGen to authenticated, tamper-evident Kafka transmission.
           </p>
           <div className="mt-4 flex gap-2">
             <span className="px-2 py-1 bg-charcoalAlt border border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500">Demo Mode</span>
             <span className="px-2 py-1 bg-charcoalAlt border border-neutral-800 text-[10px] uppercase tracking-wider text-neutral-500">Browser Crypto</span>
           </div>
        </MotionFade>
      </header>

      <MotionFade delay={0.2}>
        <InteractiveEnvelope />
      </MotionFade>
    </div>
  );
}