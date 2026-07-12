"use client";

import React from "react";
import { no, NOTIF_CAT } from "@/styles/notif-styles";

/* ── Category Icons ── */
function CatIcon({ cat }) {
  if (cat === "pesanan")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 4h14l-1 16H6L5 4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (cat === "pengingat")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 9.5V13l2.5 1.5M9 3l-3 2M15 3l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (cat === "promosi")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 11.5V5a2 2 0 012-2h6.5L21 12.5 12.5 21 3 11.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="7.5" cy="7.5" r="1.4" fill="currentColor" />
      </svg>
    );
  if (cat === "arti")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 21v-7M12 14c0-4 3-7 8-7 0 4-3 7-8 7zM12 14c0-3-2.5-5.5-7-5.5C5 12 7.5 14 12 14z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 11v5M12 8v.01" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function IcChevR() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcWarnSm() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
      <path d="M12 4l9 16H3l9-16z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M12 10v3.5M12 16.5v.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function NotifRow({ n, onOpen }) {
  const c = NOTIF_CAT[n.cat] || { bg: "rgba(0,0,0,0.05)", fg: "#666", label: "Notifikasi" };
  return (
    <div
      className="atr-notif-row"
      role="button"
      tabIndex={0}
      style={{ ...no.row, ...(n.unread ? no.rowUnread : {}) }}
      onClick={() => onOpen(n)}
    >
      <span style={{ ...no.rowIcon, background: c.bg, color: c.fg }}>
        <CatIcon cat={n.cat} />
      </span>
      <div style={no.rowBody}>
        <div style={no.rowMeta}>
          <span style={{ ...no.catChip, background: c.bg, color: c.fg }}>{c.label}</span>
          {n.important && (
            <span style={no.importantChip}>
              <IcWarnSm /> Penting
            </span>
          )}
          <span style={no.rowTime}>{n.time}</span>
        </div>
        <div style={no.rowTitle}>{n.title}</div>
        <div style={no.rowText}>{n.body}</div>
        {n.cta && (
          <span style={no.rowCta}>
            {n.cta} <IcChevR />
          </span>
        )}
      </div>
      {n.unread ? <span style={no.unreadDot} /> : <span style={no.unreadSpacer} />}
    </div>
  );
}
export { CatIcon };
