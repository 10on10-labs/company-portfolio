import { FC } from 'react';
import Image from 'next/image';
import { Link } from '@/src/i18n/navigation';
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
  const formattedPublishedDate = publishedAt ? format(parseISO(publishedAt), 'MMMM d, yyyy') : null;
  return (
    <Link href={redirectUrl} className="block h-full">
      <Card
        className={cn(
          'overflow-hidden w-full h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-card border border-border hover:border-primary/30',
          className,
        )}
      >
        <div className="relative h-40 overflow-hidden bg-muted/50">
          {thumbnail && (
            <Image
              src={thumbnail}
              alt={title || ''}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />
          )}
        </div>
        <CardHeader className="p-4 pb-2 space-y-2">
          {/* Categories row */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.map(category => (
                <Badge
                  key={category.title}
                  className="text-xs font-medium px-2 py-0.5 capitalize"
                  style={{ backgroundColor: category.chipColor ?? '#f3f4f6', color: '#374151' }}
                >
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
          <CardTitle className="text-base md:text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors leading-snug">
            {title}
          </CardTitle>
          <div className="flex items-center text-xs gap-x-2 text-muted-foreground">
            {formattedPublishedDate && <span>{formattedPublishedDate}</span>}
            {formattedPublishedDate && duration && <span>•</span>}
            {duration && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {duration}
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-2 flex-grow">
          <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{subTitle}</p>
        </CardContent>
        {author?.name && (
          <CardFooter className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={author?.image || ''} alt={author?.name || ''} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
                  {getAbbreviation(author?.name || '')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-card-foreground">{author?.name}</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
};
