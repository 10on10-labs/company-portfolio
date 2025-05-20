import { ProjectsList } from './_components/projects-list';

const Projects: React.FC<{}> = () => {
  return (
    <div className="flex flex-col w-full  items-center justify-center pl-15 pr-15 gap-8  h-full">
      <h1 className="text-3xl md:text-4xl w-auto h-full bg-red">Projects Highlight</h1>
      <ProjectsList />
    </div>
  );
};

export default Projects;
