import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';
import { getTranslations } from 'next-intl/server';

import { allProjectsQuery } from '@/lib/sanity-queries';

import { ProjectsList } from './_components/projects-list';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects_page' });

  return {
    title: t('meta_title'),
  };
}

const getAllProjects = async (locale: string) => {
  const allProjects = await sanityClient.fetch(allProjectsQuery, { language: locale });
  return allProjects;
};

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const allProjects = await getAllProjects(locale);
  const t = await getTranslations({ locale, namespace: 'projects_page' });

  return (
    <div className="pl-15 pr-15 flex flex-col gap-10 w-full h-auto items-center justify-center">
      <h1 className="text-3xl md:text-4xl w-auto h-full bg-red">{t('title')}</h1>
      <ProjectsList projects={allProjects} />
    </div>
  );
}
