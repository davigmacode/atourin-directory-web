"use client";

import useSWR from "swr";
import type { Attraction } from "@/types/attraction";

export function useAttraction(slug?: string | string[]) {
  const actualSlug = Array.isArray(slug) ? slug[0] : slug;
  const { data, error, isLoading } = useSWR<{ data: Attraction }>(
    actualSlug ? `/attractions/${actualSlug}` : null,
    { revalidateOnFocus: false }
  );
  return { attraction: data?.data, isLoading, isError: !!error };
}
