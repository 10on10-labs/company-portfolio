import { FC } from 'react';
import { Author } from '@company/sanity-shared';

import { urlFor } from '@/lib/image';
import { getAbbreviation } from '@/lib/utils';
import { CustomPortableText } from '@/components/custom-portable-text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';
import { Card, CardContent, CardTitle } from '@/components/shadcn/card';

export const AuthorCard: FC<Partial<Author>> = ({ name, image, bio }) => {
  const imageUrl = image ? urlFor(image).width(50).url() : null;
  return (
    <Card className="overflow-hidden border-0">
      <CardContent className="p-6 flex flex-col items-center sm:flex-row gap-4">
        <Avatar className="h-20 w-20 border-2 border-muted">
          <AvatarImage src={imageUrl || '/placeholder.svg'} alt={name || ''} />
          <AvatarFallback className="text-lg">
            {getAbbreviation(name || '').slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg text-primary text-center sm:text-start">{name}</CardTitle>
          <CustomPortableText value={bio || []} />
        </div>
      </CardContent>
    </Card>
  );
};
