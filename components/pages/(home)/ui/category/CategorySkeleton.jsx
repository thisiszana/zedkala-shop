import Skeleton from "@/components/shared/Skeleton";

export default function CategorySkeleton() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        خرید بر اساس دسته‌بندی
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <Skeleton className="w-24 h-24 rounded-full" />
            <Skeleton className="mt-2 w-16 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
