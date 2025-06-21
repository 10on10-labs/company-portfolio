import { sanityClient } from '@/sanity/lib/client';
import { testimonialsQuery } from '@/sanity/lib/queries/queries';

import { ReviewsCarousel } from './reviews-carousel';

async function getTestimonials() {
  const clientTestimonials = await sanityClient.fetch(testimonialsQuery);
  return clientTestimonials;
}

export const revalidate = 43200; // 12 hours

export default async function ReviewsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="flex items-center flex-col gap-6 md:gap-8 justify-center w-full p-4 md:p-10 overflow-y-auto">
      <h1 className="font-bold text-xl sm:text-2xl md:text-4xl text-center px-4">
        What Our Clients Say
      </h1>
      <div className="@container w-full max-w-7xl mx-auto relative px-2 md:px-0">
        <ReviewsCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
