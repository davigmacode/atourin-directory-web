"use client";

import useSWR from "swr";
import type { Itinerary } from "@/types/itinerary";

export function useItinerary(slug: string | null | undefined) {
  const { data, error, isLoading, mutate } = useSWR<{ data: Itinerary }>(
    slug ? `/itineraries/${slug}` : null,
    { revalidateOnFocus: false },
  );

  return {
    itinerary: data?.data,
    isLoading,
    isError: !!error,
    error,
    mutate,
  };
}
