"use client";

import React, { useState, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TopNav, SiteFooter, CategoryTabs, CTABand } from "@/components/layout";
import { useItineraries } from "@/lib/hooks/use-itineraries";

import useSWR from "swr";
import ItineraryHero from "./_components/ItineraryHero";
import FilterBar from "./_components/FilterBar";
import FeaturedRail from "./_components/FeaturedRail";
import ItineraryGrid from "./_components/ItineraryGrid";

const FILTER_KEY_MAP = {
  "Destinasi tujuan": "destination",
  "Durasi": "durasi",
  "Budget": "budget",
  "Tipe perjalanan": "tipe_perjalanan",
  "Kategori wisata": "kategori",
};

const STATIC_SLUG_TO_LABEL = {
  "1-hari": "1 Hari",
  "1": "1 Hari",
  "2d1n": "2D1N",
  "3d2n": "3D2N",
  "4d3n": "4D3N",
  "5d4n": "5D4N",
  "6d": "6D+",
  "6d+": "6D+",
  "<500rb": "< Rp500rb",
  "<1jt": "< Rp1jt",
  "1-3jt": "Rp1jt – Rp3jt",
  "3-6jt": "Rp3jt – Rp6jt",
  ">6jt": "Rp6jt+",
  "6jt+": "Rp6jt+",
  "solo": "Solo",
  "couple": "Couple",
  "family": "Family",
  "honeymoon": "Honeymoon",
  "group": "Group",
  "business": "Business",
};

const STATIC_LABEL_TO_SLUG = {
  "1 Hari": "1",
  "2D1N": "2d1n",
  "3D2N": "3d2n",
  "4D3N": "4d3n",
  "5D4N": "5d4n",
  "6D+": "6d",
  "< Rp500rb": "<500rb",
  "< Rp1jt": "<1jt",
  "Rp1jt – Rp3jt": "1-3jt",
  "Rp3jt – Rp6jt": "3-6jt",
  "Rp6jt+": ">6jt",
  "Solo": "solo",
  "Couple": "couple",
  "Family": "family",
  "Honeymoon": "honeymoon",
  "Group": "group",
  "Business": "business",
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

/* ── useDirectoryState hook ── */
function useDirectoryState(defaultChips = []) {
  const [view, setView] = useState("grid");
  const [activeChips, setActiveChips] = useState(defaultChips);
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState("Paling populer");
  return {
    view,
    setView,
    activeChips,
    setActiveChips,
    openFilter,
    setOpenFilter,
    openSort,
    setOpenSort,
    sort,
    setSort,
  };
}

/* ── Inner Page Component ── */
function ItineraryPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Fetch dynamic categories, target audience, and destinations from database
  const { data: destsRes } = useSWR("/destinations?limit=100");
  const { data: catsRes } = useSWR("/categories?type=category");
  const { data: audsRes } = useSWR("/categories?type=target_audience");

  const [destsMap, setDestsMap] = useState({ slugToLabel: {}, labelToSlug: {} });
  const [catsMap, setCatsMap] = useState({ slugToLabel: {}, labelToSlug: {} });
  const [audsMap, setAudsMap] = useState({ slugToLabel: {}, labelToSlug: {} });

  // Update dynamic mapping when API data loads
  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (destsRes?.data) {
      destsRes.data.forEach(d => {
        slugToLabel[d.slug] = d.name;
        labelToSlug[d.name] = d.slug;
      });
    }
    setDestsMap({ slugToLabel, labelToSlug });
  }, [destsRes]);

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (catsRes?.data) {
      catsRes.data.forEach(c => {
        slugToLabel[c.slug] = c.name;
        labelToSlug[c.name] = c.slug;
      });
    }
    setCatsMap({ slugToLabel, labelToSlug });
  }, [catsRes]);

  useEffect(() => {
    const slugToLabel = {};
    const labelToSlug = {};
    if (audsRes?.data) {
      audsRes.data.forEach(a => {
        slugToLabel[a.slug] = a.name;
        labelToSlug[a.name] = a.slug;
      });
    }
    setAudsMap({ slugToLabel, labelToSlug });
  }, [audsRes]);

  const getSlugToLabel = useCallback((key, slug) => {
    if (key === "destination") {
      return destsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "kategori") {
      return catsMap.slugToLabel[slug] || deslugify(slug);
    }
    if (key === "tipe_perjalanan") {
      return audsMap.slugToLabel[slug] || deslugify(slug);
    }
    return STATIC_SLUG_TO_LABEL[slug] || slug;
  }, [destsMap, catsMap, audsMap]);

  const getLabelToSlug = useCallback((key, label) => {
    if (key === "destination") {
      return destsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "kategori") {
      return catsMap.labelToSlug[label] || slugify(label);
    }
    if (key === "tipe_perjalanan") {
      return audsMap.labelToSlug[label] || slugify(label);
    }
    return STATIC_LABEL_TO_SLUG[label] || label;
  }, [destsMap, catsMap, audsMap]);

  // Parse initial active chips from searchParams (mapping slugs to UI labels)
  const getInitialChips = () => {
    const initial = [];
    const keys = ["destination", "durasi", "budget", "tipe_perjalanan", "kategori"];
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
    return initial;
  };

  const state = useDirectoryState(getInitialChips());
  const {
    data: itineraries,
    pagination,
    isLoading,
    isError,
    setFilters: setHookFilters,
    loadMore,
    hasMore,
  } = useItineraries();

  // Re-sync activeChips when dynamic maps load to resolve any fallback spellings
  useEffect(() => {
    const keys = ["destination", "durasi", "budget", "tipe_perjalanan", "kategori"];
    const correctedChips = [];
    keys.forEach(k => {
      const val = searchParams.get(k);
      if (val) {
        val.split(",").map(v => v.trim().toLowerCase()).filter(Boolean).forEach(slug => {
          const label = getSlugToLabel(k, slug);
          if (label && !correctedChips.includes(label)) {
            correctedChips.push(label);
          }
        });
      }
    });
    if (correctedChips.length > 0) {
      state.setActiveChips(correctedChips);
    }
  }, [destsMap, catsMap, audsMap]);

  // Sync active chips state back to URL query parameters and hook filters (mapping labels to slugs)
  const syncChipsToUrlAndHook = useCallback((chips) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    const nextFilters = {};

    const dynamicFilterOptions = {
      "Destinasi tujuan": (destsRes?.data || []).map(d => d.name),
      "Durasi": ["1 Hari", "2D1N", "3D2N", "4D3N", "5D4N", "6D+"],
      "Budget": ["< Rp500rb", "< Rp1jt", "Rp1jt – Rp3jt", "Rp3jt – Rp6jt", "Rp6jt+"],
      "Tipe perjalanan": (audsRes?.data || []).map(a => a.name),
      "Kategori wisata": (catsRes?.data || []).map(c => c.name),
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
    setHookFilters(nextFilters);
  }, [searchParams, pathname, router, setHookFilters, destsRes, catsRes, audsRes, getLabelToSlug]);

  // Push initial URL state filters to Hook on mount
  useEffect(() => {
    const initialFilters = {};
    const dynamicFilterOptions = {
      "Destinasi tujuan": (destsRes?.data || []).map(d => d.name),
      "Durasi": ["1 Hari", "2D1N", "3D2N", "4D3N", "5D4N", "6D+"],
      "Budget": ["< Rp500rb", "< Rp1jt", "Rp1jt – Rp3jt", "Rp3jt – Rp6jt", "Rp6jt+"],
      "Tipe perjalanan": (audsRes?.data || []).map(a => a.name),
      "Kategori wisata": (catsRes?.data || []).map(c => c.name),
    };

    Object.entries(FILTER_KEY_MAP).forEach(([label, key]) => {
      const options = dynamicFilterOptions[label] || [];
      const selectedLabels = state.activeChips.filter(c => options.includes(c));
      const selectedSlugs = selectedLabels.map(lbl => getLabelToSlug(key, lbl)).filter(Boolean);
      if (selectedSlugs.length > 0) {
        initialFilters[key] = selectedSlugs.join(",");
      } else {
        initialFilters[key] = "";
      }
    });
    setHookFilters(initialFilters);
  }, [destsRes, catsRes, audsRes]);

  const dynamicFilterOptions = {
    "Destinasi tujuan": (destsRes?.data || []).map(d => d.name),
    "Durasi": ["1 Hari", "2D1N", "3D2N", "4D3N", "5D4N", "6D+"],
    "Budget": ["< Rp500rb", "< Rp1jt", "Rp1jt – Rp3jt", "Rp3jt – Rp6jt", "Rp6jt+"],
    "Tipe perjalanan": (audsRes?.data || []).map(a => a.name),
    "Kategori wisata": (catsRes?.data || []).map(c => c.name),
  };

  return (
    <div data-screen-label="Itinerary Directory">
      <TopNav active="Itinerary" />
      <ItineraryHero />
      <CategoryTabs active="Itinerary" />
      <FilterBar
        state={state}
        filterOptions={dynamicFilterOptions}
        onActiveChipsChange={syncChipsToUrlAndHook}
        totalResults={pagination?.total || 0}
        isLoading={isLoading}
      />
      {state.view === "grid" && <FeaturedRail />}
      <ItineraryGrid
        data={itineraries}
        isLoading={isLoading}
        isError={isError}
        loadMore={loadMore}
        hasMore={hasMore}
        totalCount={pagination?.total}
      />
      <CTABand />
      <SiteFooter />
    </div>
  );
}

/* ── Page ── */
export default function ItineraryPage() {
  return (
    <Suspense fallback={<div>Memuat halaman rute perjalanan...</div>}>
      <ItineraryPageInner />
    </Suspense>
  );
}
