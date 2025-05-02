import { Metadata } from 'next';
import { SanityPortableTextStyle } from '@/components';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogBySlugQuery, blogsSlugQuery } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';

import { BlogBannerCard } from '../components/blog-banner-card';

type Props = {
  params: Promise<{ slug: string }>;
};

const fetchBlogsSlug = async () => {
  const blogsSlugs = await client.fetch(blogsSlugQuery);
  return blogsSlugs;
};

const fetchBlogBySlug = async (slug: string) => {
  const blog = await client.fetch(blogBySlugQuery, { slug });
  if (!blog) return null;
  return {
    ...blog,
    author: {
      ...blog.author,
      image: blog.author?.image ? urlFor(blog.author.image).width(50).url() : null,
    },
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  return {
    title: blog?.title,
    description: blog?.subTitle,
    category: 'blog',
    applicationName: '10on10Labs',
    authors: { name: blog?.author?.name || '' },
    openGraph: {
      url: new URL(`/blogs/${slug}`, process.env.NEXT_PUBLIC_DEPLOYED_URL).href,
      title: blog?.title || '',
      description: blog?.subTitle || '',
      siteName: '10on10Labs',
      ...(blog?.thumbnail && {
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
  const blogsSlug = await fetchBlogsSlug();
  return blogsSlug.map(blog => ({
    slug: blog.slug,
  }));
}

export const revalidate = 43200; // 12 hours

export default async function BlogDetailsPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchBlogBySlug(slug);

  const currentUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL + '/learn/article/' + slug;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(facebookShareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article?.title || '')}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Blogs</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{article?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BlogBannerCard
        title={article?.title}
        subTitle={article?.subTitle}
        author={article?.author}
        modifiedAt={article?.modifiedAt}
        facebookShareUrl={facebookShareUrl}
        linkedInShareUrl={linkedInShareUrl}
        twitterShareUrl={twitterShareUrl}
      />

      {article?.body && (
        <div className="mt-8">
          <PortableText value={article.body} components={SanityPortableTextStyle} />
        </div>
      )}
    </div>
  );
}
