import { theme as sanityTheme } from '@sanity/demo/tailwind';

/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './intro-template/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  ...sanityTheme,
  // Overriding fontFamily to use @next/font loaded families
  fontFamily: {
    mono: 'var(--font-mono)',
    sans: 'var(--font-sans)',
    serif: 'var(--font-serif)',
  },
};
export const plugins = [require('@tailwindcss/typography')];
