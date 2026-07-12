"use client";

import React from "react";
import { mt } from "@/styles/become-a-partner-styles";
import { MI, MITRA_TESTI } from "@/data/become-a-partner-data";

export default function PartnerTesti() {
  return (
    <div style={mt.testiGrid} className="mt-grid3">
      {MITRA_TESTI.map((t) => (
        <div key={t.name} style={mt.testiCard}>
          <div style={mt.testiStars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n}>{MI.star}</span>
            ))}
          </div>
          <div style={mt.testiText}>“{t.text}”</div>
          <div style={mt.testiUser}>
            <span style={mt.testiAvatar}>{t.avatar}</span>
            <div>
              <div style={mt.testiName}>{t.name}</div>
              <div style={mt.testiRole}>{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
