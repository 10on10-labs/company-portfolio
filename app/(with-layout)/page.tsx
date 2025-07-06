import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { sanityFetch } from '@/sanity/lib/live';
import {
  allProjectsQuery,
  blogsQuery,
  brandsQuery,
  servicesQuery,
  testimonialsQuery,
} from '@/sanity/lib/queries';

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

const ReviewsSection = dynamic(() => import('./_components/reviews-section'), {
  loading: () => <Skeleton className="h-96 w-full" />,
});

export default async function HomePage() {
  // Fetch all data in parallel
  const [brandsResult, servicesResult, testimonialsResult, projectsResult, blogsResult] =
    await Promise.all([
      sanityFetch({ query: brandsQuery }),
      sanityFetch({ query: servicesQuery }),
      sanityFetch({ query: testimonialsQuery }),
      sanityFetch({ query: allProjectsQuery }),
      sanityFetch({ query: blogsQuery }),
    ]);

  const { data: brands } = brandsResult;
  const { data: services } = servicesResult;
  const { data: testimonials } = testimonialsResult;
  const { data: projects } = projectsResult;
  const { data: blogs } = blogsResult;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroClient brands={brands} />

      {/* Case Studies Section - Moved to top */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <CaseStudiesSection projects={projects} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ServicesSection services={services} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ProcessSection />
      </Suspense>

      {/* Insights Section - New */}
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <InsightsSection blogs={blogs} />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ReviewsSection testimonials={testimonials} />
      </Suspense>
    </div>
  );
}
