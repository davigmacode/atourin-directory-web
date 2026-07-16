"use client";

import useSWR from "swr";

export function useVillage(slug) {
  const { data, error, isLoading } = useSWR(slug ? `/tourism-villages/${slug}` : null, {
    revalidateOnFocus: false,
  });
  return { village: data?.data, isLoading, isError: !!error };
}
