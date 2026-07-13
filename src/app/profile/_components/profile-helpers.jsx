"use client";

import React from "react";
import { ps } from "@/styles/profile-styles";

/* ---- shared: panel heading with optional right action ---- */
export function PanelHead({ title, sub, right }) {
  return (
    <div style={ps.panelHead}>
      <div>
        <div style={ps.h1}>{title}</div>
        {sub && <div style={ps.sub}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

/* ---- shared: native-styled select with chevron ---- */
export function Select({ value, options, onChange }) {
  return (
    <div style={ps.inputWrap}>
      <select style={{ ...ps.input, appearance: "none", paddingRight: 38, cursor: "pointer" }} value={value} onChange={(e) => onChange && onChange(e.target.value)}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span style={ps.selectChevron}><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
    </div>
  );
}
