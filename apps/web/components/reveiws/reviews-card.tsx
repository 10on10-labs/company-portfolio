'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Button } from '@/components/shadcn/button';
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
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongContent = review.content.length > 150;

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${i < rating ? 'text-orange-500 fill-orange-500' : 'text-muted-foreground'}`}
        />
      ));
  };

  return (
    <Card
      className={`rounded-xl md:rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 w-full flex flex-col relative ${isExpanded ? 'h-auto min-h-[300px] md:min-h-[320px]' : 'h-[300px] md:h-[320px]'}`}
    >
      <CardContent className="p-4 md:p-6 pb-[80px] md:pb-[90px] h-full">
        <div className="flex items-center mb-2 md:mb-3">{renderStars(review.rating)}</div>

        <div>
          <p
            className={`text-sm md:text-base text-foreground leading-relaxed transition-all duration-300 ${!isExpanded && isLongContent ? 'line-clamp-5 md:line-clamp-4' : ''}`}
          >
            {review.content}
          </p>

          {isLongContent && !isExpanded && (
            <span className="text-muted-foreground text-sm">...</span>
          )}
        </div>

        {isLongContent && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-2 px-0 h-auto text-orange-600 hover:text-orange-700 hover:bg-transparent font-medium flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Read more <ChevronDown className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardContent>

      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4 md:p-6 pt-3 md:pt-4 border-t border-border bg-card rounded-b-xl md:rounded-b-2xl">
        <Avatar className="size-9 md:size-10 border border-border">
          <AvatarImage src={review.image || ''} alt="author_image" />
          <AvatarFallback className="uppercase bg-muted text-xs">
            {review.name
              ?.split(' ')
              .slice(0, 2)
              .map(namePart => namePart[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground line-clamp-1">{review.name}</h4>
          <p className="text-xs text-muted-foreground line-clamp-1">{review.role}</p>
        </div>
      </div>
    </Card>
  );
};
