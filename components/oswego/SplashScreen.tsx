import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import LatticePulse from '../hero/LatticePulse';
import LogoCluster from '../hero/LogoCluster';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    // Total duration of splash screen visibility before triggering exit
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] bg-charcoal flex flex-col items-center justify-center overflow-hidden"
    >
        {/* Reuse the background pulse */}
        <LatticePulse />
        
        <div className="z-10 flex flex-col items-center select-none">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <LogoCluster />
            </motion.div>
            
            <div className="overflow-hidden mt-8 text-center">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-5xl font-bold tracking-tightest text-white uppercase"
                >
                    OswegoLabs
                </motion.h1>
            </div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.6, duration: 1, ease: "easeInOut" }}
                className="h-0.5 bg-coral mt-6"
            />
            
            <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 1, duration: 0.8 }}
                 className="mt-4 text-[10px] text-neutral-500 font-mono tracking-widest uppercase"
            >
                Initializing Secure Lattice...
            </motion.p>
        </div>
    </motion.div>
  );
};