import Skeleton from "@/components/shared/Skeleton";

export default function ProductSkeleton({ count = 1, className, bgColor }) {
  const skeletons = Array.from({ length: count });

  return (
    <div
      className={`grid ${
        count > 5 ? "mt-[40px] sm:mt-[100px]" : "mt-0"
      } w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6 justify-self-center ${className}`}
    >
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`w-full bg-white shadow-lg overflow-hidden border-t sm:border-r border-gray-200 animate-pulse ${
            bgColor ? bgColor : "bg-gray-200"
          }`}
        >
          <div className="relative">
            <Skeleton className="w-full h-[150px] z-0" />
            <Skeleton className="absolute left-2 bottom-[0.1px] w-[100px] h-[32px] rounded-lg" />
            <Skeleton className="absolute top-2 left-2 w-[50px] h-[20px] rounded-md" />
            <div className="flex flex-col space-y-2 absolute left-3 top-[15px]">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[6px] h-[6px] rounded-full border-[0.5px] border-dark1"
                  />
                ))}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />

            <div className="flex items-center justify-between w-full">
              <Skeleton className="h-3 w-1/2 rounded" />
              <Skeleton className="h-[25px] w-[60px] rounded-md" />
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>

            <div className="flex items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-4 w-[80px] rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
