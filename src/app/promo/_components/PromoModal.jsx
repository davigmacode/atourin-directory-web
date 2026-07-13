"use client";

import React, { useState } from "react";
import { pr, PROMO_TONE } from "@/styles/promo-styles";
import { PROMO_CATS } from "@/data/promo-data";

function IcClock() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IcTag() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M3 11.5V5a2 2 0 012-2h6.5L21 12.5 12.5 21 3 11.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function IcCopy() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}
function IcArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function IcWallet() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M16 12h.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
function IcDevice() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IcCal2() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function IcDot() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PromoModal({ p, onClose }) {
  const tone = PROMO_TONE[p.badgeTone] || PROMO_TONE.purple;
  const catLabel = (PROMO_CATS.find((c) => c.id === p.cat) || {}).label || "Promo";
  const [copied, setCopied] = useState(false);
  function copy() {
    try {
      navigator.clipboard?.writeText(p.code);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }
  const terms = [
    `Berlaku untuk transaksi ${catLabel === "Promo" ? "produk Atourin" : catLabel.toLowerCase()} yang memenuhi syarat.`,
    `${p.min}.`,
    "Promo tidak dapat digabung dengan voucher lain pada satu transaksi.",
    "Atourin berhak membatalkan transaksi yang terindikasi kecurangan.",
  ];
  return (
    <div style={pr.scrim} onClick={onClose}>
      <div style={pr.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        {/* hero */}
        <div style={pr.modalHero}>
          <img
            src={p.image}
            alt=""
            style={pr.modalHeroImg}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
          <div style={pr.modalHeroScrim} />
          <span style={{ ...pr.modalBadge, background: tone.bg }}>{p.badge}</span>
          <button style={pr.modalClose} onClick={onClose} aria-label="Tutup">
            <IcClose />
          </button>
          <div style={pr.modalHeroText}>
            <span style={pr.modalCat}>
              <IcTag /> {catLabel}
            </span>
            <div style={pr.modalTitle}>{p.title}</div>
          </div>
        </div>

        {/* body */}
        <div style={pr.modalBody}>
          <div style={pr.modalDesc}>{p.desc}</div>

          <div style={pr.detailBox}>
            <div style={pr.detailHead}>Detail Promo</div>
            <div style={pr.detailGrid}>
              <div style={pr.detailCell}>
                <span style={pr.detailLabel}>
                  <IcClock /> Periode Tersedia
                </span>
                <span style={pr.detailVal}>{p.period}</span>
              </div>
              <div style={pr.detailCell}>
                <span style={pr.detailLabel}>
                  <IcWallet /> Syarat Transaksi
                </span>
                <span style={pr.detailVal}>{p.min}</span>
              </div>
              <div style={pr.detailCell}>
                <span style={pr.detailLabel}>
                  <IcCal2 /> Periode Penggunaan
                </span>
                <span style={pr.detailVal}>Sesuai periode promo</span>
              </div>
              <div style={pr.detailCell}>
                <span style={pr.detailLabel}>
                  <IcDevice /> Platform
                </span>
                <span style={pr.detailVal}>Semua Platform</span>
              </div>
              <div style={pr.detailCell}>
                <span style={pr.detailLabel}>Status</span>
                <span style={{ ...pr.detailVal, ...pr.detailValGreen }}>● Tersedia</span>
              </div>
            </div>
          </div>

          <div>
            <div style={pr.termsHead}>Syarat &amp; Ketentuan</div>
            <ul style={pr.termsList}>
              {terms.map((tx, i) => (
                <li key={i} style={pr.termItem}>
                  <span style={pr.termDot}>
                    <IcDot />
                  </span>
                  <span>{tx}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div style={pr.modalCodeLabel}>Salin kode promo di bawah ini</div>
            <div style={pr.modalCodeRow}>
              <span style={pr.modalCodeVal}>{p.code}</span>
              <button style={pr.modalCodeCopy} onClick={copy}>
                <IcCopy /> {copied ? "Tersalin" : "Salin"}
              </button>
            </div>
          </div>
        </div>

        {/* foot */}
        <div style={pr.modalFoot}>
          <button style={pr.modalUseBtn} onClick={() => alert("Menggunakan promo ini...")}>
            Pakai Promo Sekarang <IcArrow />
          </button>
        </div>
      </div>
    </div>
  );
}
