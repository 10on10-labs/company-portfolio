import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';
import { getTranslations } from 'next-intl/server';

import { allProjectsQuery } from '@/lib/sanity-queries';

import CaseStudiesList from './_components/case-studies-list';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'navbar' });

  return {
    title: { absolute: `${t('case_studies')} | Our Work` },
    description: 'Explore our portfolio of successful projects and digital transformations',
  };
}

const fetchAllProjects = async (locale: string) => {
  const allProjects = await sanityClient.fetch(allProjectsQuery, { language: locale });
  if (!allProjects) return null;
  return allProjects;
};

export default async function CaseStudiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = await fetchAllProjects(locale);

  return (
    <div className="min-h-screen bg-secondary py-16 md:py-24">
      <CaseStudiesList projects={projects} />
    </div>
  );
}
