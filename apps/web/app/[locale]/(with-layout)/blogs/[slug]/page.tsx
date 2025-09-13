import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@company/sanity-shared/client';

import { BlogWithProcessedImages, fetchBlogsByCategorySlugs } from '@/lib/blog-utils';
import { urlFor } from '@/lib/image';
import { blogBySlugQuery, blogsSlugQuery } from '@/lib/sanity-queries';

import { BlogDetailClient } from './_components/blog-detail-client';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

const fetchBlogsSlug = async (language: string) => {
  const blogsSlugs = await sanityClient.fetch(blogsSlugQuery, { language });
  return blogsSlugs;
};

const fetchBlogBySlug = async (slug: string, language: string) => {
  const blog = await sanityClient.fetch(blogBySlugQuery, { slug, language });
  if (!blog) return null;
  return blog;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const blog = await fetchBlogBySlug(slug, locale);

  if (!blog) {
    return {
      title: 'Blog Not Found',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  return {
    title: { absolute: `Blog - ${blog.title}` },
    description: blog.subTitle,
    category: 'blog',
    applicationName: '10on10Labs',
    authors: { name: blog.author?.name || '' },
    openGraph: {
      // url: new URL(`/blogs/${slug}`, process.env.NEXT_PUBLIC_DEPLOYED_URL).href,
      title: blog.title || '',
      description: blog.subTitle || '',
      siteName: '10on10Labs',
      ...(blog.thumbnail && {
        images: [
          {
            url: urlFor(blog.thumbnail).width(225).url(),
          },
        ],
      }),
    },
  };
}

export async function generateStaticParams() {
  // Generate for both languages
  const locales = ['en', 'ar'];
  const allSlugs = [];

  for (const locale of locales) {
    const blogsSlug = await fetchBlogsSlug(locale);
    const slugsForLocale = blogsSlug.map(blog => ({
      slug: blog.slug,
      locale: locale,
    }));
    allSlugs.push(...slugsForLocale);
  }

  return allSlugs;
}

export const revalidate = 43200; // 12 hours

export default async function BlogDetailsPage({ params }: Props) {
  const { slug, locale } = await params;
  const blog = await fetchBlogBySlug(slug, locale);

  if (!blog) {
    notFound();
  }

  const blogsWithSameCategory = await fetchBlogsByCategorySlugs(
    blog?.blogCategories?.map(category => category.slug).filter(slug => slug !== null),
    locale,
  );

  // exclude the current blog as it also has the same category and will be part of the query result
  const relatedBlogs: BlogWithProcessedImages[] = blogsWithSameCategory.filter(
    (relatedBlog: BlogWithProcessedImages) => relatedBlog.slug !== slug,
  );

  const currentUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL + '/blogs/' + slug;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog?.title || '')}&url=${encodeURIComponent(currentUrl)}`,
  };

  return <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} shareUrls={shareUrls} />;
}
