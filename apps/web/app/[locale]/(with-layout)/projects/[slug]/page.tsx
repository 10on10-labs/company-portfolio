import { FC } from 'react';
import { Metadata } from 'next';
import { ProjectBySlugQueryResult } from '@company/sanity-shared';
import { sanityClient } from '@company/sanity-shared/client';

import { urlFor } from '@/lib/image';
import { allProjectsQuery, projectBySlugQuery } from '@/lib/sanity-queries';

import { ProjectDetail } from '../_components/project-detail';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

const fetchProjectBySlug = async (slug: string, locale: string) => {
  const project = await sanityClient.fetch<ProjectBySlugQueryResult>(projectBySlugQuery, {
    slug,
    language: locale,
  });
  if (!project) return null;
  return project;
};
const fetchAllProjects = async (locale: string) => {
  const allProjects = await sanityClient.fetch(allProjectsQuery, { language: locale });
  if (!allProjects) return null;
  return allProjects;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await fetchProjectBySlug(slug, locale);
  return {
    title: { absolute: `Project - ${project?.name}` },
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
  // Generate for both languages
  const [enProjects, arProjects] = await Promise.all([
    fetchAllProjects('en'),
    fetchAllProjects('ar'),
  ]);

  const allProjects = [...(enProjects || []), ...(arProjects || [])];
  if (!allProjects) return [];

  // Get unique slugs
  const uniqueSlugs = [...new Set(allProjects.map(project => project.slug).filter(Boolean))];
  return uniqueSlugs.map(slug => ({
    slug: slug,
  }));
}

export const revalidate = 43200; // 12 hours

const ProjectDetailsPage: FC<Props> = async ({ params }) => {
  const pageParams = await params;
  const { slug, locale } = pageParams;
  const project = await fetchProjectBySlug(slug, locale);

  return <ProjectDetail project={project} />;
};
export default ProjectDetailsPage;
