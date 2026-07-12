"use client";

import React, { useState } from "react";
import { PinIcon, ChatIcon, EditIcon, ShareIcon, BookmarkIcon, PrintIcon, MoreIcon } from "./Shared";

const ghStyles = {
  hero: {
    position: "relative",
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(31,27,51,0.05)",
  },
  heroTop: {
    position: "relative",
  },
  cover: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    zIndex: 1,
  },
  coverImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  coverOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(31,27,51,0) 30%, rgba(31,27,51,0.55) 100%)",
    zIndex: 1,
  },
  coverEditBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    color: "var(--atr-text)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    zIndex: 2,
  },
  heroBody: {
    display: "grid",
    gridTemplateColumns: "176px 1fr auto",
    gap: 28,
    padding: "192px 36px 28px",
    alignItems: "flex-end",
    position: "relative",
    zIndex: 2,
  },
  avatarWrap: { position: "relative" },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 20,
    border: "5px solid #fff",
    boxShadow: "0 8px 24px rgba(31,27,51,0.15)",
    objectFit: "cover",
    display: "block",
  },
  avBadge: {
    position: "absolute",
    bottom: 6,
    right: 6,
    background: "var(--atr-purple)",
    color: "#fff",
    width: 36,
    height: 36,
    borderRadius: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid #fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  identCol: { paddingBottom: 16 },
  identBadges: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
  superhost: {
    background: "linear-gradient(135deg, #FFC442 0%, #FF8A00 100%)",
    color: "#3D2900",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  verifiedHero: {
    background: "var(--atr-purple)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  arti: {
    background: "rgba(81,176,84,0.12)",
    color: "var(--atr-arti)",
    fontSize: 11,
    fontWeight: 700,
    padding: "5px 11px",
    borderRadius: 999,
    letterSpacing: "0.04em",
    border: "1px solid rgba(81,176,84,0.3)",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
  },
  name: {
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "var(--atr-text)",
    lineHeight: 1.1,
    margin: "4px 0 6px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  nameCheck: { color: "var(--atr-purple)", fontSize: 24 },
  tagline: {
    fontSize: 15,
    color: "var(--atr-text-muted)",
    margin: 0,
    fontStyle: "italic",
  },
  identMeta: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 12,
    fontSize: 13,
    color: "var(--atr-text)",
  },
  identMetaItem: { display: "inline-flex", alignItems: "center", gap: 6 },
  identMetaDot: { color: "var(--atr-outline)" },
  langRow: { display: "flex", gap: 4, alignItems: "center" },
  langFlag: { fontSize: 18 },

  ctaCol: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    paddingBottom: 16,
    minWidth: 200,
  },
  followBtn: {
    background: "var(--atr-purple)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 22px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    boxShadow: "0 6px 16px rgba(112,104,213,0.3)",
  },
  followBtnOn: {
    background: "#fff",
    color: "var(--atr-purple)",
    border: "1.5px solid var(--atr-purple)",
    boxShadow: "none",
  },
  msgBtn: {
    background: "#fff",
    color: "var(--atr-text)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 10,
    padding: "11px 22px",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  iconRow: { display: "flex", gap: 6, justifyContent: "flex-end" },
  iconSqBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    background: "#fff",
    border: "1px solid var(--atr-outline)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--atr-text)",
  },

  /* Stats strip */
  statsStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    borderTop: "1px solid var(--atr-outline)",
  },
  statCell: {
    padding: "20px 22px",
    borderRight: "1px solid var(--atr-outline)",
    textAlign: "center",
  },
  statCellLast: { borderRight: "none" },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--atr-text)",
    letterSpacing: "-0.01em",
  },
  statValuePurple: { color: "var(--atr-purple)" },
  statValueYellow: { color: "var(--atr-yellow)" },
  statLabel: {
    fontSize: 11,
    color: "var(--atr-text-muted)",
    marginTop: 4,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  statStars: {
    fontSize: 11,
    color: "var(--atr-yellow)",
    letterSpacing: "0.05em",
    marginTop: 2,
  },
};

export default function DetailHero({ guide }) {
  const [followed, setFollowed] = useState(false);
  const coverUrl =
    guide.cover ||
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1800&auto=format&fit=crop&q=80";

  return (
    <div style={ghStyles.hero}>
      <div style={ghStyles.heroTop}>
        {/* Cover image */}
        <div style={ghStyles.cover}>
          <img src={coverUrl} alt="Cover" style={ghStyles.coverImg} />
          <div style={ghStyles.coverOverlay} />
          <button style={ghStyles.coverEditBtn}>
            <EditIcon /> Ubah Cover
          </button>
        </div>

        {/* Hero Body Info */}
        <div style={ghStyles.heroBody}>
          <div style={ghStyles.avatarWrap}>
            <img src={guide.img} alt={guide.name} style={ghStyles.avatar} />
            {guide.verified && (
              <div style={ghStyles.avBadge}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="#fff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          <div style={ghStyles.identCol}>
            <div style={ghStyles.identBadges}>
              <span style={ghStyles.superhost}>{"\u2605"} SUPERHOST</span>
              <span style={ghStyles.verifiedHero}>VERIFIED GUIDE</span>
              <span style={ghStyles.arti}>HPI MEMBER</span>
            </div>
            <h1 style={ghStyles.name}>
              {guide.name}
              {guide.verified && <span style={ghStyles.nameCheck}>&#x2713;</span>}
            </h1>
            <p style={ghStyles.tagline}>
              {guide.tagline || `Spesialis Pemandu Wisata di ${guide.region}`}
            </p>
            <div style={ghStyles.identMeta}>
              <span style={ghStyles.identMetaItem}>
                <PinIcon color="var(--atr-text-muted)" /> {guide.region}
              </span>
              <span style={ghStyles.identMetaDot}>{"\u00B7"}</span>
              <span style={ghStyles.identMetaItem}>
                {"\uD83D\uDCBC"} {guide.exp || "5+ tahun"} pengalaman
              </span>
              <span style={ghStyles.identMetaDot}>{"\u00B7"}</span>
              <span style={ghStyles.langRow}>
                <span style={ghStyles.langFlag}>🇮🇩</span>
                <span style={ghStyles.langFlag}>🇬🇧</span>
              </span>
            </div>
          </div>
          <div style={ghStyles.ctaCol}>
            <button
              style={{
                ...ghStyles.followBtn,
                ...(followed ? ghStyles.followBtnOn : {}),
              }}
              onClick={() => setFollowed(!followed)}
            >
              {followed ? "Mengikuti" : "Ikuti Pemandu"}
            </button>
            <button
              style={ghStyles.msgBtn}
              onClick={() => alert(`Mengirim pesan ke ${guide.name}...`)}
            >
              <ChatIcon /> Pesan
            </button>
            <div style={ghStyles.iconRow}>
              <button style={ghStyles.iconSqBtn}>
                <ShareIcon />
              </button>
              <button style={ghStyles.iconSqBtn}>
                <BookmarkIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={ghStyles.statsStrip}>
        <div style={ghStyles.statCell}>
          <div style={{ ...ghStyles.statValue, ...ghStyles.statValuePurple }}>
            {guide.rating || "4.9"}
          </div>
          <div style={ghStyles.statStars}>
            {"\u2B50\u2B50\u2B50\u2B50\u2B50"}
          </div>
          <div style={ghStyles.statLabel}>Peringkat</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={ghStyles.statValue}>{guide.trips || "120"}</div>
          <div style={ghStyles.statLabel}>Total Trip</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={ghStyles.statValue}>{"< 1 jam"}</div>
          <div style={ghStyles.statLabel}>Respon Chat</div>
        </div>
        <div style={ghStyles.statCell}>
          <div style={ghStyles.statValue}>{"99%"}</div>
          <div style={ghStyles.statLabel}>Tingkat Balasan</div>
        </div>
        <div style={{ ...ghStyles.statCell, ...ghStyles.statCellLast }}>
          <div style={ghStyles.statValue}>
            Rp {((guide.price || 850000) / 1000).toLocaleString("id-ID")}rb
          </div>
          <div style={ghStyles.statLabel}>Tarif Harian</div>
        </div>
      </div>
    </div>
  );
}
