"use client";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchProducts } from "@/services/req";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetProducts = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEY.products],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => fetchProducts({ pageParam }),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPage.currentPage) {
        return lastPageParam + 1;
      } else {
        return null;
      }
    },
  });

  const products = useMemo(() => {
    return (
      data?.pages
        ?.flatMap((page) => page.products)
        ?.reduce((acc, product) => {
          if (!acc.find((item) => item._id === product._id)) {
            acc.push(product);
          }
          return acc;
        }, []) || []
    );
  }, [data]);

  return {
    data: products,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  };
};
