import { BlogsByCategoryQueryResult } from '@company/sanity-shared';
import { sanityClient } from '@company/sanity-shared/client';

import { urlFor } from '@/lib/image';
import { blogsByCategoryQuery } from '@/lib/sanity-queries';

export const fetchBlogsByCategorySlugs = async (
  categories: string | string[] | undefined,
  language: string,
) => {
  const categorySlugs = categories ? (Array.isArray(categories) ? categories : [categories]) : null;
  const blogs: BlogsByCategoryQueryResult = await sanityClient.fetch(blogsByCategoryQuery, {
    categorySlugs,
    language,
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

export type BlogWithProcessedImages = Awaited<ReturnType<typeof fetchBlogsByCategorySlugs>>[0];
