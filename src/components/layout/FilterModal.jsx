"use client";

import React, { useState, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

const PRICE_PRESETS = [
  { label: "< Rp 500rb", min: 0, max: 500000 },
  { label: "Rp 500rb – Rp 1jt", min: 500000, max: 1000000 },
  { label: "Rp 1jt – Rp 1,5jt", min: 1000000, max: 1500000 },
  { label: "Rp 1,5jt – Rp 2jt", min: 1500000, max: 2000000 },
  { label: "> Rp 2jt", min: 2000000, max: 5000000 },
];

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckSm({ color = "var(--atr-purple)" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PriceRangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const pct = (v) => ((v - min) / (max - min)) * 100;
  return (
    <div style={pesanStyles.rangeWrap}>
      <div style={pesanStyles.rangeTrack} />
      <div
        style={{
          ...pesanStyles.rangeFill,
          left: `${pct(valueMin)}%`,
          width: `${pct(valueMax) - pct(valueMin)}%`,
        }}
      />
      <div style={{ ...pesanStyles.rangeKnob, left: `${pct(valueMin)}%` }} />
      <div style={{ ...pesanStyles.rangeKnob, left: `${pct(valueMax)}%` }} />
      <input
        type="range"
        min={min}
        max={max}
        value={valueMin}
        onChange={(e) => onChange(Math.min(parseInt(e.target.value, 10), valueMax - 50000), valueMax)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          opacity: 0,
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={valueMax}
        onChange={(e) => onChange(valueMin, Math.max(parseInt(e.target.value, 10), valueMin + 50000))}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          opacity: 0,
          cursor: "pointer",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}

export default function FilterModal({
  state,
  categories = [],
  facilities = [],
  languages = ["Bahasa Indonesia", "English"],
  showLanguage = true,
  showMinPeople = true,
  showFacilities = false,
  priceMaxDefault = 5000000,
}) {
  const [draft, setDraft] = useState(state.filterValues);

  useEffect(() => {
    setDraft(state.filterValues);
  }, [state.openFilter, state.filterValues]);

  useEffect(() => {
    if (!state.openFilter) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.openFilter]);

  if (!state.openFilter) return null;

  function toggle(key, val) {
    setDraft((d) => ({
      ...d,
      [key]: d[key].includes(val) ? d[key].filter((x) => x !== val) : [...d[key], val],
    }));
  }

  function reset() {
    setDraft({
      categories: [],
      priceMin: 0,
      priceMax: priceMaxDefault,
      languages: [],
      minPeople: null,
      facilities: [],
    });
  }

  return (
    <div style={pesanStyles.scrim} onClick={() => state.setOpenFilter(false)}>
      <div style={pesanStyles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={pesanStyles.modalHeader}>
          <button style={pesanStyles.modalCloseBtn} onClick={() => state.setOpenFilter(false)}>
            <CloseIcon />
          </button>
          <h3 style={pesanStyles.modalTitle}>Filter</h3>
          <button style={pesanStyles.modalGhostBtn} onClick={reset}>
            Hapus filter
          </button>
        </div>
        <div style={pesanStyles.modalBody}>
          {/* Categories */}
          {categories.length > 0 && (
            <div style={pesanStyles.modalSection}>
              <div style={pesanStyles.modalSectionTitle}>
                <span>Semua kategori</span>
                <span style={{ fontSize: 12, color: "var(--atr-text-muted)", fontWeight: 500 }}>
                  {draft.categories.length} dipilih
                </span>
              </div>
              <div style={pesanStyles.chipGrid}>
                {categories.map((c) => {
                  const on = draft.categories.includes(c);
                  return (
                    <button
                      key={c}
                      style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                      onClick={() => toggle("categories", c)}
                    >
                      {on && <CheckSm color="var(--atr-purple)" />} {c}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Price range */}
          <div style={pesanStyles.modalSection}>
            <div style={pesanStyles.modalSectionTitle}>Rentang harga</div>
            <div style={pesanStyles.numPair}>
              <div style={pesanStyles.numInputWrap}>
                <span style={pesanStyles.numInputLabel}>Minimum</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 14, color: "var(--atr-text-muted)" }}>Rp</span>
                  <input
                    style={pesanStyles.numInput}
                    type="text"
                    value={draft.priceMin.toLocaleString("id-ID")}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        priceMin: parseInt(e.target.value.replace(/\D/g, "") || "0", 10),
                      })
                    }
                  />
                </div>
              </div>
              <div style={pesanStyles.numInputWrap}>
                <span style={pesanStyles.numInputLabel}>Maksimum</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 14, color: "var(--atr-text-muted)" }}>Rp</span>
                  <input
                    style={pesanStyles.numInput}
                    type="text"
                    value={draft.priceMax.toLocaleString("id-ID")}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        priceMax: parseInt(e.target.value.replace(/\D/g, "") || "0", 10),
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <PriceRangeSlider
              min={0}
              max={priceMaxDefault}
              valueMin={draft.priceMin}
              valueMax={draft.priceMax}
              onChange={(lo, hi) => setDraft({ ...draft, priceMin: lo, priceMax: hi })}
            />
            <div style={{ ...pesanStyles.chipGrid, marginTop: 14 }}>
              {PRICE_PRESETS.map((p) => {
                const on = draft.priceMin === p.min && draft.priceMax === p.max;
                return (
                  <button
                    key={p.label}
                    style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                    onClick={() => setDraft({ ...draft, priceMin: p.min, priceMax: p.max })}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Facilities (Homestay) */}
          {showFacilities && facilities.length > 0 && (
            <div style={pesanStyles.modalSection}>
              <div style={pesanStyles.modalSectionTitle}>Fasilitas tersedia</div>
              <div style={pesanStyles.chipGrid}>
                {facilities.map((f) => {
                  const on = draft.facilities.includes(f);
                  return (
                    <button
                      key={f}
                      style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                      onClick={() => toggle("facilities", f)}
                    >
                      {on && <CheckSm color="var(--atr-purple)" />} {f}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Language */}
          {showLanguage && (
            <div style={pesanStyles.modalSection}>
              <div style={pesanStyles.modalSectionTitle}>Bahasa tersedia</div>
              <div style={pesanStyles.chipGrid}>
                {languages.map((l) => {
                  const on = draft.languages.includes(l);
                  return (
                    <button
                      key={l}
                      style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                      onClick={() => toggle("languages", l)}
                    >
                      {on && <CheckSm color="var(--atr-purple)" />} {l}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Min people */}
          {showMinPeople && (
            <div style={pesanStyles.modalSection}>
              <div style={pesanStyles.modalSectionTitle}>Minimum peserta</div>
              <div style={pesanStyles.chipGrid}>
                {[1, 2, 3, 4, 5, 8, 10].map((n) => {
                  const on = draft.minPeople === n;
                  return (
                    <button
                      key={n}
                      style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                      onClick={() => setDraft({ ...draft, minPeople: on ? null : n })}
                    >
                      {n}+ orang
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div style={pesanStyles.modalFooter}>
          <button style={pesanStyles.modalGhostBtn} onClick={reset}>
            Reset semua
          </button>
          <button
            style={pesanStyles.modalApplyBtn}
            onClick={() => {
              state.setFilterValues(draft);
              state.setOpenFilter(false);
            }}
          >
            Terapkan filter
          </button>
        </div>
      </div>
    </div>
  );
}
