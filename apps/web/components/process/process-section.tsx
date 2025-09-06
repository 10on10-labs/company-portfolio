'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLocale } from 'next-intl';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/shadcn/carousel';

import { ProcessCard } from './process-card';

const slides = [
  {
    id: 1,
    title: 'Book free consultation',
    description:
      "Get started by scheduling a free consultation. We'll listen to your needs and explore how we can help bring your project to life.",
    tag: 'WILL GET TO YOU WITHIN 12 HOURS',
    number: '01',
  },
  {
    id: 2,
    title: 'Audit & documentation',
    description:
      'Our team will conduct a thorough audit of your project, gather essential details and prepare the documents for next steps.',
    tag: 'FULL PACK OF DOCUMENTS',
    number: '02',
  },
  {
    id: 3,
    title: 'Design phase',
    description:
      'We start crafting the design elements of your project to ensure it aligns with your vision and goals.',
    tag: 'UX/UI DESIGN',
    number: '03',
  },
  {
    id: 4,
    title: 'Development',
    description:
      'With the designs approved, we move to development, turning concepts into a working product.',
    tag: 'CODING MAGIC',
    number: '04',
  },
  {
    id: 5,
    title: 'Launch & support',
    description:
      'We launch your project and continue to support and maintain it to ensure long-term success.',
    tag: 'ONGOING PARTNERSHIP',
    number: '05',
  },
];

export type Slide = {
  id: number;
  title: string;
  description: string;
  tag: string;
  number: string;
};

interface ProcessData {
  _id: string;
  title: string;
  language: string;
  badge: string;
  heading: string;
  steps: Array<{
    number: string;
    title: string;
    description: string;
    tag: string;
  }>;
  progressLabel: string;
}

interface ProcessSectionProps {
  processData?: ProcessData | null;
}

interface WheelState {
  timeout: NodeJS.Timeout | null;
  events: Array<{ deltaY: number; timestamp: number }>;
  lastDirection: 'next' | 'prev' | null;
  isScrolling: boolean;
}

export const ProcessSection = ({ processData }: ProcessSectionProps) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const carouselContainerRef = useRef(null);

  // Transform Sanity data to component format, fallback to hardcoded data
  const processSteps: Slide[] = processData?.steps
    ? processData.steps.map((step, index) => ({
        id: index + 1,
        title: step.title,
        description: step.description,
        tag: step.tag,
        number: step.number,
      }))
    : slides;

  // Define a properly typed wheel state ref

  const wheelState = useRef<WheelState>({
    timeout: null,
    events: [],
    lastDirection: null,
    isScrolling: false,
  });

  // Simplified carousel selection handler
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', handleSelect);
    handleSelect(); // Initialize with current selection

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  // Streamlined wheel event handling with proper TypeScript types
  useEffect(() => {
    if (!carouselContainerRef.current || !api) return;

    const container = carouselContainerRef.current;
    const wheel = wheelState.current;

    const processEvents = (): void => {
      if (wheel.events.length === 0) return;

      const now = Date.now();
      const recentEvents = wheel.events.filter(e => now - e.timestamp < 300);
      const delta = recentEvents.reduce((sum, e) => sum + e.deltaY, 0);

      // Only process significant movements (threshold of 20)
      if (Math.abs(delta) >= 20) {
        // Both English and Arabic should have same wheel behavior:
        // Scroll down = next slide, Scroll up = prev slide
        const direction = delta > 0 ? 'next' : 'prev';

        if (direction !== wheel.lastDirection || !wheel.isScrolling) {
          wheel.lastDirection = direction;
          wheel.isScrolling = true;

          direction === 'next' ? api.scrollNext() : api.scrollPrev();

          setTimeout(() => {
            wheel.isScrolling = false;
            wheel.events = [];
          }, 500);
        }
      }

      wheel.events = [];
    };

    const handleWheel = (e: WheelEvent): void => {
      //@ts-ignore
      const rect = container?.getBoundingClientRect();
      if (
        !(
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        )
      )
        return;

      e.preventDefault();

      wheel.events.push({ deltaY: e.deltaY, timestamp: Date.now() });

      if (wheel.timeout) clearTimeout(wheel.timeout);

      if (!wheel.isScrolling) processEvents();

      wheel.timeout = setTimeout(processEvents, 200);
    };

    window.addEventListener('wheel', handleWheel as EventListener, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel as EventListener);
      if (wheel.timeout) clearTimeout(wheel.timeout);
    };
  }, [api]);

  const progress = ((current + 1) / processSteps.length) * 100;

  return (
    <div className="w-full @container flex flex-col  items-center relative bg-secondary pt-20 pb-20 md:pt-28 md:pb-24">
      <motion.div
        className="mb-20 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm mb-2 text-center">
          {processData?.badge || 'Setting your comfort'}
        </div>
        <h1 className="text-3xl text-center sm:text-3xl md:text-4xl font-black leading-tight tracking-tighter">
          {processData?.heading || 'Step-by-step process to bring your project to life'}
        </h1>
      </motion.div>

      {/* IMPROVEMENT #2: Step indicators showing current step */}
      <div className="flex items-center justify-center gap-2 mb-8 px-4">
        {processSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all duration-300 ${
              current === index
                ? 'w-8 h-2 bg-primary rounded-full'
                : 'w-2 h-2 bg-gray-400 rounded-full hover:bg-gray-600'
            }`}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      <div ref={carouselContainerRef} className="relative w-full overflow-hidden px-4 md:px-8">
        <Carousel
          opts={{
            // loop: true,
            align: 'start',
            dragFree: false,
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          orientation="horizontal"
          className="w-full  md:max-w-max min-[768px]:max-w-xl"
          setApi={setApi}
        >
          <CarouselContent className={isRTL ? '-mr-4' : '-ml-4'}>
            {processSteps.map(slide => (
              <CarouselItem
                key={slide.id}
                className={`basis-full min-[768px]:basis-[100%] lg:basis-[70%] xl:basis-[60%] flex-shrink-0 ${isRTL ? 'pr-4' : 'pl-4'}`}
              >
                <ProcessCard slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* IMPROVEMENT #4: Enhanced progress bar with labels and better design */}
      <div className="absolute bottom-10 left-0 right-0 px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">
              {processData?.progressLabel
                ? processData.progressLabel
                    .replace('{current}', (current + 1).toString())
                    .replace('{total}', processSteps.length.toString())
                : `Step ${current + 1} of ${processSteps.length}`}
            </span>
          </div>
          <div className="relative">
            <div className="bg-white/50 backdrop-blur-sm w-full h-3 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-orange-600 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </div>
            {/* Step markers on progress bar with titles */}
            <div className="absolute top-0 w-full h-full flex items-center">
              {processSteps.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="absolute group"
                  style={{
                    left: `${(index / (processSteps.length - 1)) * 100}%`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className={`rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                      index <= current
                        ? 'w-2.5 h-2.5 bg-white shadow-sm'
                        : 'w-2 h-2 bg-gray-400 hover:bg-gray-300'
                    }`}
                  />
                  {/* Pulsing dot overlay for current step with glow effect */}
                  {index === current && (
                    <>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/40 rounded-full animate-pulse pointer-events-none" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse pointer-events-none" />
                    </>
                  )}
                  {/* Title tooltip on hover or active */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded transition-opacity duration-200 ${
                      index === current
                        ? 'opacity-100 text-primary'
                        : 'opacity-0 group-hover:opacity-100 text-gray-600 bg-white/90 shadow-sm'
                    }`}
                  >
                    {slide.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
