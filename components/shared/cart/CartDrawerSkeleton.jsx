import Skeleton from "../Skeleton";

export default function CartDrawerSkeleton() {
  return (
    <div>
      <Skeleton className="custom-drawer p-4">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center flex-col sm:flex-row gap-4 border border-gray-200 rounded-lg p-4 w-full"
            >
              <Skeleton className="w-16 h-16 rounded-lg" />
              <div className="flex-shrink overflow-hidden w-full">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex-1 text-right">
                <Skeleton className="h-4 w-1/3 mx-auto mb-2" />
                <Skeleton className="h-8 w-2/3 mx-auto" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-6 w-1/4" />
          </div>
          <Skeleton className="w-full h-10 rounded-lg" />
        </div>
      </Skeleton>
    </div>
  );
}
