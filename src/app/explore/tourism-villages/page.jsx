"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useVillages } from "@/lib/hooks/use-villages";

import VillagesHero from "./_components/VillagesHero";
import FilterBar from "./_components/FilterBar";
import VillagesGrid from "./_components/VillagesGrid";

const FILTER_KEY_MAP = {
  Provinsi: "province",
  "Kategori ADWI": "adwi",
  "Tema utama": "theme",
  Aktivitas: "activity",
  "Harga homestay": "price",
};

const SORT_KEY_MAP = {
  "Paling populer": "popular",
  "Rating tertinggi": "rating-desc",
  "Harga terendah": "price-asc",
  "Harga tertinggi": "price-desc",
};

const STATIC_SLUG_TO_LABEL = {
  // Harga homestay
  "<150rb": "< Rp150rb",
  "150rb-300rb": "Rp150rb \u2013 Rp300rb",
  "300rb-500rb": "Rp300rb \u2013 Rp500rb",
  ">500rb": "> Rp500rb",
};

const STATIC_LABEL_TO_SLUG = {
  "< Rp150rb": "<150rb",
  "Rp150rb \u2013 Rp300rb": "150rb-300rb",
  "Rp300rb \u2013 Rp500rb": "300rb-500rb",
  "> Rp500rb": ">500rb",
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function deslugify(slug) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Inner Page (needs Suspense for useSearchParams) ── */
function TourismVillagesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [view, setView] = useState("grid");
  const [activeChips, setActiveChips] = useState([]);
  const [sort, setSort] = useState("alpha");

  // Fetch dynamic categories, provinces, and activities from database
  const { data: provincesRes } = useSWR("/provinces");
  const { data: adwiRes } = useSWR("/categories?type=adwi_level");
  const { data: themeRes } = useSWR("/categories?type=village_theme");
  const { data: actRes } = useSWR("/categories?type=village_activity");

  const [provsMap, setProvsMap] = useState({ slugToLabel: {}, labelToSlug: {} });
  const [adwiMap, setAdwiMap] = useState({ slugToLabel: {}, labelToSlug: {} });
  const [themeMap, setThemeMap] = useState({ slugToLabel: {}, labelToSlug: {} });
  const [actMap, setActMap] = useState({ slugToLabel: {}, labelToSlug: {} });

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (provincesRes?.data) {
      provincesRes.data.forEach((p) => {
        slugToLabel[p.slug] = p.name;
        labelToSlug[p.name] = p.slug;
      });
    }
    setProvsMap({ slugToLabel, labelToSlug });
  }, [provincesRes]);

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (adwiRes?.data) {
      adwiRes.data.forEach((a) => {
        slugToLabel[a.slug] = a.name;
        labelToSlug[a.name] = a.slug;
      });
    }
    setAdwiMap({ slugToLabel, labelToSlug });
  }, [adwiRes]);

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (themeRes?.data) {
      themeRes.data.forEach((t) => {
        slugToLabel[t.slug] = t.name;
        labelToSlug[t.name] = t.slug;
      });
    }
    setThemeMap({ slugToLabel, labelToSlug });
  }, [themeRes]);

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (actRes?.data) {
      actRes.data.forEach((ac) => {
        slugToLabel[ac.slug] = ac.name;
        labelToSlug[ac.name] = ac.slug;
      });
    }
    setActMap({ slugToLabel, labelToSlug });
  }, [actRes]);

  const getSlugToLabel = useCallback((key, slug) => {
    if (key === "province") {
      return provsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "adwi") {
      return adwiMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "theme") {
      return themeMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "activity") {
      return actMap.slugToLabel[slug] || deslugify(slug);
    }
    return STATIC_SLUG_TO_LABEL[slug] || slug;
  }, [provsMap, adwiMap, themeMap, actMap]);

  const getLabelToSlug = useCallback((key, label) => {
    if (key === "province") {
      return provsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "adwi") {
      return adwiMap.labelToSlug[label] || slugify(label);
    }
    if (key === "theme") {
      return themeMap.labelToSlug[label] || slugify(label);
    }
    if (key === "activity") {
      return actMap.labelToSlug[label] || slugify(label);
    }
    return STATIC_LABEL_TO_SLUG[label] || label;
  }, [provsMap, adwiMap, themeMap, actMap]);

  // Sync initial active chips from URL on load
  useEffect(() => {
    const initial = [];
    const keys = ["province", "adwi", "theme", "activity", "price"];
    keys.forEach(k => {
      const val = searchParams.get(k);
      if (val) {
        val.split(",").map(v => v.trim().toLowerCase()).filter(Boolean).forEach(slug => {
          const label = getSlugToLabel(k, slug);
          if (label && !initial.includes(label)) {
            initial.push(label);
          }
        });
      }
    });
    setActiveChips(initial);
    const urlSort = searchParams.get("sort") || "alpha";
    setSort(urlSort);
  }, [searchParams, provsMap, adwiMap, themeMap, actMap, getSlugToLabel]);

  const {
    data,
    pagination,
    isLoading,
    isError,
    filters,
    setFilters,
    loadMore,
    hasMore,
  } = useVillages();

  // Push initial URL state filters to Hook on mount
  useEffect(() => {
    const initialFilters = {
      province: "",
      adwi: "",
      theme: "",
      activity: "",
      price: "",
      sort: searchParams.get("sort") || "alpha",
    };

    const dynamicFilterOptions = {
      "Provinsi": (provincesRes?.data || []).map((p) => p.name),
      "Kategori ADWI": (adwiRes?.data || []).map((a) => a.name),
      "Tema utama": (themeRes?.data || []).map((t) => t.name),
      "Aktivitas": (actRes?.data || []).map((ac) => ac.name),
      "Harga homestay": ["< Rp150rb", "Rp150rb \u2013 Rp300rb", "Rp300rb \u2013 Rp500rb", "> Rp500rb"],
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label] || [];
      const selectedLabels = activeChips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        initialFilters[key] = selectedSlugs.join(",");
      } else {
        initialFilters[key] = "";
      }
    });

    setFilters(initialFilters);
  }, [provincesRes, adwiRes, themeRes, actRes]);

  // Sync active chips state back to URL query parameters and hook filters
  const syncChipsToUrlAndHook = useCallback((chips) => {
    setActiveChips(chips);
    const urlParams = new URLSearchParams(searchParams.toString());
    const nextFilters = {
      province: "",
      adwi: "",
      theme: "",
      activity: "",
      price: "",
      sort: sort,
    };

    const dynamicFilterOptions = {
      "Provinsi": (provincesRes?.data || []).map((p) => p.name),
      "Kategori ADWI": (adwiRes?.data || []).map((a) => a.name),
      "Tema utama": (themeRes?.data || []).map((t) => t.name),
      "Aktivitas": (actRes?.data || []).map((ac) => ac.name),
      "Harga homestay": ["< Rp150rb", "Rp150rb \u2013 Rp300rb", "Rp300rb \u2013 Rp500rb", "> Rp500rb"],
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label] || [];
      const selectedLabels = chips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);

      if (selectedSlugs.length > 0) {
        const csvValue = selectedSlugs.join(",");
        urlParams.set(key, csvValue);
        nextFilters[key] = csvValue;
      } else {
        urlParams.delete(key);
        nextFilters[key] = "";
      }
    });

    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
    setFilters(nextFilters);
  }, [searchParams, pathname, router, setFilters, provincesRes, adwiRes, themeRes, actRes, getLabelToSlug, sort]);

  function handleSortChange(value) {
    setSort(value);
    const newFilters = {
      ...translateChipsToFilters(activeChips),
      sort: value,
    };
    setFilters(newFilters);
    
    const urlParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "alpha") {
      urlParams.set("sort", value);
    } else {
      urlParams.delete("sort");
    }
    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
  }

  function translateChipsToFilters(chips) {
    const nextFilters = {
      province: "",
      adwi: "",
      theme: "",
      activity: "",
      price: "",
    };
    const dynamicFilterOptions = {
      "Provinsi": (provincesRes?.data || []).map((p) => p.name),
      "Kategori ADWI": (adwiRes?.data || []).map((a) => a.name),
      "Tema utama": (themeRes?.data || []).map((t) => t.name),
      "Aktivitas": (actRes?.data || []).map((ac) => ac.name),
      "Harga homestay": ["< Rp150rb", "Rp150rb \u2013 Rp300rb", "Rp300rb \u2013 Rp500rb", "> Rp500rb"],
    };
    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label] || [];
      const selectedLabels = chips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        nextFilters[key] = selectedSlugs.join(",");
      }
    });
    return nextFilters;
  }

  const dynamicFilterOptions = {
    "Provinsi": (provincesRes?.data || []).map((p) => p.name),
    "Kategori ADWI": (adwiRes?.data || []).map((a) => a.name),
    "Tema utama": (themeRes?.data || []).map((t) => t.name),
    "Aktivitas": (actRes?.data || []).map((ac) => ac.name),
    "Harga homestay": ["< Rp150rb", "Rp150rb \u2013 Rp300rb", "Rp300rb \u2013 Rp500rb", "> Rp500rb"],
  };

  return (
    <div data-screen-label="Tourism Villages Directory">
      <TopNav active="Desa Wisata" />
      <VillagesHero />
      <CategoryTabs active="Desa Wisata" />
      <FilterBar
        filterOptions={dynamicFilterOptions}
        activeChips={activeChips}
        onActiveChipsChange={syncChipsToUrlAndHook}
        totalCount={pagination?.total}
        sort={sort}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={setView}
        isLoading={isLoading}
      />
      <VillagesGrid
        data={data}
        loadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        isError={isError}
        pagination={pagination}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}

export default function TourismVillagesPage() {
  return (
    <Suspense fallback={<div>Memuat halaman desa wisata...</div>}>
      <TourismVillagesPageInner />
    </Suspense>
  );
}
