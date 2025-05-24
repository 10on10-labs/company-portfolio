//@TODO we might replace the name with testimonials or something better

import { FC } from 'react';
import { TestimonialsQueryResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

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
  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
        dragFree: false,
      }}
      orientation="horizontal"
      className="h-full w-full"
    >
      <CarouselContent className="-ml-4">
        {testimonials.map(({ _id, clientImage, clientName, role, testimonial, rating }) => (
          <CarouselItem
            key={_id}
            className="basis-full min-[768px]:basis-[100%] lg:basis-[80%] xl:basis-[80%] flex-shrink-0"
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
      <CarouselNext className="md:size-12 right-1 opacity-80 hover:opacity-100" />
      <CarouselPrevious className="md:size-12 left-1 opacity-80 hover:opacity-100" />
    </Carousel>
  );
};
