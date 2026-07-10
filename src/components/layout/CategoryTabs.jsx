"use client";

import React from "react";

const DIRECTORY_TABS = [
  { label: "Itinerary", count: "2.4K", href: "/itinerary" },
  { label: "Destinasi", count: "180", href: "/destinations" },
  { label: "Atraksi", count: "1.2K", href: "/attractions" },
  { label: "Tour Guide", count: "640", href: "/tour-guides" },
  { label: "Desa Wisata", count: "320", href: "/tourism-villages" },
];

export default function CategoryTabs({ active = "Destinasi" }) {
  return (
    <div
      style={{
        background: "#fff",
        borderBottom: "1px solid var(--atr-outline)",
        position: "sticky",
        top: 74.8,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1376,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          gap: 8,
          overflowX: "auto",
        }}
      >
        {DIRECTORY_TABS.map((t) => {
          const isActive = active === t.label;
          return (
            <a
              key={t.label}
              href={t.href}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: "none",
                padding: "18px 4px",
                fontSize: 15,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--atr-purple)" : "var(--atr-text-muted)",
                cursor: "pointer",
                borderBottom: isActive
                  ? "3px solid var(--atr-purple)"
                  : "3px solid transparent",
                marginRight: 24,
                textDecoration: "none",
                fontFamily: "var(--atr-font-sans)",
              }}
            >
              <span>{t.label}</span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: isActive ? "#EDE9FF" : "var(--atr-bg-soft)",
                  color: isActive
                    ? "var(--atr-purple)"
                    : "var(--atr-text-muted)",
                  padding: "2px 8px",
                  borderRadius: 999,
                }}
              >
                {t.count}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
