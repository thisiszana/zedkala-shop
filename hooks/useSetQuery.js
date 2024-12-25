"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useSetQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const params = new URLSearchParams(searchParams);

  const setSearchParams = (queryName, value) => {
    if (value) {
      params.set(queryName, String(value));
    } else {
      params.delete(queryName);
    }

    push(`${pathname}?${params.toString()}`);
  };

  return {
    searchParams,
    setSearchParams,
    params,
  };
}
