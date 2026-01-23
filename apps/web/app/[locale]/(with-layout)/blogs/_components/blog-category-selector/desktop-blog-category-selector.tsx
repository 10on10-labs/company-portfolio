'use client';

import { FC } from 'react';

import { cn } from '@/lib/utils';

import { useBlogCategorySelector } from './use-blog-category-selector';

type BlogCategory = {
  title: string | null;
  slug: string | null;
};

type Props = {
  blogCategories: BlogCategory[];
};

export const DesktopBlogCategorySelector: FC<Props> = ({ blogCategories }) => {
  const { currentCategory, handleCategoryChange } = useBlogCategorySelector();
  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-muted border border-border">
      {blogCategories.map((category, index) => {
        const isViewAll = category.slug === '__view_all__';
        const actualSlug = isViewAll ? null : category.slug;
        const isActive = currentCategory === actualSlug || (currentCategory === null && isViewAll);

        return (
          <button
            key={category.slug || `category-${index}`}
            onClick={() => handleCategoryChange(actualSlug)}
            className={cn(
              'px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background',
            )}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};
