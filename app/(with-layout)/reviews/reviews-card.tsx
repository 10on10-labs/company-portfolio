import { Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Card, CardContent } from '@/components/shadcn/card';

export type Review = {
  id: string;
  name: string;
  role: string;
  image: string | null;
  content: string;
  rating: number;
};

export const ReviewsCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < rating ? 'text-orange-500 fill-orange-500' : 'text-gray-300'}`}
        />
      ));
  };
  return (
    <Card className="rounded-3xl flex flex-col h-full pt-2 pb-2 md:pb-4 md:pt-4 border border-secondary shadow-sm w-full">
      <CardContent className="p-2 flex-1 flex items-center justify-center">
        <div className="flex items-center flex-col justify-center gap-2 md:gap-6 w-full">
          <p className="text-lg mb-6 text-black text-center max-w-5xl">{review.content}</p>
          <div className="flex items-center mb-0 md:mb-3">{renderStars(review.rating)}</div>
          <div className="flex items-center flex-col gap-2">
            <Avatar className="size-20 border-2 border-orange-400">
              <AvatarImage src={review.image || ''} alt="author_image" />
              <AvatarFallback className="uppercase bg-gray-200">
                {review.name
                  ?.split(' ')
                  .slice(0, 2)
                  .map(namePart => namePart[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>

            <h4 className="text-lg font-bold text-black">{review.name}</h4>
            <p className="text-orange-600">{review.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
