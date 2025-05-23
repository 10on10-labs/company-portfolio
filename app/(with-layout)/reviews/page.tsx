import { getClient } from '@/sanity/lib/client';
import { testimonialsQuery } from '@/sanity/lib/queries/queries';

import { ReviewsCarousel } from './reviews-carousel';

type Testimonial = {
  clientName: string;
  testimonial: string;
  clientImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
};

async function getTestimonials() {
  const client = getClient();
  return client.fetch<Testimonial[]>(testimonialsQuery);
}

const Reviews = async () => {
  const testimonials = await getTestimonials();

  return (
    <div className="flex items-center flex-col gap-5 md:gap-20 justify-center w-full pt-20 p-5 md:p-5 md:pt-10  overflow-y-auto">
      <h1 className="font-bold sm:text-2xl md:text-4xl">What Our Clients Say</h1>
      <div className="@container w-full relative overflow-hidden">
        <ReviewsCarousel testimonials={testimonials} />
      </div>
    </div>
  );
};

export default Reviews;
