import { BlogsByCategoryQueryResult } from '@/sanity.types';
import { sanityClient } from '@/sanity/lib/client';
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

import { BlogCard } from './_components/blog-card';
import { DesktopBlogCategorySelector } from './_components/blog-category-selector/desktop-blog-category-selector';
import { MobileBlogCategorySelector } from './_components/blog-category-selector/mobile-blog-category-selector';

export const revalidate = 43200; // 12 hours

const fetchBlogCategories = async () => {
  const blogCategories = await sanityClient.fetch(blogCategoriesQuery);
  return blogCategories;
};

export const fetchBlogsByCategorySlugs = async (categories: string | string[] | undefined) => {
  const categorySlugs = categories ? (Array.isArray(categories) ? categories : [categories]) : null;
  const blogs: BlogsByCategoryQueryResult = await sanityClient.fetch(blogsByCategoryQuery, {
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
  const blogs = await fetchBlogsByCategorySlugs(category);
  const blogCategories = await fetchBlogCategories();
  const allBlogCategories = [{ title: 'View All', slug: null }, ...blogCategories];
  if (!blogs) return <p>No blogs found!</p>;
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl">
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

        <div className="flex flex-col items-start gap-2 my-6 md:my-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-black to-primary bg-clip-text text-transparent">
            Our Blogs
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-3xl">
            Discover the latest insights, tutorials, and updates from our team of experts.
          </p>
        </div>

        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold flex items-center">
              <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
              <span className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent">
                Latest Articles
              </span>
            </h2>
            <div className="hidden sm:block">
              <DesktopBlogCategorySelector blogCategories={allBlogCategories} />
            </div>
          </div>
          <div className="block sm:hidden mb-6">
            <MobileBlogCategorySelector blogCategories={allBlogCategories} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
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
        <section className="mt-16 md:mt-20 bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-black bg-clip-text text-transparent">
            Subscribe to our newsletter
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and updates delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
