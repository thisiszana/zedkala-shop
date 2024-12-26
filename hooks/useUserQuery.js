"use client";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchUserSession } from "@/services/req";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = (accessToken) => {
  const { data, error, isError, isPending, isLoading } = useQuery({
    queryKey: [QUERY_KEY.user_session],
    queryFn: () => fetchUserSession({ accessToken }),
    gcTime: 0,
    staleTime: 0,
    enabled: !!accessToken,
  });

  return {
    userData: data,
    error,
    isError,
    isPending,
    isLoading,
  };
};
