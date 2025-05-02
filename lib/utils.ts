import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getNameAbbreviation = (name: string) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(namePart => namePart[0])
    .join('');
};
