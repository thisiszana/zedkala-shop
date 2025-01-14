"use client";

import FavoriteProductCard from "./ui/favorite-lists/FavoriteProductCard";
import { useUserQuery } from "@/hooks/useUserQuery";
import Loader from "@/components/shared/Loader";

export default function FavoriteList() {
  const { userData, isPending } = useUserQuery();
  const favoriteProducts = userData?.user?.favoriteProducts || [];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader size={4} />
      </div>
    );
  }

  return (
    <div className="container mx-auto border p-4 rounded-lg">
      <h1 className="text-[16px] font-semibold text-start mb-5 border-b-2 w-fit border-mainRed pb-2">
        محصولات مورد علاقه
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 justify-self-center">
        {favoriteProducts.map((product) => (
          <FavoriteProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
