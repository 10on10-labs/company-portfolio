import { defineQuery } from 'next-sanity';

export const contactUsQuery = defineQuery(`
  *[_type == "contactUs" && language == $language][0] {
    _id,
    language,
    hero {
      badge,
      title,
      subtitle,
      ctaButtons[] {
        text,
        link,
        variant
      },
      stats[] {
        icon,
        value,
        label
      }
    },
    contactSection {
      badge,
      title,
      subtitle,
      benefits[] {
        icon,
        text
      },
      tabSchedule,
      tabMessage,
      alternativeCtaSchedule,
      alternativeCtaMessage,
      alternativeCtaScheduleLink,
      alternativeCtaMessageLink
    },
    contactInfo {
      methods[] {
        icon,
        title,
        primary,
        secondary,
        action
      }
    },
    faq {
      sectionTitle,
      sectionSubtitle,
      questions[] {
        question,
        answer
      },
      ctaSection {
        title,
        description,
        buttonText,
        buttonLink
      }
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`);

export type ContactUsQueryResult = {
  _id: string;
  language: string;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaButtons: Array<{
      text: string;
      link: string;
      variant: 'primary' | 'secondary' | 'outline';
    }>;
    stats: Array<{
      icon: string;
      value: string;
      label: string;
    }>;
  };
  contactSection: {
    badge: string;
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      text: string;
    }>;
    tabSchedule: string;
    tabMessage: string;
    alternativeCtaSchedule: string;
    alternativeCtaMessage: string;
    alternativeCtaScheduleLink: string;
    alternativeCtaMessageLink: string;
  };
  contactInfo: {
    methods: Array<{
      icon: string;
      title: string;
      primary: string;
      secondary: string;
      action: string;
    }>;
  };
  faq: {
    sectionTitle: string;
    sectionSubtitle: string;
    questions: Array<{
      question: string;
      answer: string;
    }>;
    ctaSection: {
      title: string;
      description: string;
      buttonText: string;
      buttonLink: string;
    };
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
} | null;
