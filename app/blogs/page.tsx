import { BlogsByCategoryQueryResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogCategoriesQuery, blogsByCategoryQuery } from '@/sanity/lib/queries';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';
import { Button } from '@/components/shadcn/button';
import { BlogCard } from '@/app/blogs/components/blog-card';

import { BlogCategorySelector } from './components/blog-category-selector';

export const revalidate = 43200; // 12 hours

const fetchBlogCategories = async () => {
  const blogCategories = await client.fetch(blogCategoriesQuery);
  return blogCategories;
};

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
  const blogCategories = await fetchBlogCategories();
  if (!blogs) return <p>No blogs found!</p>;
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Blogs</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col items-start gap-2 my-10">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Our Blogs</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          Discover the latest insights, tutorials, and updates from our team of experts.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-6 flex text-primary items-center">
          <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
          Latest Articles
        </h2>
        <BlogCategorySelector blogCategories={blogCategories} />
        <div className="flex flex-wrap gap-4 mt-12">
          {blogs.map(blog => (
            <BlogCard
              key={blog._id}
              redirectUrl={`blogs/${blog.slug}`}
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
      </section>

      {/* Newsletter Signup */}
      <section className="mt-20 bg-card border border-border rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 text-primary">Subscribe to our newsletter</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Get the latest articles, tutorials, and updates delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button>Subscribe</Button>
        </div>
      </section>
    </>
  );
}
