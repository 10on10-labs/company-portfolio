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

  const allCategories = [{ title: 'All', slug: null }, ...blogCategories];

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
    <div className="px-4 text-lg py-2 rounded-2xl shadow-amber-500 text-primary mx-auto gap-x-4 flex bg-primary/5 w-max">
      {allCategories.map(category => (
        <button
          key={category.slug || 'all'}
          onClick={() => handleCategoryChange(category.slug)}
          className={cn(
            'cursor-pointer',
            `${
              currentCategory === category.slug ||
              (currentCategory === null && category.slug === null)
                ? 'font-bold text-amber-600'
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
