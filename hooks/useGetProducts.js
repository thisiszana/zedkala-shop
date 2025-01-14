"use client";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchProducts } from "@/services/req";
import { useInfiniteQuery } from "@tanstack/react-query";
export const useGetProducts = (sort) => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.products, sort],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam, sort }),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (
        lastPage?.currentPage &&
        lastPage?.totalPages > lastPage.currentPage
      ) {
        return lastPageParam + 1;
      } else {
        return null;
      }
    },
  });

  const products =
    data?.pages
      ?.flatMap((page) => page?.products)
      ?.filter(
        (product, index, self) =>
          self.findIndex((p) => p._id === product?._id) === index
      ) || [];

  const totalProducts = data?.pages?.[0]?.totalProducts || 0;

  return {
    data: products,
    totalProducts,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};
