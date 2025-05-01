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
    <div className="text-lg p-1 gap-x-2 text-primary rounded-3xl overflow-hidden bg-secondary mx-auto flex w-max">
      {allCategories.map(category => (
        <button
          key={category.slug || 'all'}
          onClick={() => handleCategoryChange(category.slug)}
          className={cn(
            'cursor-pointer px-2 py-1 rounded-3xl w-max',
            `${
              currentCategory === category.slug ||
              (currentCategory === null && category.slug === null)
                ? 'text-white bg-primary'
                : 'hover:text-amber-500'
            }`,
          )}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};
