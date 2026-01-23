import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';

import { fetchBlogsByCategorySlugs } from '@/lib/blog-utils';
import { blogCategoriesQuery } from '@/lib/sanity-queries';

import { BlogsPageClient } from './_components/blogs-page-client';

export const metadata: Metadata = {
  title: 'Blogs',
};

export const revalidate = 43200; // 12 hours

const fetchBlogCategories = async () => {
  const blogCategories = await sanityClient.fetch(blogCategoriesQuery);
  return blogCategories;
};

export default async function BlogsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ category: string | string[] | undefined }>;
  params: Promise<{ locale: string }>;
}) {
  const { category } = await searchParams;
  const { locale } = await params;
  const blogs = await fetchBlogsByCategorySlugs(category, locale);
  const blogCategories = await fetchBlogCategories();

  return <BlogsPageClient blogs={blogs || []} blogCategories={blogCategories} />;
}
