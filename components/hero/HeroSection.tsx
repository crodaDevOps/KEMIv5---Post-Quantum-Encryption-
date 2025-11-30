import React from 'react';
import { motion } from "framer-motion";
import LatticePulse from "./LatticePulse";
import LogoCluster from "./LogoCluster";

export default function HeroSection({ onExplore }: { onExplore?: () => void }) {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] bg-charcoal text-white overflow-hidden flex items-center justify-center border-b border-charcoalAlt">
      
      {/* Background lattice animation */}
      <LatticePulse />

      {/* Foreground content */}
      <div className="relative z-20 flex flex-col items-center select-none px-6">
        <LogoCluster />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-6 uppercase tracking-tightest text-5xl md:text-[3.5rem] font-semibold text-center leading-none"
          style={{ color: "#FF6B5A" }}
        >
          KEMIv5.15
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-neutral-400 text-lg mt-4 max-w-[600px] text-center leading-relaxed"
        >
          Next-generation lattice-secured envelopes for<br className="hidden md:block"/> post-quantum streaming systems.
        </motion.p>

        <motion.button
          onClick={onExplore}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.04 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 px-8 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-300"
          style={{
            backgroundColor: "#FF6B5A",
            color: "#0F0F0F",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          Explore Technology
        </motion.button>
      </div>

      {/* Subtle top vignette */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-charcoal to-transparent z-10" />
    </section>
  );
}