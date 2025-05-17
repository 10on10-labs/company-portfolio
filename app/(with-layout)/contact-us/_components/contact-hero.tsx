'use client';

import { motion } from 'motion/react';

export function ContactHero() {
  return (
    <div className="w-full bg-primary text-white py-20">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Let&apos;s talk
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl opacity-90"
        >
          We&apos;re here to help bring your vision to life. Whether you have a project in mind or
          just want to explore possibilities, we&apos;d love to hear from you.
        </motion.p>
      </div>
    </div>
  );
}
