"use client";

import React, { useState, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

const PROVINSI = [
  "Nanggroe Aceh Darussalam",
  "Sumatra Utara",
  "Sumatera Barat",
  "Riau",
  "Kepulauan Riau",
  "Jambi",
  "Bengkulu",
  "Sumatera Selatan",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "DKI Jakarta",
  "Jawa Barat",
  "Banten",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Gorontalo",
  "Sulawesi Tengah",
  "Sulawesi Barat",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Maluku",
  "Maluku Utara",
  "Papua",
  "Papua Barat",
  "Papua Barat Daya",
];

const POPULAR_CITIES = [
  "Bali",
  "DI Yogyakarta",
  "Jawa Tengah",
  "Jawa Barat",
  "Lombok (NTB)",
  "Labuan Bajo (NTT)",
  "Bandung",
  "Magelang",
];

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckSm({ color = "var(--atr-purple)" }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LocationModal({ state }) {
  const [q, setQ] = useState("");
  const [draft, setDraft] = useState(state.activeLocations);

  useEffect(() => {
    setDraft(state.activeLocations);
  }, [state.openLoc, state.activeLocations]);

  useEffect(() => {
    if (!state.openLoc) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.openLoc]);

  if (!state.openLoc) return null;

  const filtered = PROVINSI.filter((p) => p.toLowerCase().includes(q.toLowerCase()));

  function toggle(p) {
    setDraft(draft.includes(p) ? draft.filter((x) => x !== p) : [...draft, p]);
  }

  return (
    <div style={pesanStyles.scrim} onClick={() => state.setOpenLoc(false)}>
      <div style={{ ...pesanStyles.modal, maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div style={pesanStyles.modalHeader}>
          <button style={pesanStyles.modalCloseBtn} onClick={() => state.setOpenLoc(false)}>
            <CloseIcon />
          </button>
          <h3 style={pesanStyles.modalTitle}>Pilih Lokasi</h3>
          <button style={pesanStyles.modalGhostBtn} onClick={() => setDraft([])}>
            Reset
          </button>
        </div>
        <div style={pesanStyles.modalBody}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--atr-bg-soft)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 18,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              placeholder="Cari provinsi atau kota…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                flex: 1,
                fontSize: 14,
                fontFamily: "var(--atr-font-sans)",
              }}
            />
          </div>

          {!q && (
            <div style={pesanStyles.modalSection}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--atr-text-muted)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Populer
              </div>
              <div style={pesanStyles.chipGrid}>
                {POPULAR_CITIES.map((p) => {
                  const on = draft.includes(p);
                  return (
                    <button
                      key={p}
                      style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                      onClick={() => toggle(p)}
                    >
                      {on && <CheckSm color="var(--atr-purple)" />} {p}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--atr-text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Semua Provinsi
          </div>
          <div style={pesanStyles.chipGrid}>
            {filtered.map((p) => {
              const on = draft.includes(p);
              return (
                <button
                  key={p}
                  style={{ ...pesanStyles.chipSelect, ...(on ? pesanStyles.chipSelectOn : {}) }}
                  onClick={() => toggle(p)}
                >
                  {on && <CheckSm color="var(--atr-purple)" />} {p}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <span style={{ color: "var(--atr-text-muted)", fontSize: 13 }}>
                Tidak ada hasil untuk "{q}".
              </span>
            )}
          </div>
        </div>
        <div style={pesanStyles.modalFooter}>
          <span style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>{draft.length} lokasi dipilih</span>
          <button
            style={pesanStyles.modalApplyBtn}
            onClick={() => {
              state.setActiveLocations(draft);
              state.setOpenLoc(false);
            }}
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
