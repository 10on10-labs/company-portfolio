import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { sanityFetch } from '@/lib/live';
import {
  allProjectsQuery,
  blogsQuery,
  brandsQuery,
  homepageHeroQuery,
  testimonialsQuery,
} from '@/lib/sanity-queries';
import { accelerateQuery } from '@/lib/sanity-queries/accelerate-queries';
import { pricingPageQuery } from '@/lib/sanity-queries/pricing-queries';
import { processQuery } from '@/lib/sanity-queries/process-queries';
import { homepageServicesQuery } from '@/lib/sanity-queries/service-queries';
import { Skeleton } from '@/components/shadcn/skeleton';

import HeroClient from './hero-client';

// Dynamic imports for better performance
const CaseStudiesSection = dynamic(() => import('./_components/case-studies-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const ServicesSection = dynamic(() => import('./_components/services-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const ProcessSection = dynamic(() => import('./_components/process-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const InsightsSection = dynamic(() => import('./_components/insights-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const PricingSection = dynamic(() => import('./_components/pricing-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const ReviewsSection = dynamic(() => import('./_components/reviews-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

const AccelerateSection = dynamic(
  () =>
    import('./_components/accelerate-section').then(mod => ({ default: mod.AccelerateSection })),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
  },
);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // Fetch all data in parallel
  const [
    brandsResult,
    testimonialsResult,
    projectsResult,
    blogsResult,
    servicesResult,
    pricingResult,
    processResult,
    accelerateResult,
    heroResult,
  ] = await Promise.all([
    sanityFetch({ query: brandsQuery }),
    sanityFetch({ query: testimonialsQuery, params: { language: locale } }),
    sanityFetch({ query: allProjectsQuery, params: { language: locale } }),
    sanityFetch({ query: blogsQuery, params: { language: locale } }),
    sanityFetch({ query: homepageServicesQuery, params: { language: locale } }),
    sanityFetch({ query: pricingPageQuery, params: { language: locale } }),
    sanityFetch({ query: processQuery, params: { language: locale } }),
    sanityFetch({ query: accelerateQuery, params: { language: locale } }),
    sanityFetch({ query: homepageHeroQuery, params: { language: locale } }),
  ]);

  const { data: brands } = brandsResult;
  const { data: testimonials } = testimonialsResult;
  const { data: projects } = projectsResult;
  const { data: blogs } = blogsResult;
  const { data: services } = servicesResult;
  const { data: pricingData } = pricingResult;
  const { data: processData } = processResult;
  const { data: accelerateData } = accelerateResult;
  const { data: heroData } = heroResult;

  return (
    <div className="min-h-screen">
      <HeroClient brands={brands} services={services} heroData={heroData} />

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <CaseStudiesSection projects={projects} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ServicesSection services={services} locale={locale} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <PricingSection pricingData={pricingData} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ProcessSection processData={processData} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <InsightsSection blogs={blogs} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <AccelerateSection accelerateData={accelerateData} />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ReviewsSection testimonials={testimonials} />
      </Suspense>
    </div>
  );
}
