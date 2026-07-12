"use client";

import React from "react";
import Link from "next/link";
import { pesanStyles } from "@/styles/pesan-styles";

const PESAN_TABS = [
  { label: "Experience", href: "/market/experience", icon: "store" },
  { label: "Attraction", href: "/market/attractions", icon: "ticket" },
  { label: "Homestay", href: "/market/homestay", icon: "home" },
];

function SubTabIcon({ kind, active }) {
  const c = active ? "var(--atr-purple)" : "var(--atr-text-muted)";
  if (kind === "store")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9l1.5-4.5h15L21 9M4 9v10h16V9M3 9c0 1.7 1.3 3 3 3s3-1.3 3-3M9 9c0 1.7 1.3 3 3 3s3-1.3 3-3M15 9c0 1.7 1.3 3 3 3s3-1.3 3-3"
          stroke={c}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (kind === "ticket")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 9V7a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z"
          stroke={c}
          strokeWidth="1.6"
        />
        <path d="M14 6v12" stroke={c} strokeWidth="1.6" strokeDasharray="2 2" />
      </svg>
    );
  if (kind === "home")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z"
          stroke={c}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  return null;
}

export default function PesanSubNav({ active }) {
  return (
    <div style={pesanStyles.subNav}>
      <div style={pesanStyles.subNavInner}>
        {PESAN_TABS.map((t) => {
          const isActive = t.label === active;
          return (
            <Link
              key={t.label}
              href={t.href}
              style={{
                ...pesanStyles.subTab,
                ...(isActive ? pesanStyles.subTabActive : {}),
              }}
            >
              <SubTabIcon kind={t.icon} active={isActive} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
