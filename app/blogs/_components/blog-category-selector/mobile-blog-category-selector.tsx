'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

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

  return (
    <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-expanded={openPopOver}
          role="combobox"
          className="w-[200px] justify-between text-primary float-right"
        >
          {currentCategory
            ? blogCategories.find(cat => cat.slug === currentCategory)?.title
            : 'Select category...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {blogCategories.map(cat => (
                <CommandItem
                  key={cat.slug}
                  value={cat.slug || ''}
                  onSelect={selectedCat => {
                    handleCategoryChange(selectedCat);
                    setOpenPopOver(false);
                  }}
                >
                  {cat.title}
                  <Check
                    className={cn(
                      'ml-auto',
                      currentCategory === cat.slug ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
