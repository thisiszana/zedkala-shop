"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

import { fetchRefreshToken } from "@/services/req";
import { QUERY_KEY } from "@/services/queryKey";
import Loader from "@/components/shared/Loader";

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

  if (!refreshToken && !accessToken) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader size={5} />
      </div>
    );
  }

  return <>{children}</>;
}
