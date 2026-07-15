"use client";

import React, { useRef, useEffect } from "react";
import { FilterDropdown, SortAndViewToggle } from "@/components/layout";
import { dirStyles as dirStylesRaw } from "@/styles/attraction-styles";
import { ATTR_FILTERS, ATTR_FILTER_OPTIONS, SORT_OPTIONS } from "@/data/attractions";

const dirStyles = dirStylesRaw as Record<string, React.CSSProperties>;

interface HeartIconProps {
  filled: boolean;
  color?: string;
}

export function HeartIcon({ filled, color = "var(--atr-text)" }: HeartIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "var(--atr-red)" : "none"}
    >
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke={filled ? "var(--atr-red)" : color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClockSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PinSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function StarFill() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}

interface PlusIconProps {
  color?: string;
}

export function PlusIcon({ color = "var(--atr-text)" }: PlusIconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 5v14M5 12h14"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}





interface StatProps {
  n: number | string;
  label: string;
}

export function Stat({ n, label }: StatProps) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

interface FilterBarProps {
  ui: {
    view: string;
    setView: (v: string) => void;
    activeChips: string[];
    setActiveChips: (c: string[]) => void;
    openFilter: string | null;
    setOpenFilter: (f: string | null) => void;
    openSort: boolean;
    setOpenSort: (s: boolean) => void;
    sort: string;
    setSort: (s: string) => void;
  };
  onPickFilter?: (label: string, value: string) => void;
  onRemoveFilter?: (c: string) => void;
  onClearFilters?: () => void;
  onSortChange?: (s: string) => void;
  filters?: { label: string; icon: string }[];
  filterOptions?: Record<string, string[]>;
  resultLabel?: string;
  totalResults?: number;
}

export default function FilterBar({
  ui,
  onPickFilter,
  onRemoveFilter,
  onClearFilters,
  onSortChange,
  filters = ATTR_FILTERS,
  filterOptions = ATTR_FILTER_OPTIONS,
  resultLabel = "atraksi",
  totalResults = 1247,
}: FilterBarProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        ui.setOpenFilter(null);
        ui.setOpenSort(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [ui]);

  function toggleFilter(label: string) {
    ui.setOpenFilter(ui.openFilter === label ? null : label);
    ui.setOpenSort(false);
  }

  function pickFilter(label: string, value: string) {
    if (!ui.activeChips.includes(value)) {
      ui.setActiveChips([...ui.activeChips, value]);
    }
    onPickFilter?.(label, value);
    ui.setOpenFilter(null);
  }

  function removeChip(c: string) {
    ui.setActiveChips(ui.activeChips.filter((x) => x !== c));
    onRemoveFilter?.(c);
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = ui.openFilter === f.label;
            return (
              <FilterDropdown
                key={f.label}
                label={f.label}
                icon={f.icon}
                options={filterOptions[f.label] || []}
                activeValues={ui.activeChips}
                isOpen={open}
                onToggle={() => toggleFilter(f.label)}
                onPick={(opt) => pickFilter(f.label, opt)}
              />
            );
          })}
        </div>

        <SortAndViewToggle
          view={ui.view}
          onViewChange={(v) => ui.setView(v)}
          sort={ui.sort}
          sortOptions={SORT_OPTIONS}
          onSortChange={(s) => {
            ui.setSort(s);
            onSortChange?.(s);
          }}
        />
      </div>

      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          <strong>{totalResults}</strong> {resultLabel} cocok untukmu
        </span>
        <div style={dirStyles.activeChips}>
          {ui.activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>
                {"\u00D7"}
              </span>
            </span>
          ))}
          {ui.activeChips.length > 0 && (
            <button
              onClick={() => {
                ui.setActiveChips([]);
                onClearFilters?.();
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
