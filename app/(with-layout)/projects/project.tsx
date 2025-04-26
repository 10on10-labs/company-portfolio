'use client';

import React from 'react';
import { motion } from 'motion/react';

export const Project = () => {
  // Color palette for the cards
  const colors = [
    'bg-slate-800', // Main card (darker)
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
  ];

  return (
    <div
      className="w-full  h-[400px] relative"
      style={{ perspective: '1200px', perspectiveOrigin: 'center' }}
    >
      <motion.div
        className="relative h-64 w-full"
        style={{ transformStyle: 'preserve-3d' }}
        initial="rest"
        whileHover="hover"
      >
        {colors.slice(1).map((color, index) => {
          const actualIndex = index + 1;

          return (
            <motion.div
              key={actualIndex}
              className={`absolute w-full rounded-lg shadow-lg ${color}`}
              style={{
                height: '11.1vw',
                transformOrigin: '50% 100%',
                zIndex: 90 - 5 * index,
              }}
              variants={{
                rest: { rotateX: 0 },
                hover: { rotateX: -(35 - 10 * index) },
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-center h-full text-white p-4">
                <p className="text-center">Supporting content page {actualIndex}</p>
              </div>
            </motion.div>
          );
        })}

        <motion.div
          className="absolute w-full rounded-lg shadow-lg bg-slate-800 text-white overflow-hidden"
          style={{
            height: '11.1vw',
            transformOrigin: '50% 100%',
            zIndex: 200,
          }}
          variants={{
            rest: { rotateX: 0 },
            hover: { rotateX: -45 },
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Main card content */}
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">7-Eleven Mobile</h1>
                <h2 className="text-gray-300">Product Innovation</h2>
              </div>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-xs">7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
