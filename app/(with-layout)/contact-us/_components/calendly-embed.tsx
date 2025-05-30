'use client';

import { motion } from 'motion/react';
import { InlineWidget } from 'react-calendly';

export function CalendlyEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl shadow-lg bg-card"
    >
      <InlineWidget url="https://calendly.com/10on10labs-sales/30min" />
    </motion.div>
  );
}
