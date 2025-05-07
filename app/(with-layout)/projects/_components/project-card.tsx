'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import { ProjectType } from './projects-list';

export const ProjectCard: React.FC<ProjectType> = ({ id, name, logoUrl, coverImages }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleProject = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`w-full   sm:h-[100px] md:h-[150px] perspective-[1200px] perspective-origin-center relative`}
    >
      <motion.div
        className={`relative sm:h-[100px]  md:h-[150px] w-full `}
        style={{ transformStyle: 'preserve-3d' }}
        initial={isExpanded ? 'rest' : 'expanded'}
        animate={isExpanded ? 'expanded' : 'rest'}
        whileHover={isExpanded ? 'expanded' : 'hover'}
        onClick={toggleProject}
      >
        {coverImages?.map((image, index) => {
          const actualIndex = image.id;
          return (
            <motion.div
              key={actualIndex}
              className={`absolute w-full rounded-lg border-2 shadow-lg md:h-[150px] sm:h-[100px]`}
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
              <div className="flex relative items-center justify-center h-full text-white p-4">
                <Image key={image.id} src={image.src} alt={image.alt} fill />;
              </div>
            </motion.div>
          );
        })}

        <motion.div
          className={`absolute w-full rounded-lg md:h-[150px] sm:h-[100px] shadow-lg bg-white text-black overflow-hidden`}
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
          <Link className="p-6 h-full flex flex-col justify-center" href={`/projects/${id}`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">7-Eleven Mobile</h1>
              </div>
              <div>
                <h2 className="text-gray-300">Product Innovation</h2>
              </div>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-end">
                <Image
                  src={logoUrl}
                  alt={name}
                  width={50}
                  height={50}
                  className="text-black font-bold text-xs"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
