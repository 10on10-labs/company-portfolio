import { FC } from 'react';
import { Author } from '@company/sanity-shared';
import { format } from 'date-fns';
import { Facebook, Linkedin } from 'lucide-react';

import { urlFor } from '@/lib/image';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';

type Props = {
  title?: string | null;
  subTitle?: string | null;
  author?: Author | null;
  modifiedAt?: string;
  facebookShareUrl: string;
  linkedInShareUrl: string;
  twitterShareUrl: string;
};

export const BlogBannerCard: FC<Props> = ({
  title,
  subTitle,
  author,
  modifiedAt,
  facebookShareUrl,
  linkedInShareUrl,
  twitterShareUrl,
}) => {
  const authorImageUrl = author?.image ? urlFor(author.image).width(50).url() : null;
  return (
    <Card className="bg-primary/5 text-primary-900 border-0">
      <CardHeader>
        <CardTitle className="text-primary text-2xl sm:text-5xl font-bold">{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <hr className="border-neutral-200 pb-6" />
      <CardFooter className="flex flex-col sm:flex-row gap-y-8 justify-between">
        <div className="flex items-center gap-x-2 capitalize text-neutral-500">
          <Avatar className="bg-primary-blue-200">
            <AvatarImage src={authorImageUrl || ''} alt="author_image" />
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
        <div className="text-neutral-500">
          <div className="flex justify-end gap-x-2">
            <span>Share this on:</span>
            <div className="flex justify-end gap-x-2">
              <a
                href={facebookShareUrl}
                target="_blank"
                rel="noreferrer"
                className="overflow-hidden rounded-lg"
              >
                <Facebook className="hover:scale-105 text-black" />
              </a>
              <a
                href={linkedInShareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <Linkedin className="hover:scale-105 text-black" />
              </a>
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noreferrer"
                className="text-primary-blue hover:text-primary-blue-400"
              >
                <Icons.X className="hover:scale-105 text-black" />
              </a>
            </div>
          </div>
          {modifiedAt && (
            <span className="capitalize">
              last modified: {format(new Date(modifiedAt), 'MMMM d, yyyy')}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
