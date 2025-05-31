'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { AllProjectsQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { CloseIcon } from '@sanity/icons';
import { motion } from 'motion/react';

import { ProjectDetail } from './project-detail';

export const ProjectCard: FC<{ project: AllProjectsQueryResult[number] }> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (!project) return null;

  const { coverImages, logo, description, name } = project;
  const logoUrl = logo ? urlFor(logo).width(50).url() : null;

  const toggleProject = () => {
    setIsExpanded(!isExpanded);
  };

  const coverImagesUrlParsed = coverImages?.map(image => ({
    alt: image.alt,
    image: image ? urlFor(image).width(500).url() : null,
  }));

  return (
    <>
      {isExpanded ? (
        <div
          className="fixed right-10 bottom-10 bg-primary cursor-pointer z-50 p-2 rounded-full text-white"
          title={`Close ${project?.name}`}
          onClick={toggleProject}
        >
          <CloseIcon />
        </div>
      ) : null}
      <div className={`w-full relative perspective-[1200px] perspective-origin-center `}>
        {!isExpanded ? (
          <motion.div
            className={`relative h-[100px]  sm:h-[100px] md:h-[150px] w-full`}
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
                  className={`absolute w-full rounded-lg shadow-lg md:h-[150px] sm:h-[100px] overflow-hidden`}
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
                  <div className="flex relative items-center justify-center text-white h-full">
                    <Image key={index} src={image || ''} alt={alt || ''} fill />
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
              {/* <div className=" h-full flex flex-col justify-center items-center "> */}
              <div
                onClick={toggleProject}
                className="p-4 sm:p-6 cursor-pointer flex flex-col gap-2 sm:gap-0 sm:flex-row justify-between items-center w-full h-full"
              >
                <div>
                  <h1 className="text-xl font-bold">{name}</h1>
                </div>
                <div>{description && <h2 className="text-gray-300">{description}</h2>}</div>
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
              {/* </div> */}
            </motion.div>
          </motion.div>
        ) : (
          <div className="w-full">
            <ProjectDetail project={project} />
          </div>
        )}
      </div>
    </>
  );
};
