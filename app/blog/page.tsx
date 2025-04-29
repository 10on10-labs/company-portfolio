import { BlogsByCategoryQueryResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogsByCategoryQuery } from '@/sanity/lib/queries';

import { BaseContentCard } from '@/components/base-content-card';

const fetchBlogsByCategory = async (categories: string | string[] | undefined) => {
  const categorySlugs = categories ? (Array.isArray(categories) ? categories : [categories]) : null;
  const blogs: BlogsByCategoryQueryResult = await client.fetch(blogsByCategoryQuery, {
    categorySlugs,
  });

  return blogs.map(blog => ({
    ...blog,
    thumbnail: blog.thumbnail ? urlFor(blog.thumbnail).width(400).url() : null,
    author: {
      ...blog.author,
      image: blog.author?.image ? urlFor(blog.author.image).width(400).url() : null,
    },
  }));
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string | string[] | undefined }>;
}) {
  const { category } = await searchParams;
  const blogs = await fetchBlogsByCategory(category);
  if (!blogs) return <p>No blogs found!</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {blogs.map(blog => (
        <BaseContentCard
          key={blog._id}
          redirectUrl={`blog/${blog.slug}`}
          title={blog.title}
          subTitle={blog.subTitle}
          duration={`${blog.estimatedReadingTime} mins`}
          publishedAt={blog.publishedAt}
          thumbnail={blog.thumbnail}
          categories={blog.blogCategories}
          author={{ name: blog.author?.name, image: blog.author?.image }}
        />
      ))}
    </div>
  );
}
