import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Clock } from 'lucide-react';

import { cn, getAbbreviation } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Badge } from '@/components/shadcn/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';

type Props = {
  title: string | null;
  duration?: string | null;
  subTitle: string | null;
  thumbnail: string | null;
  categories?: { title: string | null; chipColor: string | null }[] | null;
  publishedAt: string | null;
  className?: string;
  redirectUrl: string;
  author?: {
    name?: string | null;
    image?: string | null;
  };
};

export const BlogCard: FC<Props> = ({
  title,
  subTitle,
  duration,
  publishedAt,
  thumbnail,
  className,
  categories,
  redirectUrl,
  author,
}) => {
  const date = parseISO(publishedAt || '');
  const formattedPublishedDate = format(date, 'MMMM d, yyyy');
  return (
    <Link href={redirectUrl} className="flex cursor-pointer">
      <Card
        className={cn(
          'overflow-hidden gap-1 w-full sm:w-96 pb-4 pt-0 border-0 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 group',
          className,
        )}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={thumbnail || ''}
            alt={title || ''}
            fill
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardHeader className="py-2 gap-0">
          {/* Categories row */}
          <div className="mb-2 flex flex-wrap gap-1 capitalize">
            {categories?.map(category => (
              <Badge
                key={category.title}
                style={{ backgroundColor: category.chipColor ?? '#efefef' }}
              >
                {category.title}
              </Badge>
            ))}
          </div>
          <div className="flex items-center text-sm gap-x-2 text-muted-foreground mb-2">
            <span>{formattedPublishedDate}</span>
            <span>•</span>
            <span className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {duration}
            </span>
          </div>
          <CardTitle className="text-xl h-16 tracking-tight line-clamp-2 text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-primary/70 line-clamp-2 text-sm">{subTitle}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t-accent [.border-t]:pt-3 mt-3 border-t">
          <div className="flex items-center gap-x-2 capitalize text-neutral-500">
            <Avatar className="bg-primary-blue-200">
              <AvatarImage src={author?.image || ''} alt="author_image" />
              <AvatarFallback className="uppercase">
                {getAbbreviation(author?.name || '').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <span>{author?.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
