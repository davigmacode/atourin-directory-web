"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
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

export default function DestinationsPage() {
  /* ─── Fetch Islands and Provinces from API ─── */
  const { data: islandsRes } = useSWR<{ data: Island[] }>("/islands");
  const { data: provincesRes } = useSWR<{ data: Province[] }>("/provinces");

  const islandsList = islandsRes?.data || [];
  const provincesList = provincesRes?.data || [];

  /* ─── Read URL params for initial filter ─── */
  const getInitialFilters = (): FiltersState => {
    const f: FiltersState = { island: "", province: "", search: "", sort: "alpha" };
    if (typeof window === "undefined") return f;
    const sp = new URLSearchParams(window.location.search);
    const urlSearch = sp.get("search");
    const urlSort = sp.get("sort");
    if (urlSearch) f.search = urlSearch;
    if (urlSort) f.sort = urlSort;
    return f;
  };

  const initFilters = getInitialFilters();

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
  } = useDestinations(initFilters) as {
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

  /* Multi-select and availability filters — kept client-side
     since the hook/API supports single-string island/province only. */
  const [selectedIslands, setSelectedIslands] = useState<string[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [avail, setAvail] = useState<AvailState>({
    attr: false,
    desa: false,
    guide: false,
  });

  /* Sync selectedIslands/Provinces and hook filters from URL parameters once API data is loaded */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const urlIsland = sp.get("island");
    const urlProvince = sp.get("province");

    let updatedIsland = "";
    let updatedProvince = "";

    if (urlIsland && islandsList.length > 0) {
      const match = islandsList.find(
        (i) => i.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-") === urlIsland
      );
      if (match) {
        updatedIsland = match.name;
        setSelectedIslands([match.name]);
      }
    }

    if (urlProvince && provincesList.length > 0) {
      const match = provincesList.find((p) => p.slug === urlProvince);
      if (match) {
        updatedProvince = match.name;
        setSelectedProvinces([match.name]);
      }
    }

    if (updatedIsland || updatedProvince) {
      setFilters({
        ...filters,
        island: updatedIsland || filters.island,
        province: updatedProvince || filters.province,
      });
    }
  }, [islandsList, provincesList]);

  /* Sync search to the hook — drives server-side filtering */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };

  /* Client-side post-filter for values the hook doesn't support natively */
  const filtered = (data || []).filter((d) => {
    if (selectedIslands.length > 0) {
      const dIsland = d.province?.island?.name;
      if (!dIsland || !selectedIslands.includes(dIsland)) return false;
    }
    if (selectedProvinces.length > 0) {
      const dProv = d.province?.name;
      if (!dProv || !selectedProvinces.includes(dProv)) return false;
    }
    if (selectedCategories.length > 0) {
      if (!d.tags || !selectedCategories.some((c) => d.tags?.some((t) => t.slug === c || t.name === c))) {
        return false;
      }
    }
    if (avail.attr && d.attractionsCount <= 0) return false;
    if (avail.desa && d.villagesCount <= 0) return false;
    if (avail.guide && d.tourGuidesCount <= 0) return false;
    return true;
  });

  /* Active filter chips */
  const activeFilters = [
    ...selectedIslands.map((i) => ({
      k: "island",
      v: i,
      remove: () => setSelectedIslands((prev) => prev.filter((x) => x !== i)),
    })),
    ...selectedProvinces.map((p) => ({
      k: "province",
      v: p,
      remove: () => setSelectedProvinces((prev) => prev.filter((x) => x !== p)),
    })),
    ...selectedCategories.map((c) => ({
      k: "category",
      v: c,
      remove: () =>
        setSelectedCategories((prev) => prev.filter((x) => x !== c)),
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
    setFilters({ island: "", province: "", search: "", sort: "alpha" });
    setSelectedIslands([]);
    setSelectedProvinces([]);
    setSelectedCategories([]);
    setAvail({ attr: false, desa: false, guide: false });
  }

  const headingTitle =
    selectedProvinces.length === 1
      ? `Destinasi di ${selectedProvinces[0]}`
      : selectedIslands.length === 1
        ? `Destinasi di ${selectedIslands[0]}`
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
              selectedProvinces[0] || selectedIslands[0] || "Semua Destinasi",
            ]}
          />
          <h1 style={rg.h1}>{headingTitle}</h1>
          <p style={rg.subtitle}>
            {filtered.length} kota/kabupaten tersedia di Atourin
            {isValidating && " \u2022 Memuat\u2026"}
          </p>
          {selectedProvinces.length === 1 && (
            <div style={rg.provMiniHero}>
              <span style={rg.provHeroIcon}>{"\uD83D\uDCCD"}</span>
              <span>
                <strong>{selectedProvinces[0]}</strong>, Provinsi dengan{" "}
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
              id: i.name,
              name: i.name,
            }))}
            selectedValues={selectedIslands}
            onChange={setSelectedIslands}
            multiple={true}
            minWidth={200}
          />

          {/* Province Filter */}
          <DropdownFilter
            label="Provinsi"
            options={provincesList.map((p) => ({
              id: p.name,
              name: p.name,
              subtext: p.island?.name || "",
            }))}
            selectedValues={selectedProvinces}
            onChange={setSelectedProvinces}
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
                  setFilters({ ...filters, sort: vals[0] });
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
            Menampilkan <strong>{filtered.length}</strong> dari{" "}
            <strong>{pagination?.total ?? filtered.length}</strong> destinasi
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
            {hasMore && (
              <div style={rg.loadMoreWrap}>
                <button onClick={loadMore} style={rg.loadMoreBtn}>
                  Muat lebih banyak (
                  {isValidating
                    ? "\u2026"
                    : `${pagination ? pagination.total - data.length : 0} tersisa`}
                  )
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
