"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * SafeImage — Next.js Image with broken-image fallback.
 *
 * Uses `fill` so the parent element MUST have `position: relative`
 * and an explicit or aspect-ratio-driven size.
 */
export default function SafeImage({ src, alt, style = {}, placeholder, blurDataURL, ...props }) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--atr-bg-soft)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <rect
            x="2"
            y="2"
            width="20"
            height="20"
            rx="2"
            stroke="var(--atr-text-muted)"
            strokeWidth="1.5"
          />
          <circle
            cx="8.5"
            cy="8.5"
            r="2.5"
            stroke="var(--atr-text-muted)"
            strokeWidth="1.5"
          />
          <path
            d="M3 19l5-6 4 5 3-4 6 7"
            stroke="var(--atr-text-muted)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 33vw"
      style={{ ...style, objectFit: "cover" }}
      onError={() => setErrored(true)}
      unoptimized
      placeholder={placeholder || (blurDataURL ? "blur" : undefined)}
      blurDataURL={blurDataURL || undefined}
      {...props}
    />
  );
}
