import { useState, useRef, useEffect } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
import { dirStyles } from "@/styles/attraction-styles";
import {
  GUIDE_FILTERS,
  GUIDE_FILTER_OPTIONS,
  SORT_OPTIONS,
} from "@/data/guides";

const SORT_LABEL_TO_VALUE = {
  "Paling populer": "popularity",
  "Rating tertinggi": "rating-desc",
  "Harga terendah": "price-asc",
  "Harga tertinggi": "price-desc",
  "Pengalaman terbanyak": "experience-desc",
};

const SORT_VALUE_TO_LABEL = Object.fromEntries(
  Object.entries(SORT_LABEL_TO_VALUE).map(([k, v]) => [v, k]),
);

export default function FilterBar({
  filters = GUIDE_FILTERS,
  filterOptions = GUIDE_FILTER_OPTIONS,
  resultLabel = "tour guide",
  totalResults = 638,
  activeChips = [],
  onActiveChipsChange,
  sort = "popularity",
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

  const currentSortLabel = SORT_VALUE_TO_LABEL[sort] || "Paling populer";

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
          sort={currentSortLabel}
          sortOptions={SORT_OPTIONS}
          onSortChange={(s) => {
            const val = SORT_LABEL_TO_VALUE[s] || "popularity";
            onSortChange?.(val);
          }}
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
              <span style={{ fontSize: "14px", color: "var(--atr-text-muted)" }}>Memuat guide...</span>
            </span>
          ) : (
            <>
              <strong>{totalResults.toLocaleString("id-ID")}</strong> {resultLabel} cocok untukmu
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
