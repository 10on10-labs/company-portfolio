import { Metadata } from 'next';
import { sanityClient } from '@/sanity/lib/client';
import { allProjectsQuery } from '@/sanity/lib/queries';

import CaseStudiesList from './_components/case-studies-list';

export const metadata: Metadata = {
  title: { absolute: 'Case Studies | Our Work' },
  description: 'Explore our portfolio of successful projects and digital transformations',
};

const fetchAllProjects = async () => {
  const allProjects = await sanityClient.fetch(allProjectsQuery);
  if (!allProjects) return null;
  return allProjects;
};

export default async function CaseStudiesPage() {
  const projects = await fetchAllProjects();

  return (
    <div className="min-h-screen bg-secondary py-16 md:py-24">
      <CaseStudiesList projects={projects} />
    </div>
  );
}
