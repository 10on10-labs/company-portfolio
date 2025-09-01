import { FC } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

import { CompanyLeadershipQueryResult } from '@/types/sanity.types';
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
    className="block p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-200 group"
  >
    <div className="relative">
      <ExternalLink className="absolute top-0 right-0 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
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
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
            {name
              ?.split(' ')
              .map(n => n[0])
              .join('')}
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{designation}</p>
      </div>
    </div>
  </a>
);
