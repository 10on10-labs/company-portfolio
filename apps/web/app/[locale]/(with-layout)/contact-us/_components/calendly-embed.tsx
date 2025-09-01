'use client';

import { motion } from 'motion/react';
import { InlineWidget } from 'react-calendly';

export function CalendlyEmbed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative h-full"
    >
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Calendly widget with its native two-column layout */}
        <InlineWidget
          url="https://calendly.com/10on10labs-sales/30min"
          styles={{
            height: '750px',
            width: '100%',
            border: 'none',
          }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '00a2ff',
            textColor: '4d5055',
          }}
        />
      </div>
    </motion.div>
  );
}
