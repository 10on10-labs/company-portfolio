import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';

import { allProjectsQuery } from '@/lib/sanity-queries';

import { ProjectsList } from './_components/projects-list';

export const metadata: Metadata = {
  title: 'Projects',
};

const getAllProjects = async () => {
  const allProjects = await sanityClient.fetch(allProjectsQuery);
  return allProjects;
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  return (
    <div className="pl-15 pr-15 flex flex-col gap-10 w-full h-auto items-center justify-center">
      <h1 className="text-3xl md:text-4xl w-auto h-full bg-red">Projects Highlight</h1>
      <ProjectsList projects={allProjects} />
    </div>
  );
}
