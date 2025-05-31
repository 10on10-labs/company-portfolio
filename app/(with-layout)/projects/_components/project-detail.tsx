'use client';

import Image from 'next/image';
import type { ProjectBySlugQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'motion/react';

type Props = {
  project?: ProjectBySlugQueryResult;
};

export const ProjectDetail: React.FC<Props> = ({ project }) => {
  if (!project) return null;
  // @TODO will add product detail types
  // eslint-disable-next-line;
  const { logo, name, projectSections, description } = project;
  //@TODO we need to refactor this , this is not the best approach
  const logoUrl = logo ? urlFor(logo).width(50).url() : null;

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Header section */}
      <motion.div
        className="rounded-lg bg-white text-black overflow-hidden shadow-lg relative min-h-[100px] md:min-h-[150px] w-full flex items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="p-4 s:p-6 w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl font-bold">{name}</h1>
          {description && <h2 className="text-gray-500">{description}</h2>}
          <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center flex-shrink-0 shadow-sm">
            <Image
              src={logoUrl || ''}
              alt={name || 'company logo'}
              width={50}
              height={50}
              className="text-black font-bold text-xs"
            />
          </div>
        </div>
      </motion.div>

      {/* Project sections */}
      <div className="flex flex-col space-y-3">
        {projectSections?.map((section, index) => (
          <motion.div
            key={section.id}
            className="bg-white flex flex-col gap-4 p-6 rounded-lg w-full min-h-20 items-center shadow-lg"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.1 + 0.1 * index, // Staggered animation
              duration: 0.4,
              ease: 'easeOut',
            }}
          >
            <span className="text-lg font-medium">{section.name}</span>
            <div className="relative">
              {section?.images?.map(image => {
                const imageUrl = urlFor(image).url();
                return (
                  <Image
                    key={image?._key}
                    src={imageUrl}
                    width={1024}
                    height={400}
                    alt={image?.alt || section.name || ''}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
