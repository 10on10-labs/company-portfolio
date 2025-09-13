import { Card, CardContent, CardHeader } from '@/components/shadcn/card';
import { Skeleton } from '@/components/shadcn/skeleton';

export default function ServiceCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardContent>
        {/* Icon and Number Header */}
        <div className="flex items-start justify-between mb-6">
          <Skeleton className="w-14 h-14 rounded-xl" />
          <Skeleton className="w-12 h-8" />
        </div>

        <CardHeader className="p-0 mb-3">
          {/* Service Title */}
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>

        {/* Description */}
        <div className="space-y-2 mb-5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Bottom Line */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-1">
              <Skeleton className="w-1 h-1 rounded-full" />
              <Skeleton className="w-1 h-1 rounded-full" />
              <Skeleton className="w-1 h-1 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
