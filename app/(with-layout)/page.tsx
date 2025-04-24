'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/shadcn/button';

const animationClasses = [
  'animate-[float1_8s_ease-in-out_infinite]',
  'animate-[float2_9s_ease-in-out_infinite]',
  'animate-[float3_10s_ease-in-out_infinite]',
  'animate-[float1_11s_ease-in-out_infinite]',
  'animate-[float2_12s_ease-in-out_infinite]',
  'animate-[float3_13s_ease-in-out_infinite]',
];

const cards = [
  { id: 1, title: 'Innovation', delay: 100, x: 15, y: 25 },
  { id: 2, title: 'Technology', delay: 300, x: 70, y: 30 },
  { id: 3, title: 'Discovery', delay: 500, x: 25, y: 65 },
  { id: 4, title: 'Excellence', delay: 700, x: 65, y: 70 },
  { id: 5, title: 'Research', delay: 900, x: 85, y: 20 },
  { id: 6, title: 'Growth', delay: 1100, x: 40, y: 80 },
];

const Homepage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Array of 6 cards with different animations and content

  // Animation classes for floating effect
  // const floatClasses = ['animate-float-1', 'animate-float-2', 'animate-float-3'];

  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Layout with sidebar to show context */}
      <div className="flex h-full">
        {/* Main Content */}
        <div className="flex-1 relative bg-black">
          {/* Base layer with dark gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

          {/* Radial gradient overlay for dimension */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.9) 70%)',
            }}
          ></div>

          {/* Subtle grid pattern for texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          ></div>

          {/* Animated accent color glows */}
          <div
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#f24c00] opacity-20 blur-3xl"
            style={{
              animation: 'pulse 8s ease-in-out infinite',
            }}
          ></div>
          <div
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#f24c00] opacity-15 blur-3xl"
            style={{
              animation: 'pulse 8s ease-in-out infinite reverse',
            }}
          ></div>

          {/* Animated floating cards in base layer */}
          <div className="absolute inset-0 pointer-events-none">
            {cards.map((card, index) => {
              const animationClass = animationClasses[index % animationClasses.length];

              return (
                <div
                  key={card.id}
                  className={`absolute backdrop-blur-sm   bg-primary/10 border-2 border-secondary rounded-xl p-4 w-32 h-32 flex items-center justify-center shadow-xl transition-all duration-1000 ${animationClass} delay-${card.delay}  ${
                    isLoaded ? 'opacity-40 scale-100' : 'opacity-0 scale-90'
                  }
                  
                  `}
                  style={{
                    left: `${card.x}%`,
                    top: `${card.y}%`,
                  }}
                >
                  <p className="text-secondary font-medium text-sm">{card.title}</p>
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-secondary mb-6">
                <span className="block animate-fadeIn">Ignite Your Future</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-secondary/80 max-w-2xl mx-auto animate-[fadeIn_1s_ease-out_0.4s_forwards]">
                Join us on a journey of innovation and discovery with our cutting-edge solutions.
              </p>
              <Button className="mt-10 px-10 py-5 hover:bg-primary/90 transition-all duration-300 hover:scale-105 animate-[fadeIn_1s_ease-out_0.4s_forwards] text-secondary">
                Get Started
              </Button>
            </div>
          </div>

          {/* Additional depth element - staggered lines */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
