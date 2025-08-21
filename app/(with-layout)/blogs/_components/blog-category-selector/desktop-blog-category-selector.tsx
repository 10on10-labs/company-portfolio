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
    <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-gray-100 border border-gray-200">
      {blogCategories.map(category => {
        const isActive =
          currentCategory === category.slug || (currentCategory === null && category.slug === null);

        return (
          <button
            key={category.slug || 'all'}
            onClick={() => handleCategoryChange(category.slug)}
            className={cn(
              'px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
              isActive
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            )}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};
