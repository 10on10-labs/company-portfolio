import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/services/[slug]': '/services/[slug]',
    '/blogs': '/blogs',
    '/blogs/[slug]': '/blogs/[slug]',
    '/case-studies': '/case-studies',
    '/case-studies/[slug]': '/case-studies/[slug]',
    '/projects': '/projects',
    '/projects/[slug]': '/projects/[slug]',
    '/contact-us': '/contact-us',
    '/pricing': '/pricing',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/ui-ux-services': '/ui-ux-services',
  },
});
