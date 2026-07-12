"use client";

import React, { useState, useMemo } from "react";
import {
  TopNav,
  SiteFooter,
  PesanSubNav,
  PesanHero,
  CategoryRail,
  PromoBannerRow,
  GridToolbar,
  LocationModal,
  FilterModal,
  SkeletonCard,
  LoadingPill,
} from "@/components/layout";
import { pesanStyles } from "@/styles/pesan-styles";

/* ── Static Data ── */
import {
  ATTRACTION_DATA,
  ATTR_CATEGORY_TILES,
  ATTR_PROMOS,
  ATTR_CATEGORIES,
  ATTR_SUGGESTIONS,
  ATTR_IMG,
} from "@/data/market";

/* ── Sub-components ── */
import AttractionCard from "./_components/AttractionCard";

function usePesanState(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggest, setShowSuggest] = useState(false);
  const [activeLocations, setActiveLocations] = useState([]);
  const [openLoc, setOpenLoc] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState("Paling Populer");
  const [filterValues, setFilterValues] = useState({
    categories: [],
    priceMin: 0,
    priceMax: 500000,
    languages: [],
    minPeople: null,
    facilities: [],
  });

  const activeFilters = useMemo(() => {
    const list = [];
    if (filterValues.categories.length) list.push(...filterValues.categories);
    if (filterValues.languages.length) list.push(...filterValues.languages);
    if (filterValues.facilities.length) list.push(...filterValues.facilities);
    if (filterValues.minPeople) list.push(`Min ${filterValues.minPeople} orang`);
    if (filterValues.priceMin > 0 || filterValues.priceMax < 500000) {
      list.push(
        `Rp ${(filterValues.priceMin / 1000).toLocaleString("id-ID")}rb – Rp ${(
          filterValues.priceMax / 1000
        ).toLocaleString("id-ID")}rb`
      );
    }
    return list;
  }, [filterValues]);

  const filterCount = activeFilters.length;

  function removeFilter(value) {
    setFilterValues((fv) => ({
      ...fv,
      categories: fv.categories.filter((x) => x !== value),
      languages: fv.languages.filter((x) => x !== value),
      facilities: fv.facilities.filter((x) => x !== value),
      minPeople: value === `Min ${fv.minPeople} orang` ? null : fv.minPeople,
      priceMin: value.startsWith("Rp ") ? 0 : fv.priceMin,
      priceMax: value.startsWith("Rp ") ? 500000 : fv.priceMax,
    }));
  }

  function clearAllFilters() {
    setFilterValues({
      categories: [],
      priceMin: 0,
      priceMax: 500000,
      languages: [],
      minPeople: null,
      facilities: [],
    });
  }

  return {
    query,
    setQuery,
    showSuggest,
    setShowSuggest,
    activeLocations,
    setActiveLocations,
    openLoc,
    setOpenLoc,
    openFilter,
    setOpenFilter,
    openSort,
    setOpenSort,
    sort,
    setSort,
    filterValues,
    setFilterValues,
    activeFilters,
    filterCount,
    removeFilter,
    clearAllFilters,
  };
}

export default function PesanAttractionsPage() {
  const state = usePesanState();

  const filtered = useMemo(() => {
    let d = [...ATTRACTION_DATA];
    if (state.query) {
      d = d.filter(
        (x) =>
          x.name.toLowerCase().includes(state.query.toLowerCase()) ||
          x.region.toLowerCase().includes(state.query.toLowerCase())
      );
    }
    if (state.activeLocations.length) {
      d = d.filter((x) =>
        state.activeLocations.some((loc) =>
          x.region.toLowerCase().includes(loc.toLowerCase().split(" ")[0])
        )
      );
    }
    d = d.filter(
      (x) => x.price >= state.filterValues.priceMin && x.price <= state.filterValues.priceMax
    );
    if (state.filterValues.categories.length) {
      d = d.filter((x) =>
        state.filterValues.categories.some((c) =>
          x.category.toLowerCase().includes(c.toLowerCase()) ||
          x.name.toLowerCase().includes(c.toLowerCase())
        )
      );
    }
    if (state.sort === "Harga Terendah") d.sort((a, b) => a.price - b.price);
    if (state.sort === "Harga Tertinggi") d.sort((a, b) => b.price - a.price);
    if (state.sort === "Terbaru") d.reverse();
    return d;
  }, [
    state.query,
    state.activeLocations,
    state.filterValues,
    state.sort,
  ]);

  return (
    <div
      data-screen-label="Pesan Attraction"
      style={{ minHeight: "100vh", background: "#fff" }}
    >
      <TopNav active="Pesan" />
      <PesanSubNav active="Attraction" />
      <PesanHero
        title={
          <>
            Tiket masuk <br />
            <span style={{ color: "var(--atr-purple)" }}>tanpa antre.</span>
          </>
        }
        subtitle="Beli tiket masuk pantai, candi, museum, air terjun, dan tempat wisata lain dari Sabang sampai Merauke. Cukup tunjukkan QR di pintu masuk."
        state={state}
        badge="87 tempat wisata"
        placeholder="Cari atraksi: candi, pantai, air terjun…"
        searchSuggestions={ATTR_SUGGESTIONS}
        heroImages={[ATTR_IMG.waterfall, ATTR_IMG.breksi, ATTR_IMG.palalangon]}
        stats={[
          { icon: "🎫", value: "Mulai Rp 5rb", label: "Tiket termurah" },
          { icon: "⚡", value: "Skip antrean", label: "Scan langsung" },
          { icon: "📍", value: "220+ kota", label: "Lokasi tersebar" },
        ]}
      />

      <CategoryRail items={ATTR_CATEGORY_TILES} onPick={(c) => state.setQuery(c)} />
      <PromoBannerRow banners={ATTR_PROMOS} />

      <section style={pesanStyles.gridSection}>
        <div style={pesanStyles.gridHeader}>
          <div>
            <h2 style={pesanStyles.gridTitle}>Semua tiket wisata</h2>
            <p style={pesanStyles.gridSub}>
              Skip antrean, beli tiket masuk pantai, candi, museum, dan tempat wisata lain online.
            </p>
          </div>
        </div>

        <GridToolbar
          state={state}
          resultLabel="atraksi"
          totalResults={87}
          currentResults={filtered.length}
        />

        <div style={{ ...pesanStyles.gridAttr, marginTop: 20 }}>
          {filtered.map((d, i) => (
            <AttractionCard
              key={i}
              d={d}
              onClick={() => alert(`Beli tiket: ${d.name}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🎫</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--atr-text)",
              }}
            >
              Tidak ada atraksi yang cocok
            </div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 6 }}>
              Coba ubah kata kunci atau hapus filter
            </div>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            <div style={{ ...pesanStyles.gridAttr, marginTop: 22 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
            <div style={pesanStyles.paginationRow}>
              <LoadingPill label="Memuat produk…" />
              <span style={pesanStyles.pageInfo}>
                Menampilkan {filtered.length} dari 87
              </span>
            </div>
          </>
        )}
      </section>

      <LocationModal state={state} />
      <FilterModal
        state={state}
        categories={ATTR_CATEGORIES}
        showLanguage={false}
        showMinPeople={false}
        priceMaxDefault={50000}
      />
      <SiteFooter />
    </div>
  );
}
