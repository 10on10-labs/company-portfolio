import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { sanityClient } from '@company/sanity-shared/client';
import { getTranslations } from 'next-intl/server';

import {
  BlogWithProcessedImages,
  fetchBlogsByCategorySlugs,
  getMidCtaIndex,
} from '@/lib/blog-utils';
import { urlFor } from '@/lib/image';
import { blogBySlugQuery, blogsSlugQuery } from '@/lib/sanity-queries';
import { CustomPortableText } from '@/components/custom-portable-text';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';

import { BlogCard } from '../_components/blog-card';
import { DownloadPdfCta } from '../_components/download-pdf-cta';
import { AuthorCard } from './_components/author-card';
import { BlogBannerCard } from './_components/blog-banner-card';

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
  const t = await getTranslations('blog_detail');

  if (!blog) {
    notFound();
  }

  const blogsWithSameCategory = await fetchBlogsByCategorySlugs(
    blog?.blogCategories?.map(category => category.slug).filter(slug => slug !== null),
    locale,
  );

  // exclude the current blog as it also has the same category and will be part of the query result
  const relatedBlogs: BlogWithProcessedImages[] = blogsWithSameCategory.filter(
    (blog: BlogWithProcessedImages) => blog.slug !== slug,
  );
  const body = blog?.body ?? [];
  const ctaIndex = getMidCtaIndex(body, {
    bias: 0.55, // push slightly past the middle
    minBlocksBefore: 4, // ensure it’s not near the start
    minParagraphsBefore: 3,
    minTotalChars: 1200,
  });
  const currentUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL + '/blogs/' + slug;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(facebookShareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog?.title || '')}&url=${encodeURIComponent(currentUrl)}`;
  return (
    <div className="flex flex-col gap-y-4 py-5 px-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('breadcrumb_home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">{t('breadcrumb_blogs')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <article id="blog-pdf-root">
        <BlogBannerCard
          title={blog?.title}
          subTitle={blog?.subTitle}
          author={blog?.author}
          modifiedAt={blog?.modifiedAt}
          facebookShareUrl={facebookShareUrl}
          linkedInShareUrl={linkedInShareUrl}
          twitterShareUrl={twitterShareUrl}
        />
        <DownloadPdfCta variant="compact" slug={slug} locale={locale} />
        <section className="mt-8">
          {body.length > 0 && (
            <div className="mt-8">
              {ctaIndex > 0 ? (
                <>
                  <CustomPortableText value={body.slice(0, ctaIndex)} />
                  <div className="my-10">
                    <DownloadPdfCta variant="detailed" slug={slug} locale={locale} />
                  </div>
                  <CustomPortableText value={body.slice(ctaIndex)} />
                </>
              ) : (
                <CustomPortableText value={body} />
              )}
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex text-primary items-center">
            <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
            {t('about_author')}
          </h2>
          <AuthorCard {...blog?.author} />
        </section>

        {relatedBlogs.length ? (
          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-4 flex text-primary items-center">
              <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
              {t('related_blogs')}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              {relatedBlogs.map((blog: BlogWithProcessedImages) => (
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
        ) : (
          <></>
        )}
      </article>
    </div>
  );
}
