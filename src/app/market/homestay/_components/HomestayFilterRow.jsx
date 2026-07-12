"use client";

import React, { useRef, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

const homestayStyles = {
  filterRow: {
    background: "#fff",
    borderBottom: "1px solid var(--atr-outline)",
    padding: "20px 32px",
    maxWidth: 1376,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
};

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
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function HomestayFilterRow({ state }) {
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

  const facilitiesActive = state.filterValues.facilities.length > 0;
  const priceActive = state.filterValues.priceMin > 0 || state.filterValues.priceMax < 5000000;

  return (
    <div style={homestayStyles.filterRow}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          style={{
            ...pesanStyles.toolbarPill,
            ...(facilitiesActive ? pesanStyles.pillBtnActive : {}),
          }}
          onClick={() => state.setOpenFilter(true)}
        >
          <span style={{ display: "inline-flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3l1.8 5.4H19l-4.5 3.3 1.7 5.4L12 14l-4.2 3.1 1.7-5.4L5 8.4h5.2L12 3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Fasilitas
          {facilitiesActive && <span style={pesanStyles.pillCount}>{state.filterValues.facilities.length}</span>}
          <ChevDown rotated={state.openFilter} />
        </button>
        <button
          style={{
            ...pesanStyles.toolbarPill,
            ...(priceActive ? pesanStyles.pillBtnActive : {}),
          }}
          onClick={() => state.setOpenFilter(true)}
        >
          <span style={{ display: "inline-flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
              <path d="M6 9.5v.5M18 14.5v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          Harga
          {priceActive && <span style={pesanStyles.pillCount}>1</span>}
          <ChevDown rotated={state.openFilter} />
        </button>
        <button
          style={{
            ...pesanStyles.toolbarPill,
            ...(state.activeLocations.length > 0 ? pesanStyles.pillBtnActive : {}),
          }}
          onClick={() => state.setOpenLoc(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Lokasi
          {state.activeLocations.length > 0 && (
            <span style={pesanStyles.pillCount}>{state.activeLocations.length}</span>
          )}
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M6 12h12M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Urutkan: <strong style={{ marginLeft: 4 }}>{state.sort}</strong>
          <ChevDown rotated={state.openSort} />
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
  );
}
