"use client";

import React, { useState } from "react";
import Link from "next/link";
import cs from "@/styles/card-styles";
import CardCover from "../molecules/CardCover";
import Badge from "../atoms/Badge";
import IconButton from "../atoms/IconButton";
import PriceLabel from "../atoms/PriceLabel";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

/**
 * AttractionCardList — list-format attraction card.
 *
 * Features a horizontal layout with cover image, body (name, desc, meta),
 * and a right column (save button, price, CTA buttons).
 */
export function AttractionCardList({ a }) {
  const [save, setSave] = useState(false);
  const slug = a.slug || slugify(a.name);

  const badges = [
    {
      content: a.cat,
      style: {
        ...cs.atrCat,
        background:
          a.catBg || a.catColor || "var(--atr-bg-soft)",
        color: a.catFg || "var(--atr-text)",
      },
    },
  ];

  return (
    <Link
      href={`/explore/attractions/${slug}`}
      style={{
        ...cs.atrListCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        display: "block",
      }}
    >
      <CardCover src={a.img} alt="" badges={badges} style={cs.atrListImgWrap} />
      <div style={cs.atrListBody}>
        <div style={{ flex: 1 }}>
          <h3 style={cs.atrName}>{a.name}</h3>
          <p style={cs.atrDesc}>{a.desc || a.description || ""}</p>
          <div style={cs.atrMeta}>
            <span style={cs.atrRating}>
              ★ <strong>{a.rating}</strong>{" "}
              <span style={cs.atrReviews}>({a.reviews} ulasan)</span>
            </span>
            <span style={cs.atrLoc}>
              📍 {a.kecamatan || a.region || a.location}
            </span>
          </div>
        </div>
        <div style={cs.atrListRight}>
          <IconButton
            saved={save}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSave(!save);
            }}
            style={cs.atrSaveList}
            size={16}
          />
          <PriceLabel price={a.price} style={cs.atrPriceList} />
          <button
            style={cs.atrCtaList}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Lihat detail
          </button>
          <button
            style={cs.atrCtaPesan}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Pesan
          </button>
        </div>
      </div>
    </Link>
  );
}
