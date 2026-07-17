"use client";

import useSWR from "swr";
import { useState, useCallback, useEffect } from "react";

const PER_PAGE = 12;

export function useVillages() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    province: "",
    adwi: "",
    theme: "",
    activity: "",
    price: "",
    sort: "alpha",
  });
  const [allData, setAllData] = useState([]);

  // Map client filter keys/values to standard API values
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(PER_PAGE));

  // Map sort value
  let apiSort = "alpha";
  if (filters.sort === "Paling populer") apiSort = "popular";
  else if (filters.sort === "Rating tertinggi") apiSort = "rating-desc";
  else if (filters.sort === "Harga terendah") apiSort = "price-asc";
  else if (filters.sort === "Harga tertinggi") apiSort = "price-desc";
  params.set("sort", apiSort);

  if (filters.province) {
    params.set("province", filters.province);
  }

  if (filters.adwi) {
    // Map Indonesian label to lowercase slug
    const adwiMap = {
      "Mandiri": "mandiri",
      "Maju": "maju",
      "Berkembang": "berkembang",
      "Rintisan": "rintisan",
      "Belum terklasifikasi": "belum-terklasifikasi"
    };
    params.set("adwi", adwiMap[filters.adwi] || filters.adwi);
  }

  if (filters.theme) {
    // Map theme label to clean search string matching our DB seeds
    const themeMap = {
      "Budaya & Adat": "budaya",
      "Alam & Ekowisata": "alam",
      "Kerajinan": "kerajinan",
      "Kuliner Lokal": "kuliner",
      "Edukasi": "edukasi",
      "Religi": "religi",
      "Pertanian": "pertanian",
      "Bahari": "bahari"
    };
    params.set("theme", themeMap[filters.theme] || filters.theme);
  }

  if (filters.activity) {
    // Map UI activity options to matching DB/category patterns
    const activityMap = {
      "Homestay": "homestay",
      "Workshop kerajinan": "workshop",
      "Trekking": "trekking",
      "Bersepeda": "bersepeda",
      "Tarian tradisional": "tarian",
      "Memasak bareng": "memasak",
      "Memancing": "memancing",
      "Bertani": "bertani"
    };
    params.set("activity", activityMap[filters.activity] || filters.activity);
  }

  if (filters.price) {
    params.set("price", filters.price);
  }

  const { data, error, isLoading, isValidating } = useSWR(
    `/tourism-villages?${params}`,
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

  const updateFilters = useCallback((newFilters) => {
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
