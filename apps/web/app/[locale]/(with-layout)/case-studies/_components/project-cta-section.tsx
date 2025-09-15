'use client';

import { Link } from '@/src/i18n/navigation';
import { motion } from 'motion/react';

interface ProjectCTASectionProps {
  callToAction?: {
    title: string | null;
    subtitle: string | null;
    primaryButtonText: string | null;
    secondaryButtonText: string | null;
  };
}

export const ProjectCTASection: React.FC<ProjectCTASectionProps> = ({ callToAction }) => {
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
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            {callToAction?.title || 'Ready to Build Something Amazing?'}
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            {callToAction?.subtitle ||
              "Let's work together to bring your vision to life with cutting-edge technology and design"}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-background text-primary px-6 py-3 rounded-[10px] font-medium text-base hover:bg-primary-foreground hover:text-primary transition-colors duration-300 shadow-sm"
            >
              {callToAction?.primaryButtonText || 'Start Your Project'}
            </Link>
            <Link
              href="/case-studies"
              className="bg-transparent text-primary-foreground px-6 py-3 rounded-[10px] font-medium text-base hover:bg-background hover:text-primary transition-colors duration-300 shadow-sm border-2 border-primary-foreground"
            >
              {callToAction?.secondaryButtonText || 'View More Case Studies'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
