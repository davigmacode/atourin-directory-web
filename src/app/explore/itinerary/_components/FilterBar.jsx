"use client";

import React, { useRef, useEffect } from "react";
import { dirStyles } from "@/styles/attraction-styles";

/* ── Custom Icons ── */
function FilterGlyph({ kind }) {
  const c = "var(--atr-purple)";
  if (kind === "pin")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
          stroke={c}
          strokeWidth="1.8"
        />
        <circle cx="12" cy="9.5" r="2.5" stroke={c} strokeWidth="1.8" />
      </svg>
    );
  if (kind === "clock")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" />
        <path
          d="M12 7v5l3 2"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "wallet")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="6"
          width="18"
          height="13"
          rx="2"
          stroke={c}
          strokeWidth="1.8"
        />
        <path
          d="M16 12.5h3"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "users")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="9" r="3" stroke={c} strokeWidth="1.8" />
        <circle cx="17" cy="10" r="2.4" stroke={c} strokeWidth="1.8" />
        <path
          d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "tag")
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12V4h8l10 10-8 8-10-10z"
          stroke={c}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="8" r="1.4" fill={c} />
      </svg>
    );
  return null;
}

function ChevDown({ rotated }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: "transform .2s",
        transform: rotated ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="var(--atr-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12l5 5L20 7"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect
        x="13"
        y="13"
        width="7"
        height="7"
        rx="1.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  onFilterChange,
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
    if (!state.activeChips.includes(value)) {
      state.setActiveChips([...state.activeChips, value]);
      const key = FILTER_KEY_MAP[label];
      if (key && onFilterChange) {
        onFilterChange(key, value);
      }
    }
    state.setOpenFilter(null);
  }
  function removeChip(c) {
    state.setActiveChips(state.activeChips.filter((x) => x !== c));
    for (const [label, opts] of Object.entries(FILTER_OPTIONS)) {
      if (opts.includes(c)) {
        const key = FILTER_KEY_MAP[label];
        if (key && onFilterChange) {
          onFilterChange(key, "");
        }
        break;
      }
    }
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = state.openFilter === f.label;
            return (
              <div key={f.label} style={{ position: "relative" }}>
                <button
                  onClick={() => toggleFilter(f.label)}
                  style={{
                    ...dirStyles.filterChip,
                    ...(open
                      ? {
                          border: "1px solid var(--atr-purple)",
                          background: "#F6F4FF",
                        }
                      : {}),
                  }}
                >
                  <FilterGlyph kind={f.icon} />
                  <span>{f.label}</span>
                  <ChevDown rotated={open} />
                </button>
                {open && (
                  <div style={dirStyles.dropdown}>
                    {(filterOptions[f.label] || []).map((opt) => {
                      const checked = state.activeChips.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => pickFilter(f.label, opt)}
                          style={dirStyles.dropdownItem}
                        >
                          <span
                            style={{
                              ...dirStyles.checkbox,
                              ...(checked ? dirStyles.checkboxOn : {}),
                            }}
                          >
                            {checked && <CheckIcon />}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={dirStyles.filterRight}>
          <div style={dirStyles.viewToggle}>
            <button
              onClick={() => state.setView("grid")}
              style={{
                ...dirStyles.viewBtn,
                ...(state.view === "grid" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <GridIcon /> Grid
            </button>
            <button
              onClick={() => state.setView("map")}
              style={{
                ...dirStyles.viewBtn,
                ...(state.view === "map" ? dirStyles.viewBtnActive : {}),
              }}
            >
              <MapIcon /> Peta
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                state.setOpenSort(!state.openSort);
                state.setOpenFilter(null);
              }}
              style={dirStyles.sortBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {state.sort}
              <ChevDown rotated={state.openSort} />
            </button>
            {state.openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                     key={s}
                     onClick={() => {
                       state.setSort(s);
                       state.setOpenSort(false);
                     }}
                     style={{
                       ...dirStyles.dropdownItem,
                       ...(s === state.sort
                         ? {
                             color: "var(--atr-purple)",
                             fontWeight: 600,
                           }
                         : {}),
                     }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === state.sort
                          ? {
                              border: "1.5px solid var(--atr-purple)",
                              boxShadow: "inset 0 0 0 3px var(--atr-purple)",
                              background: "#fff",
                            }
                          : {}),
                      }}
                    />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          <strong>
            {(
              totalResults -
              state.activeChips.length *
                Math.max(20, Math.floor(totalResults / 50))
            ).toLocaleString("id-ID")}
          </strong>{" "}
          {resultLabel} cocok untukmu
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
                if (onFilterChange) {
                  // Reset hook filters
                  Object.keys(FILTER_KEY_MAP).forEach((lbl) => {
                    onFilterChange(FILTER_KEY_MAP[lbl], "");
                  });
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
