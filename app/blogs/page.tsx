import { BlogsByCategoryQueryResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogsByCategoryQuery } from '@/sanity/lib/queries';

import { BlogCard } from '@/components/blog-card';

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
    <>
      <div className="flex flex-col items-start gap-2 mb-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Our Blogs</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover the latest insights, tutorials, and updates from our team of experts.
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-6 flex text-primary items-center">
        <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
        Latest Articles
      </h2>
      <div className="flex flex-wrap gap-2">
        {blogs.map(blog => (
          <BlogCard
            key={blog._id}
            redirectUrl={`blog/${blog.slug}`}
            title={blog.title}
            subTitle={blog.subTitle}
            duration={`${blog.readingTimeInMins} mins read`}
            publishedAt={blog.publishedAt}
            thumbnail={blog.thumbnail}
            categories={blog.blogCategories}
            author={{ name: blog.author?.name, image: blog.author?.image }}
          />
        ))}
      </div>
    </>
  );
}
