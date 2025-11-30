import React, { useState } from 'react';
import { Logo } from "./components/oswego/Logo";
import { Section } from "./components/oswego/Section";
import { Button } from "./components/oswego/Button";
import { MotionFade } from "./components/oswego/MotionFade";
import { FlaskIcon } from "./components/oswego/FlaskIcon";
import { TreeIcon } from "./components/oswego/TreeIcon";
import { LatticeIcon } from "./components/oswego/LatticeIcon";
import HeroSection from "./components/hero/HeroSection";
import EnvelopePage from "./components/envelope/EnvelopePage";

// Technical Diagram Component
const TechPanel = ({ title, sub, children }: { title: string, sub: string, children?: React.ReactNode }) => (
  <div className="bg-charcoalAlt border border-neutral-800 p-6 flex flex-col h-full hover:border-neutral-700 transition-colors">
    <div className="flex justify-between items-start mb-4 border-b border-neutral-800 pb-2">
      <h3 className="text-sm font-bold text-coral uppercase tracking-wider">{title}</h3>
      <span className="text-[10px] font-mono text-neutral-500">{sub}</span>
    </div>
    <div className="flex-1 flex items-center justify-center min-h-[120px] bg-charcoal border border-dashed border-neutral-800 mb-4 p-4">
       {/* Diagram Placeholder */}
       {children || <div className="text-neutral-600 text-xs font-mono">System Diagram v1.0</div>}
    </div>
    <p className="text-neutral-400 text-sm leading-relaxed">{children ? null : "Secure data flow visualization."}</p>
  </div>
);

type ViewState = 'landing' | 'platform' | 'envelope';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');

  return (
    <main className="bg-charcoal text-neutral-200 min-h-screen font-sans selection:bg-coral selection:text-black">
      {/* Header / Nav Area */}
      <header className="fixed top-0 left-0 w-full z-50 bg-charcoal/90 backdrop-blur-md border-b border-charcoalAlt">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="cursor-pointer" onClick={() => setView('landing')}>
             <Logo />
           </div>
           <div className="flex gap-6 text-xs font-medium text-neutral-400 uppercase tracking-wide items-center">
             <button onClick={() => setView('platform')} className={`hover:text-coral transition-colors ${view === 'platform' ? 'text-white' : ''}`}>Platform</button>
             <button onClick={() => setView('envelope')} className={`hover:text-coral transition-colors ${view === 'envelope' ? 'text-white' : ''}`}>Simulator</button>
             <a href="#" className="hidden md:block hover:text-coral transition-colors">Docs</a>
             <div className="w-px h-4 bg-neutral-700 hidden md:block"></div>
             <a href="#" className="hidden md:block text-coral hover:text-white transition-colors">Contact Sales</a>
           </div>
        </div>
      </header>

      {/* Main Content Router */}
      <div className="mt-16">
        {view === 'landing' && (
           <HeroSection onExplore={() => setView('platform')} />
        )}

        {view === 'platform' && (
          <div className="animate-in fade-in duration-500">
            
            {/* CTA Area - MOVED TO TOP */}
            <Section className="border-b border-charcoalAlt">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <MotionFade>
                    <h2 className="text-3xl font-semibold mb-6 tracking-tightest">
                      Ready for the Transition?
                    </h2>
                    <p className="text-neutral-400 text-base leading-relaxed mb-8">
                      OswegoLabs is constructing a hardened architecture for post-quantum
                      identity, distributed KEM channels, and coordinated key rotation.
                    </p>
                    <div className="flex gap-4">
                       <Button onClick={() => setView('envelope')}>Run Simulation</Button>
                       <Button variant="outline">Read Whitepaper</Button>
                    </div>
                  </MotionFade>

                  <MotionFade delay={0.2}>
                     <div className="bg-charcoalAlt p-1 border border-charcoalAlt/50">
                         <div className="bg-charcoal p-8 h-full flex flex-col justify-center items-center text-center space-y-4">
                              <div className="p-4 bg-ink/20 border border-ink/40 w-full text-left">
                                 <div className="flex gap-2 mb-2 border-b border-ink/20 pb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500/20"></div>
                                 </div>
                                 <code className="text-node text-[10px] font-mono leading-loose">
                                   $ oswegoctl envelope inspect msg.bin<br/>
                                   <span className="text-coral">> [OK]</span> ML-KEM-768 Encap<br/>
                                   <span className="text-coral">> [OK]</span> ML-DSA-65 Sig Valid<br/>
                                   <span className="text-leaf">> Payload:</span> 1.4kb encrypted
                                 </code>
                              </div>
                              <p className="text-xs text-neutral-500 font-mono">
                                Developer tooling for the post-quantum era.
                              </p>
                         </div>
                     </div>
                  </MotionFade>
              </div>
            </Section>

            {/* Feature Grid */}
            <Section>
              <div className="flex items-center gap-2 mb-8 border-b border-charcoalAlt pb-4">
                 <FlaskIcon />
                 <h3 className="text-sm font-mono text-neutral-500 uppercase">System Capabilities</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-charcoalAlt border border-charcoalAlt">
                <div className="bg-charcoal">
                   <MotionFade delay={0.1}>
                     <div className="p-8 h-full hover:bg-neutral-900 transition-colors">
                        <h4 className="text-coral text-sm font-bold uppercase mb-3">Quantum-Safe</h4>
                        <p className="text-neutral-400 text-sm leading-relaxed">Lattice-based KEM + ML-DSA aligned with FIPS-203/204 standards for maximum security compliance.</p>
                     </div>
                  </MotionFade>
                </div>

                <div className="bg-charcoal">
                  <MotionFade delay={0.2}>
                    <div className="p-8 h-full hover:bg-neutral-900 transition-colors">
                      <h4 className="text-coral text-sm font-bold uppercase mb-3">Infrastructure Native</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">Built specifically for Kafka, microservices, and event-driven messaging pipelines.</p>
                    </div>
                  </MotionFade>
                </div>

                <div className="bg-charcoal">
                   <MotionFade delay={0.3}>
                     <div className="p-8 h-full hover:bg-neutral-900 transition-colors">
                       <h4 className="text-coral text-sm font-bold uppercase mb-3">Deterministic</h4>
                       <p className="text-neutral-400 text-sm leading-relaxed">Predictable cryptographic behavior under high load with zero floating-point reliance.</p>
                     </div>
                   </MotionFade>
                </div>
              </div>
            </Section>

            {/* Roadmap */}
            <Section className="bg-neutral-900/30">
               <MotionFade>
                  <h2 className="text-2xl font-semibold tracking-tight text-white mb-8 border-l-4 border-coral pl-4">Engineering Roadmap</h2>
                  <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-px before:bg-neutral-800">
                     
                     <div className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-4 h-4 bg-charcoal border-2 border-coral rounded-full"></div>
                        <h4 className="text-white font-medium text-sm">Now: KEMIv5.15 Release</h4>
                        <p className="text-neutral-500 text-xs mt-1">PQ streaming envelopes, Service-to-service auth, AEAD secure micro-messages.</p>
                     </div>

                     <div className="relative pl-8 opacity-75">
                        <div className="absolute left-0 top-1.5 w-4 h-4 bg-charcoal border-2 border-neutral-600 rounded-full"></div>
                        <h4 className="text-neutral-300 font-medium text-sm">Q2: Hybrid Handshakes</h4>
                        <p className="text-neutral-500 text-xs mt-1">Native integration for Kafka/Redpanda/NATS with automatic key rotation.</p>
                     </div>

                     <div className="relative pl-8 opacity-50">
                        <div className="absolute left-0 top-1.5 w-4 h-4 bg-charcoal border-2 border-neutral-700 rounded-full"></div>
                        <h4 className="text-neutral-400 font-medium text-sm">Q4: Hardware Acceleration</h4>
                        <p className="text-neutral-500 text-xs mt-1">Oswego v2 control plane + FPGA/HSM offloading pathways.</p>
                     </div>

                  </div>
               </MotionFade>
            </Section>

            {/* Technical Architecture Section - MOVED TO BOTTOM */}
            <Section className="mb-20">
              <MotionFade>
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-semibold tracking-tight text-white mb-2">Technical Architecture</h2>
                  <p className="text-neutral-500">High-assurance security for distributed messaging.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TechPanel title="KEMIv5.15 Envelope" sub="ENC-01">
                    <div className="flex flex-col gap-2 w-full">
                       <div className="h-2 bg-neutral-800 w-full rounded-sm"></div>
                       <div className="h-2 bg-coral w-3/4 rounded-sm"></div>
                       <div className="h-2 bg-neutral-800 w-full rounded-sm"></div>
                       <p className="mt-2 text-xs text-neutral-400">End-to-end post-quantum protection for message buses.</p>
                    </div>
                  </TechPanel>
                  <TechPanel title="Oswego Runtime" sub="RT-CORE">
                    <div className="flex items-center justify-center gap-2">
                       <div className="w-3 h-3 bg-node rounded-full animate-pulse"></div>
                       <div className="w-10 h-px bg-grid"></div>
                       <div className="w-8 h-8 border border-coral flex items-center justify-center text-[10px] text-coral">HUB</div>
                       <div className="w-10 h-px bg-grid"></div>
                       <div className="w-3 h-3 bg-node rounded-full animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-xs text-neutral-400">Streaming middleware for zero-trust systems.</p>
                  </TechPanel>
                  <TechPanel title="LatticeShield" sub="MESH-V2">
                     <div className="grid grid-cols-3 gap-1 w-full opacity-50">
                        <div className="bg-leaf h-4 w-4"></div><div className="bg-transparent h-4 w-4"></div><div className="bg-leaf h-4 w-4"></div>
                        <div className="bg-transparent h-4 w-4"></div><div className="bg-leaf h-4 w-4"></div><div className="bg-transparent h-4 w-4"></div>
                        <div className="bg-leaf h-4 w-4"></div><div className="bg-transparent h-4 w-4"></div><div className="bg-leaf h-4 w-4"></div>
                     </div>
                     <p className="mt-4 text-xs text-neutral-400">Cryptographically authenticated microservice communication.</p>
                  </TechPanel>
                </div>
              </MotionFade>
            </Section>
          </div>
        )}

        {view === 'envelope' && (
           <EnvelopePage />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-charcoal py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <Logo />
              <div className="flex gap-6 text-[10px] uppercase tracking-wider text-neutral-500">
                  <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-coral transition-colors">About Us</a>
              </div>
              <div className="flex gap-6">
                 <LatticeIcon />
                 <TreeIcon />
              </div>
              <p className="text-neutral-600 text-[10px] uppercase tracking-wider">
                  &copy; 2024 OswegoLabs Inc. FIPS-203/204 Compliance.
              </p>
          </div>
      </footer>
    </main>
  );
}