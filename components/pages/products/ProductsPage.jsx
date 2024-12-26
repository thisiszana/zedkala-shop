"use client";

import { Suspense, useEffect, useRef, useState } from "react";

import { useGetProducts } from "@/hooks/useGetProducts";
import ProductSkeletons from "./ui/ProductCardSkeleton";
import useSetQuery from "@/hooks/useSetQuery";
import ProductsCard from "./ui/ProductsCard";
import ProductsSort from "./ui/ProductsSort";

export default function ProductsPage() {
  const { searchParams, setSearchParams } = useSetQuery();
  const [sort, setSort] = useState(3);

  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSort(parseInt(sortParam, 10));
    }
  }, [searchParams]);

  return (
    <Suspense key={sort} fallback={<ProductSkeletons count={9} />}>
      <ProductsContent
        sort={sort}
        setSearchParams={setSearchParams}
        setSort={setSort}
      />
    </Suspense>
  );
}

function ProductsContent({ sort, setSearchParams, setSort }) {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    error,
  } = useGetProducts(sort);

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

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setSearchParams("sort", newSort);
  };

  if (isLoading) {
    return <ProductSkeletons count={9} />;
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
      <ProductsSort
        refetch={refetch}
        setSort={handleSortChange}
        totalProducts={data.length}
        sort={sort}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-self-center">
        {data.map((product) => (
          <ProductsCard key={product._id} product={product} />
        ))}
        {isFetchingNextPage && <ProductSkeletons count={1} />}
        <div ref={loadingTarget}></div>
      </div>
    </div>
  );
}
