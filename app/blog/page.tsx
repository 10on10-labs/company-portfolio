import { BlogsByCategoryQueryResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogsByCategoryQuery } from '@/sanity/lib/queries';

const fetchBlogsByCategory = async (categories: string | string[] | undefined) => {
  const categorySlugs = categories ? (Array.isArray(categories) ? categories : [categories]) : null;
  const blogs: BlogsByCategoryQueryResult = await client.fetch(blogsByCategoryQuery, {
    categorySlugs,
  });
  return blogs.map(blog => ({
    ...blog,
    thumbnail: blog.thumbnail ? urlFor(blog.thumbnail).width(400).url() : null,
  }));
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const blogs = await fetchBlogsByCategory(category);
  return (
    <pre>
      <code>{JSON.stringify(blogs)}</code>
    </pre>
  );
}
