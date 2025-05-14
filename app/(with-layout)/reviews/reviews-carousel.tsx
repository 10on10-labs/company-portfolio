//@TODO we might replace the name with testimonials or something better

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/shadcn/carousel';

import { ReviewsCard } from './reviews-card';

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    image: '/api/placeholder/100/100',
    content:
      "Working with this team transformed our entire digital strategy. The results exceeded our expectations by 150%, and we couldn't be happier! Working with this team transformed our entire digital strategy. The results exceeded our expectations by 150%, and we couldn't be happier! Working with this team transformed our entire digital strategy. The results exceeded our expectations by 150%, and we couldn't be happier! Working with this team transformed our entire digital strategy. The results exceeded our expectations by 150%, and we couldn't be happier! Working with this team transformed our entire digital strategy. The results exceeded our expectations by 150%, and we couldn't be happier!",
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Startup Founder',
    image: '/api/placeholder/100/100',
    content:
      'The attention to detail and creative approach made all the difference. Our conversion rates increased by 75% within just two months.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    image: '/api/placeholder/100/100',
    content:
      "We've worked with many agencies before, but none delivered the level of quality and innovation we experienced here. Truly exceptional.",
    rating: 4,
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'CFO',
    image: '/api/placeholder/100/100',
    content:
      "The ROI speaks for itself. Our investment paid for itself within the first quarter, and we're seeing consistent growth since then.",
    rating: 5,
  },
];
export const ReviewsCarousel = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        align: 'start',
        dragFree: false,
      }}
      orientation="horizontal"
      className="h-full"
    >
      <CarouselContent className="-ml-4">
        {reviews.map(review => (
          <CarouselItem
            key={review.id}
            className="basis-full min-[768px]:basis-[100%] lg:basis-[80%] xl:basis-[80%] flex-shrink-0"
          >
            <ReviewsCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="md:size-15 right-1" />
      <CarouselPrevious className="md:size-15 left-1" />
    </Carousel>
  );
};
