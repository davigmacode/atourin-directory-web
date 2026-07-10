"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cardStyles } from "@/styles/attraction-styles";

/* ── Icons ── */
function PinSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StarFill() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}

/* ── Card Style Object ── */
const gc = {
  card: {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid var(--atr-outline)",
    overflow: "hidden",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "transform .25s ease, box-shadow .25s ease",
    cursor: "pointer",
  },
  topRow: { display: "flex", gap: 14, alignItems: "flex-start" },
  avatarWrap: { position: "relative", flexShrink: 0 },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 999,
    objectFit: "cover",
    border: "3px solid #fff",
    boxShadow: "0 0 0 2px var(--atr-purple-light)",
  },
  verifiedDot: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 999,
    background: "var(--atr-purple)",
    border: "2px solid #fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  info: { flex: 1, minWidth: 0 },
  name: {
    fontSize: 16,
    fontWeight: 700,
    color: "var(--atr-text)",
    lineHeight: 1.2,
  },
  region: {
    fontSize: 12,
    color: "var(--atr-text-muted)",
    marginTop: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    marginTop: 6,
  },
  ratingStrong: { fontWeight: 700, color: "var(--atr-text)" },
  ratingMeta: { color: "var(--atr-text-muted)" },
  specRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  spec: {
    fontSize: 11,
    fontWeight: 700,
    padding: "4px 10px",
    borderRadius: 999,
    letterSpacing: "0.02em",
  },
  langRow: { display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" },
  langLabel: { fontSize: 11, color: "var(--atr-text-muted)", marginRight: 2 },
  lang: {
    fontSize: 10,
    fontWeight: 700,
    color: "var(--atr-text)",
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    padding: "3px 7px",
    borderRadius: 4,
    letterSpacing: "0.04em",
  },
  certs: { display: "flex", gap: 4, flexWrap: "wrap" },
  cert: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    fontSize: 10,
    fontWeight: 700,
    padding: "3px 8px",
    borderRadius: 4,
    background: "rgba(81,176,84,0.12)",
    color: "#2D8838",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTop: "1px solid var(--atr-outline)",
  },
  exp: { fontSize: 11, color: "var(--atr-text-muted)" },
  price: { display: "flex", flexDirection: "column", alignItems: "flex-end" },
  priceFrom: { fontSize: 10, color: "var(--atr-text-muted)" },
  priceVal: {
    fontSize: 16,
    fontWeight: 700,
    color: "var(--atr-purple)",
    lineHeight: 1,
  },
  priceUnit: { fontSize: 11, color: "var(--atr-text-muted)" },
};

/* ── GuideCard ── */
export function GuideCard({
  name,
  img,
  region,
  spec,
  specBg,
  specFg,
  langs,
  certs,
  rating,
  trips,
  price,
  exp,
  verified,
}) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  return (
    <article
      style={{
        ...gc.card,
        ...(hover
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 24px rgba(31,27,51,0.08)",
            }
          : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/tour-guides/${slug}`)}
    >
      <div style={gc.topRow}>
        <div style={gc.avatarWrap}>
          <img src={img} alt="" style={gc.avatar} />
          {verified && (
            <div style={gc.verifiedDot}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
        <div style={gc.info}>
          <div style={gc.name}>{name}</div>
          <div style={gc.region}>
            <PinSm /> {region}
          </div>
          <div style={gc.rating}>
            <StarFill />
            <span style={gc.ratingStrong}>{rating}</span>
            <span style={gc.ratingMeta}>
              {" \u00B7"} {trips} trip
            </span>
          </div>
        </div>
      </div>

      <div style={gc.specRow}>
        {spec.map((s) => (
          <span
            key={s}
            style={{ ...gc.spec, background: specBg, color: specFg }}
          >
            {s}
          </span>
        ))}
      </div>

      <div style={gc.langRow}>
        <span style={gc.langLabel}>Bahasa:</span>
        {langs.map((l) => (
          <span key={l} style={gc.lang}>
            {l}
          </span>
        ))}
      </div>

      <div style={gc.certs}>
        {certs.map((c) => (
          <span key={c} style={gc.cert}>
            {"\u2713"} {c}
          </span>
        ))}
      </div>

      <div style={gc.footer}>
        <span style={gc.exp}>
          {"\uD83C\uDF92"} {exp} pengalaman
        </span>
        <div style={gc.price}>
          <span style={gc.priceFrom}>mulai dari</span>
          <span>
            <span style={gc.priceVal}>
              Rp {(price / 1000).toLocaleString("id-ID")}rb
            </span>
            <span style={gc.priceUnit}> /hari</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function SkeletonGuideCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...gc.card, pointerEvents: "none" }}>
      <div style={gc.topRow}>
        <div
          style={{
            ...gc.avatar,
            background: "var(--atr-outline)",
            border: "none",
          }}
        />
        <div style={gc.info}>
          <div
            style={{ ...skeletonBg, height: 16, width: "70%", marginBottom: 6 }}
          />
          <div
            style={{ ...skeletonBg, height: 12, width: "50%", marginBottom: 6 }}
          />
          <div style={{ ...skeletonBg, height: 12, width: "60%" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 10 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{ ...skeletonBg, height: 22, width: `${60 + i * 10}px` }}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <div style={{ ...skeletonBg, height: 12, width: 50 }} />
        {[1, 2].map((i) => (
          <div key={i} style={{ ...skeletonBg, height: 22, width: 55 }} />
        ))}
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        {[1, 2].map((i) => (
          <div
            key={i}
            style={{ ...skeletonBg, height: 24, width: `${80 + i * 20}px` }}
          />
        ))}
      </div>

      <div style={gc.footer}>
        <div style={{ ...skeletonBg, height: 14, width: "35%" }} />
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              ...skeletonBg,
              height: 10,
              width: 50,
              marginLeft: "auto",
              marginBottom: 4,
            }}
          />
          <div
            style={{
              ...skeletonBg,
              height: 16,
              width: 80,
              marginLeft: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function GuidesLoading() {
  return (
    <div style={cardStyles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonGuideCard key={i} />
      ))}
    </div>
  );
}

function GuidesError({ message }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#C44949",
      }}
    >
      <div style={{ fontSize: 14 }}>
        Gagal memuat data: {message || "Terjadi kesalahan"}
      </div>
    </div>
  );
}

function GuidesEmpty() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "var(--atr-text-muted)",
      }}
    >
      <div style={{ fontSize: 14 }}>
        Tidak ada tour guide yang cocok dengan filter kamu.
      </div>
    </div>
  );
}

export default function GuidesGrid({
  data = [],
  loadMore,
  hasMore,
  isLoading,
  isError,
  error,
  total,
}) {
  if (isError) return <GuidesError message={error?.message} />;
  if (!isLoading && data.length === 0) return <GuidesEmpty />;

  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDC64"} Direktori tour guide
          </div>
          <h2 style={cardStyles.railTitle}>Pemandu lokal terverifikasi</h2>
        </div>
      </div>
      {isLoading && data.length === 0 ? (
        <GuidesLoading />
      ) : (
        <>
          <div style={cardStyles.grid}>
            {data.map((g, i) => (
              <GuideCard key={g.id ?? i} {...g} />
            ))}
          </div>
          <div style={cardStyles.paginationRow}>
            {hasMore && (
              <button style={cardStyles.loadMore} onClick={loadMore}>
                Muat 24 guide lagi
              </button>
            )}
            <div style={cardStyles.pageInfo}>
              Menampilkan {data.length} dari {total ?? data.length}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
