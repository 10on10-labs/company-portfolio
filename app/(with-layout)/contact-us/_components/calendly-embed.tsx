'use client';

import { motion } from 'motion/react';

export function CalendlyEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="border border-border p-8 rounded-xl shadow-lg bg-card"
    >
      <h2 className="text-2xl font-bold mb-6">Schedule a Meeting</h2>
      <div
        className="calendly-inline-widget"
        data-url="YOUR_CALENDLY_URL"
        style={{ minWidth: '320px', height: '600px' }}
      />
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </motion.div>
  );
}
