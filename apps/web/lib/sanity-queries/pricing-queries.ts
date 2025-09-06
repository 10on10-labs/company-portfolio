import { defineQuery } from 'next-sanity';

// Query to get pricing page data with all sections
export const pricingPageQuery = defineQuery(`
  *[_type == "pricing" && language == $language][0] {
    _id,
    title,
    language,
    
    heroSection {
      badge,
      title,
      description,
      primaryButtonText,
      secondaryButtonText
    },
    
    valuePropsSection {
      valueProps[] {
        icon,
        title,
        description
      }
    },
    
    pricingPlansSection {
      title,
      description,
      plans[] {
        name,
        price,
        period,
        description,
        isPopular,
        features[],
        buttonText
      }
    },
    
    comparisonSection {
      title,
      description,
      comparisons[] {
        feature,
        us,
        them
      }
    },
    
    faqsSection {
      title,
      faqs[] {
        question,
        answer
      }
    },
    
    ctaSection {
      title,
      description,
      primaryButtonText,
      secondaryButtonText,
      disclaimer
    },
    
    seo {
      metaTitle,
      metaDescription
    }
  }
`);
