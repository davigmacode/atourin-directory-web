import React from "react";

/**
 * PriceLabel — formatted price display.
 *
 * Props:
 *   price    — number (0 / null / undefined shows "Gratis")
 *   prefix   — boolean, prepend "Mulai " when true (default false)
 *   style    — React style object
 */
export default function PriceLabel({ price, prefix = false, style }) {
  if (price === 0 || price == null) {
    return <span style={style}>Gratis</span>;
  }

  let s;
  if (price >= 1000000) s = `Rp ${(price / 1000000).toFixed(1)}jt`;
  else if (price >= 1000) s = `Rp ${(price / 1000).toFixed(0)}rb`;
  else s = `Rp ${price}`;

  return <span style={style}>{prefix ? `Mulai ${s}` : s}</span>;
}
