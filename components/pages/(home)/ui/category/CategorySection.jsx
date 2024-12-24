import { images } from "@/constants";
import { fetchCategory } from "@/services/req";
import Image from "next/image";
import Link from "next/link";
import CategorySkeleton from "./CategorySkeleton";

export default async function CategorySection() {
  const { category } = await fetchCategory();
  if (!category) return <CategorySkeleton />;
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        خرید بر اساس دسته‌بندی
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {category &&
          category.map((category) => (
            <Link
              href={`/category/${category._id}`}
              key={category._id}
              className="flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <Image
                  src={category?.images?.[0] || images.imageNotFound}
                  width={100}
                  height={100}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm font-medium">{category.name}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
