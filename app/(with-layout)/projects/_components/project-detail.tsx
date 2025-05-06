'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

import { ProjectType } from './projects-list';

type Props = {
  project?: ProjectType;
};

export const ProjectDetail: React.FC<Props> = ({ project }) => {
  if (!project) return null;
  const { logoUrl, name, projectSections } = project;
  return (
    <Link href="/projects" className="relative">
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
        <div className="p-6 h-full flex flex-col justify-center">
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
        </div>
      </motion.div>

      <div className="relative w-full z-0">
        {projectSections?.map((section, index) => (
          <motion.div
            key={section.id}
            className={`absolute top-30 left-0 right-0 mx-auto bg-white  p-6 rounded-lg w-full h-20 text-center shadow-lg`}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: (index + 1) * 100, scale: 1 }}
            transition={{
              delay: 0.2 * index, // Each section waits before flying out
              duration: 0.5,
              ease: 'easeOut',
            }}
          >
            {section.name}
          </motion.div>
        ))}
      </div>
    </Link>
  );
};
