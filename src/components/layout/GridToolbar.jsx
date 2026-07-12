"use client";

import React, { useRef, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

/* ── SVG Icons ── */
function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function SortIconSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevDownSvg({ rotated }) {
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
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function PurplePin({ size = 14, color = "var(--atr-purple)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        fill={color}
      />
      <circle cx="12" cy="9.5" r="2.5" fill="#fff" />
    </svg>
  );
}

function PesanActiveChips({ state }) {
  const allChips = [
    ...state.activeLocations.map((l) => ({ kind: "loc", value: l })),
    ...(state.activeFilters || []).map((f) => ({ kind: "filter", value: f })),
  ];
  if (allChips.length === 0) return null;
  return (
    <div style={pesanStyles.chipsRow}>
      <span style={pesanStyles.chipsLabel}>Filter aktif:</span>
      {allChips.map((c, i) => (
        <span key={i} style={pesanStyles.activeChip}>
          {c.kind === "loc" && <PurplePin size={12} color="var(--atr-purple)" />}
          {c.value}
          <span
            style={{ cursor: "pointer", fontSize: 14, lineHeight: 1, opacity: 0.7 }}
            onClick={() => {
              if (c.kind === "loc") {
                state.setActiveLocations(state.activeLocations.filter((x) => x !== c.value));
              } else {
                state.removeFilter(c.value);
              }
            }}
          >
            ×
          </span>
        </span>
      ))}
      <button
        style={pesanStyles.clearAllBtn}
        onClick={() => {
          state.setActiveLocations([]);
          state.clearAllFilters();
        }}
      >
        Hapus semua
      </button>
    </div>
  );
}

export default function GridToolbar({ state, resultLabel = "produk", totalResults = 142, currentResults }) {
  const sortRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        state.setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [state]);

  return (
    <div style={pesanStyles.toolbar}>
      <div style={pesanStyles.toolbarInner}>
        <div style={pesanStyles.toolbarLeft}>
          <span style={pesanStyles.toolbarCount}>
            <strong style={{ color: "var(--atr-text)" }}>
              {currentResults != null ? currentResults : totalResults}
            </strong>{" "}
            dari {totalResults.toLocaleString("id-ID")} {resultLabel}
          </span>
          <div style={pesanStyles.toolbarDivider} />
          <button
            style={{
              ...pesanStyles.toolbarPill,
              ...(state.activeLocations.length > 0 ? pesanStyles.pillBtnActive : {}),
            }}
            onClick={() => state.setOpenLoc(true)}
          >
            <PinIcon /> Lokasi
            {state.activeLocations.length > 0 && (
              <span style={pesanStyles.pillCount}>{state.activeLocations.length}</span>
            )}
          </button>
          <button
            style={{
              ...pesanStyles.toolbarPill,
              ...(state.filterCount > 0 ? pesanStyles.pillBtnActive : {}),
            }}
            onClick={() => state.setOpenFilter(true)}
          >
            <FilterIcon /> Filter
            {state.filterCount > 0 && <span style={pesanStyles.pillCount}>{state.filterCount}</span>}
          </button>
        </div>
        <div ref={sortRef} style={{ position: "relative" }}>
          <button
            style={{
              ...pesanStyles.toolbarPill,
              ...(state.sort !== "Paling Populer" ? pesanStyles.pillBtnActive : {}),
            }}
            onClick={() => state.setOpenSort(!state.openSort)}
          >
            <SortIconSvg /> Urutkan: <strong style={{ marginLeft: 4 }}>{state.sort}</strong>
            <ChevDownSvg rotated={state.openSort} />
          </button>
          {state.openSort && (
            <div style={pesanStyles.dropdown}>
              {["Paling Populer", "Terbaru", "Harga Terendah", "Harga Tertinggi", "Rating Tertinggi"].map(
                (s) => {
                  const sel = state.sort === s;
                  return (
                    <button
                      key={s}
                      style={pesanStyles.dropdownItem}
                      onClick={() => {
                        state.setSort(s);
                        state.setOpenSort(false);
                      }}
                    >
                      <span style={{ ...pesanStyles.radio, ...(sel ? pesanStyles.radioOn : {}) }}>
                        {sel && <span style={pesanStyles.radioDot} />}
                      </span>
                      {s}
                    </button>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
      <PesanActiveChips state={state} />
    </div>
  );
}
