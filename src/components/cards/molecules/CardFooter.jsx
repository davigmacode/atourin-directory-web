import React from "react";
import cs from "@/styles/card-styles";
import PriceLabel from "../atoms/PriceLabel";

/**
 * CardFooter — price + CTA action row.
 *
 * Props:
 *   price      — number (passed to PriceLabel)
 *   pricePrefix — boolean, show "Mulai" prefix (default true)
 *   onClick    — CTA button click handler
 *   ctaText    — CTA button label (default "Lihat detail →")
 *   children   — extra content rendered alongside the standard row
 *   style      — overrides for the wrapper div
 */
export default function CardFooter({
  price,
  pricePrefix = true,
  onClick,
  ctaText = "Lihat detail →",
  children,
  style,
}) {
  return (
    <div style={{ ...cs.atrFooter, ...style }}>
      {price !== undefined && (
        <span style={cs.atrPrice}>
          <PriceLabel price={price} prefix={pricePrefix} />
        </span>
      )}
      {onClick && (
        <button style={cs.atrCta} onClick={onClick}>
          {ctaText}
        </button>
      )}
      {children}
    </div>
  );
}
