"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SafeImage from "./SafeImage";
import dh from "@/styles/destination-detail";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

function formatPrice(price, withPrefix = true) {
  if (price === 0 || price == null) return "Gratis";
  let s;
  if (price >= 1000000) s = `Rp ${(price / 1000000).toFixed(1)}jt`;
  else if (price >= 1000) s = `Rp ${(price / 1000).toFixed(0)}rb`;
  else s = `Rp ${price}`;
  return withPrefix ? `Mulai ${s}` : s;
}

/* ── Grid Card ─────────────────────────────────────── */
export function AttractionCardGrid({ a }) {
  const [save, setSave] = useState(false);
  const router = useRouter();
  const slug = slugify(a.name);

  return (
    <article
      onClick={() => router.push(`/attractions/${slug}`)}
      style={{
        ...dh.atrCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div style={dh.atrImgWrap}>
        <SafeImage src={a.img} alt="" />
        <span
          style={{
            ...dh.atrCat,
            background: a.catBg || a.catColor || "var(--atr-bg-soft)",
            color: a.catFg || "var(--atr-text)",
          }}
        >
          {a.cat}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
          style={dh.atrSave}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "var(--atr-purple)" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke={save ? "var(--atr-purple)" : "var(--atr-text)"}
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div style={dh.atrBody}>
        <h3 style={dh.atrName}>{a.name}</h3>
        <p style={dh.atrDesc}>{a.desc || a.description || ""}</p>
        <div style={dh.atrMeta}>
          <span style={dh.atrRating}>
            ★ <strong>{a.rating}</strong>{" "}
            <span style={dh.atrReviews}>({a.reviews})</span>
          </span>
          <span style={dh.atrLoc}>
            📍 {a.kecamatan || a.region || a.location}
          </span>
        </div>
        <div style={dh.atrFooter}>
          <span style={dh.atrPrice}>{formatPrice(a.price)}</span>
          <button
            style={dh.atrCta}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/attractions/${slug}`);
            }}
          >
            Lihat detail →
          </button>
        </div>
      </div>
    </article>
  );
}

/* ── List Card ──────────────────────────────────────── */
export function AttractionCardList({ a }) {
  const [save, setSave] = useState(false);
  const router = useRouter();
  const slug = slugify(a.name);

  return (
    <article
      onClick={() => router.push(`/attractions/${slug}`)}
      style={{
        ...dh.atrListCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div style={dh.atrListImgWrap}>
        <SafeImage src={a.img} alt="" style={dh.atrListImg} />
        <span
          style={{
            ...dh.atrCat,
            background: a.catBg || a.catColor || "var(--atr-bg-soft)",
            color: a.catFg || "var(--atr-text)",
          }}
        >
          {a.cat}
        </span>
      </div>
      <div style={dh.atrListBody}>
        <div style={{ flex: 1 }}>
          <h3 style={dh.atrName}>{a.name}</h3>
          <p style={dh.atrDesc}>{a.desc || a.description || ""}</p>
          <div style={dh.atrMeta}>
            <span style={dh.atrRating}>
              ★ <strong>{a.rating}</strong>{" "}
              <span style={dh.atrReviews}>({a.reviews} ulasan)</span>
            </span>
            <span style={dh.atrLoc}>
              📍 {a.kecamatan || a.region || a.location}
            </span>
          </div>
        </div>
        <div style={dh.atrListRight}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSave(!save);
            }}
            style={dh.atrSaveList}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={save ? "var(--atr-purple)" : "none"}
            >
              <path
                d="M6 3h12v18l-6-4-6 4V3z"
                stroke={save ? "var(--atr-purple)" : "var(--atr-text)"}
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div style={dh.atrPriceList}>{formatPrice(a.price)}</div>
          <button
            style={dh.atrCtaList}
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/attractions/${slug}`);
            }}
          >
            Lihat detail
          </button>
          <button
            style={dh.atrCtaPesan}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Pesan
          </button>
        </div>
      </div>
    </article>
  );
}
