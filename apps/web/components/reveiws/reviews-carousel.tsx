'use client';

import { FC } from 'react';
import { TestimonialsQueryResult } from '@company/sanity-shared';
import { useLocale } from 'next-intl';

import { urlFor } from '@/lib/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';

import { ReviewsCard } from './reviews-card';

type Props = {
  testimonials: TestimonialsQueryResult;
};
export const ReviewsCarousel: FC<Props> = ({ testimonials }) => {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <Carousel
      opts={{
        loop: true,
        align: 'center',
        dragFree: false,
      }}
      orientation="horizontal"
      className="h-full w-full relative"
    >
      <CarouselContent>
        {testimonials.map(({ _id, clientImage, clientName, role, testimonial, rating }) => (
          <CarouselItem
            key={_id}
            className="basis-[90%] sm:basis-[85%] md:basis-1/2 lg:basis-1/3 flex-shrink-0"
          >
            <ReviewsCard
              review={{
                id: _id,
                name: clientName || '',
                role: role || '',
                content: testimonial || '',
                rating: rating || 5,
                image: clientImage ? urlFor(clientImage).width(150).url() : null,
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Mobile arrows - centered */}
      <CarouselPrevious
        className={`md:hidden size-10 top-[45%] -translate-y-1/2 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity ${isRTL ? '-right-2' : '-left-2'}`}
      />
      <CarouselNext
        className={`md:hidden size-10 top-[45%] -translate-y-1/2 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity ${isRTL ? '-left-2' : '-right-2'}`}
      />

      {/* Desktop arrows - positioned based on language */}
      <div className={`hidden md:flex absolute bottom-4 gap-2 ${isRTL ? 'left-4' : 'right-4'}`}>
        <CarouselPrevious className="static size-12 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity translate-x-0 translate-y-0" />
        <CarouselNext className="static size-12 bg-primary border-0 text-white opacity-60 hover:opacity-100 transition-opacity translate-x-0 translate-y-0" />
      </div>
    </Carousel>
  );
};
