"use client";

import React, { Suspense, useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useTourGuides, type TourGuidesFilters } from "@/lib/hooks/use-tour-guides";

import GuidesHero from "./_components/GuidesHero";
import FilterBar from "./_components/FilterBar";
import GuidesGrid from "./_components/GuidesGrid";

const FILTER_KEY_MAP: Record<string, keyof TourGuidesFilters> = {
  Wilayah: "province",
  Spesialisasi: "specialism",
  Bahasa: "language",
  Harga: "price",
  Sertifikasi: "certification",
};

const SORT_KEY_MAP: Record<string, string> = {
  "Paling populer": "popularity",
  "Rating tertinggi": "rating-desc",
  "Harga terendah": "price-asc",
  "Harga tertinggi": "price-desc",
  "Pengalaman terbanyak": "experience-desc",
};

const STATIC_SLUG_TO_LABEL: Record<string, string> = {
  // Harga
  "<500rb": "< Rp500rb/hari",
  "500rb-1jt": "Rp500rb \u2013 Rp1jt",
  "1jt-2jt": "Rp1jt \u2013 Rp2jt",
  ">2jt": "> Rp2jt/hari",
};

const STATIC_LABEL_TO_SLUG: Record<string, string> = {
  "< Rp500rb/hari": "<500rb",
  "Rp500rb \u2013 Rp1jt": "500rb-1jt",
  "Rp1jt \u2013 Rp2jt": "1jt-2jt",
  "> Rp2jt/hari": ">2jt",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function deslugify(slug: string) {
  return slug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Inner Page (needs Suspense for useSearchParams) ── */
function TourGuidesPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [view, setView] = useState("grid");
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [sort, setSort] = useState("popularity");

  // Fetch dynamic filters from database
  const { data: provincesRes } = useSWR("/provinces");
  const { data: specialismsRes } = useSWR("/categories?type=guide_specialism");
  const { data: languagesRes } = useSWR("/categories?type=language");
  const { data: certsRes } = useSWR("/certifications");

  const [provsMap, setProvsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });
  const [specsMap, setSpecsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });
  const [langsMap, setLangsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });
  const [certsMap, setCertsMap] = useState<{ slugToLabel: Record<string, string>; labelToSlug: Record<string, string> }>({ slugToLabel: {}, labelToSlug: {} });

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (provincesRes?.data) {
      provincesRes.data.forEach((p: any) => {
        slugToLabel[p.slug] = p.name;
        labelToSlug[p.name] = p.slug;
      });
    }
    setProvsMap({ slugToLabel, labelToSlug });
  }, [provincesRes]);

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (specialismsRes?.data) {
      specialismsRes.data.forEach((s: any) => {
        slugToLabel[s.slug] = s.name;
        labelToSlug[s.name] = s.slug;
      });
    }
    setSpecsMap({ slugToLabel, labelToSlug });
  }, [specialismsRes]);

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (languagesRes?.data) {
      languagesRes.data.forEach((l: any) => {
        slugToLabel[l.slug] = l.name;
        labelToSlug[l.name] = l.slug;
      });
    }
    setLangsMap({ slugToLabel, labelToSlug });
  }, [languagesRes]);

  useEffect(() => {
    const slugToLabel: Record<string, string> = {};
    const labelToSlug: Record<string, string> = {};
    if (certsRes?.data) {
      certsRes.data.forEach((c: any) => {
        slugToLabel[c.slug] = c.name;
        labelToSlug[c.name] = c.slug;
      });
    }
    setCertsMap({ slugToLabel, labelToSlug });
  }, [certsRes]);

  const getSlugToLabel = useCallback((key: keyof TourGuidesFilters, slug: string) => {
    if (key === "province") {
      return provsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "specialism") {
      return specsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "language") {
      return langsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "certification") {
      return certsMap.slugToLabel[slug] || slug.toUpperCase();
    }
    return STATIC_SLUG_TO_LABEL[slug] || slug;
  }, [provsMap, specsMap, langsMap, certsMap]);

  const getLabelToSlug = useCallback((key: keyof TourGuidesFilters, label: string) => {
    if (key === "province") {
      return provsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "specialism") {
      return specsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "language") {
      return langsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "certification") {
      return certsMap.labelToSlug[label] || slugify(label);
    }
    return STATIC_LABEL_TO_SLUG[label] || label;
  }, [provsMap, specsMap, langsMap, certsMap]);

  // Sync initial active chips from URL on load
  useEffect(() => {
    const initial: string[] = [];
    const keys: (keyof TourGuidesFilters)[] = ["province", "specialism", "language", "price", "certification"];
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
    const urlSort = searchParams.get("sort") || "popularity";
    setSort(urlSort);
  }, [searchParams, provsMap, specsMap, langsMap, certsMap, getSlugToLabel]);

  const {
    data: guides,
    pagination,
    isLoading,
    isError,
    error,
    setFilters,
    loadMore,
    hasMore,
  } = useTourGuides();

  // Push initial URL state filters to Hook on mount
  useEffect(() => {
    const initialFilters: TourGuidesFilters = {
      province: "",
      specialism: "",
      language: "",
      price: "",
      certification: "",
      sort: searchParams.get("sort") || "popularity",
    };

    const dynamicFilterOptions = {
      "Wilayah": (provincesRes?.data || []).map((p: any) => p.name),
      "Spesialisasi": (specialismsRes?.data || []).map((s: any) => s.name),
      "Bahasa": (languagesRes?.data || []).map((l: any) => l.name),
      "Harga": ["< Rp500rb/hari", "Rp500rb \u2013 Rp1jt", "Rp1jt \u2013 Rp2jt", "> Rp2jt/hari"],
      "Sertifikasi": (certsRes?.data || []).map((c: any) => c.name),
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label as keyof typeof dynamicFilterOptions] || [];
      const selectedLabels = activeChips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        initialFilters[key] = selectedSlugs.join(",");
      } else {
        initialFilters[key] = "";
      }
    });

    setFilters(initialFilters);
  }, [provincesRes, specialismsRes, languagesRes, certsRes]);

  // Sync active chips state back to URL query parameters and hook filters
  const syncChipsToUrlAndHook = useCallback((chips: string[]) => {
    setActiveChips(chips);
    const urlParams = new URLSearchParams(searchParams.toString());
    const nextFilters: TourGuidesFilters = {
      province: "",
      specialism: "",
      language: "",
      price: "",
      certification: "",
      sort: sort,
    };

    const dynamicFilterOptions = {
      "Wilayah": (provincesRes?.data || []).map((p: any) => p.name),
      "Spesialisasi": (specialismsRes?.data || []).map((s: any) => s.name),
      "Bahasa": (languagesRes?.data || []).map((l: any) => l.name),
      "Harga": ["< Rp500rb/hari", "Rp500rb \u2013 Rp1jt", "Rp1jt \u2013 Rp2jt", "> Rp2jt/hari"],
      "Sertifikasi": (certsRes?.data || []).map((c: any) => c.name),
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label as keyof typeof dynamicFilterOptions] || [];
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
  }, [searchParams, pathname, router, setFilters, provincesRes, specialismsRes, languagesRes, certsRes, getLabelToSlug, sort]);

  function handleSortChange(value: string) {
    setSort(value);
    const newFilters = {
      ...translateChipsToFilters(activeChips),
      sort: value,
    };
    setFilters(newFilters);
    
    const urlParams = new URLSearchParams(searchParams.toString());
    if (value && value !== "popularity") {
      urlParams.set("sort", value);
    } else {
      urlParams.delete("sort");
    }
    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });
  }

  function translateChipsToFilters(chips: string[]): TourGuidesFilters {
    const nextFilters: TourGuidesFilters = {
      province: "",
      specialism: "",
      language: "",
      price: "",
      certification: "",
    };
    const dynamicFilterOptions = {
      "Wilayah": (provincesRes?.data || []).map((p: any) => p.name),
      "Spesialisasi": (specialismsRes?.data || []).map((s: any) => s.name),
      "Bahasa": (languagesRes?.data || []).map((l: any) => l.name),
      "Harga": ["< Rp500rb/hari", "Rp500rb \u2013 Rp1jt", "Rp1jt \u2013 Rp2jt", "> Rp2jt/hari"],
      "Sertifikasi": (certsRes?.data || []).map((c: any) => c.name),
    };
    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label as keyof typeof dynamicFilterOptions] || [];
      const selectedLabels = chips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        nextFilters[key] = selectedSlugs.join(",");
      }
    });
    return nextFilters;
  }

  const dynamicFilterOptions = {
    "Wilayah": (provincesRes?.data || []).map((p: any) => p.name),
    "Spesialisasi": (specialismsRes?.data || []).map((s: any) => s.name),
    "Bahasa": (languagesRes?.data || []).map((l: any) => l.name),
    "Harga": ["< Rp500rb/hari", "Rp500rb \u2013 Rp1jt", "Rp1jt \u2013 Rp2jt", "> Rp2jt/hari"],
    "Sertifikasi": (certsRes?.data || []).map((c: any) => c.name),
  };

  return (
    <div data-screen-label="Tour Guides Directory">
      <TopNav active="Tour Guide" />
      <GuidesHero />
      <CategoryTabs active="Tour Guide" />
      <FilterBar
        filterOptions={dynamicFilterOptions}
        activeChips={activeChips}
        onActiveChipsChange={syncChipsToUrlAndHook}
        totalResults={pagination?.total || 0}
        sort={sort}
        onSortChange={handleSortChange}
        view={view}
        onViewChange={setView}
        isLoading={isLoading}
      />
      <GuidesGrid
        data={guides}
        loadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
        isError={isError}
        error={error}
        total={pagination?.total}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}

export default function TourGuidesPage() {
  return (
    <Suspense fallback={<div>Memuat halaman tour guide...</div>}>
      <TourGuidesPageInner />
    </Suspense>
  );
}
