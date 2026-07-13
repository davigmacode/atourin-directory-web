"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/cards";
import rg from "@/styles/destination-styles";

export function ChevDownSm({ rotated }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: "transform .2s",
        transform: rotated ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="var(--atr-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DestinationCard({ d }) {
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const slug = d.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");
  return (
    <div
      onClick={() => router.push(`/explore/destinations/${slug}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...rg.destCard,
        ...(hover ? rg.destCardHover : {}),
        cursor: "pointer",
      }}
    >
      <div style={rg.destImgWrap}>
        <SafeImage src={d.img} alt="" style={rg.destImg} />
        <span style={rg.destTypeBadge}>{d.type}</span>
        {d.marketProducts > 0 && (
          <span style={rg.destMarketBadge}>
            {"\uD83D\uDED2"} {d.marketProducts} produk
          </span>
        )}
        {hover && (
          <div style={rg.destHoverOverlay}>
            <span style={rg.destHoverCTA}>
              Jelajahi {d.name} {"\u2192"}
            </span>
          </div>
        )}
      </div>
      <div style={rg.destBody}>
        <div style={rg.destHeaderRow}>
          <div style={{ flex: 1 }}>
            <h3 style={rg.destName}>{d.name}</h3>
            <div style={rg.destProvRow}>
              <span style={rg.destProv}>{d.province}</span>
              <span style={rg.destIslandPill}>{d.island}</span>
            </div>
          </div>
          <div style={rg.destRating}>
            <span style={rg.destStar}>{"\u2605"}</span>
            <strong>{d.rating}</strong>
          </div>
        </div>

        <div style={rg.destStatsBar}>
          <div style={rg.destStat}>
            <strong>{d.attr}</strong> <span>Atraksi</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.desa}</strong> <span>Desa</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.itin}</strong> <span>Itinerary</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.guide}</strong> <span>Pemandu</span>
          </div>
        </div>

        <div style={rg.destTagRow}>
          {d.tags.slice(0, 3).map((t) => (
            <span key={t} style={rg.destTag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...rg.destCard, pointerEvents: "none" }}>
      <div style={{ ...rg.destImgWrap, background: "var(--atr-outline)" }} />
      <div style={rg.destBody}>
        <div
          style={{ ...skeletonBg, height: 20, width: "65%", marginBottom: 8 }}
        />
        <div
          style={{ ...skeletonBg, height: 14, width: "45%", marginBottom: 12 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ ...skeletonBg, height: 22, flex: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ErrorBanner() {
  return (
    <div style={rg.empty}>
      <div style={rg.emptyIcon}>{"\u26A0\uFE0F"}</div>
      <div style={rg.emptyTitle}>Gagal memuat data destinasi</div>
      <div style={rg.emptySub}>Silakan periksa koneksi kamu dan coba lagi</div>
    </div>
  );
}
