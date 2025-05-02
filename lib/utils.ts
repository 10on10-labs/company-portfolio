import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAbbreviation = (str: string) => {
  return str
    .split(' ')
    .map(strPart => strPart[0])
    .join('');
};
