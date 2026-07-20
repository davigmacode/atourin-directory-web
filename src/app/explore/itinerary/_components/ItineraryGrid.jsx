"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SafeImage } from "@/components/cards";
import { cardStyles } from "@/styles/attraction-styles";

/* ── Custom Icons ── */
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

function ClockSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HeartIcon({ filled, color = "var(--atr-text)" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "var(--atr-red)" : "none"}
    >
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"
        stroke={filled ? "var(--atr-red)" : color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── ItinCard Component ── */
export function ItinCard({
  img,
  days,
  city,
  tag,
  title: titleProp,
  name: nameProp,
  author,
  role,
  price,
  rating,
  ratingAverage,
  reviews,
  reviewsCount,
  views,
  destination,
  durationDays,
  durationNights,
  budgetEstimation,
  save: initialSave,
  day1,
  slug: slugProp,
}) {
  // Handle both old-style (flat) and new-style (nested API) data
  const title = titleProp || nameProp?.id || nameProp?.en || '';
  const desc = city || destination?.name || '';
  const dayLabel = days || (durationDays ? `${durationDays} Hari` : '') + (durationNights ? ` · ${durationNights} Malam` : '');
  const rtg = rating || ratingAverage || 0;
  const rvw = reviews || reviewsCount || 0;
  const src = img || '';
  const priceLabel = price ? price : 
    typeof budgetEstimation === 'number' ? `Rp ${(budgetEstimation / 1000).toFixed(0)}rb` : '';

  const [save, setSave] = useState(initialSave);
  const [hover, setHover] = useState(false);
  const router = useRouter();
  const slug = slugProp || title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

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
      onClick={() => router.push(`/explore/itinerary/${slug}`)}
    >
      <div style={cardStyles.cardImgWrap}>
        <SafeImage src={src} alt="" style={cardStyles.cardImg} />
        <span style={cardStyles.cardTag}>{tag || ''}</span>
        <button
          style={{
            ...cardStyles.cardSave,
            ...(save ? cardStyles.cardSaveOn : {}),
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSave(!save);
          }}
        >
          <HeartIcon filled={save} color={save ? "#fff" : "var(--atr-text)"} />
        </button>
        <div style={cardStyles.cardImgBottom}>
          <span style={cardStyles.cardDaysPill}>
            <ClockSm /> {dayLabel}
          </span>
          <span style={cardStyles.cardCityPill}>
            <PinSm /> {desc}
          </span>
        </div>
      </div>
      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardTitle}>{title}</h3>
        <div style={cardStyles.cardDayPreview}>
          <span style={cardStyles.dayLabel}>Hari 1:</span>
          {day1?.map((d, i) => (
            <React.Fragment key={d}>
              <span style={cardStyles.dayPoint}>{d}</span>
              {i < day1.length - 1 && (
                <span style={cardStyles.dayDot}>{" \u00B7"}</span>
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={cardStyles.cardFooter}>
          <div style={cardStyles.cardAuthor}>
            <div style={cardStyles.authorAvatar}>{typeof author === 'object' ? (author.name?.[0] || author.displayName?.[0] || '') : (author?.[0] || '')}</div>
            <div>
              <div style={cardStyles.cardAuthorName}>{typeof author === 'object' ? (author.name || author.displayName || '') : (author || '')}</div>
              <div style={cardStyles.cardAuthorRole}>{typeof author === 'object' ? '' : (role || '')}</div>
            </div>
          </div>
          <div style={cardStyles.cardMeta}>
            <div style={cardStyles.ratingRow}>
              <StarFill /> <strong>{rtg}</strong>
              <span style={cardStyles.reviewCount}>({rvw})</span>
            </div>
            <div style={cardStyles.priceRow}>
              <span style={cardStyles.priceFrom}>mulai</span>
              <span style={cardStyles.priceVal}>{priceLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ── ItineraryGrid Component ── */
export default function ItineraryGrid({
  data = [],
  isLoading,
  isError,
  loadMore,
  hasMore,
  totalCount,
}) {
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>
            {"\uD83D\uDCD2"} Direktori itinerary
          </div>
          <h2 style={cardStyles.railTitle}>Semua rute publik</h2>
        </div>
      </div>

      {isError && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--atr-text-muted)",
          }}
        >
          <p style={{ fontSize: 18, marginBottom: 12 }}>
            Gagal memuat itinerary. Silakan coba lagi.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "var(--atr-purple)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Muat ulang
          </button>
        </div>
      )}

      {isLoading && (
        <div style={cardStyles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                ...cardStyles.card,
                background: "#f5f5f5",
                borderRadius: 12,
                minHeight: 340,
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && data.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--atr-text-muted)",
          }}
        >
          <p style={{ fontSize: 18 }}>
            Belum ada itinerary yang cocok dengan filter kamu.
          </p>
        </div>
      )}

      {!isLoading && data.length > 0 && (
        <>
          <div style={cardStyles.grid}>
            {data.map((it, i) => (
              <ItinCard key={it.id || i} {...it} />
            ))}
          </div>
          <div style={cardStyles.paginationRow}>
            {hasMore && (() => {
              const remaining = totalCount ? totalCount - data.length : 0;
              const nextLoadCount = remaining > 0 ? Math.min(12, remaining) : 12;
              return (
                <button style={cardStyles.loadMore} onClick={loadMore}>
                  Muat {nextLoadCount} itinerary lagi
                </button>
              );
            })()}
            <div style={cardStyles.pageInfo}>
              Menampilkan {data.length.toLocaleString("id-ID")}
              {totalCount ? ` dari ${totalCount.toLocaleString("id-ID")}` : ""}
            </div>
          </div>
        </>
      )}
    </section>
  );
}
