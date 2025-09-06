'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/src/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/shadcn/button';

interface AccelerateData {
  _id: string;
  title: string;
  language: string;
  heading: string;
  services: string[];
  buttonText: string;
}

interface AccelerateSectionProps {
  accelerateData?: AccelerateData | null;
}

const fallbackServices = [
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

export function AccelerateSection({ accelerateData }: AccelerateSectionProps) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use Sanity data or fallback to hardcoded services
  const services = accelerateData?.services || fallbackServices;
  const heading = accelerateData?.heading || 'Let us accelerate your';
  const buttonText = accelerateData?.buttonText || "Let's Talk";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % services.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section className="py-20 bg-primary" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-4 md:gap-4 lg:gap-6"
        >
          {/* Text content - 50% width, left aligned for EN, right aligned for AR */}
          <div
            className={`flex flex-col flex-1 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
          >
            <h2 className="mb-4 text-3xl md:text-4xl font-bold">{heading}</h2>
            <div className="relative min-h-[60px] mt-2">
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
                  className={`absolute top-0 inline-block bg-black text-white px-3 md:px-4 py-1 md:py-2 font-bold text-2xl md:text-3xl whitespace-nowrap min-w-max ${
                    isRTL
                      ? 'right-0 md:right-0'
                      : 'left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0'
                  }`}
                >
                  {services[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Button - 50% width, right aligned for EN, left aligned for AR */}
          <div
            className={`flex-1 flex ${isRTL ? 'md:justify-start justify-center' : 'md:justify-end justify-center'}`}
          >
            <Link href="/contact-us">
              <Button variant="secondary" size="lg" className="px-8 py-4 text-lg whitespace-nowrap">
                {buttonText}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
