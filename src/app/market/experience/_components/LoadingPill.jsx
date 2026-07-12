"use client";

import React from "react";

export default function LoadingPill({ label = "Memuat produk…" }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "#fff",
        borderRadius: 999,
        padding: "10px 20px",
        border: "1px solid var(--atr-outline)",
        fontSize: 13,
        color: "var(--atr-text-muted)",
        boxShadow: "0 2px 8px rgba(31,27,51,0.05)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        style={{ animation: "spin 1s linear infinite" }}
      >
        <path d="M21 12a9 9 0 11-9-9" stroke="var(--atr-purple)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      {label}
    </div>
  );
}
