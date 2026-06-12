"use client";

import useSWR from "swr";

export function useAttraction(slug) {
  const { data, error, isLoading } = useSWR(
    slug ? `/attractions/${slug}` : null,
    { revalidateOnFocus: false },
  );
  return { attraction: data?.data, isLoading, isError: !!error };
}
