import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Logo } from "./components/oswego/Logo";
import { Section } from "./components/oswego/Section";
import { Button } from "./components/oswego/Button";
import { MotionFade } from "./components/oswego/MotionFade";
import { FlaskIcon } from "./components/oswego/FlaskIcon";
import { TreeIcon } from "./components/oswego/TreeIcon";
import { LatticeIcon } from "./components/oswego/LatticeIcon";
import HeroSection from "./components/hero/HeroSection";
import EnvelopePage from "./components/envelope/EnvelopePage";
import DocsPage from "./components/docs/DocsPage";

// Technical Diagram Component
const TechPanel = ({ title, sub, children }: { title: string, sub: string, children?: React.ReactNode }) => (
  <div className="bg-charcoalAlt border border-neutral-800 p-6 flex flex-col h-full hover:border-neutral-700 transition-colors">
    <div className="flex justify-between items-start mb-4 border-b border-neutral-800 pb-2">
      <h3 className="text-sm font-bold text-coral uppercase tracking-wider">{title}</h3>
      <span className="text-[10px] font-mono text-neutral-500">{sub}</span>
    </div>
    <div className="flex-1 flex items-center justify-center min-h-[120px] bg-charcoal border border-dashed border-neutral-800 mb-4 p-4">
       {children || <div className="text-neutral-600 text-xs font-mono">System Diagram v1.0</div>}
    </div>
    <p className="text-neutral-400 text-sm leading-relaxed">{children ? null : "Secure data flow visualization."}</p>
  </div>
);

type ViewState = 'landing' | 'platform' | 'envelope' | 'docs';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [roadmapOpen, setRoadmapOpen] = useState<Record<string, boolean>>({ 'now': true });

  const toggleRoadmap = (id: string) => {
    setRoadmapOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const roadmapItems = [
    { 
      id: "now", 
      title: "Now: KEMIv5.15 Release", 
      status: "active",
      detail: "Full production support for post-quantum streaming envelopes. Includes Service-to-service authentication, AEAD secure micro-messages, and comprehensive audit logging." 
    },
    { 
      id: "q2", 
      title: "Q2: Hybrid Handshakes", 
      status: "upcoming",
      detail: "Native integration for Kafka, Redpanda, and NATS. Features automatic key rotation policies and hybrid classical-PQ key exchange for transition periods." 
    },
    { 
      id: "q4", 
      title: "Q4: Hardware Acceleration", 
      status: "future",
      detail: "Oswego v2 control plane introduction. Dedicated FPGA and HSM offloading pathways for high-throughput encryption at edge nodes." 
    }
  ];

  return (
    <main className="bg-charcoal text-neutral-200 min-h-screen font-sans selection:bg-coral selection:text-black" role="main">
      {/* Header / Nav Area */}
      <header className="fixed top-0 left-0 w-full z-50 bg-charcoal/90 backdrop-blur-md border-b border-charcoalAlt shadow-lg shadow-black/40" role="banner">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="cursor-pointer" onClick={() => setView('landing')} role="button" aria-label="Return to Landing Page">
             <Logo />
           </div>
           <nav className="flex gap-6 text-xs font-medium text-neutral-400 uppercase tracking-wide items-center" role="navigation">
             <button onClick={() => setView('platform')} className={`hover:text-coral transition-colors ${view === 'platform' ? 'text-white' : ''}`} aria-current={view === 'platform' ? 'page' : undefined}>Platform</button>
             <button onClick={() => setView('envelope')} className={`hover:text-coral transition-colors ${view === 'envelope' ? 'text-white' : ''}`} aria-current={view === 'envelope' ? 'page' : undefined}>Simulator</button>
             <button onClick={() => setView('docs')} className={`hover:text-coral transition-colors ${view === 'docs' ? 'text-white' : ''}`} aria-current={view === 'docs' ? 'page' : undefined}>Docs</button>
             <div className="w-px h-4 bg-neutral-700 hidden md:block" aria-hidden="true"></div>
             <a href="#" className="hidden md:block text-coral hover:text-white transition-colors" aria-label="Contact Sales (Placeholder)">Contact Sales</a>
           </nav>
        </div>
      </header>

      {/* Main Content Router */}
      <div className="mt-16">
        {view === 'landing' && (
           <HeroSection onExplore={() => setView('platform')} />
        )}

        {view === 'platform' && (
          <div className="animate-in fade-in duration-500">
            
            {/* CTA Area */}
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
                       <Button onClick={() => setView('envelope')} aria-label="Start Simulation">Run Simulation</Button>
                       <Button variant="outline" aria-label="Read Whitepaper">Read Whitepaper</Button>
                    </div>
                  </MotionFade>

                  <MotionFade delay={0.2}>
                     <div className="bg-charcoalAlt p-1 border border-charcoalAlt/50" role="img" aria-label="CLI Output Example">
                         <div className="bg-charcoal p-8 h-full flex flex-col justify-center items-center text-center space-y-4">
                              <div className="p-4 bg-ink/20 border border-ink/40 w-full text-left">
                                 <div className="flex gap-2 mb-2 border-b border-ink/20 pb-2" aria-hidden="true">
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

            {/* Interactive Roadmap */}
            <Section className="bg-neutral-900/30">
               <MotionFade>
                  <h2 className="text-2xl font-semibold tracking-tight text-white mb-8 border-l-4 border-coral pl-4">Engineering Roadmap</h2>
                  <div className="space-y-8 relative before:absolute before:left-2.5 before:top-2 before:bottom-0 before:w-px before:bg-neutral-800">
                     
                     {roadmapItems.map((item) => (
                       <div key={item.id} className={`relative pl-10 ${item.status === 'future' ? 'opacity-50' : item.status === 'upcoming' ? 'opacity-75' : ''}`}>
                          
                          {/* Dot / Indicator */}
                          <button 
                            onClick={() => toggleRoadmap(item.id)}
                            aria-expanded={roadmapOpen[item.id]}
                            aria-controls={`roadmap-detail-${item.id}`}
                            className={`absolute left-0.5 top-1.5 w-4 h-4 rounded-full border-2 cursor-pointer z-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-coral ${item.status === 'active' ? 'bg-charcoal border-coral' : 'bg-charcoal border-neutral-700 hover:border-coral'}`}
                            aria-label={`Toggle details for ${item.title}`}
                          ></button>

                          {/* Content */}
                          <div className="cursor-pointer group" onClick={() => toggleRoadmap(item.id)}>
                              <h4 className={`font-medium text-sm transition-colors duration-200 flex items-center gap-2 ${item.status === 'active' ? 'text-white' : 'text-neutral-300 group-hover:text-coral'}`}>
                                {item.title}
                                <span className={`text-[10px] text-neutral-500 font-mono transition-transform duration-300 ${roadmapOpen[item.id] ? 'rotate-90 text-coral' : ''}`} aria-hidden="true">›</span>
                              </h4>
                          </div>

                          <motion.div 
                             id={`roadmap-detail-${item.id}`}
                             initial={false}
                             animate={{ height: roadmapOpen[item.id] ? "auto" : 0, opacity: roadmapOpen[item.id] ? 1 : 0 }}
                             transition={{ duration: 0.3, ease: "easeInOut" }}
                             className="overflow-hidden"
                          >
                             <p className="text-neutral-500 text-xs mt-2 leading-relaxed max-w-lg">
                                {item.detail}
                             </p>
                          </motion.div>
                       </div>
                     ))}

                  </div>
               </MotionFade>
            </Section>

            {/* Technical Architecture Section */}
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
                    <div className="flex items-center justify-center gap-2" aria-hidden="true">
                       <div className="w-3 h-3 bg-node rounded-full animate-pulse"></div>
                       <div className="w-10 h-px bg-grid"></div>
                       <div className="w-8 h-8 border border-coral flex items-center justify-center text-[10px] text-coral">HUB</div>
                       <div className="w-10 h-px bg-grid"></div>
                       <div className="w-3 h-3 bg-node rounded-full animate-pulse"></div>
                    </div>
                    <p className="mt-4 text-xs text-neutral-400">Streaming middleware for zero-trust systems.</p>
                  </TechPanel>
                  <TechPanel title="LatticeShield" sub="MESH-V2">
                     <div className="grid grid-cols-3 gap-1 w-full opacity-50" aria-hidden="true">
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

        {view === 'docs' && (
           <DocsPage />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-charcoal py-12" role="contentinfo">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <Logo />
              <div className="flex gap-6 text-[10px] uppercase tracking-wider text-neutral-500">
                  <a href="#" className="hover:text-coral transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-coral transition-colors">Terms of Service</a>
                  <a href="#" className="hover:text-coral transition-colors">About Us</a>
              </div>
              <div className="flex gap-6 opacity-30 hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
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