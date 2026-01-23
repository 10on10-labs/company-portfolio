'use client';

import { BlogBySlugQueryResult } from '@company/sanity-shared';
import { useLocale, useTranslations } from 'next-intl';

import { BlogWithProcessedImages, getMidCtaIndex } from '@/lib/blog-utils';
import { CustomPortableText } from '@/components/custom-portable-text';

import { BlogCard } from '../../_components/blog-card';
import { DownloadPdfCta } from '../../_components/download-pdf-cta';
import { AuthorCard } from './author-card';
import { BlogBannerCard } from './blog-banner-card';
import { BlogBreadcrumbs } from './blog-breadcrumbs';

type Props = {
  blog: BlogBySlugQueryResult;
  relatedBlogs: BlogWithProcessedImages[];
  slug: string;
  shareUrls: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
};

export const BlogDetailClient: React.FC<Props> = ({ blog, relatedBlogs, slug, shareUrls }) => {
  const t = useTranslations('blog_detail');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const body = blog?.body ?? [];
  const ctaIndex = getMidCtaIndex(body, {
    bias: 0.55,
    minBlocksBefore: 4,
    minParagraphsBefore: 3,
    minTotalChars: 1200,
  });

  return (
    <div
      className={`flex flex-col gap-y-4 py-5 px-16 ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <BlogBreadcrumbs blogTitle={blog?.title} />
      <article id="blog-pdf-root">
        <BlogBannerCard
          title={blog?.title}
          subTitle={blog?.subTitle}
          author={blog?.author}
          modifiedAt={blog?.modifiedAt}
          facebookShareUrl={shareUrls.facebook}
          linkedInShareUrl={shareUrls.linkedin}
          twitterShareUrl={shareUrls.twitter}
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
            <span className={`bg-primary h-6 w-1 rounded-sm ${isRTL ? 'ml-3' : 'mr-3'}`}></span>
            {t('about_author')}
          </h2>
          <AuthorCard {...blog?.author} />
        </section>

        {relatedBlogs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold mb-6 flex text-primary items-center">
              <span className={`bg-primary h-6 w-1 rounded-sm ${isRTL ? 'ml-3' : 'mr-3'}`}></span>
              {t('related_blogs')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {relatedBlogs.slice(0, 6).map((blog: BlogWithProcessedImages) => (
                <BlogCard
                  key={blog._id}
                  redirectUrl={`blogs/${blog.slug}`}
                  title={blog.title}
                  subTitle={blog.subTitle}
                  duration={`${blog.readingTimeInMins} ${t('mins_read')}`}
                  publishedAt={blog.publishedAt}
                  thumbnail={blog.thumbnail}
                  categories={blog.blogCategories}
                  author={{ name: blog.author?.name, image: blog.author?.image }}
                />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
};
