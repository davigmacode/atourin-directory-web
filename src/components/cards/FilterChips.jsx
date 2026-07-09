"use client";

import React from "react";
import dh from "@/styles/destination-detail";

/**
 * FChip — Filter chip (toggle button).
 */
export function FChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ ...dh.fchip, ...(active ? dh.fchipOn : {}) }}
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
    <div style={dh.fgroup}>
      <div style={dh.fgroupLabel}>{label}</div>
      <div style={dh.fgroupRow}>{children}</div>
    </div>
  );
}

/**
 * FilterBar — Wrapper for the entire filter section.
 */
export function FilterBar({ children }) {
  return <div style={dh.filterBar}>{children}</div>;
}

/**
 * toggleArr — Helper to toggle a value in/out of an array state.
 */
export function toggleArr(arr, set, v) {
  set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
}
