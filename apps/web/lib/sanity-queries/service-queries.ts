import { defineQuery } from 'next-sanity';

export const serviceQuery = defineQuery(`
  *[_type == "service" && id.current == $slug && language == $language][0] {
    _id,
    name,
    "slug": id.current,
    shortDescription,
    description,
    categories,
    icon,
    heroSection {
      tagline,
      headline,
      subheadline,
      primaryButtonText,
      secondaryButtonText
    },
    featuresSection {
      title,
      description
    },
    technologiesSection {
      title,
      description
    },
    processSection {
      title,
      description
    },
    features[] {
      title,
      description,
      icon
    },
    technologies[] {
      name,
      icon
    },
    processSteps[] {
      number,
      title,
      description
    },
    benefits,
    whyChooseUs {
      headline,
      description,
      reasons[] {
        title,
        description,
        icon
      }
    },
    ctaSection {
      headline,
      description,
      primaryButtonText,
      secondaryButtonText
    },
    seo {
      metaTitle,
      metaDescription
    }
  }
`);

// Query for all unique service slugs (for generateStaticParams)
export const servicesSlugQuery = defineQuery(`
  *[_type == "service"] {
    "slug": id.current
  } | order(slug)
`);
