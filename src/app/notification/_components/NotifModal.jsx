"use client";

import React, { useEffect } from "react";
import { no, NOTIF_CAT } from "@/styles/notif-styles";
import { CatIcon } from "./NotifRow";

/* ── SVGs ── */
function IcX() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IcClockSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IcBellDot() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9a6 6 0 1112 0c0 4 1.2 5.5 2 6.5H4c.8-1 2-2.5 2-6.5z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M9.5 19a2.5 2.5 0 005 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IcExternal() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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

export default function NotifModal({ n, onClose }) {
  const c = NOTIF_CAT[n.cat] || { bg: "rgba(0,0,0,0.05)", fg: "#666", label: "Notifikasi" };
  const dest = n.cta || (n.href ? "Buka halaman terkait" : null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div style={no.scrim} onClick={onClose}>
      <div style={no.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={no.modalTop}>
          <span style={{ ...no.modalIcon, background: c.bg, color: c.fg }}>
            <CatIcon cat={n.cat} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={no.modalMeta}>
              <span style={{ ...no.catChip, background: c.bg, color: c.fg }}>{c.label}</span>
              {n.important && (
                <span style={no.importantChip}>
                  <IcWarnSm /> Penting
                </span>
              )}
            </div>
            <div style={no.modalTitle}>{n.title}</div>
            <div style={no.modalTime}>
              <IcClockSm /> {n.time}
            </div>
          </div>
          <button style={no.modalClose} onClick={onClose} aria-label="Tutup">
            <IcX />
          </button>
        </div>

        <div style={no.modalDivider} />

        <div style={no.modalBody}>
          <div style={no.modalMsg}>{n.body}</div>

          <div style={no.metaCard}>
            <div style={no.metaRow}>
              <span style={no.metaLabel}>
                <CatIcon cat={n.cat} /> Kategori
              </span>
              <span style={no.metaVal}>{c.label}</span>
            </div>
            <div style={no.metaRow}>
              <span style={no.metaLabel}>
                <IcBellDot /> Prioritas
              </span>
              <span style={{ ...no.metaVal, ...(n.important ? { color: "var(--atr-red)" } : {}) }}>
                {n.important ? "Penting" : "Biasa"}
              </span>
            </div>
            <div style={{ ...no.metaRow, ...no.metaRowLast }}>
              <span style={no.metaLabel}>
                <IcClockSm /> Diterima
              </span>
              <span style={no.metaVal}>{n.time}</span>
            </div>
          </div>
        </div>

        <div style={no.modalFoot}>
          {n.href && n.href !== "#" ? (
            <a href={n.href} style={no.footPrimary}>
              <IcExternal /> {dest}
            </a>
          ) : (
            <button style={no.footPrimary} onClick={onClose}>
              Mengerti
            </button>
          )}
          {n.href && n.href !== "#" && (
            <button style={no.footGhost} onClick={onClose}>
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
