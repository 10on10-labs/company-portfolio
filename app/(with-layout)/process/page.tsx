'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

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

// This is the complete component to be used within your layout
export default function ProcessSlider() {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (sliderRef.current && !e?.target && !sliderRef?.current?.contains(e?.target as Node))
        return;

      e.preventDefault();

      if (e.deltaY > 0 && current < slides.length - 1) {
        setCurrent(current + 1);
      } else if (e.deltaY < 0 && current > 0) {
        setCurrent(current - 1);
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [current]);

  return (
    <div className="bg-secondary h-full w-full border-1 border-primary flex flex-col justify-between">
      <motion.div
        className="px-4 pt-6 pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-sm  mb-2">Setting your comfort</div>
        <h1 className="text-3xl text-center sm:text-4xl md:text-5xl font-black leading-tight tracking-tighter">
          Step-by-step process to bring your project to life
        </h1>
      </motion.div>

      <div ref={sliderRef} className="relative overflow-hidden w-full">
        <motion.div
          className="flex"
          animate={{ x: `-${current * 70}%` }}
          transition={{ duration: 0.9 }}
        >
          {slides.map(slide => (
            <div key={slide.id} className="flex w-[70%] min-w-[70%]">
              <div className="w-full flex gap-8 bg-white p-3 sm:p-4 md:p-6 rounded-lg min-h-[320px]">
                <div className="bg-secondary p-2 sm:p-4 md:p-6 rounded-lg ml-2  flex flex-col justify-center items-center">
                  <p className="text-[10px] uppercase">Step</p>
                  <div className="text-3xl sm:text-4xl md:text-6xl font-black leading-none">
                    {slide.number}
                  </div>
                </div>
                <div id="#test" className="flex flex-col justify-between gap-20">
                  <div className="text-xs flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <span>🗓</span>
                    <span className="text-xs sm:text-sm">{slide.tag}</span>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-5xl font-black mb-1 sm:mb-2 md:mb-3 leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base line-clamp-3 md:line-clamp-none">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="h-1 w-full bg-gray-200 mt-4">
        <motion.div
          className="h-full  bg-gradient-to-r from-primary via-black to-primary"
          animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
