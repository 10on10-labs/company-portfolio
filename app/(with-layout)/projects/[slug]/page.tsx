import { ProjectDetail } from '../_components/project-detail';
import { PROJECTS_DUMMY_DATA } from '../constants';

const ProjectDetails: React.FC<{ params: { slug: string } }> = async ({ params }) => {
  const pageParams = await params;
  const slug = pageParams.slug;
  const project = PROJECTS_DUMMY_DATA.find(({ id }) => id == slug);
  return (
    <div className="flex flex-col w-full items-stretch pr-15 pl-15 pt-10 gap-10">
      <ProjectDetail project={project} />
    </div>
  );
};
export default ProjectDetails;
