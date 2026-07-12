"use client";

import React from "react";
import { mt } from "@/styles/become-a-partner-styles";
import { MITRA_TYPES } from "@/data/become-a-partner-data";

export default function PartnerTypes() {
  return (
    <div style={mt.typeGrid} className="mt-grid3">
      {MITRA_TYPES.map((t) => (
        <div key={t.t} style={mt.typeCard} className="mt-lift">
          <span style={mt.typeIcon}>{t.icon}</span>
          <div style={mt.typeTitle}>{t.t}</div>
          <div style={mt.typeDesc}>{t.d}</div>
        </div>
      ))}
    </div>
  );
}
