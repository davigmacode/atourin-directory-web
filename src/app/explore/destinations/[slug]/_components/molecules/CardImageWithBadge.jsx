"use client";

import React from "react";
import tc from "../tab-card-styles";

/**
 * CardImageWithBadge — image wrapper (4:3 aspect) with optional
 * absolutely-positioned badges overlaid. Used by desa and itinerary
 * cards in the destination tabs.
 *
 * Props:
 *   src       — image URL
 *   alt       — alt text
 *   badges    — array of { node, style, key? } rendered top of image
 *   ratio     — aspect ratio override (default "4 / 3")
 */
export default function CardImageWithBadge({
  src,
  alt = "",
  badges = [],
  ratio = "4 / 3",
}) {
  return (
    <div style={{ ...tc.imgWrap, aspectRatio: ratio }}>
      <img src={src} alt={alt} style={tc.imageBase} />
      {badges.map((b, i) => (
        <span key={b.key || i} style={b.style}>
          {b.node}
        </span>
      ))}
    </div>
  );
}
