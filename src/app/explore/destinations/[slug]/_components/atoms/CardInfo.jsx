"use client";

import React from "react";

/**
 * CardInfo — inline meta line (e.g. "📍 4 tempat · 👥 Maks 8 orang").
 * Spans are separated by a dot via the `sep` prop.
 */
export default function CardInfo({ items, style, sep = "·" }) {
  if (!items || items.length === 0) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        fontSize: 12,
        color: "var(--atr-text-muted)",
        flexWrap: "wrap",
        alignItems: "center",
        ...style,
      }}
    >
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: "var(--atr-outline)" }}>{sep}</span>}
          <span>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}
