import { ReviewsCarousel } from './reviews-carousel';

const Reviews = () => {
  return (
    <div className="flex items-center flex-col gap-5 md:gap-20 justify-center w-full pt-20 p-5 md:p-5 md:pt-10  overflow-y-auto">
      <h1 className="font-bold sm:text-2xl md:text-4xl">What Our Clients Say</h1>
      <div className="@container w-full  relative overflow-hidden">
        <ReviewsCarousel />
      </div>
    </div>
  );
};
export default Reviews;
