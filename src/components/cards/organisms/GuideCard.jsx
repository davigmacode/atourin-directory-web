"use client";

import React from "react";
import cs from "@/styles/card-styles";
import SafeImage from "../atoms/SafeImage";
import GuideMetaBar from "../molecules/GuideMetaBar";
import PriceLabel from "../atoms/PriceLabel";

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
 *   GUIDE_DATA: { name, img, verified, spec, langs, rating,
 *                 trips, price, exp, certs, region, specBg, specFg }
 */
export default function GuideCard({ p }) {
  const specs = p.specs || p.spec || [];
  const certs = p.cert || p.certs || [];
  const bio = p.bio || "";
  const trips = p.trips || 0;

  return (
    <article
      style={{
        ...cs.guideCard,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={cs.guideImgWrap}>
        <SafeImage src={p.img} alt="" />
        {p.verified && (
          <span style={cs.guideVerified}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
              <path
                d="M5 12l5 5L20 7"
                stroke="#fff"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>{" "}
            Verified
          </span>
        )}
      </div>
      <div style={cs.guideBody}>
        <h3 style={cs.guideName}>{p.name}</h3>
        <GuideMetaBar specs={specs} langs={p.langs || []} />
        <div style={cs.guideMeta}>
          <span>
            ★ <strong>{p.rating}</strong>
          </span>
          <span style={cs.itinDot}>·</span>
          <span>{trips} trip</span>
        </div>
        {bio && <p style={cs.guideBio}>"{bio}"</p>}
        <div style={cs.guidePriceRow}>
          <div>
            <div style={cs.itinBudgetLabel}>Mulai</div>
            <div style={cs.guidePrice}>
              <PriceLabel price={p.price} />
              <span style={cs.itinBudgetUnit}>/hari</span>
            </div>
          </div>
          <div style={cs.guideCerts}>
            {certs.slice(0, 3).map((c) => (
              <span key={c} style={cs.guideCert}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div style={cs.guideCtas}>
          <button style={cs.guideCtaSec}>Lihat profil</button>
          <button style={cs.guideCtaPri}>Hubungi →</button>
        </div>
      </div>
    </article>
  );
}
