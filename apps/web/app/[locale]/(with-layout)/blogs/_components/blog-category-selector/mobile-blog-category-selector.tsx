'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Button } from '@/components/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';

import { useBlogCategorySelector } from './use-blog-category-selector';

type BlogCategory = {
  title: string | null;
  slug: string | null;
};

type Props = {
  blogCategories: BlogCategory[];
};

export const MobileBlogCategorySelector: React.FC<Props> = ({ blogCategories }) => {
  const { currentCategory, handleCategoryChange } = useBlogCategorySelector();
  const [openPopOver, setOpenPopOver] = useState(false);
  const t = useTranslations('blogs_page');

  return (
    <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={openPopOver}
          role="combobox"
          className="w-full sm:w-[200px] justify-between text-gray-700 border-gray-200 cursor-pointer hover:bg-gray-50"
        >
          {currentCategory
            ? blogCategories.find(
                cat => (cat.slug === '__view_all__' ? null : cat.slug) === currentCategory,
              )?.title
            : blogCategories.find(cat => cat.slug === '__view_all__')?.title ||
              t('select_category') ||
              'Select category...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={t('search_category') || 'Search category...'}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>{t('no_category_found') || 'No category found.'}</CommandEmpty>
            <CommandGroup>
              {blogCategories.map((cat, index) => {
                const isViewAll = cat.slug === '__view_all__';
                const actualSlug = isViewAll ? null : cat.slug;

                return (
                  <CommandItem
                    key={cat.slug || `category-${index}`}
                    value={cat.slug || ''}
                    onSelect={() => {
                      handleCategoryChange(actualSlug);
                      setOpenPopOver(false);
                    }}
                  >
                    {cat.title}
                    <Check
                      className={cn(
                        'ml-auto',
                        currentCategory === actualSlug ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
