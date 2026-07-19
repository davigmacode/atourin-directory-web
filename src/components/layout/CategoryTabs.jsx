"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const DIRECTORY_TABS = [
  { label: "Itinerary", key: "itineraries", href: "/explore/itinerary" },
  { label: "Destinasi", key: "destinations", href: "/explore/destinations" },
  { label: "Atraksi", key: "attractions", href: "/explore/attractions" },
  { label: "Tour Guide", key: "guides", href: "/explore/tour-guides" },
  { label: "Desa Wisata", key: "villages", href: "/explore/tourism-villages" },
];

function formatCount(num) {
  if (num === undefined || num === null) return "0";
  if (num >= 1000) {
    const k = num / 1000;
    return (k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)) + "K";
  }
  return String(num);
}

function CategoryTabsContent({ active = "Destinasi" }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  // Fetch filterable counts dynamically from stats API
  const { data: statsRes } = useSWR(`/stats?${queryString}`);
  const stats = statsRes?.data || {};

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
          const href = queryString ? `${t.href}?${queryString}` : t.href;
          const countVal = stats[t.key] !== undefined ? formatCount(stats[t.key]) : "...";

          return (
            <Link
              key={t.label}
              href={href}
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
                {countVal}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryTabs(props) {
  return (
    <Suspense
      fallback={
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
            {DIRECTORY_TABS.map((t) => (
              <div
                key={t.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "18px 4px",
                  fontSize: 15,
                  fontWeight: props.active === t.label ? 700 : 500,
                  color: props.active === t.label ? "var(--atr-purple)" : "var(--atr-text-muted)",
                  marginRight: 24,
                  fontFamily: "var(--atr-font-sans)",
                  borderBottom: props.active === t.label
                    ? "3px solid var(--atr-purple)"
                    : "3px solid transparent",
                }}
              >
                <span>{t.label}</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    background: props.active === t.label ? "#EDE9FF" : "var(--atr-bg-soft)",
                    color: props.active === t.label ? "var(--atr-purple)" : "var(--atr-text-muted)",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  ...
                </span>
              </div>
            ))}
          </div>
        </div>
      }
    >
      <CategoryTabsContent {...props} />
    </Suspense>
  );
}


