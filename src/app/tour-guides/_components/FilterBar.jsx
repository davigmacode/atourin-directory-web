"use client";

import React, { useState } from "react";
import { dirStyles } from "@/styles/attraction-styles";
import {
  GUIDE_FILTERS,
  GUIDE_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/data/guides";

const FILTER_KEY_MAP = {
  Wilayah: "wilayah",
  Spesialisasi: "spesialisasi",
  Bahasa: "bahasa",
  Harga: "harga",
  Sertifikasi: "sertifikasi",
};

const SORT_LABEL_TO_VALUE = {
  "Paling populer": "popular",
  "Rating tertinggi": "rating",
  "Harga terendah": "price_low",
  "Harga tertinggi": "price_high",
  "Pengalaman terbanyak": "experience",
};

const SORT_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(SORT_LABEL_TO_VALUE).map(([k, v]) => [v, k]),
);

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

export default function FilterBar({
  filters = GUIDE_FILTERS,
  filterOptions = GUIDE_FILTER_OPTIONS,
  resultLabel = "tour guide",
  totalResults = 638,
  activeFilterValues = {},
  onFilterChange,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  const activeChips = Object.entries(activeFilterValues)
    .filter(([key, val]) => val && key !== "sort")
    .map(([, val]) => val);

  const currentSortLabel =
    SORT_VALUE_TO_LABEL[activeFilterValues.sort] || "Paling populer";

  function toggleFilter(label) {
    setOpenFilter(openFilter === label ? null : label);
    setOpenSort(false);
  }
  function pickFilter(label, value) {
    const key = FILTER_KEY_MAP[label];
    if (key && onFilterChange) {
      onFilterChange({ ...activeFilterValues, [key]: value });
    }
    setOpenFilter(null);
  }
  function removeChip(chip) {
    if (!onFilterChange) return;
    const next = { ...activeFilterValues };
    for (const key of Object.values(FILTER_KEY_MAP)) {
      if (next[key] === chip) {
        next[key] = "";
        break;
      }
    }
    onFilterChange(next);
  }
  function clearAll() {
    if (!onFilterChange) return;
    const next = { ...activeFilterValues };
    for (const key of Object.values(FILTER_KEY_MAP)) {
      next[key] = "";
    }
    onFilterChange(next);
  }
  function pickSort(label) {
    if (!onFilterChange) return;
    const val = SORT_LABEL_TO_VALUE[label];
    if (val) {
      onFilterChange({ ...activeFilterValues, sort: val });
    }
    setOpenSort(false);
  }

  return (
    <div style={dirStyles.filterWrap}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = openFilter === f.label;
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
                      const checked = activeChips.includes(opt);
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
          <div style={{ position: "relative" }}>
            <button
              onClick={() => {
                setOpenSort(!openSort);
                setOpenFilter(null);
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
              {currentSortLabel}
              <ChevDown rotated={openSort} />
            </button>
            {openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
                {SORT_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => pickSort(s)}
                    style={{
                      ...dirStyles.dropdownItem,
                      ...(s === currentSortLabel
                        ? { color: "var(--atr-purple)", fontWeight: 600 }
                        : {}),
                    }}
                  >
                    <span
                      style={{
                        ...dirStyles.radio,
                        ...(s === currentSortLabel
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
          <strong>{totalResults}</strong> {resultLabel} cocok untukmu
        </span>
        <div style={dirStyles.activeChips}>
          {activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {activeChips.length > 0 && (
            <button onClick={clearAll} style={dirStyles.clearAll}>
              Hapus semua
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
