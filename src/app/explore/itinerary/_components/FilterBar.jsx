"use client";

import { useRef, useEffect } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";

/* ── Custom Icons ── */


/* ── FilterBar data ── */
const FILTER_OPTIONS = {
  "Destinasi tujuan": [
    "Bali",
    "Yogyakarta",
    "Lombok",
    "Labuan Bajo",
    "Raja Ampat",
    "Bandung",
    "Bromo",
    "Danau Toba",
    "Garut",
    "Surabaya",
  ],
  Durasi: ["1 Hari", "2D1N", "3D2N", "4D3N", "5D4N", "6D+"],
  Budget: [
    "< Rp500rb",
    "< Rp1jt",
    "Rp1jt \u2013 Rp3jt",
    "Rp3jt \u2013 Rp6jt",
    "Rp6jt+",
  ],
  "Tipe perjalanan": [
    "Solo",
    "Couple",
    "Family",
    "Honeymoon",
    "Group",
    "Business",
  ],
  "Kategori wisata": [
    "Culture",
    "Adventure",
    "Food",
    "Nature",
    "Beach",
    "City Break",
    "Religi",
    "Sejarah",
  ],
};

const SORT_OPTIONS = [
  "Paling populer",
  "Terbaru",
  "Rating tertinggi",
  "Harga terendah",
  "Harga tertinggi",
  "Durasi terpendek",
];

const DEFAULT_FILTERS = [
  { label: "Destinasi tujuan", icon: "pin" },
  { label: "Durasi", icon: "clock" },
  { label: "Budget", icon: "wallet" },
  { label: "Tipe perjalanan", icon: "users" },
  { label: "Kategori wisata", icon: "tag" },
];

const FILTER_KEY_MAP = {
  "Destinasi tujuan": "destination",
  Durasi: "durasi",
  Budget: "budget",
  "Tipe perjalanan": "tipe_perjalanan",
  "Kategori wisata": "kategori",
};

export default function FilterBar({
  state,
  filters = DEFAULT_FILTERS,
  filterOptions = FILTER_OPTIONS,
  resultLabel = "itinerary",
  totalResults = 2412,
  isLoading = false,
  onFilterChange,
  onActiveChipsChange,
}) {
  const wrapRef = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        state.setOpenFilter(null);
        state.setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [state]);

  function toggleFilter(label) {
    state.setOpenFilter(state.openFilter === label ? null : label);
    state.setOpenSort(false);
  }
  function pickFilter(label, value) {
    let newChips;
    if (state.activeChips.includes(value)) {
      newChips = state.activeChips.filter((x) => x !== value);
    } else {
      newChips = [...state.activeChips, value];
    }
    state.setActiveChips(newChips);
    if (onActiveChipsChange) {
      onActiveChipsChange(newChips);
    }
  }
  function removeChip(c) {
    const newChips = state.activeChips.filter((x) => x !== c);
    state.setActiveChips(newChips);
    if (onActiveChipsChange) {
      onActiveChipsChange(newChips);
    }
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = state.openFilter === f.label;
            return (
              <FilterDropdown
                key={f.label}
                label={f.label}
                icon={f.icon}
                options={filterOptions[f.label] || []}
                activeValues={state.activeChips}
                isOpen={open}
                onToggle={() => toggleFilter(f.label)}
                onPick={(opt) => pickFilter(f.label, opt)}
              />
            );
          })}
        </div>
        <SortAndViewToggle
          view={state.view}
          onViewChange={(v) => state.setView(v)}
          sort={state.sort}
          sortOptions={SORT_OPTIONS}
          onSortChange={(s) => state.setSort(s)}
        />
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          {isLoading ? (
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
              <span style={{ fontSize: "14px", color: "var(--atr-text-muted)" }}>Memuat rute...</span>
            </span>
          ) : (
            <>
              <strong>
                {totalResults.toLocaleString("id-ID")}
              </strong>{" "}
              {resultLabel} cocok untukmu
            </>
          )}
        </span>
        <div style={dirStyles.activeChips}>
          {state.activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {state.activeChips.length > 0 && (
            <button
              onClick={() => {
                state.setActiveChips([]);
                if (onActiveChipsChange) {
                  onActiveChipsChange([]);
                }
              }}
              style={dirStyles.clearAll}
            >
              Hapus semua
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
