
import { Skeleton } from '@/components/ui/skeleton';

const CourseLoadingSkeleton = () => {
  return (
    <div className="container py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="w-full aspect-video rounded-lg mb-6" />
          <Skeleton className="h-10 w-3/4 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div>
          <Skeleton className="w-full h-96 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default CourseLoadingSkeleton;
