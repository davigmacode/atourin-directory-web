"use client";

import React from "react";
import { hp } from "@/styles/homestay-detail-styles";

/* ── Helpers ── */
function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const start = new Date(a);
  const end = new Date(b);
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

const MONTHS_ID_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

export default function DetailBottomDock({ data, state, onCheckout }) {
  const nights = nightsBetween(state.checkIn, state.checkOut);
  const lines = data.rooms_list
    .map((r) => ({ ...r, qty: state.qty[r.id] || 0 }))
    .filter((l) => l.qty > 0);
  const totalRooms = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((acc, l) => acc + l.qty * nights * l.price, 0);

  const sd = state.checkIn ? new Date(state.checkIn) : null;
  const ed = state.checkOut ? new Date(state.checkOut) : null;
  const dateLabel =
    sd && ed
      ? `${sd.getDate()} ${MONTHS_ID_SHORT[sd.getMonth()]} → ${ed.getDate()} ${MONTHS_ID_SHORT[ed.getMonth()]}`
      : ", ";

  return (
    <div style={hp.dock}>
      <div style={hp.dockInner}>
        <img src={data.images[0]} alt="" style={hp.dockImg} />
        <div>
          <div style={hp.dockName}>{data.name}</div>
          <div style={hp.dockMeta}>
            📅 {dateLabel} · 🛏 {totalRooms} kamar · {nights} malam
          </div>
        </div>
        <div style={hp.dockTotal}>
          <div style={hp.dockTotalLabel}>Total</div>
          <div style={hp.dockTotalVal}>Rp {total.toLocaleString("id-ID")}</div>
        </div>
        <button
          disabled={totalRooms === 0}
          onClick={onCheckout}
          style={{
            ...hp.dockCta,
            ...(totalRooms === 0 ? { background: "#C8C5E8", cursor: "not-allowed", boxShadow: "none" } : {}),
          }}
        >
          Pesan Sekarang →
        </button>
      </div>
    </div>
  );
}
