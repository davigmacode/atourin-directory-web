"use client";

import { useState } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
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



export default function FilterBar({
  filters = GUIDE_FILTERS,
  filterOptions = GUIDE_FILTER_OPTIONS,
  resultLabel = "tour guide",
  totalResults = 638,
  activeFilterValues = {},
  onFilterChange,
  view = "grid",
  onViewChange,
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
              <FilterDropdown
                key={f.label}
                label={f.label}
                icon={f.icon}
                options={filterOptions[f.label] || []}
                activeValues={activeChips}
                isOpen={open}
                onToggle={() => toggleFilter(f.label)}
                onPick={(opt) => pickFilter(f.label, opt)}
              />
            );
          })}
        </div>
        <SortAndViewToggle
          view={view}
          onViewChange={onViewChange}
          sort={currentSortLabel}
          sortOptions={SORT_OPTIONS}
          onSortChange={(s) => pickSort(s)}
        />
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
