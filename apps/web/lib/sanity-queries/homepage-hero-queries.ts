import { defineQuery } from 'next-sanity';

export const homepageHeroQuery = defineQuery(`
  *[_type == "homepageHero" && language == $language][0] {
    _id,
    language,
    title,
    subtitle,
    description,
    ctaButtons[] {
      text,
      link,
      variant
    },
    expertiseSection {
      title,
      subtitle
    },
    trustedByText
  }
`);

export type HomepageHeroQueryResult = {
  _id: string;
  language: string;
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: Array<{
    text: string;
    link: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
  expertiseSection: {
    title: string;
    subtitle: string;
  };
  trustedByText: string;
} | null;
