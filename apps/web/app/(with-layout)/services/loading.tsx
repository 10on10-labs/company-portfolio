import ServiceCardSkeleton from '@/components/services/service-card-skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative py-4 md:py-6 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block h-6 w-32 bg-gray-200 rounded-full mb-2 animate-pulse" />
            <div className="h-8 md:h-10 bg-gray-200 rounded w-64 mx-auto mb-2 animate-pulse" />
            <div className="h-4 bg-gray-100 rounded w-96 mx-auto mb-4 animate-pulse" />

            {/* Search Bar Skeleton */}
            <div className="max-w-2xl mx-auto mb-4">
              <div className="h-12 bg-gray-100 rounded-full animate-pulse" />
            </div>

            {/* Category Pills Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 w-24 bg-gray-100 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
