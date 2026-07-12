"use client";

import React from "react";
import { mt } from "@/styles/become-a-partner-styles";
import { MI, MITRA_VALUE } from "@/data/become-a-partner-data";

export default function PartnerValues() {
  return (
    <div style={mt.valueGrid} className="mt-grid3">
      {MITRA_VALUE.map((v) => (
        <div key={v.t} style={mt.valueCard}>
          <span style={mt.valueIcon}>{MI[v.icon]}</span>
          <div style={mt.valueTitle}>{v.t}</div>
          <div style={mt.valueDesc}>{v.d}</div>
        </div>
      ))}
    </div>
  );
}
