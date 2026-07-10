import React from "react";
import cs from "@/styles/card-styles";
import SafeImage from "../atoms/SafeImage";

/**
 * CardCover — image wrapper with optional badges overlay.
 *
 * Props:
 *   src      — image URL (passed to SafeImage)
 *   alt      — alt text
 *   badges   — array of { content, style } for overlay badges/spans
 *   children — additional overlay elements (e.g. IconButton)
 *   style    — overrides for the wrapper div style
 */
export default function CardCover({ src, alt, badges = [], children, style }) {
  return (
    <div style={{ ...cs.atrImgWrap, ...style }}>
      <SafeImage src={src} alt={alt} />
      {badges.map((b, i) => (
        <span key={i} style={b.style}>
          {b.content}
        </span>
      ))}
      {children}
    </div>
  );
}
