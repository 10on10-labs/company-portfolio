'use client';

import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/shadcn/button';
import { subscribeToNewsletter } from '@/app/actions/subscribeToNewsletter';

import { BlogCard } from './blog-card';
import { DesktopBlogCategorySelector } from './blog-category-selector/desktop-blog-category-selector';
import { MobileBlogCategorySelector } from './blog-category-selector/mobile-blog-category-selector';
import { BlogsBreadcrumbs } from './blogs-breadcrumbs';

type Props = {
  blogs: any[];
  blogCategories: any[];
};

export const BlogsPageClient: React.FC<Props> = ({ blogs, blogCategories }) => {
  const t = useTranslations('blogs_page');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const allBlogCategories = [{ title: t('view_all'), slug: '__view_all__' }, ...blogCategories];

  if (!blogs || blogs.length === 0) {
    return (
      <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
          <BlogsBreadcrumbs />
          <p className="text-center text-muted-foreground mt-8">{t('no_blogs_found')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header Section */}
      <section className="relative py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <BlogsBreadcrumbs />

          <div className="flex flex-col items-start gap-2 my-6 md:my-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
              {t('title')}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-3xl">
              {t('description')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <h2 className="text-xl md:text-2xl font-bold flex items-center">
              <span
                className={`bg-primary h-6 w-1 ${locale === 'ar' ? 'ml-3' : 'mr-3'} rounded-sm`}
              ></span>
              <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
                {t('latest_articles')}
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
                duration={`${blog.readingTimeInMins} ${t('mins_read')}`}
                publishedAt={blog.publishedAt}
                thumbnail={blog.thumbnail}
                categories={blog.blogCategories}
                author={{ name: blog.author?.name, image: blog.author?.image }}
              />
            ))}
          </div>

          {/* Newsletter Signup */}
          <section className="mt-16 md:mt-20 bg-muted/30 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
              {t('newsletter.title')}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            <form
              action={subscribeToNewsletter}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder={t('newsletter.email_placeholder')}
                className="flex-1 px-4 py-2.5 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300">
                {t('newsletter.subscribe_button')}
              </Button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
};
