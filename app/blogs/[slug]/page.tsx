import { Metadata } from 'next';
import { SanityPortableTextStyle } from '@/components';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { blogBySlugQuery, blogsSlugQuery } from '@/sanity/lib/queries';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/shadcn/breadcrumb';

import { BlogCard } from '../components/blog-card';
import { fetchBlogsByCategorySlugs } from '../page';
import { AuthorCard } from './components/author-card';
import { BlogBannerCard } from './components/blog-banner-card';
import PortableText from './components/CustomPortable';

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
  return blog;
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
  const blog = await fetchBlogBySlug(slug);
  const blogsWithSameCategory = await fetchBlogsByCategorySlugs(
    blog?.blogCategories
      ?.map(category => category.slug)
      .filter((slug): slug is string => slug !== null),
  );

  // exclude the current blog as it also has the same category and will be part of the query result
  const relatedBlogs = blogsWithSameCategory.filter(blog => blog.slug !== slug);

  const currentUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL + '/blogs/' + slug;
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(facebookShareUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog?.title || '')}&url=${encodeURIComponent(currentUrl)}`;

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
            <BreadcrumbPage>{blog?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BlogBannerCard
        title={blog?.title}
        subTitle={blog?.subTitle}
        author={blog?.author}
        modifiedAt={blog?.modifiedAt}
        facebookShareUrl={facebookShareUrl}
        linkedInShareUrl={linkedInShareUrl}
        twitterShareUrl={twitterShareUrl}
      />
      <section>
        {blog?.body && (
          <div className="mt-8">
            <PortableText value={blog.body} components={SanityPortableTextStyle} />
          </div>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex text-primary items-center">
          <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
          About the Author
        </h2>
        <AuthorCard {...blog?.author} />
      </section>

      {relatedBlogs.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-4 flex text-primary items-center">
            <span className="bg-primary h-6 w-1 mr-3 rounded-sm"></span>
            Related Blogs
          </h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {relatedBlogs.map(blog => (
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
    </div>
  );
}
