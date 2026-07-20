"use client";

import { useState, useRef, useEffect } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";
import { VIL_FILTERS, VIL_FILTER_OPTIONS, SORT_OPTIONS } from "@/data/villages";

export default function FilterBar({
  filters = VIL_FILTERS,
  filterOptions = VIL_FILTER_OPTIONS,
  activeChips = [],
  onActiveChipsChange,
  totalCount = 0,
  sort = "Urutkan",
  onSortChange,
  view = "grid",
  onViewChange,
  isLoading = false,
}) {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenFilter(null);
        setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function toggleFilter(label) {
    setOpenFilter(openFilter === label ? null : label);
    setOpenSort(false);
  }

  function pickFilter(label, value) {
    let nextChips;
    if (activeChips.includes(value)) {
      nextChips = activeChips.filter((c) => c !== value);
    } else {
      nextChips = [...activeChips, value];
    }
    onActiveChipsChange?.(nextChips);
  }

  function removeChip(chip) {
    const nextChips = activeChips.filter((c) => c !== chip);
    onActiveChipsChange?.(nextChips);
  }

  function clearAll() {
    onActiveChipsChange?.([]);
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
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
          sort={sort || "Urutkan"}
          sortOptions={SORT_OPTIONS}
          onSortChange={onSortChange}
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
              <span style={{ fontSize: "14px", color: "var(--atr-text-muted)" }}>Memuat desa wisata...</span>
            </span>
          ) : (
            <>
              <strong>{totalCount ?? 0}</strong> desa wisata cocok untukmu
            </>
          )}
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
