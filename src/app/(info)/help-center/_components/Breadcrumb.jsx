"use client";

import React from "react";
import { hc } from "@/styles/help-center-styles";

export default function Breadcrumb({ items }) {
  return (
    <div style={hc.crumb}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ opacity: 0.5 }}>›</span>}
          {it.onClick ? (
            <button style={hc.crumbLink} onClick={it.onClick}>
              {it.label}
            </button>
          ) : (
            <span style={hc.crumbCur}>
              {it.label.length > 44 ? it.label.slice(0, 44) + "…" : it.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
