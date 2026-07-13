"use client";

import React from "react";
import { pr } from "@/styles/promo-styles";
import { PROMO_CATS } from "@/data/promo-data";

function CatGlyph({ kind }) {
  const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none" };
  if (kind === "grid")
    return (
      <svg {...p}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  if (kind === "calendar")
    return (
      <svg {...p}>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  if (kind === "sparkle")
    return (
      <svg {...p}>
        <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "camera")
    return (
      <svg {...p}>
        <path
          d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (kind === "home")
    return (
      <svg {...p}>
        <path d="M4 11l8-6 8 6M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg {...p}>
      <circle cx="6" cy="12" r="1.6" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="18" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function PromoCats({ cat, setCat }) {
  return (
    <div style={pr.catBarOuter}>
      <div style={pr.catBar}>
        {PROMO_CATS.map((c) => {
          const on = c.id === cat;
          return (
            <button
              key={c.id}
              className="atr-cat-btn"
              style={{ ...pr.catBtn, ...(on ? pr.catBtnActive : {}) }}
              onClick={() => setCat(c.id)}
            >
              <CatGlyph kind={c.icon} />
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
