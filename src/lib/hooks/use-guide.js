"use client";

import useSWR from "swr";

export function useGuide(slug) {
  const { data, error, isLoading } = useSWR(slug ? `/guides/${slug}` : null, {
    revalidateOnFocus: false,
  });
  return { guide: data?.data, isLoading, isError: !!error };
}
