"use client";

import React from "react";
import SafeImage from "./SafeImage";
import dh from "@/styles/destination-detail";

function formatPrice(price) {
  if (price === 0 || price == null) return "Gratis";
  if (price >= 1000000) return `Rp ${(price / 1000000).toFixed(1)}jt`;
  if (price >= 1000) return `Rp ${(price / 1000).toFixed(0)}rb`;
  return `Rp ${price}`;
}

/**
 * GuideCard — card for tour guide listings.
 *
 * Supports two data shapes:
 *   Prototype: { name, img, verified, specs, langs, rating, trips,
 *                price, bio, cert }
 *   Existing GUIDE_DATA: { name, img, verified, spec, langs, rating,
 *                          trips, price, exp, certs, region, specBg, specFg }
 */
export default function GuideCard({ p }) {
  const specs = p.specs || p.spec || [];
  const certs = p.cert || p.certs || [];
  const bio = p.bio || "";
  const trips = p.trips || 0;

  return (
    <article
      style={{
        ...dh.guideCard,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={dh.guideImgWrap}>
        <SafeImage src={p.img} alt="" />
        {p.verified && (
          <span style={dh.guideVerified}>
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M5 12l5 5L20 7"
                stroke="#fff"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            {" "}Verified
          </span>
        )}
      </div>
      <div style={dh.guideBody}>
        <h3 style={dh.guideName}>{p.name}</h3>
        <div style={dh.guideSpecRow}>
          {specs.map((s) => (
            <span key={s} style={dh.guideSpec}>
              {s}
            </span>
          ))}
        </div>
        <div style={dh.guideLangRow}>
          {(p.langs || []).map((l, j) => (
            <span key={j} style={dh.guideLang}>
              {l}
            </span>
          ))}
        </div>
        <div style={dh.guideMeta}>
          <span>
            ★ <strong>{p.rating}</strong>
          </span>
          <span style={dh.itinDot}>·</span>
          <span>{trips} trip</span>
        </div>
        {bio && (
          <p style={dh.guideBio}>"{bio}"</p>
        )}
        <div style={dh.guidePriceRow}>
          <div>
            <div style={dh.itinBudgetLabel}>Mulai</div>
            <div style={dh.guidePrice}>
              {formatPrice(p.price)}
              <span style={dh.itinBudgetUnit}>/hari</span>
            </div>
          </div>
          <div style={dh.guideCerts}>
            {certs.slice(0, 3).map((c) => (
              <span key={c} style={dh.guideCert}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={dh.guideCtas}>
          <button style={dh.guideCtaSec}>Lihat profil</button>
          <button style={dh.guideCtaPri}>Hubungi →</button>
        </div>
      </div>
    </article>
  );
}
