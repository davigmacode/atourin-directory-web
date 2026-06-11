"use client";

import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";

const PER_PAGE = 12;

export function useAttractions() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    provinsi: "",
    kategori: "",
    tiket_masuk: "",
    fasilitas: "",
    rating: "",
    sort: "alpha",
  });
  const [allData, setAllData] = useState([]);

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PER_PAGE));
  Object.entries(filters).forEach(([k, v]) => {
    if (v) params.set(k, v);
  });

  const { data, error, isLoading, isValidating } = useSWR(
    `/attractions?${params}`,
  );

  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (data?.pagination?.page < data?.pagination?.totalPages)
      setPage((p) => p + 1);
  }, [data]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setAllData([]);
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
