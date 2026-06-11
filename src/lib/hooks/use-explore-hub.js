"use client";

import useSWR from "swr";

export function useExploreHub() {
  const { data: hero } = useSWR("/hero");
  const { data: stats } = useSWR("/stats");
  const { data: islands } = useSWR("/islands");
  const { data: provinces } = useSWR("/provinces");
  const { data: categories } = useSWR("/categories");
  const { data: featured } = useSWR("/featured");
  const { data: recommendations } = useSWR("/recommendations");
  const { data: featuredVillages } = useSWR("/featured-villages");

  const allLoaded =
    hero &&
    stats &&
    islands &&
    provinces &&
    categories &&
    featured &&
    recommendations &&
    featuredVillages;

  return {
    heroBgs: hero?.data || [],
    stats: stats?.data || null,
    islands: islands?.data || [],
    provinces: provinces?.data || [],
    categories: categories?.data || [],
    featured: featured?.data || [],
    untukmu: recommendations?.data || [],
    desaFeatured: featuredVillages?.data || [],
    isLoading: !allLoaded,
  };
}
