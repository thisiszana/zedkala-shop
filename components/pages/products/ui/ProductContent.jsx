"use client";

import { useGetProducts } from "@/hooks/useGetProducts";
import ProductsCard from "./ProductsCard";
import ProductSkeletons from "./ProductCardSkeleton";
import ProductsSort from "./ProductsSort";
import { useEffect, useRef, useState } from "react";
import useSetQuery from "@/hooks/useSetQuery";

export default function ProductContent() {
  const { searchParams, setSearchParams } = useSetQuery();
  const [sort, setSort] = useState(3);

  const {
    data,
    isLoading,
    totalProducts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useGetProducts(sort);

  const loadingTarget = useRef(null);
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSort(parseInt(sortParam, 10));
    }
  }, [searchParams]);

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

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSearchParams("sort", newSort);
  };

  if (isLoading) {
    return <ProductSkeletons count={15} />;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 mt-[100px]">
        مشکلی در بارگذاری داده‌ها پیش آمده است. لطفاً مجدداً تلاش کنید.
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="p-6 mt-[100px]">
        <p>محصولی برای نمایش وجود ندارد.</p>
      </div>
    );
  }
  return (
    <>
      <ProductsSort
        refetch={refetch}
        setSort={handleSortChange}
        totalProducts={totalProducts}
        sort={sort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6 justify-self-center">
        {data.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))}
        <div ref={loadingTarget}></div>
      </div>
      {isFetchingNextPage && <ProductSkeletons count={5} />}
    </>
  );
}
