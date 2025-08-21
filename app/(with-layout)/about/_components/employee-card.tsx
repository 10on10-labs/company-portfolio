import { FC } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

type Props = {
  redirectUrl: string;
  image?: string;
  fullName: string;
  role: string;
};

export const EmployeeCard: FC<Props> = ({ redirectUrl, fullName, role, image }) => (
  <a
    href={redirectUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-200 group"
  >
    <div className="relative">
      <ExternalLink className="absolute top-0 right-0 w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
        {image ? (
          <Image
            src={image}
            alt={fullName}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
            {fullName
              ?.split(' ')
              .map(n => n[0])
              .join('')}
          </div>
        )}
      </div>

      <div className="text-center">
        <h3 className="font-semibold text-gray-900 mb-1">{fullName}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  </a>
);
