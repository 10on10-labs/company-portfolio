import { FC } from 'react';
import { Metadata } from 'next';
import { sanityClient } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { allProjectsQuery, projectBySlugQuery } from '@/sanity/lib/queries';

import { ProjectDetail } from '../_components/project-detail';

type Props = {
  params: Promise<{ slug: string }>;
};

const fetchProjectBySlug = async (slug: string) => {
  const project = await sanityClient.fetch(projectBySlugQuery, { slug });
  if (!project) return null;
  return project;
};
const fetchAllProjects = async () => {
  const allProjects = await sanityClient.fetch(allProjectsQuery);
  if (!allProjects) return null;
  return allProjects;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  return {
    title: project?.name,
    category: 'project',
    applicationName: '10on10Labs',
    openGraph: {
      // url: new URL(`/projects/${slug}`, process.env.NEXT_PUBLIC_DEPLOYED_URL).href,
      title: project?.name || '',
      siteName: '10on10Labs',
      ...(project?.coverImages && {
        images: project.coverImages.map(image => ({ url: urlFor(image).width(225).url() })),
      }),
    },
  };
}

export async function generateStaticParams() {
  const allProjects = await fetchAllProjects();
  if (!allProjects) return [];
  return allProjects?.map(project => ({
    slug: project.slug,
  }));
}

export const revalidate = 43200; // 12 hours

const ProjectDetailsPage: FC<Props> = async ({ params }) => {
  const pageParams = await params;
  const slug = pageParams.slug;
  const project = await fetchProjectBySlug(slug);

  return (
    <div className="flex flex-col w-full items-stretch pr-15 pl-15 pt-10 gap-10">
      <ProjectDetail project={project} />
    </div>
  );
};
export default ProjectDetailsPage;
