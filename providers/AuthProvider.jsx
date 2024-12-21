"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "@/services/queryKey";
import { fetchRefreshToken } from "@/services/req";

export default function AuthProvider({ children, refreshToken, accessToken }) {
  const router = useRouter();

  const { data, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.auth_user],
    queryFn: () => fetchRefreshToken({ refreshToken }),
    retry: 1,
    staleTime: Infinity,
    enabled: !accessToken && !!refreshToken,
  });

  useEffect(() => {
    if (data?.success && data?.accessToken) {
      const expires = new Date(Date.now() + data.accessExpiresIn).toUTCString();
      //   در اینجا باید یک سری مقادیر به اکسس اضافه بشه!
      document.cookie = `accessToken=${data.accessToken}; expires=${expires}; path=/;`;
    }

    router.push("/");

    if (isError) {
      router.push("/login");
    }
  }, [data, isError, router]);

  if (isLoading) {
    return <div>در حال بررسی وضعیت...</div>;
  }

  return <div>{children}</div>;
}
