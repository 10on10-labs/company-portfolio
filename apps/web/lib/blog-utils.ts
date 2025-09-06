import { BlogBySlugQueryResult, BlogsByCategoryQueryResult } from '@company/sanity-shared';
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

// utils/blog.ts
// Assumes `BlogBySlugQueryResult` is in scope
type Block = NonNullable<NonNullable<BlogBySlugQueryResult>['body']>[number];

const getTextLen = (b: Block): number => {
  if (!b || b._type !== 'block') return 0;
  const children = (b as any).children as Array<{ text?: string }> | undefined;
  if (!children?.length) return 0;
  return children.reduce((sum, c) => sum + (c?.text?.length ?? 0), 0);
};

const isNormalParagraph = (b: Block): boolean => {
  if (!b || b._type !== 'block') return false;
  const style = (b as any).style ?? 'normal';
  const listItem = (b as any).listItem;
  return style === 'normal' && !listItem;
};

const isBadBreak = (b?: Block): boolean => {
  if (!b) return false;
  if (b._type !== 'block') return true; // image/code/object — avoid splitting right before
  const style = (b as any).style ?? '';
  const listItem = (b as any).listItem;
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code'].includes(style) || !!listItem;
};

/**
 * Midpoint-ish CTA index based on total text length.
 * Returns the index *after which* to insert, or -1 to skip.
 */
export function getMidCtaIndex(
  blocks: NonNullable<BlogBySlugQueryResult>['body'],
  {
    bias = 0.5, // 0.5 = middle; 0.55 pushes later
    minBlocksBefore = 3, // keep it away from the very start
    minParagraphsBefore = 3, // require some real paragraphs before CTA
    minTotalChars = 900, // skip very short posts
    maxIndexFromEnd = 1, // keep at least 1 block after CTA
  }: {
    bias?: number;
    minBlocksBefore?: number;
    minParagraphsBefore?: number;
    minTotalChars?: number;
    maxIndexFromEnd?: number;
  } = {},
): number {
  if (!blocks?.length) return -1;

  const lengths = blocks.map(getTextLen);
  const totalChars = lengths.reduce((a, b) => a + b, 0);
  if (totalChars < minTotalChars) return -1;

  const target = totalChars * bias;

  let running = 0;
  let parasSeen = 0;
  let candidate = -1;

  for (let i = 0; i < blocks.length; i++) {
    running += lengths[i];
    if (isNormalParagraph(blocks[i])) parasSeen++;

    if (running >= target && isNormalParagraph(blocks[i])) {
      candidate = i + 1; // insert AFTER this paragraph
      break;
    }
  }

  // Fallback to structural middle if no paragraph matched at target
  if (candidate === -1) candidate = Math.floor(blocks.length / 2);

  // Enforce distance from start
  candidate = Math.max(candidate, minBlocksBefore);

  // Avoid placing right before headings/lists/media/etc.
  while (candidate < blocks.length - maxIndexFromEnd && isBadBreak(blocks[candidate])) {
    candidate++;
  }

  // Final guards
  if (parasSeen < minParagraphsBefore) return -1;
  if (candidate >= blocks.length - maxIndexFromEnd) return -1;

  return candidate;
}

/**
 * Early-insertion helper (by minimum characters) with your exact signature.
 * Kept here for convenience when you want a “first suitable place after X chars”.
 */
export function getCtaInsertIndex(
  blocks: NonNullable<BlogBySlugQueryResult>['body'],
  minChars = 2000,
): number {
  if (!blocks) return -1;
  let chars = 0;

  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    if (b._type === 'block') {
      const text =
        ((b as any).children as Array<{ text?: string }> | undefined)
          ?.map(c => c.text ?? '')
          .join('') ?? '';
      chars += text.length;

      const isPara = ((b as any).style ?? 'normal') === 'normal' && !(b as any).listItem;
      if (chars >= minChars && isPara) {
        return i + 1;
      }
    }
  }
  return -1;
}
