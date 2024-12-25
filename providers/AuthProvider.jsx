"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/services/queryKey";
import { fetchRefreshToken } from "@/services/req";
import { useUserQuery } from "@/hooks/useUserQuery";

export default function AuthProvider({ children, refreshToken, accessToken }) {
  const router = useRouter();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.auth_user],
    queryFn: () => fetchRefreshToken({ refreshToken }),
    retry: 1,
    staleTime: Infinity,
    enabled: !!refreshToken && !accessToken,
  });

  useEffect(() => {
    if (!refreshToken && !accessToken) {
      router.push("/login");
      return;
    }

    if (data?.success && data?.accessToken) {
      const expires = new Date(Date.now() + data.accessExpiresIn).toUTCString();
      document.cookie = `accessToken=${data.accessToken}; expires=${expires}; path=/;`;
      router.push("/");
    }

    if (isError) {
      router.push("/login");
    }
  }, [data, isError, refreshToken, accessToken, router]);

  // console.log("access in auth provider", accessToken);
  
  const user = useUserQuery(accessToken);

  if (isLoading) {
    return <div>در حال بررسی وضعیت...</div>;
  }

  return <>{children}</>;
}
