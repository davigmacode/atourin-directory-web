"use client";

import React from "react";
import cs from "@/styles/card-styles";

/**
 * FChip — Filter chip (toggle button).
 */
export function FChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ ...cs.fchip, ...(active ? cs.fchipOn : {}) }}
    >
      {children}
    </button>
  );
}

/**
 * FGroup — Group label + row of chips.
 */
export function FGroup({ label, children }) {
  return (
    <div style={cs.fgroup}>
      <div style={cs.fgroupLabel}>{label}</div>
      <div style={cs.fgroupRow}>{children}</div>
    </div>
  );
}

/**
 * FilterBar — Wrapper for the entire filter section.
 */
export function FilterBar({ children }) {
  return <div style={cs.filterBar}>{children}</div>;
}

/**
 * toggleArr — Helper to toggle a value in/out of an array state.
 */
export function toggleArr(arr, set, v) {
  set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
}
