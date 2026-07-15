"use client";

import { useState } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";
import { VIL_FILTERS, VIL_FILTER_OPTIONS, SORT_OPTIONS } from "@/data/villages";

const FILTER_KEY_MAP = {
  Provinsi: "provinsi",
  "Kategori ADWI": "adwi_kategori",
  "Tema utama": "tema",
  Aktivitas: "aktivitas",
  "Harga homestay": "harga",
};



export default function FilterBar({
  filters,
  setFilters,
  totalCount,
  view = "grid",
  onViewChange,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);

  const activeChips = Object.values(FILTER_KEY_MAP)
    .map((k) => filters[k])
    .filter(Boolean);

  function toggleFilter(label) {
    setOpenFilter(openFilter === label ? null : label);
    setOpenSort(false);
  }

  function pickFilter(label, value) {
    const key = FILTER_KEY_MAP[label];
    const next = value === filters[key] ? "" : value;
    setFilters({ ...filters, [key]: next });
    setOpenFilter(null);
  }

  function pickSort(value) {
    const next = value === filters.sort ? "" : value;
    setFilters({ ...filters, sort: next });
    setOpenSort(false);
  }

  function removeChip(chip) {
    const entry = Object.entries(FILTER_KEY_MAP).find(
      ([_, v]) => filters[v] === chip,
    );
    if (entry) {
      setFilters({ ...filters, [entry[1]]: "" });
    }
  }

  return (
    <div style={dirStyles.filterWrap}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {VIL_FILTERS.map((f) => {
            const open = openFilter === f.label;
            const key = FILTER_KEY_MAP[f.label];
            const activeValue = filters[key];
            return (
              <FilterDropdown
                key={f.label}
                label={f.label}
                icon={f.icon}
                options={VIL_FILTER_OPTIONS[f.label] || []}
                activeValues={activeValue ? [activeValue] : []}
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
          sort={filters.sort || "Urutkan"}
          sortOptions={SORT_OPTIONS}
          onSortChange={(s) => pickSort(s)}
        />
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          <strong>{totalCount ?? 0}</strong> desa wisata cocok untukmu
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
            <button
              onClick={() =>
                setFilters({
                  provinsi: "",
                  adwi_kategori: "",
                  tema: "",
                  aktivitas: "",
                  harga: "",
                  sort: filters.sort,
                })
              }
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
