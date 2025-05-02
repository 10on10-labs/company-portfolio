import { FC } from 'react';
import { SanityPortableTextStyle } from '@/components';
import { Author } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from 'next-sanity';

import { getNameAbbreviation } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Card, CardContent } from '@/components/shadcn/card';

export const AuthorCard: FC<Partial<Author>> = ({ name, image, bio }) => {
  const imageUrl = image ? urlFor(image).width(50).url() : null;
  return (
    <Card className="mt-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-20 w-20 border-2 border-muted">
            <AvatarImage src={imageUrl || '/placeholder.svg'} alt={name || ''} />
            <AvatarFallback className="text-lg">{getNameAbbreviation(name || '')}</AvatarFallback>
          </Avatar>
          <PortableText value={bio || []} components={SanityPortableTextStyle} />
        </div>
      </CardContent>
    </Card>
  );
};
