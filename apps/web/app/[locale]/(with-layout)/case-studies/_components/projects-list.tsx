'use client';

import { AllProjectsQueryResult } from '@company/sanity-shared';
import { motion, Variants } from 'motion/react';

import { ProjectCard } from './project-card';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

export function ProjectsList({ projects }: { projects: AllProjectsQueryResult }) {
  return (
    <motion.div
      className="w-full flex flex-col gap-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {projects.map(project => (
        <motion.div key={project._id} variants={item}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}
