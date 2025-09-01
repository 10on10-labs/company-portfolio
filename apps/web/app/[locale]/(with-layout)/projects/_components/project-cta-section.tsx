'use client';

import { Link } from '@/src/i18n/navigation';
import { motion } from 'motion/react';

export const ProjectCTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {`Let's`} work together to bring your vision to life with cutting-edge technology and
            design
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-black px-6 py-3 rounded-[10px] font-medium text-base hover:bg-black hover:text-white transition-colors duration-300 shadow-sm"
            >
              Start Your Project
            </Link>
            <Link
              href="/projects"
              className="bg-transparent text-white px-6 py-3 rounded-[10px] font-medium text-base hover:bg-white hover:text-black transition-colors duration-300 shadow-sm border-2 border-white"
            >
              View More Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
