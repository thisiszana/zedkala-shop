"use client";

import { useGetProducts } from "@/hooks/useGetProducts";
import ProductsCard from "./ui/ProductsCard";
import { useEffect, useRef } from "react";
import ProductSkeletons, { ProductSkeleton } from "./ui/ProductCardSkeleton";
import ProductsSort from "./ui/ProductsSort";

export default function ProductsPage() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useGetProducts();
console.log(data)
  const loadingTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (hasNextPage && entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    if (loadingTarget.current) {
      observer.observe(loadingTarget.current);
    }

    return () => {
      if (loadingTarget.current) {
        observer.unobserve(loadingTarget.current);
      }
    };
  }, [loadingTarget, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <ProductSkeletons count={9} />
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        مشکلی در بارگذاری داده‌ها پیش آمده است. لطفاً مجدداً تلاش کنید.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-6">
        <p>محصولی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div>
      <ProductsSort />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-self-center">
      {data.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
      {isFetchingNextPage && (
        <ProductSkeletons count={1} />
      )}
      <div ref={loadingTarget}></div>
    </div>
    </div>
  );
}
