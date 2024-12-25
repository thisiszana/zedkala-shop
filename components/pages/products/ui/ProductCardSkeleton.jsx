import Skeleton from "@/components/shared/Skeleton";

export default function ProductSkeleton({ count = 1, className, bgColor }) {
  const skeletons = Array.from({ length: count });

  return (
    <div
      className={`grid ${
        count > 1
          ? "w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 justify-items-center"
          : ""
      } ${className}`}
    >
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`max-w-xs w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 animate-pulse ${
            bgColor ? bgColor : "bg-gray-200"
          }`}
        >
          <div className="relative">
            <Skeleton className="w-full h-48 rounded-t-lg" />
            <Skeleton className="absolute top-2 right-2 text-xs px-2 py-1 rounded-md flex items-center gap-1" />
          </div>

          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
            <Skeleton className="h-3 w-2/3 rounded" />
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col space-y-2">
                <Skeleton className="h-5 w-1/3 rounded" />
                <Skeleton className="h-3 w-1/2 rounded" />
              </div>
              <Skeleton className="rounded-full w-10 h-10" />
            </div>
            <Skeleton className="mt-2 h-3 w-1/4 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
