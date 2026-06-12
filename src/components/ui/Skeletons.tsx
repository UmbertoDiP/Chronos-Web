import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

/** Skeleton for CV list cards */
export function CVCardSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn('p-4 border rounded-lg space-y-3', className)}>
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

/** Skeleton for editor form sections */
export function EditorSectionSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-4 p-4', className)}>
      <Skeleton className="h-6 w-1/3" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}

/** Skeleton for CV preview */
export function CVPreviewSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-lg p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-start gap-4">
        <Skeleton className="h-20 w-20 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
      
      {/* Summary */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Experience section */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4" />
        <div className="border-l-2 border-muted pl-4 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Skills */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-1/4" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-6 w-16 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Skeleton for modal content */
export function ModalContentSkeleton({ className }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <Skeleton className="h-8 w-2/3" />
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <div className="flex gap-3 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

/** Generic list skeleton */
export function ListSkeleton({ 
  count = 3, 
  className 
}: { 
  count?: number; 
  className?: string;
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      ))}
    </div>
  );
}

/** Full page loading skeleton */
export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar skeleton */}
      <div className="h-16 border-b px-4 flex items-center justify-between">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-10 w-1/3" />
          <div className="grid gap-4 md:grid-cols-2">
            <CVCardSkeleton />
            <CVCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default {
  CVCardSkeleton,
  EditorSectionSkeleton,
  CVPreviewSkeleton,
  ModalContentSkeleton,
  ListSkeleton,
  PageSkeleton,
};
