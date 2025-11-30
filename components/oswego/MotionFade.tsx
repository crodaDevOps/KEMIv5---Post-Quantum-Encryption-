import React from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/motion";

export const MotionFade = ({ children, delay = 0 }: { children?: React.ReactNode; delay?: number }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    transition={{ delay }}
    variants={fadeIn}
  >
    {children}
  </motion.div>
);