"use client";

import React from "react";
import tc from "../tab-card-styles";

/**
 * CardBudget — "Estimasi ~Rp X.Xjt/orang" pill used by itinerary
 * cards. Optional `prefix` and `suffix` slots.
 */
export default function CardBudget({ label = "Estimasi", value, suffix }) {
  return (
    <div style={tc.itinBudget}>
      <span style={tc.itinBudgetLabel}>{label}</span>
      <span style={tc.itinBudgetVal}>
        {value}
        {suffix && <span style={tc.itinBudgetUnit}>/{suffix}</span>}
      </span>
    </div>
  );
}
