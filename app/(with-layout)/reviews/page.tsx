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
    <div className="flex items-center flex-col gap-5 md:gap-20 justify-center w-full  p-5 md:p-5 md:pt-10  overflow-y-auto">
      <h1 className="font-bold sm:text-2xl md:text-4xl">What Our Clients Say</h1>
      <div className="@container w-full relative overflow-hidden">
        <ReviewsCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
