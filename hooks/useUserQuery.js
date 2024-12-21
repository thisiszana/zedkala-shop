import { QUERY_KEY } from "@/services/queryKey";
import { fetchUserSession } from "@/services/req";
import { getAccessToken } from "@/utils/clientFun";
import { useQuery } from "@tanstack/react-query";

export const useUserQuery = () => {
  const accessToken = getAccessToken();

  const { data, error, isError, isPending } = useQuery({
    queryKey: [QUERY_KEY.user_session],
    queryFn: () => fetchUserSession({ accessToken }),
    gcTime: 0,
    staleTime: 0,
  });

  return {
    data,
    error,
    isError,
    isPending,
  };
};
