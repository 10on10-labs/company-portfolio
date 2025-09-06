import { Metadata } from 'next';
import { sanityClient } from '@company/sanity-shared/client';

import { pricingPageQuery } from '@/lib/sanity-queries/pricing-queries';

import PricingPageClient from './_components/pricing-page-client';

// Types for pricing data
interface PricingPageData {
  _id: string;
  title: string;
  language: string;
  heroSection: {
    badge: string;
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  valuePropsSection: {
    valueProps: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  pricingPlansSection: {
    title: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      isPopular: boolean;
      features: string[];
      buttonText: string;
    }>;
  };
  comparisonSection: {
    title: string;
    description: string;
    comparisons: Array<{
      feature: string;
      us: string;
      them: string;
    }>;
  };
  faqsSection: {
    title: string;
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
  ctaSection: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    disclaimer: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

type Props = {
  params: Promise<{ locale: string }>;
};

const fetchPricingData = async (locale: string): Promise<PricingPageData | null> => {
  const pricingData = await sanityClient.fetch<PricingPageData>(pricingPageQuery, {
    language: locale,
  });
  return pricingData;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pricingData = await fetchPricingData(locale);

  return {
    title: pricingData?.seo.metaTitle || 'Pricing',
    description: pricingData?.seo.metaDescription,
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  const pricingData = await fetchPricingData(locale);

  if (!pricingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pricing data not found</h1>
          <p className="text-gray-600">Please check your Sanity CMS configuration.</p>
        </div>
      </div>
    );
  }
  return <PricingPageClient pricingData={pricingData} locale={locale} />;
}
