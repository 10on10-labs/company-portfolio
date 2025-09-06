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
      description,
      processSteps[] {
        number,
        title,
        description
      }
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

// Query to get projects related to a specific service
export const projectsByServiceQuery = defineQuery(`
  *[_type == "project" && language == $language && references(*[_type == "service" && id.current == $serviceSlug && language == $language]._id)] | order(priority asc, _createdAt desc) {
    _id,
    "slug": slug.current,
    name,
    category,
    description,
    logo,
    coverImages,
    projectSections,
    url,
    priority,
    "technologies": projectDimensions.technologies,
    "iterations": projectDimensions.iterations,
    "teamSize": projectDimensions.teamSize,
    "timeline": string(projectDimensions.timeline.value) + " " + coalesce(projectDimensions.timeline.unit, ""),
  }
`);

// Query for homepage services section
export const homepageServicesQuery = defineQuery(`
  *[_type == "service" && language == $language] | order(_createdAt asc) {
    _id,
    name,
    "slug": id.current,
    shortDescription,
    icon
  }
`);
