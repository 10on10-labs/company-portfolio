import { FC } from 'react';
import Image from 'next/image';
import { CompanyLeadershipQueryResult } from '@company/sanity-shared';
import { ExternalLink } from 'lucide-react';

import { urlFor } from '@/lib/image';

type NonNullTimelineItems = NonNullable<CompanyLeadershipQueryResult>;
type NonNullTimelineMember = NonNullable<NonNullTimelineItems['members']>;
// Extract the type of a single member from the members array
type Props = NonNullTimelineMember[number];

export const EmployeeCard: FC<Props> = ({ portfolioUrl, name, designation, image }) => (
  <a
    href={portfolioUrl || ''}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow duration-200 group"
  >
    <div className="relative">
      <ExternalLink className="absolute top-0 right-0 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={urlFor(image || '')
              ?.width(96)
              ?.url()}
            alt={name || 'employee'}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
            {name
              ?.split(' ')
              .map(n => n[0])
              .join('')}
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-card-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground">{designation}</p>
      </div>
    </div>
  </a>
);
