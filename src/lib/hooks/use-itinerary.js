"use client";

import useSWR from "swr";

export function useItinerary(slug) {
  const { data, error, isLoading } = useSWR(
    slug ? `/itineraries/${slug}` : null,
    { revalidateOnFocus: false },
  );
  return { itinerary: data?.data, isLoading, isError: !!error };
}
