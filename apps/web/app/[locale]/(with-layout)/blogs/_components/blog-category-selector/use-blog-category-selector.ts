'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/src/i18n/navigation';

export const useBlogCategorySelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category');

  const handleCategoryChange = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return { currentCategory, handleCategoryChange };
};
