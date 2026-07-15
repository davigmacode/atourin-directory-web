"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/cards";
import { cardStyles as cardStylesRaw } from "@/styles/attraction-styles";
import { HeartIcon, ClockSm, PinSm, StarFill } from "./FilterBar";
import type { Attraction } from "@/types/attraction";

const cardStyles = cardStylesRaw as Record<string, React.CSSProperties>;

export function SkeletonCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...cardStyles.card, pointerEvents: "none" }}>
      <div
        style={{ ...cardStyles.cardImgWrap, background: "var(--atr-outline)" }}
      />
      <div style={cardStyles.cardBody}>
        <div
          style={{ ...skeletonBg, height: 18, width: "70%", marginBottom: 4 }}
        />
        <div style={{ ...skeletonBg, height: 13, width: "50%" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <div style={{ ...skeletonBg, height: 12, width: "35%" }} />
          <div style={{ ...skeletonBg, height: 12, width: "30%" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
            paddingTop: 10,
            borderTop: "1px solid var(--atr-outline)",
          }}
        >
          <div style={{ ...skeletonBg, height: 14, width: 80 }} />
          <div style={{ ...skeletonBg, height: 12, width: 70 }} />
        </div>
      </div>
    </div>
  );
}

function getTimezoneAbbreviation(tz: string): string {
  if (tz === "Asia/Jakarta") return "WIB";
  if (tz === "Asia/Makassar") return "WITA";
  if (tz === "Asia/Jayapura") return "WIT";
  return "";
}

function getOpeningHoursDisplay(oh: any): string {
  if (!oh) return "";
  if (oh.is24Hours) return "24 Jam";
  
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const todayIndex = new Date().getDay();
  const todayName = days[todayIndex];
  const todayPeriods = oh.periods?.[todayName];
  
  if (!todayPeriods || todayPeriods.length === 0) {
    return "Tutup Hari Ini";
  }
  
  const tzAbbrev = getTimezoneAbbreviation(oh.timezone);
  const tzSuffix = tzAbbrev ? ` ${tzAbbrev}` : "";
  return todayPeriods.map((p: any) => `${p.open}–${p.close}`).join(", ") + tzSuffix;
}

interface AttrCardProps {
  a: Attraction;
  save: boolean;
  onSave: () => void;
}

export function AttrCard({ a, save, onSave }: AttrCardProps) {
  const [hover, setHover] = useState(false);
  const router = useRouter();

  const mainCategory = a.categories?.[0];
  const catBg = mainCategory?.metadata?.color || "#EDE9FF";
  const catFg = "var(--atr-purple)";
  
  const regionText = a.destination
    ? `${a.destination.name}, ${a.destination.province?.name || ""}`
    : "";

  return (
    <article
      style={{
        ...cardStyles.card,
        ...(hover
          ? {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 24px rgba(31,27,51,0.08)",
            }
          : {}),
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => router.push(`/explore/attractions/${a.slug}`)}
    >
      <div style={cardStyles.cardImgWrap}>
        <SafeImage src={a.coverImage?.url ?? ""} alt={a.name} style={cardStyles.cardImg} />
        {mainCategory && (
          <span
            style={{ ...cardStyles.cardTag, background: catBg, color: catFg }}
          >
            {mainCategory.name}
          </span>
        )}
        <button
          style={{
            ...cardStyles.cardSave,
            ...(save ? cardStyles.cardSaveOn : {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
        >
          <HeartIcon filled={save} color={save ? "#fff" : "var(--atr-text)"} />
        </button>
        {a.trekking && (
          <div style={cardStyles.cardImgBottom}>
            <span
              style={{
                ...cardStyles.cardDaysPill,
                background: "rgba(180,122,0,0.92)",
              }}
            >
              🥾 Perlu trekking
            </span>
          </div>
        )}
      </div>

      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardTitle}>{a.name}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--atr-text-muted)",
          }}
        >
          <PinSm /> {regionText}
        </div>
        <div
          style={{
            display: "flex",
            gap: 10,
            fontSize: 12,
            color: "var(--atr-text-muted)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 4 }}
          >
            <ClockSm /> {getOpeningHoursDisplay(a.openingHours)}
          </span>
          {a.price === 0 ? (
            <span style={{ color: "#2D8838", fontWeight: 700 }}>
              · Gratis masuk
            </span>
          ) : (
            <span>
              · Tiket Rp {(a.price / 1000).toLocaleString("id-ID")}rb
            </span>
          )}
        </div>
        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={cardStyles.ratingRow}>
            <StarFill /> <strong>{a.ratingAverage}</strong>
            <span style={cardStyles.reviewCount}>({a.reviewsCount} review)</span>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--atr-purple)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Lihat detail →
          </span>
        </div>
      </div>
    </article>
  );
}

interface AttractionGridProps {
  data: Attraction[];
  loadMore: () => void;
  hasMore: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function AttractionGrid({ data, loadMore, hasMore, pagination }: AttractionGridProps) {
  const [saved, setSaved] = useState<Record<number, boolean>>({});
  function toggleSave(i: number) {
    setSaved((prev) => ({ ...prev, [i]: !prev[i] }));
  }
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDCCD"} Direktori atraksi
          </div>
          <h2 style={cardStyles.railTitle}>Semua tempat wisata</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {(data || []).map((a, i) => (
          <AttrCard
            key={a.id || i}
            a={a}
            save={saved[i] ?? false}
            onSave={() => toggleSave(i)}
          />
        ))}
      </div>
      <div style={cardStyles.paginationRow}>
        {hasMore && (
          <button style={cardStyles.loadMore} onClick={loadMore}>
            Muat 24 atraksi lagi
          </button>
        )}
        <div style={cardStyles.pageInfo}>
          Menampilkan {data.length} dari{" "}
          {pagination?.total?.toLocaleString("id-ID") || data.length}
        </div>
      </div>
    </section>
  );
}
