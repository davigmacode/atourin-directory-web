"use client";

import React, { useRef, useEffect } from "react";
import { dirStyles as dirStylesRaw } from "@/styles/attraction-styles";
import { FilterGlyph, ChevDown, CheckIcon } from "@/components/icons";

const dirStyles = dirStylesRaw as Record<string, React.CSSProperties>;

interface FilterDropdownProps {
  label: string;
  icon: string;
  options: string[];
  activeValues: string[];
  isOpen: boolean;
  onToggle: () => void;
  onPick: (option: string) => void;
}

export default function FilterDropdown({
  label,
  icon,
  options = [],
  activeValues = [],
  isOpen = false,
  onToggle,
  onPick,
}: FilterDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onToggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={onToggle}
        style={{
          ...dirStyles.filterChip,
          ...(isOpen
            ? {
                border: "1px solid var(--atr-purple)",
                background: "#F6F4FF",
              }
            : {}),
        }}
      >
        <FilterGlyph kind={icon} />
        <span>{label}</span>
        <ChevDown rotated={isOpen} />
      </button>
      {isOpen && (
        <div style={dirStyles.dropdown}>
          {options.map((opt) => {
            const checked = activeValues.includes(opt);
            return (
              <button
                key={opt}
                onClick={() => onPick(opt)}
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
}
