"use client";

import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";
import type { TourGuide } from "@/types/tour-guide";

const PER_PAGE = 12;

export interface TourGuidesFilters {
  province?: string;
  destination?: string;
  specialism?: string;
  language?: string;
  certification?: string;
  price?: string;
  verified?: string;
  sort?: string;
}

export function useTourGuides() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TourGuidesFilters>({
    province: "",
    destination: "",
    specialism: "",
    language: "",
    certification: "",
    price: "",
    verified: "",
    sort: "popularity",
  });
  const [allData, setAllData] = useState<TourGuide[]>([]);

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PER_PAGE));
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });

  const { data, error, isLoading, isValidating } = useSWR(
    `/tour-guides?${params.toString()}`
  );

  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    }
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (data?.pagination?.page < data?.pagination?.totalPages)
      setPage((p) => p + 1);
  }, [data]);

  const updateFilters = useCallback((newFilters: TourGuidesFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  return {
    data: allData,
    pagination: data?.pagination,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    filters,
    setFilters: updateFilters,
    loadMore,
    hasMore: data ? data.pagination.page < data.pagination.totalPages : false,
  };
}
