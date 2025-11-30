import React from 'react';
import { motion } from "framer-motion";

export default function LatticePulse() {
  const nodes = Array.from({ length: 26 }).map((_, i) => ({
    id: i,
    x: (i % 13) * 120,
    y: Math.floor(i / 13) * 120,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.14]">
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.45, 0.2, 0.15] }}
          transition={{
            duration: 6,
            delay: n.id * 0.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: "#FF6B5A",
            left: n.x,
            top: n.y,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0.05 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #222 1px, transparent 1px), linear-gradient(#222 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />
    </div>
  );
}