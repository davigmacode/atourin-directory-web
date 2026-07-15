"use client";

import React, { useState, useEffect, useRef } from "react";
import rgRaw from "@/styles/destination-styles";
import { ChevDownSm } from "./DestinationCard";

const rg = rgRaw as Record<string, React.CSSProperties>;

export interface Option {
  id: string;
  name: string;
  subtext?: string;
}

interface DropdownFilterProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  alignRight?: boolean;
  minWidth?: number | string;
}

export default function DropdownFilter({
  label,
  options,
  selectedValues,
  onChange,
  multiple = true,
  showSearch = false,
  searchPlaceholder = "Cari...",
  alignRight = false,
  minWidth,
}: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset search query when dropdown opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleOption = (optId: string) => {
    if (multiple) {
      if (selectedValues.includes(optId)) {
        onChange(selectedValues.filter((val) => val !== optId));
      } else {
        onChange([...selectedValues, optId]);
      }
    } else {
      onChange([optId]);
      setIsOpen(false);
    }
  };

  // Determine button label text
  const getButtonText = () => {
    if (multiple) {
      return label;
    }
    const selectedOpt = options.find((opt) => opt.id === selectedValues[0]);
    return selectedOpt ? selectedOpt.name : label;
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button onClick={() => setIsOpen(!isOpen)} style={rg.filterBtn}>
        <span>
          {getButtonText()}
          {multiple && selectedValues.length > 0 && (
            <span style={rg.filterCount}>{selectedValues.length}</span>
          )}
        </span>
        <ChevDownSm rotated={isOpen} />
      </button>

      {isOpen && (
        <div
          style={{
            ...rg.provDropdown,
            ...(alignRight ? { left: "auto", right: 0 } : { left: 0, right: "auto" }),
            ...(minWidth !== undefined ? { minWidth } : {}),
          }}
        >
          {showSearch && (
            <input
              style={rg.provDropdownSearch}
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          <div style={rg.provDropdownList}>
            {filteredOptions.length === 0 ? (
              <div
                style={{
                  padding: "12px 10px",
                  fontSize: 13,
                  color: "var(--atr-text-muted)",
                  textAlign: "center",
                }}
              >
                Tidak ada hasil
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isChecked = selectedValues.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    style={rg.provDropdownItem}
                  >
                    {multiple ? (
                      <span
                        style={{
                          ...rg.checkbox,
                          ...(isChecked ? rg.checkboxOn : {}),
                        }}
                      >
                        {isChecked && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M5 12l5 5L20 7"
                              stroke="#fff"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    ) : (
                      <span
                        style={{
                          ...rg.radio,
                          ...(isChecked ? rg.radioOn : {}),
                        }}
                      >
                        {isChecked && <span style={rg.radioInner} />}
                      </span>
                    )}
                    <span>{opt.name}</span>
                    {opt.subtext && (
                      <span style={rg.provDropdownIsland}>{opt.subtext}</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
