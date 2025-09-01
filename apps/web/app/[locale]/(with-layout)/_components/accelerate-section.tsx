'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/src/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/shadcn/button';

const services = [
  'Software Development',
  'Nearshore Development',
  'Offshore Development',
  'New Product Development',
  'Quality Assurance',
  'Web App Development',
  'Mobile App Development',
  'MVP Development',
  'Agile Development',
  'System Modernization',
  'Digital Implementation & Delivery',
  'Product Engineering',
  'DevOps & SecOps',
  'Salesforce Development',
  'Databricks Integration',
  'Data Engineering',
  'Analytics & Platform Implementation',
  'Cloud Migration',
  'Google Cloud Migration',
  'AWS Infrastructure Development',
  'OpenAI Integration',
  'Google AI Integration',
  'Mistral AI Integration',
  'DALL-E Integration',
];

export function AccelerateSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-primary">
      <div className="mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl flex items-center justify-center"
        >
          <div className="flex flex-col  flex-1">
            <h2 className="mb-4 text-3xl font-bold">Let us accelerate your</h2>

            <div className="relative min-h-[50px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{
                    opacity: 0,
                    y: -58,
                    rotateX: 90,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 58,
                    rotateX: -90,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  style={{
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute left-0 top-0 inline-block bg-black text-white px-3 md:px-4 py-1 md:py-2 font-bold text-3xl"
                >
                  {services[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <Link href="/contact-us">
              <Button variant="secondary" size="lg">
                {`Let's`} Talk
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
