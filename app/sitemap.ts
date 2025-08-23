import type { MetadataRoute } from 'next';
import { AllProjectsQueryResult, BlogsByCategoryQueryResult } from '@/sanity.types';
import { sanityClient } from '@/sanity/lib/client';
import { allProjectsQuery, blogsByCategoryQuery } from '@/sanity/lib/queries';

const baseUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL || 'https://www.10on10labs.com';
const now = new Date();

const mainRoutesSitemaps: MetadataRoute.Sitemap = [
  {
    url: new URL('', baseUrl).href,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: new URL('about', baseUrl).href,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 1,
  },
  {
    url: new URL(`blogs`, baseUrl).href,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.5,
  },
  {
    url: new URL('contact-us', baseUrl).href,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.9,
  },
  {
    url: new URL('case-studies', baseUrl).href,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    url: new URL('projects', baseUrl).href,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.2,
  },
  {
    url: new URL('reviews', baseUrl).href,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 0.9,
  },
  {
    url: new URL(`services`, baseUrl).href,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  },
];

const getBlogPagesSitemaps = async (): Promise<MetadataRoute.Sitemap> => {
  const blogs = await sanityClient.fetch<BlogsByCategoryQueryResult>(blogsByCategoryQuery, {
    categorySlugs: null,
  });
  return blogs.map(blog => ({
    url: new URL(`blogs/${blog.slug}`, baseUrl).href,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1,
  }));
};

const getCaseStudyPagesSitemaps = async (): Promise<MetadataRoute.Sitemap> => {
  const allProjects = await sanityClient.fetch<AllProjectsQueryResult>(allProjectsQuery);
  return allProjects.map(project => ({
    url: new URL(`case-studies/${project.slug}`, baseUrl).href,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1,
  }));
};
const getProjectPagesSitemaps = async (): Promise<MetadataRoute.Sitemap> => {
  const allProjects = await sanityClient.fetch<AllProjectsQueryResult>(allProjectsQuery);
  return allProjects.map(project => ({
    url: new URL(`projects/${project.slug}`, baseUrl).href,
    lastModified: now,
    changeFrequency: 'hourly',
    priority: 1,
  }));
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPagesSitemaps = await getBlogPagesSitemaps();
  const caseStudyPagesSitemaps = await getCaseStudyPagesSitemaps();
  const projectPagesSitemaps = await getProjectPagesSitemaps();

  return [
    ...mainRoutesSitemaps,
    ...blogPagesSitemaps,
    ...caseStudyPagesSitemaps,
    ...projectPagesSitemaps,
  ];
}
