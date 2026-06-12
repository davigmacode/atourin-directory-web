"use client";

import useSWR from "swr";

export function useDestination(slug) {
  const { data, error, isLoading } = useSWR(
    slug ? `/destinations/${slug}` : null,
    { revalidateOnFocus: false },
  );
  return { destination: data?.data, isLoading, isError: !!error };
}
