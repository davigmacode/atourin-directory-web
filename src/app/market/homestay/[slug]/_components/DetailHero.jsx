"use client";

import React from "react";
import { hp } from "@/styles/homestay-detail-styles";
import { ds } from "@/styles/detail-styles";

/* ── SVG Icons ── */
export function PinSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ShareSvg() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HeartSvg({ filled }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"}>
      <path
        d="M12 21s-7-4.5-7-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0119 10c0 6.5-7 11-7 11z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatusChip({ open }) {
  return (
    <span style={{ ...ds.statusChip, ...(open ? ds.statusOpen : ds.statusClosed) }}>
      <span style={{ ...ds.statusDot, background: open ? "#1F7A21" : "#8C2A2B" }} />
      {open ? "Buka Sekarang" : "Tutup"}
    </span>
  );
}

/* ── GALLERY VIEW ── */
export function HomestayGallery({ data }) {
  return (
    <section style={hp.gallery}>
      <div style={hp.galleryRow}>
        <div style={hp.galleryMain}>
          <img src={data.images[0]} alt="" style={hp.galleryMainImg} />
        </div>
        <div style={hp.galleryThumbCol}>
          <div style={hp.galleryThumbRow}>
            <div style={hp.galleryThumb}>
              <img src={data.images[1]} alt="" style={hp.galleryThumbImg} />
            </div>
            <div style={hp.galleryThumb}>
              <img src={data.images[2]} alt="" style={hp.galleryThumbImg} />
            </div>
          </div>
          <div style={hp.galleryThumbRow}>
            <div style={hp.galleryThumb}>
              <img src={data.images[3]} alt="" style={hp.galleryThumbImg} />
            </div>
            <div style={hp.galleryThumb}>
              <img src={data.images[4]} alt="" style={hp.galleryThumbImg} />
              <div style={hp.galleryMoreOverlay}>
                <div style={hp.galleryMoreNum}>+{data.totalPhotos - 5}</div>
                <div style={hp.galleryMoreLabel}>Lihat semua</div>
              </div>
            </div>
          </div>
        </div>
        <button style={hp.galleryFloatBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>{" "}
          Lihat semua foto ({data.totalPhotos})
        </button>
      </div>
    </section>
  );
}

/* ── CINEMATIC VIEW ── */
export function HomestayCinematic({ data, isSaved, onShare, onSave }) {
  return (
    <section style={hp.cineWrap}>
      <div style={hp.cineHero}>
        <img src={data.images[0]} alt="" style={hp.cineImg} />
        <div style={hp.cineGrad} />
        <div style={hp.cineContent}>
          <div style={hp.badgeRow}>
            {data.badges.map((b, i) => (
              <span key={i} style={{ ...hp.badge, background: b.bg, color: b.fg }}>
                <span>{b.emoji}</span> {b.label}
              </span>
            ))}
          </div>
          <h1 style={hp.cineTitle}>{data.name}</h1>
          <div style={hp.cineMeta}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><PinSm /> {data.shortLocation}</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
            <span>🏡 {data.capacity}</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>·</span>
            <span>🕒 {data.hours}</span>
          </div>
        </div>
        <div style={hp.cineActions}>
          <button style={hp.cineActionBtn} onClick={onShare}>
            <ShareSvg />
          </button>
          <button
            onClick={onSave}
            style={{ ...hp.cineActionBtn, ...(isSaved ? { background: "var(--atr-purple)", color: "#fff" } : {}) }}
          >
            <HeartSvg filled={isSaved} />
          </button>
        </div>
        <button style={hp.galleryFloatBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
            <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="13" y="13" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          </svg>{" "}
          {data.totalPhotos} foto
        </button>
      </div>
      <div style={hp.cineThumbRow}>
        {data.images.slice(1, 5).map((src, i) => (
          <div key={i} style={hp.cineThumb}>
            <img src={src} alt="" style={hp.cineThumbImg} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── HEADER CARD ── */
export function HomestayHeaderCard({ data, isSaved, onShare, onSave }) {
  return (
    <div style={hp.headerCard}>
      <div style={hp.badgeRow}>
        {data.badges.map((b, i) => (
          <span key={i} style={{ ...hp.badge, background: b.bg, color: b.fg }}>
            <span>{b.emoji}</span> {b.label}
          </span>
        ))}
        <span style={{ flex: 1 }} />
        <StatusChip open={data.isOpen} />
      </div>

      <div style={hp.titleRow}>
        <div style={hp.titleCol}>
          <h1 style={hp.title}>{data.name}</h1>
          <div style={{ ...hp.metaRow, marginTop: 8 }}>
            <span style={hp.metaItem}>
              <PinSm /> {data.address.split(", ").slice(2, 5).join(", ")}
            </span>
            <a href="#lokasi" style={hp.metaLink}>
              · Lihat di Maps →
            </a>
            <span style={hp.metaDot}>·</span>
            <span style={hp.metaItem}>
              {data.reviewCount > 0 ? (
                <>
                  <span style={hp.metaStar}>★</span>
                  <strong>{data.rating}</strong>
                  <span style={{ color: "var(--atr-text-muted)" }}>({data.reviewCount} ulasan)</span>
                </>
              ) : (
                <span style={{ color: "var(--atr-text-muted)" }}>Belum ada ulasan</span>
              )}
            </span>
            <span style={hp.metaDot}>·</span>
            <span style={{ ...hp.metaItem, color: "var(--atr-text-muted)" }}>
              🛒 {data.soldCount} sudah dipesan
            </span>
          </div>
          <a href="#host" style={{ ...hp.hostPreview, marginTop: 12, alignSelf: "flex-start" }}>
            <img src={data.host.avatar} alt="" style={hp.hostPreviewAv} />
            <div style={hp.hostPreviewText}>
              <span style={hp.hostPreviewLabel}>Tuan rumah</span>
              <span style={hp.hostPreviewName}>
                {data.host.name}{" "}
                <span style={{ color: "var(--atr-text-muted)", fontWeight: 500 }}>
                  · {data.host.since}
                </span>
              </span>
            </div>
          </a>
        </div>
        <div style={hp.titleAction}>
          <button style={hp.actionBtn} onClick={onShare}>
            <ShareSvg /> Bagikan
          </button>
          <button style={{ ...hp.actionBtn, ...(isSaved ? hp.actionBtnOn : {}) }} onClick={onSave}>
            <HeartSvg filled={isSaved} /> {isSaved ? "Tersimpan" : "Simpan"}
          </button>
          <button
            style={{
              ...hp.actionBtn,
              color: "var(--atr-purple)",
              borderColor: "var(--atr-purple-light)",
              background: "var(--atr-purple-50)",
            }}
            onClick={() => alert("Link affiliate disalin — dapat 3% komisi per booking")}
          >
            ↗ Komisi
          </button>
          <button style={hp.actionBtn} onClick={() => alert("Diunduh untuk offline")}>
            ↓ Offline
          </button>
        </div>
      </div>

      <div style={hp.quickRow}>
        <div style={hp.quickCell}>
          <span style={hp.quickIcon}>🛏</span>
          <div>
            <div style={hp.quickLabel}>Kapasitas</div>
            <div style={hp.quickVal}>{data.capacity}</div>
          </div>
        </div>
        <div style={hp.quickCell}>
          <span style={hp.quickIcon}>🚪</span>
          <div>
            <div style={hp.quickLabel}>Kamar</div>
            <div style={hp.quickVal}>
              {data.rooms} kamar · {data.bathrooms} k.mandi
            </div>
          </div>
        </div>
        <div style={hp.quickCell}>
          <span style={hp.quickIcon}>🍳</span>
          <div>
            <div style={hp.quickLabel}>Sarapan</div>
            <div style={hp.quickVal}>Termasuk</div>
          </div>
        </div>
        <div style={hp.quickCell}>
          <span style={hp.quickIcon}>🕒</span>
          <div>
            <div style={hp.quickLabel}>Jam check-in/out</div>
            <div style={hp.quickVal}>14:00 / 12:00</div>
          </div>
        </div>
      </div>

      <div style={hp.tagRow}>
        {data.tags.map((t) => (
          <span key={t} style={hp.tag}>
            #{t}
          </span>
        ))}
      </div>
      <p style={hp.shortDesc}>{data.shortDesc}</p>
    </div>
  );
}
