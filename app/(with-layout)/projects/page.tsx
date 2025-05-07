import { ProjectsList } from './_components/projects-list';

const Projects: React.FC<{}> = () => {
  return (
    <div className="flex flex-col w-full items-stretch pr-15 pl-15 gap-8  h-full">
      <ProjectsList />
    </div>
  );
};

export default Projects;
