import { FC } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar';

type Props = {
  redirectUrl: string;
  image?: string;
  fullName: string;
  role: string;
};

export const EmployeeCard: FC<Props> = ({ redirectUrl, fullName, role, image }) => (
  <motion.a
    href={redirectUrl}
    target="_blank"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ y: -10 }}
    className="p-4 rounded-4xl relative flex flex-col items-center cursor-pointer bg-transparent hover:shadow-lg hover:shadow-primary/50 group"
  >
    <ExternalLink className="absolute top-4 right-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    <Avatar className="size-24">
      <AvatarImage src={image || ''} alt="author_image" />
      <AvatarFallback className="uppercase bg-gray-200">
        {fullName
          ?.split(' ')
          .slice(0, 2)
          .map(namePart => namePart[0])
          .join('')}
      </AvatarFallback>
    </Avatar>
    <h3 className="font-semibold mt-4">{fullName}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.a>
);
