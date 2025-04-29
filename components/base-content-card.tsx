import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { BookOpen } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/shadcn/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';

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

export const BaseContentCard = ({
  title,
  subTitle,
  duration,
  publishedAt,
  thumbnail,
  className,
  categories,
  redirectUrl,
  author,
}: Props) => {
  return (
    <Link href={redirectUrl}>
      <Card className={cn('overflow-hidden border-0', className)}>
        <CardHeader className="relative p-2">
          <div className="relative h-56 w-full overflow-hidden rounded-xl">
            {thumbnail && (
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <Image
                  src={thumbnail}
                  alt="Episode thumbnail"
                  fill
                  className="overflow-hidden rounded-xl object-cover"
                />
              </div>
            )}
            {duration && (
              <Badge className="bg-amber-500 text-lg z-10 absolute bottom-1 right-1 font-normal">
                {duration} <BookOpen />
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
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
          <CardTitle className="line-clamp-1 text-base">{title}</CardTitle>
          <CardDescription className="line-clamp-2 text-xs">{subTitle}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-y-4 p-4 pt-0 text-xs">
          {publishedAt && <time>{format(new Date(publishedAt), 'MMMM d, yyyy')}</time>}
          {author && (
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
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
