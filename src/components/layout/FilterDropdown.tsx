"use client";

import React from "react";
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
  return (
    <div style={{ position: "relative" }}>
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
