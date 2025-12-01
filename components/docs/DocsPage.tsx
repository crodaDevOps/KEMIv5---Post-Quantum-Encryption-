import React, { useState } from "react";
import { MotionFade } from "../oswego/MotionFade";
import WhitepaperModal from "../envelope/WhitepaperModal";
import { Section } from "../oswego/Section";

export default function DocsPage() {
  const [showWhitepaper, setShowWhitepaper] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20 animate-in fade-in duration-500">
       <header className="mb-10 border-b border-charcoalAlt pb-8">
        <MotionFade>
           <h1 className="text-3xl md:text-4xl font-semibold tracking-tightest text-white mb-2">System Documentation</h1>
           <p className="text-neutral-400 max-w-2xl leading-relaxed">
            Technical specifications and integration guides for KEMIv5.15.
           </p>
        </MotionFade>
      </header>

      <Section className="py-0 px-0 max-w-none">
        <MotionFade delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border border-neutral-800 bg-neutral-900">
              <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-4">Quick Start</div>
              <h3 className="text-xl font-medium text-white mb-4">KEMIv5.15 Architecture</h3>
              <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                Overview of the lattice-based key encapsulation mechanisms and authenticated encryption schemas used in the OswegoLabs runtime.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowWhitepaper(true)}
                  className="px-4 py-3 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 text-sm text-white text-left transition-colors flex justify-between items-center group"
                >
                  <span>Open Technical Summary</span>
                  <span className="text-coral group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button 
                  onClick={() => alert("Redirecting to full specification PDF...")}
                  className="px-4 py-3 border border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800 text-sm text-neutral-300 text-left transition-colors flex justify-between items-center group"
                >
                  <span>Download Full Spec (PDF)</span>
                  <span className="text-neutral-500 group-hover:text-white transition-colors">↓</span>
                </button>
              </div>
            </div>

            <div className="p-6 border border-neutral-800 bg-charcoalAlt opacity-75">
               <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest mb-4">API Reference</div>
               <div className="space-y-4">
                  <div className="p-3 border border-neutral-800 bg-charcoal font-mono text-xs text-neutral-400">
                    <span className="text-coral">POST</span> /v1/envelopes/encapsulate
                  </div>
                  <div className="p-3 border border-neutral-800 bg-charcoal font-mono text-xs text-neutral-400">
                    <span className="text-node">GET</span> /v1/keys/rotate
                  </div>
                  <div className="p-3 border border-neutral-800 bg-charcoal font-mono text-xs text-neutral-400">
                    <span className="text-leaf">WS</span> /v1/stream/verify
                  </div>
               </div>
               <p className="text-xs text-neutral-500 mt-4">
                 Full API documentation is available in the developer portal.
               </p>
            </div>
          </div>
        </MotionFade>
      </Section>

      <WhitepaperModal open={showWhitepaper} onClose={() => setShowWhitepaper(false)} />
    </div>
  );
}