import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchToCart } from "@/services/req";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const mutationFn = ({ action, productId, accessToken }) =>
    fetchToCart({ action, productId, accessToken });

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.user_cart] });
  };
  return useMutation({ mutationFn, onSuccess });
};
