import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ArrowRight, Clock } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/shadcn/card';

import { Avatar, AvatarFallback, AvatarImage } from './shadcn/avatar';

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
    <Card
      className={cn(
        'overflow-hidden w-96 pb-4 pt-0 border-0 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 group',
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
      <CardHeader className="pb-2">
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{formattedPublishedDate}</span>
          <span>•</span>
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {duration}
          </span>
        </div>
        <Link href={redirectUrl} className="hover:underline">
          <h3 className="text-xl font-bold tracking-tight line-clamp-1">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-2 text-xs">{subTitle}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 border-t">
        <div className="flex items-center gap-x-2 capitalize text-neutral-500">
          <Avatar className="bg-primary-blue-200">
            <AvatarImage src={author?.image || ''} alt="author_image" />
            <AvatarFallback className="uppercase">
              {author?.name
                ?.split(' ')
                .slice(0, 2)
                .map(namePart => namePart[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <span>{author?.name}</span>
        </div>
        <Button variant="ghost" size="sm" asChild className="group/btn">
          <Link href={redirectUrl}>
            Read
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
