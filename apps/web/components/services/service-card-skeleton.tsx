export default function ServiceCardSkeleton() {
  return (
    <div className="h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md animate-pulse">
      <div className="p-6">
        {/* Icon and Number Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-gray-200 rounded-xl" />
          <div className="w-12 h-8 bg-gray-100 rounded" />
        </div>

        {/* Service Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />

        {/* Description */}
        <div className="space-y-2 mb-5">
          <div className="h-4 bg-gray-100 rounded" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-6 w-20 bg-gray-100 rounded-full" />
          <div className="h-6 w-24 bg-gray-100 rounded-full" />
          <div className="h-6 w-16 bg-gray-100 rounded-full" />
        </div>

        {/* Bottom Line */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-4 w-16 bg-gray-100 rounded" />
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="w-1 h-1 bg-gray-200 rounded-full" />
              <div className="w-1 h-1 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
