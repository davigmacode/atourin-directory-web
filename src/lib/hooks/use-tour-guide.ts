"use client";

import useSWR from "swr";
import type { TourGuide } from "@/types/tour-guide";

export function useTourGuide(slug: string | undefined) {
  const { data, error, isLoading } = useSWR<TourGuide>(
    slug ? `/tour-guides/${slug}` : null,
    { revalidateOnFocus: false }
  );
  return { guide: data, isLoading, isError: !!error, error };
}
