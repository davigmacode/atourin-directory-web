"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import useSWR from "swr";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TopNav, SiteFooter, Breadcrumb, CategoryTabs } from "@/components/layout";
import rgRaw from "@/styles/destination-styles";

const rg = rgRaw as Record<string, React.CSSProperties>;
import { DestinationCard, SkeletonCard, ErrorBanner, ChevDownSm } from "./_components/DestinationCard";
import DropdownFilter from "./_components/DropdownFilter";
import { useDestinations } from "@/lib/hooks/use-destinations";
import type { Destination } from "@/types/destination";
import type { Island } from "@/types/island";
import type { Province } from "@/types/province";

const SORT_OPTIONS = [
  { id: "alpha", label: "A\u2013Z" },
  { id: "alpha-desc", label: "Z\u2013A" },
  { id: "popular", label: "Terpopuler" },
  { id: "content", label: "Terbanyak konten" },
];

interface FiltersState {
  island: string;
  province: string;
  search: string;
  sort: string;
}

interface AvailState {
  attr: boolean;
  desa: boolean;
  guide: boolean;
}

function DestinationsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  /* ─── Fetch Islands and Provinces from API ─── */
  const { data: islandsRes } = useSWR<{ data: Island[] }>("/islands");
  const { data: provincesRes } = useSWR<{ data: Province[] }>("/provinces");

  const islandsList = islandsRes?.data || [];
  const provincesList = provincesRes?.data || [];

  /* ─── Read URL params for initial filters ─── */
  const initialIslands = searchParams.get("island")?.split(",").map(i => i.trim()).filter(Boolean) || [];
  const initialProvinces = searchParams.get("province")?.split(",").map(p => p.trim()).filter(Boolean) || [];
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "alpha";

  const [selectedIslands, setSelectedIslands] = useState<string[]>(initialIslands);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>(initialProvinces);
  const [avail, setAvail] = useState<AvailState>({
    attr: false,
    desa: false,
    guide: false,
  });

  const {
    data,
    pagination,
    isLoading,
    isValidating,
    isError,
    filters,
    setFilters,
    loadMore,
    hasMore,
  } = useDestinations({
    island: initialIslands.join(","),
    province: initialProvinces.join(","),
    search: initialSearch,
    sort: initialSort,
  }) as {
    data: Destination[];
    pagination?: { page: number; limit: number; total: number; totalPages: number };
    isLoading: boolean;
    isValidating: boolean;
    isError: boolean;
    filters: FiltersState;
    setFilters: (f: FiltersState) => void;
    loadMore: () => void;
    hasMore: boolean;
  };

  /* Helper to translate slugs to readable names */
  const getIslandName = (id: string) => {
    const match = islandsList.find(i => i.id === id);
    return match ? match.name : id;
  };

  const getProvinceName = (slug: string) => {
    const match = provincesList.find(p => p.slug === slug);
    return match ? match.name : slug;
  };

  /* Sync filters to URL query string and SWR hook filters */
  const syncFiltersToUrlAndHook = useCallback((
    islands: string[],
    provinces: string[],
    searchVal: string,
    sortVal: string
  ) => {
    const urlParams = new URLSearchParams(searchParams.toString());

    if (islands.length > 0) {
      urlParams.set("island", islands.join(","));
    } else {
      urlParams.delete("island");
    }

    if (provinces.length > 0) {
      urlParams.set("province", provinces.join(","));
    } else {
      urlParams.delete("province");
    }

    if (searchVal) {
      urlParams.set("search", searchVal);
    } else {
      urlParams.delete("search");
    }

    if (sortVal && sortVal !== "alpha") {
      urlParams.set("sort", sortVal);
    } else {
      urlParams.delete("sort");
    }

    router.replace(`${pathname}?${urlParams.toString()}`, { scroll: false });

    setFilters({
      island: islands.join(","),
      province: provinces.join(","),
      search: searchVal,
      sort: sortVal,
    });
  }, [searchParams, pathname, router, setFilters]);

  /* Sync search input changes */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    syncFiltersToUrlAndHook(selectedIslands, selectedProvinces, val, filters.sort);
  };

  /* Client-side post-filter for availability features */
  const filtered = (data || []).filter((d) => {
    if (avail.attr && d.attractionsCount <= 0) return false;
    if (avail.desa && d.villagesCount <= 0) return false;
    if (avail.guide && d.tourGuidesCount <= 0) return false;
    return true;
  });

  /* Active filter chips list */
  const activeFilters = [
    ...selectedIslands.map((id) => ({
      k: "island",
      v: getIslandName(id),
      remove: () => {
        const next = selectedIslands.filter((x) => x !== id);
        setSelectedIslands(next);
        syncFiltersToUrlAndHook(next, selectedProvinces, filters.search, filters.sort);
      },
    })),
    ...selectedProvinces.map((slug) => ({
      k: "province",
      v: getProvinceName(slug),
      remove: () => {
        const next = selectedProvinces.filter((x) => x !== slug);
        setSelectedProvinces(next);
        syncFiltersToUrlAndHook(selectedIslands, next, filters.search, filters.sort);
      },
    })),
    ...(avail.attr
      ? [
        {
          k: "avail",
          v: "Tersedia Atraksi",
          remove: () => setAvail((prev) => ({ ...prev, attr: false })),
        },
      ]
      : []),
    ...(avail.desa
      ? [
        {
          k: "avail",
          v: "Tersedia Desa Wisata",
          remove: () => setAvail((prev) => ({ ...prev, desa: false })),
        },
      ]
      : []),
    ...(avail.guide
      ? [
        {
          k: "avail",
          v: "Tersedia Pemandu",
          remove: () => setAvail((prev) => ({ ...prev, guide: false })),
        },
      ]
      : []),
  ];

  function resetAll() {
    setSelectedIslands([]);
    setSelectedProvinces([]);
    setAvail({ attr: false, desa: false, guide: false });
    syncFiltersToUrlAndHook([], [], "", "alpha");
  }

  const headingTitle =
    selectedProvinces.length === 1
      ? `Destinasi di ${getProvinceName(selectedProvinces[0])}`
      : selectedIslands.length === 1
        ? `Destinasi di ${getIslandName(selectedIslands[0])}`
        : "Semua Destinasi Wisata";

  /* ─── Loading state (initial fetch) ─── */
  if (isLoading && data.length === 0) {
    return (
      <div data-screen-label="Region Hub">
        <TopNav active="Destinasi" />
        <CategoryTabs active="Destinasi" />
        <section style={rg.header}>
          <div style={rg.headerInner}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Semua Destinasi"]} />
            <h1 style={rg.h1}>Semua Destinasi Wisata</h1>
            <p style={rg.subtitle}>&nbsp;</p>
          </div>
        </section>
        <section style={rg.gridSection}>
          <div style={rg.destGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* ─── Error state ─── */
  if (isError) {
    return (
      <div data-screen-label="Region Hub">
        <TopNav active="Destinasi" />
        <CategoryTabs active="Destinasi" />
        <section style={rg.header}>
          <div style={rg.headerInner}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Semua Destinasi"]} />
            <h1 style={rg.h1}>Semua Destinasi Wisata</h1>
          </div>
        </section>
        <ErrorBanner />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div data-screen-label="Region Hub">
      <TopNav active="Destinasi" />
      <CategoryTabs active="Destinasi" />

      {/* Header */}
      <section style={rg.header}>
        <div style={rg.headerInner}>
          <Breadcrumb
            items={[
              "Beranda",
              "Jelajahi",
              getProvinceName(selectedProvinces[0]) || getIslandName(selectedIslands[0]) || "Semua Destinasi",
            ]}
          />
          <h1 style={rg.h1}>{headingTitle}</h1>
          <p style={rg.subtitle}>
            {filtered.length} kota/kabupaten tersedia di Atourin
          </p>
          {selectedProvinces.length === 1 && (
            <div style={rg.provMiniHero}>
              <span style={rg.provHeroIcon}>{"\uD83D\uDCCD"}</span>
              <span>
                <strong>{getProvinceName(selectedProvinces[0])}</strong>, Provinsi dengan{" "}
                {filtered.reduce((a, b) => a + b.attractionsCount, 0)} atraksi dan{" "}
                {filtered.reduce((a, b) => a + b.villagesCount, 0)} desa wisata terdaftar
                di Atourin.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Sticky filter bar */}
      <div style={rg.filterStick}>
        <div style={rg.filterInner}>
          <div style={rg.filterSearchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={rg.filterSearch}
              placeholder="Cari kota atau kabupaten..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Island Filter */}
          <DropdownFilter
            label="Pulau"
            options={islandsList.map((i) => ({
              id: i.id,
              name: i.name,
            }))}
            selectedValues={selectedIslands}
            onChange={(vals) => {
              setSelectedIslands(vals);
              syncFiltersToUrlAndHook(vals, selectedProvinces, filters.search, filters.sort);
            }}
            multiple={true}
            minWidth={200}
          />

          {/* Province Filter */}
          <DropdownFilter
            label="Provinsi"
            options={provincesList.map((p) => ({
              id: p.slug,
              name: p.name,
              subtext: p.island?.name || "",
            }))}
            selectedValues={selectedProvinces}
            onChange={(vals) => {
              setSelectedProvinces(vals);
              syncFiltersToUrlAndHook(selectedIslands, vals, filters.search, filters.sort);
            }}
            multiple={true}
            showSearch={true}
            searchPlaceholder="Cari provinsi..."
          />

          {/* Avail checkboxes */}
          <div style={rg.availRow}>
            {[
              { k: "attr", l: "Atraksi" },
              { k: "desa", l: "Desa Wisata" },
              { k: "guide", l: "Pemandu" },
            ].map((a) => (
              <label key={a.k} style={rg.availLabel}>
                <input
                  type="checkbox"
                  checked={avail[a.k as keyof AvailState]}
                  onChange={(e) =>
                    setAvail((prev) => ({ ...prev, [a.k]: e.target.checked }))
                  }
                  style={rg.availInput}
                />
                <span
                  style={{
                    ...rg.availCheck,
                    ...(avail[a.k as keyof AvailState] ? rg.availCheckOn : {}),
                  }}
                >
                  {avail[a.k as keyof AvailState] && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
                {a.l}
              </label>
            ))}
          </div>

          {/* Sort */}
          <div style={{ marginLeft: "auto" }}>
            <DropdownFilter
              label="Urutkan"
              options={SORT_OPTIONS.map((s) => ({
                id: s.id,
                name: `Urutkan: ${s.label}`,
              }))}
              selectedValues={[filters.sort]}
              onChange={(vals) => {
                if (vals.length > 0) {
                  syncFiltersToUrlAndHook(selectedIslands, selectedProvinces, filters.search, vals[0]);
                }
              }}
              multiple={false}
              alignRight={true}
              minWidth={200}
            />
          </div>

          {activeFilters.length > 0 && (
            <button onClick={resetAll} style={rg.resetBtn}>
              Reset filter
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div style={rg.activeChipsRow}>
            <span style={rg.activeLabel}>Filter aktif:</span>
            {activeFilters.map((f, i) => (
              <span key={i} style={rg.activeChip}>
                {f.v}
                <button onClick={f.remove} style={rg.activeChipX}>
                  {"\u00D7"}
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Result count + grid */}
      <section style={rg.gridSection}>
        <div style={rg.resultRow}>
          <span style={rg.resultText}>
            {isLoading || isValidating ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", verticalAlign: "middle" }}>
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    border: "2.2px solid var(--atr-outline)",
                    borderTop: "2.2px solid var(--atr-purple)",
                    borderRadius: "50%",
                    animation: "atr-spin 0.8s linear infinite",
                    display: "inline-block",
                  }}
                />
                <span style={{ fontSize: "14px", color: "var(--atr-text-muted)" }}>Memuat destinasi...</span>
              </span>
            ) : (
              <>
                Menampilkan <strong>{filtered.length}</strong> dari{" "}
                <strong>{pagination?.total ?? filtered.length}</strong> destinasi
              </>
            )}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={rg.empty}>
            <div style={rg.emptyIcon}>{"\uD83D\uDD0D"}</div>
            <div style={rg.emptyTitle}>
              Tidak ada destinasi yang sesuai filter kamu
            </div>
            <div style={rg.emptySub}>
              Coba hapus beberapa filter atau cari dengan kata kunci lain
            </div>
            <button onClick={resetAll} style={rg.emptyBtn}>
              Lihat semua destinasi
            </button>
          </div>
        ) : (
          <>
            <div style={rg.destGrid}>
              {filtered.map((d, i) => (
                <DestinationCard key={i} d={d} />
              ))}
            </div>
            {hasMore && (() => {
              const remaining = pagination ? pagination.total - data.length : 0;
              const nextLoadCount = Math.min(12, remaining);
              return (
                <div style={rg.loadMoreWrap}>
                  <button onClick={loadMore} style={rg.loadMoreBtn}>
                    {isValidating ? "Memuat..." : `Muat ${nextLoadCount} destinasi lagi (${remaining} tersisa)`}
                  </button>
                </div>
              );
            })()}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense fallback={<div>Memuat halaman destinasi wisata...</div>}>
      <DestinationsPageInner />
    </Suspense>
  );
}
