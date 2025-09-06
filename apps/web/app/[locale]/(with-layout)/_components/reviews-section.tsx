import { TestimonialsQueryResult } from '@company/sanity-shared';

import { ReviewsCarousel } from '@/components/reveiws/reviews-carousel';

interface ReviewsSectionProps {
  testimonials: TestimonialsQueryResult;
}

export default function ReviewsSection({ testimonials }: ReviewsSectionProps) {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="flex items-center flex-col gap-6 md:gap-8 justify-center w-full p-4 md:p-10 overflow-y-auto">
        <h1 className="font-bold text-xl sm:text-2xl md:text-4xl text-center px-4">
          What Our Clients Say
        </h1>
        <div className="@container w-full max-w-7xl mx-auto relative px-2 md:px-0">
          <ReviewsCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
