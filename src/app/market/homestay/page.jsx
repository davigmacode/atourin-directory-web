"use client";

import React, { useState, useMemo } from "react";
import {
  TopNav,
  SiteFooter,
  PesanSubNav,
  PromoBannerRow,
  GridToolbar,
  LocationModal,
  FilterModal,
  DateRangeModal,
  GuestModal,
  SkeletonCard,
  LoadingPill,
} from "@/components/layout";
import { pesanStyles } from "@/styles/pesan-styles";

/* ── Static Data ── */
import {
  HOMESTAY_DATA,
  HOMESTAY_IMG,
  HOMESTAY_FACILITIES,
  HOMESTAY_SUGGESTIONS,
} from "@/data/market";

/* ── Sub-components ── */
import HomestayHero from "./_components/HomestayHero";
import HomestayFilterRow from "./_components/HomestayFilterRow";
import HomestayCard from "./_components/HomestayCard";

const ID_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

function fmtDate(d) {
  if (!d) return ", ";
  return `${d.getDate()} ${ID_MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function diffNights(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

const HOMESTAY_PROMOS = [
  {
    eyebrow: "Akhir pekan",
    title: "Stay 2 malam, gratis 1 malam",
    sub: "Berlaku di 240+ homestay desa wisata pilihan.",
    cta: "Cek homestay",
    emoji: "🌙",
    bg: "#FFF1D6",
    fg: "#5C4400",
  },
  {
    eyebrow: "Untuk keluarga",
    title: "Homestay tradisional autentik",
    sub: "Tinggal bersama keluarga lokal, masak bareng tuan rumah.",
    cta: "Lihat pilihan",
    emoji: "🏡",
    bg: "#E9E4FF",
    fg: "#3A2F8C",
  },
  {
    eyebrow: "Hidden gem",
    title: "Desa wisata yang belum ramai",
    sub: "Suasana tenang, view sawah & gunung, langit penuh bintang.",
    cta: "Mulai jelajah",
    emoji: "✨",
    bg: "#D9F2DA",
    fg: "#1F5E2A",
  },
];

function usePesanState(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [showSuggest, setShowSuggest] = useState(false);
  const [activeLocations, setActiveLocations] = useState([]);
  const [openLoc, setOpenLoc] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState("Paling Populer");
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [openDate, setOpenDate] = useState(false);
  const [openGuests, setOpenGuests] = useState(false);

  const [filterValues, setFilterValues] = useState({
    categories: [],
    priceMin: 0,
    priceMax: 3000000,
    languages: [],
    minPeople: null,
    facilities: [],
  });

  const activeFilters = useMemo(() => {
    const list = [];
    if (filterValues.facilities.length) list.push(...filterValues.facilities);
    if (filterValues.priceMin > 0 || filterValues.priceMax < 3000000) {
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
      facilities: fv.facilities.filter((x) => x !== value),
      priceMin: value.startsWith("Rp ") ? 0 : fv.priceMin,
      priceMax: value.startsWith("Rp ") ? 3000000 : fv.priceMax,
    }));
  }

  function clearAllFilters() {
    setFilterValues({
      categories: [],
      priceMin: 0,
      priceMax: 3000000,
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
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    rooms,
    setRooms,
    guests,
    setGuests,
    openDate,
    setOpenDate,
    openGuests,
    setOpenGuests,
    filterValues,
    setFilterValues,
    activeFilters,
    filterCount,
    removeFilter,
    clearAllFilters,
  };
}

export default function PesanHomestayPage() {
  const state = usePesanState();

  const filtered = useMemo(() => {
    let d = [...HOMESTAY_DATA];
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
    if (state.filterValues.facilities.length) {
      d = d.filter((x) =>
        state.filterValues.facilities.some((f) =>
          x.facilities.some((fac) => fac.toLowerCase().includes(f.toLowerCase().split(" ")[0]))
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
      data-screen-label="Pesan Homestay"
      style={{ minHeight: "100vh", background: "#fff" }}
    >
      <TopNav active="Pesan" />
      <PesanSubNav active="Homestay" />
      <HomestayHero state={state} heroBg={HOMESTAY_IMG.heroBg} />
      <PromoBannerRow banners={HOMESTAY_PROMOS} />

      <section style={pesanStyles.gridSection}>
        <div style={pesanStyles.gridHeader}>
          <div>
            <h2 style={pesanStyles.gridTitle}>Pilihan Homestay Terbaik</h2>
            <p style={pesanStyles.gridSub}>
              {state.checkIn && state.checkOut ? (
                <>
                  Check-in:{" "}
                  <strong style={{ color: "var(--atr-text)" }}>
                    {fmtDate(state.checkIn)}
                  </strong>{" "}
                  · {diffNights(state.checkIn, state.checkOut)} malam · {state.rooms} kamar,{" "}
                  {state.guests} tamu
                </>
              ) : (
                <>Pilih tanggal check-in & check-out untuk lihat ketersediaan</>
              )}
            </p>
          </div>
        </div>

        <HomestayFilterRow state={state} />

        <div style={{ ...pesanStyles.grid, marginTop: 20 }}>
          {filtered.map((d, i) => (
            <HomestayCard
              key={i}
              d={d}
              onClick={() => alert(`Buka detail: ${d.name}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 42, marginBottom: 8 }}>🏠</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--atr-text)",
              }}
            >
              Tidak ada homestay yang cocok
            </div>
            <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 6 }}>
              Coba ubah tanggal, lokasi, atau filter
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
              <LoadingPill label="Memuat homestay…" />
              <span style={pesanStyles.pageInfo}>
                Menampilkan {filtered.length} dari 184
              </span>
            </div>
          </>
        )}
      </section>

      <LocationModal state={state} />
      <FilterModal
        state={state}
        facilities={HOMESTAY_FACILITIES}
        showLanguage={false}
        showMinPeople={false}
        showFacilities={true}
        priceMaxDefault={3000000}
      />
      <DateRangeModal state={state} />
      <GuestModal state={state} />
      <SiteFooter />
    </div>
  );
}
