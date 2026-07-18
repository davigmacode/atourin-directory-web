"use client";

import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";
import type { Itinerary, ItineraryFilters } from "@/types/itinerary";

const PER_PAGE = 12;

const DEFAULT_FILTERS: ItineraryFilters = {
  destination: "",
  category:    "",
  theme:       "",
  duration:    "",
  budget:      "",
  difficulty:  "",
  author:      "",
  language:    "",
  month:       "",
  startDate:   "",
  sort:        "popular",
};

export function useItineraries() {
  const [page, setPage]       = useState(1);
  const [filters, setFiltersState] = useState<ItineraryFilters>(DEFAULT_FILTERS);
  const [allData, setAllData] = useState<Itinerary[]>([]);

  const params = new URLSearchParams();
  params.set("page",  String(page));
  params.set("limit", String(PER_PAGE));

  // Only include non-empty filter values
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });

  const { data, error, isLoading, isValidating } = useSWR<{
    data: Itinerary[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  }>(`/itineraries?${params}`);

  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (data?.pagination && data.pagination.page < data.pagination.totalPages) {
      setPage((p) => p + 1);
    }
  }, [data]);

  const updateFilters = useCallback((newFilters: Partial<ItineraryFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
    setAllData([]);
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPage(1);
    setAllData([]);
  }, []);

  return {
    data:         allData,
    pagination:   data?.pagination,
    isLoading,
    isValidating,
    isError:      !!error,
    error,
    filters,
    setFilters:   updateFilters,
    resetFilters,
    loadMore,
    hasMore:      data ? data.pagination.page < data.pagination.totalPages : false,
  };
}
