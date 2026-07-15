"use client";

import React, { useState, useRef, useEffect } from "react";
import { dirStyles as dirStylesRaw } from "@/styles/attraction-styles";
import { GridIcon, MapIcon, SortIcon, ChevDown } from "@/components/icons";

const dirStyles = dirStylesRaw as Record<string, React.CSSProperties>;

interface SortAndViewToggleProps {
  view?: string;
  onViewChange?: (view: string) => void;
  sort: string;
  sortOptions: string[];
  onSortChange: (sort: string) => void;
}

export default function SortAndViewToggle({
  view,
  onViewChange,
  sort,
  sortOptions = [],
  onSortChange,
}: SortAndViewToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={dirStyles.filterRight}>
      {view && onViewChange && (
        <div style={dirStyles.viewToggle}>
          <button
            onClick={() => onViewChange("grid")}
            style={{
              ...dirStyles.viewBtn,
              ...(view === "grid" ? dirStyles.viewBtnActive : {}),
            }}
          >
            <GridIcon /> Grid
          </button>
          <button
            onClick={() => onViewChange("map")}
            style={{
              ...dirStyles.viewBtn,
              ...(view === "map" ? dirStyles.viewBtnActive : {}),
            }}
          >
            <MapIcon /> Peta
          </button>
        </div>
      )}

      <div style={{ position: "relative" }} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={dirStyles.sortBtn}
        >
          <SortIcon /> {sort}
          <ChevDown rotated={isOpen} />
        </button>
        {isOpen && (
          <div style={{ ...dirStyles.dropdown, right: 0, left: "auto" }}>
            {sortOptions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onSortChange(s);
                  setIsOpen(false);
                }}
                style={{
                  ...dirStyles.dropdownItem,
                  ...(s === sort
                    ? { color: "var(--atr-purple)", fontWeight: 600 }
                    : {}),
                }}
              >
                <span
                  style={{
                    ...dirStyles.radio,
                    ...(s === sort ? dirStyles.radioOn : {}),
                  }}
                />
                <span>{s}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
