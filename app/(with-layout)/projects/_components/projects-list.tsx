'use client';

import { PROJECTS_DUMMY_DATA } from '../constants';
import { ProjectCard } from './project-card';

export type ProjectType = {
  id: string;
  name: string;
  category: string;
  logoUrl: string;
  coverImages?: { id: string; src: string; alt: string }[];
  projectSections?: {
    id: string;
    name?: string;
    description: string;
    images: { id: string; src: string; alt: string }[];
  }[];
};

export const ProjectsList = () => {
  return (
    <>
      {PROJECTS_DUMMY_DATA.map(project => {
        return <ProjectCard key={project.id} {...project} />;
      })}
    </>
  );
};
