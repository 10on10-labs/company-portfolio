import { ReviewsCarousel } from './reviews-carousel';

const Reviews = () => {
  return (
    <div className="flex items-center flex-col gap-20 justify-center h-full w-full">
      <h1 className="font-extrabold sm:text-2xl md:text-4xl">What Our Clients Say</h1>
      <div className="@container w-full  relative overflow-hidden ">
        <ReviewsCarousel />
      </div>
    </div>
  );
};
export default Reviews;
