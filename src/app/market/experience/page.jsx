"use client";

import React, { useState, useMemo } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { pesanStyles } from "@/styles/pesan-styles";

/* ── Static Data ── */
import {
  EXPERIENCE_DATA,
  EXP_CATEGORY_TILES,
  EXP_PROMOS,
  EXP_CATEGORIES,
  EXP_SUGGESTIONS,
  EXP_IMG,
} from "@/data/market";

/* ── Sub-components ── */
import PesanSubNav from "./_components/PesanSubNav";
import PesanHero from "./_components/PesanHero";
import CategoryRail from "./_components/CategoryRail";
import PromoBannerRow from "./_components/PromoBannerRow";
import GridToolbar from "./_components/GridToolbar";
import ProductCard from "./_components/ProductCard";
import SkeletonCard from "./_components/SkeletonCard";
import LoadingPill from "./_components/LoadingPill";
import LocationModal from "./_components/LocationModal";
import FilterModal from "./_components/FilterModal";

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
    priceMax: 5000000,
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
    if (filterValues.priceMin > 0 || filterValues.priceMax < 5000000) {
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
      priceMax: value.startsWith("Rp ") ? 5000000 : fv.priceMax,
    }));
  }

  function clearAllFilters() {
    setFilterValues({
      categories: [],
      priceMin: 0,
      priceMax: 5000000,
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

export default function PesanExperiencePage() {
  const state = usePesanState();

  const filtered = useMemo(() => {
    let d = [...EXPERIENCE_DATA];
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
          x.name.toLowerCase().includes(c.toLowerCase()) ||
          (x.tag && x.tag.toLowerCase() === c.toLowerCase())
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
      data-screen-label="Pesan Experience"
      style={{ minHeight: "100vh", background: "#fff" }}
    >
      <TopNav active="Pesan" />
      <PesanSubNav active="Experience" />
      <PesanHero
        title={
          <>
            Pesan pengalaman <br />
            <span style={{ color: "var(--atr-purple)" }}>tak terlupakan.</span>
          </>
        }
        subtitle="Open trip, one-day tour, workshop budaya, dan ratusan pengalaman lokal lain, dikurasi langsung dari pelaku wisata di seluruh Indonesia."
        state={state}
        badge="142 pengalaman tersedia"
        placeholder="Mau pengalaman apa? Cobain trekking, kuliner, atau workshop…"
        searchSuggestions={EXP_SUGGESTIONS}
        heroImages={[EXP_IMG.bromo, EXP_IMG.cycling, EXP_IMG.atv]}
        stats={[
          { icon: "💸", value: "Mulai Rp 65rb", label: "Harga termurah" },
          { icon: "🌏", value: "180+ kota", label: "Jangkauan" },
          { icon: "✅", value: "100% lokal", label: "Operator desa" },
        ]}
      />

      <CategoryRail items={EXP_CATEGORY_TILES} onPick={(c) => state.setQuery(c)} />
      <PromoBannerRow banners={EXP_PROMOS} />

      <section style={pesanStyles.gridSection}>
        <div style={pesanStyles.gridHeader}>
          <div>
            <h2 style={pesanStyles.gridTitle}>Semua experience</h2>
            <p style={pesanStyles.gridSub}>
              Telusuri 142 pengalaman lokal pilihan dari operator desa wisata di seluruh Indonesia.
            </p>
          </div>
        </div>

        <GridToolbar
          state={state}
          resultLabel="experience"
          totalResults={142}
          currentResults={filtered.length}
        />

        <div style={{ ...pesanStyles.grid, marginTop: 20 }}>
          {filtered.map((d, i) => (
            <ProductCard
              key={i}
              d={d}
              onClick={() => alert(`Buka detail: ${d.name}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🔍</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--atr-text)",
              }}
            >
              Tidak ada experience yang cocok
            </div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 6 }}>
              Coba ubah kata kunci atau hapus filter
            </div>
          </div>
        )}

        {filtered.length > 0 && (
          <>
            <div style={{ ...pesanStyles.grid, marginTop: 22 }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
            <div style={pesanStyles.paginationRow}>
              <LoadingPill label="Memuat produk…" />
              <span style={pesanStyles.pageInfo}>
                Menampilkan {filtered.length} dari 142
              </span>
            </div>
          </>
        )}
      </section>

      <LocationModal state={state} />
      <FilterModal state={state} categories={EXP_CATEGORIES} />
      <SiteFooter />
    </div>
  );
}
