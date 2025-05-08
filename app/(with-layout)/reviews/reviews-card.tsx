import Image from 'next/image';
import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/shadcn/card';

export type Review = {
  id: number;
  name: string;
  role: string;
  image: string;
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
    <Card className="rounded-3xl flex flex-col h-full pt-4 pb-4 border border-secondary shadow-sm w-full">
      <CardContent className="p-2 flex-1 flex items-center justify-center h-auto">
        <div className="flex items-center flex-col justify-center gap-6 w-full">
          <p className="text-lg mb-6 text-black text-center max-w-5xl">{review.content}</p>
          <div className="flex items-center mb-3">{renderStars(review.rating)}</div>
          <div className="flex items-center flex-col gap-2">
            <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-orange-400">
              <Image
                src={review.image}
                width={50}
                height={50}
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="text-lg font-bold text-black">{review.name}</h4>
            <p className="text-orange-600">{review.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
