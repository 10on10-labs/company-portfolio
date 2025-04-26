'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';

export const Project = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = [
    'bg-slate-800', // Main card (darker)
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
  ];

  const toggleProject = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="w-full  h-[400px] relative"
      style={{ perspective: '1200px', perspectiveOrigin: 'center' }}
    >
      <motion.div
        className="relative h-64 w-full "
        style={{ transformStyle: 'preserve-3d' }}
        initial={isExpanded ? 'rest' : 'expanded'}
        animate={isExpanded ? 'expanded' : 'rest'} // 👈 Add this
        whileHover={isExpanded ? 'expanded' : 'hover'}
        onClick={toggleProject}
      >
        {colors.slice(1).map((color, index) => {
          const actualIndex = index + 1;
          return (
            <motion.div
              key={actualIndex}
              className={`absolute w-full rounded-lg shadow-lg md:h-[200px] sm:h-[150px] ${color}`}
              style={{
                transformOrigin: '50% 100%',
                opacity: isExpanded ? 0 : 1,
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
          className="absolute w-full rounded-lg md:h-[200px] sm:h-[150px] shadow-lg bg-slate-800 text-white overflow-hidden"
          style={{
            transformOrigin: '50% 100%',
            zIndex: 200,
          }}
          variants={{
            rest: { rotateX: 0 },
            hover: { rotateX: -45 },
            expanded: { rotateX: 0 },
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
        {isExpanded && (
          <div className="relative w-full z-0">
            {['Section 1', 'Section 2', 'Section 3'].map((section, index) => (
              <motion.div
                key={index}
                className={`absolute top-20 left-0 right-0 mx-auto ${colors[index + 1]} p-6 rounded-lg w-full h-20 text-center shadow-lg`}
                initial={{ opacity: 0, y: 0, scale: 0.8 }}
                animate={{ opacity: 1, y: (index + 1) * 100, scale: 1 }}
                transition={{
                  delay: 0.2 * index, // Each section waits before flying out
                  duration: 0.5,
                  ease: 'easeOut',
                }}
              >
                {section}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
