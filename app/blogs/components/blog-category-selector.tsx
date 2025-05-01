'use client';

import { FC } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';

type BlogCategory = {
  title: string | null;
  slug: string | null;
};

type Props = {
  blogCategories: BlogCategory[];
};

export const BlogCategorySelector: FC<Props> = ({ blogCategories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const allCategories = [{ title: 'View All', slug: null }, ...blogCategories];

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="text-lg p-1 gap-x-2 text-primary rounded-3xl overflow-hidden bg-secondary/80 backdrop-blur-sm mx-auto flex w-max border border-secondary/20 shadow-sm">
      {allCategories.map(category => {
        const isActive =
          currentCategory === category.slug || (currentCategory === null && category.slug === null);

        return (
          <button
            key={category.slug || 'all'}
            onClick={() => handleCategoryChange(category.slug)}
            className={cn(
              'relative cursor-pointer px-2 py-1 rounded-2xl w-max',
              'transition-all duration-300 ease-out',
              'transform hover:scale-105 hover:z-10',
              isActive
                ? [
                    'text-white bg-primary shadow-lg',
                    'scale-105 z-10',
                    'bg-gradient-to-br from-primary to-primary/90',
                    'shadow-primary/20 hover:shadow-primary/30',
                    'border border-primary/30',
                  ].join(' ')
                : [
                    'text-primary/80 hover:text-primary',
                    'hover:bg-secondary/50',
                    'border border-transparent hover:border-secondary/30',
                  ].join(' '),
            )}
          >
            {category.title}
          </button>
        );
      })}
    </div>
  );
};
