"use client";

import React from "react";
import { ar } from "@/styles/arti-styles";
import { ARTI_ACTIVITY } from "@/data/arti-data";

export default function ArtiActivity() {
  const rupiahArti = (n) => "Rp" + n.toLocaleString("id-ID");

  return (
    <div>
      <div style={ar.sectionH}>Aktivitas terbaru</div>
      <div style={ar.sectionSub}>Riwayat penanaman pohon dari setiap tripmu.</div>
      <div style={ar.card}>
        {ARTI_ACTIVITY.map((act, i) => (
          <div
            key={i}
            style={{ ...ar.actRow, borderTop: i ? "1px solid var(--atr-outline)" : "none" }}
          >
            <div style={ar.actIcon(act.g)}>{act.n}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}>{act.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 2 }}>{act.s}</div>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", flexShrink: 0 }}>{act.d}</div>
          </div>
        ))}
      </div>

      {/* SPONSOR */}
      <div style={ar.sponsor}>
        <div style={{ fontSize: 44 }}>🌱</div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 17, fontWeight: 800 }}>Tanam ekstra di luar trip</div>
          <div style={{ fontSize: 13.5, marginTop: 5, lineHeight: 1.5, opacity: 0.85 }}>
            Mulai {rupiahArti(25000)}/pohon, kontribusi langsung ke proyek reboisasi aktif.
          </div>
        </div>
        <button style={ar.sponsorBtn} onClick={() => alert("Menanam pohon ekstra...")}>
          Tanam pohon
        </button>
      </div>
    </div>
  );
}
