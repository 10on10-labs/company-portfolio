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
    <div className="pl-15 pr-15 flex flex-col gap-10 w-full h-auto items-center justify-center">
      <h1 className="text-3xl md:text-4xl w-auto h-full bg-red">Projects Highlight</h1>
      <div className="w-full flex flex-col gap-10">
        {allProjects.map(project => {
          return <ProjectCard key={project._id} project={project} />;
        })}
      </div>
    </div>
  );
}
