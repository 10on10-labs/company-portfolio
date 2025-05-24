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
    <div className="text-lg p-1 mb-12 gap-x-2 text-primary rounded-3xl bg-secondary/80 backdrop-blur-sm mx-auto flex w-fit border border-secondary/20 shadow-sm">
      {blogCategories.map(category => {
        const isActive =
          currentCategory === category.slug || (currentCategory === null && category.slug === null);

        return (
          <button
            key={category.slug || 'all'}
            onClick={() => handleCategoryChange(category.slug)}
            className={cn(
              'relative cursor-pointer p-2 text-sm rounded-2xl w-max transition-all duration-300 ease-out transform hover:scale-105 hover:z-10',
              isActive
                ? 'text-white bg-primary shadow-lg z-10 bg-gradient-to-br from-primary to-primary/90 shadow-primary/20 hover:shadow-primary/30 border border-primary/30'
                : 'text-primary/80 hover:text-primary hover:bg-secondary/50 border border-transparent hover:border-secondary/30',
            )}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};
