"use client";

import React from "react";
import tc from "../tab-card-styles";

/**
 * CardPrice — price row with small label. Right slot is for
 * certifications (used by guide cards).
 */
export default function CardPrice({ label = "Mulai", value, unit, right }) {
  return (
    <div style={tc.guidePriceRow}>
      <div>
        <div style={tc.itinBudgetLabel}>{label}</div>
        <div style={tc.guidePrice}>
          {value}
          {unit && <span style={tc.itinBudgetUnit}>{unit}</span>}
        </div>
      </div>
      {right}
    </div>
  );
}
