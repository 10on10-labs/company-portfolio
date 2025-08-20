'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

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

export type Slide = (typeof slides)[0];

interface WheelState {
  timeout: NodeJS.Timeout | null;
  events: Array<{ deltaY: number; timestamp: number }>;
  lastDirection: 'next' | 'prev' | null;
  isScrolling: boolean;
}

export const ProcessSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const carouselContainerRef = useRef(null);

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

  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="w-full @container flex flex-col  items-center relative bg-secondary pb-10 pt-10">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm mb-2 text-center">Setting your comfort</div>
        <h1 className="text-3xl text-center sm:text-3xl md:text-4xl font-black leading-tight tracking-tighter">
          Step-by-step process to bring your project to life
        </h1>
      </motion.div>

      <div ref={carouselContainerRef} className="relative w-full overflow-hidden">
        <Carousel
          opts={{
            // loop: true,
            align: 'start',
            dragFree: false,
          }}
          orientation="horizontal"
          className="w-full  md:max-w-max min-[768px]:max-w-xl"
          setApi={setApi}
        >
          <CarouselContent className="-ml-4">
            {slides.map(slide => (
              <CarouselItem
                key={slide.id}
                className="basis-full min-[768px]:basis-[100%] lg:basis-[70%] xl:basis-[60%] flex-shrink-0"
              >
                <ProcessCard slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="absolute bottom-0  h-2 w-full pl-10 pr-10">
        <div className="bg-white w-full h-full">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-black to-primary"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </div>
  );
};
