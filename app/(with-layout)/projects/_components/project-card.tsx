'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AllProjectsQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'motion/react';

export const ProjectCard: FC<AllProjectsQueryResult[number]> = ({
  coverImages,
  logo,
  name,
  slug,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const logoUrl = logo ? urlFor(logo).width(50).url() : null;
  const toggleProject = () => {
    setIsExpanded(!isExpanded);
  };
  const coverImagesUrlParsed = coverImages?.map(image => ({
    alt: image.alt,
    image: image ? urlFor(image).width(500).url() : null,
  }));

  return (
    <div
      className={`w-full h-[100px] sm:h-[100px] md:h-[150px] perspective-[1200px] perspective-origin-center relative`}
    >
      <motion.div
        className={`relative sm:h-[100px]  md:h-[150px] w-full `}
        style={{ transformStyle: 'preserve-3d' }}
        initial={isExpanded ? 'rest' : 'expanded'}
        animate={isExpanded ? 'expanded' : 'rest'}
        whileHover={isExpanded ? 'expanded' : 'hover'}
        onClick={toggleProject}
      >
        {coverImagesUrlParsed?.map(({ alt, image }, index) => {
          return (
            <motion.div
              key={index}
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
                <Image key={index} src={image || ''} alt={alt || ''} fill />;
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
          <Link className="p-6 h-full flex flex-col justify-center" href={`/projects/${slug}`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">7-Eleven Mobile</h1>
              </div>
              <div>
                <h2 className="text-gray-300">Product Innovation</h2>
              </div>
              <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-end">
                <Image
                  src={logoUrl || ''}
                  alt={name || 'company logo'}
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
