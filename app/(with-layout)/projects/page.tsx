import { sanityClient } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/lib/queries';

import { ProjectCard } from './_components/project-card';

const getAllProjects = async () => {
  const allProjects = await sanityClient.fetch(allProjectsQuery);
  return allProjects;
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  return (
    <div className="flex flex-col w-full  items-center justify-center pl-15 pr-15 gap-8 h-full">
      <h1 className="text-3xl md:text-4xl w-auto h-full bg-red">Projects Highlight</h1>
      {allProjects.map(project => {
        return <ProjectCard key={project._id} {...project} />;
      })}
    </div>
  );
}
