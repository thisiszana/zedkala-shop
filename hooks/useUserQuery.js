"use client";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchUserCart, fetchUserSession } from "@/services/req";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (accessToken) => {
  const { data, error, isError, isPending, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_session],
    queryFn: () => fetchUserSession({ accessToken }),
    gcTime: 0,
    staleTime: 0,
    enabled: !!accessToken,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.user_session]);
    },
  });

  return {
    userData: data,
    error,
    isError,
    isPending,
    isLoading,
  };
};

export const useUserCart = (accessToken, productId) => {
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY.user_cart, productId],
    queryFn: () => fetchUserCart({ accessToken }),
    cacheTime: 0,
    staleTime: 0,
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
  });

  return { data, userLoading: isLoading, isFetching, isError, refetch };
};
