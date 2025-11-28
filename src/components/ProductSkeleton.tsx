import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductSkeleton = () => {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/4 mt-2" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </Card>
  );
};
