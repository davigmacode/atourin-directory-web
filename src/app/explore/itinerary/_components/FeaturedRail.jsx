"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cardStyles } from "@/styles/attraction-styles";

/* ── Icons ── */
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

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Feature Sub-components ── */
function FeatureBig() {
  const [save, setSave] = useState(false);
  return (
    <article style={cardStyles.featBig}>
      <img
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70"
        alt=""
        style={cardStyles.featBigImg}
      />
      <div style={cardStyles.featBigOverlay} />
      <div style={cardStyles.featBigBadge}>
        <span style={cardStyles.editorBadge}>EDITOR'S PICK</span>
      </div>
      <div
        style={cardStyles.saveTopRight}
        onClick={(e) => {
          e.stopPropagation();
          setSave(!save);
        }}
      >
        <HeartIcon filled={save} color={save ? "#fff" : "var(--atr-text)"} />
      </div>
      <div style={cardStyles.featBigBody}>
        <div style={cardStyles.featBigMeta}>
          <span style={cardStyles.featBigChip}>7 Hari {"\u00B7"} 6 Malam</span>
          <span style={cardStyles.featBigChip}>Bali</span>
          <span style={cardStyles.featBigChip}>Family</span>
        </div>
        <h3 style={cardStyles.featBigTitle}>
          Bali Slow Travel, Ubud, Sidemen & Amed tanpa terburu-buru
        </h3>
        <p style={cardStyles.featBigDesc}>
          Trekking sawah Tegallalang, kelas memasak Bali, snorkeling USS
          Liberty. 18 aktivitas, semua transportasi & rekomendasi warung lokal.
        </p>
        <div style={cardStyles.featBigFooter}>
          <div style={cardStyles.authorRow}>
            <img
              src="https://i.pravatar.cc/80?img=12"
              style={cardStyles.authorImg}
              alt=""
            />
            <div>
              <div style={cardStyles.authorName}>Putu Adi Wirawan</div>
              <div style={cardStyles.authorRole}>
                Tour Guide bersertifikat {"\u00B7"} Bali
              </div>
            </div>
          </div>
          <div style={cardStyles.featBigBudget}>
            <div style={cardStyles.budgetLabel}>Estimasi budget</div>
            <div style={cardStyles.budgetVal}>
              Rp 4.2jt
              <span style={cardStyles.budgetUnit}>/orang</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function FeatureSmall({ img, tag, days, title, author, budget }) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <Link href={`/explore/itinerary/${slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <article style={cardStyles.featSmall}>
        <div style={cardStyles.featSmallImgWrap}>
          <img src={img} alt="" style={cardStyles.featSmallImg} />
          <span style={cardStyles.featSmallTag}>{tag}</span>
        </div>
        <div style={cardStyles.featSmallBody}>
          <div style={cardStyles.featSmallDays}>{days}</div>
          <h4 style={cardStyles.featSmallTitle}>{title}</h4>
          <div style={cardStyles.featSmallFooter}>
            <span style={cardStyles.featSmallAuthor}>{author}</span>
            <span style={cardStyles.featSmallBudget}>{budget}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function FeaturedRail() {
  return (
    <section style={cardStyles.rail}>
      <div style={cardStyles.railHeader}>
        <div>
          <div style={cardStyles.eyebrow}>{"\u2728"} Pilihan kurator</div>
          <h2 style={cardStyles.railTitle}>Rute terbaik minggu ini</h2>
        </div>
        <Link href="/explore/itinerary" style={cardStyles.railLink}>
          Lihat semua kurasi <ArrowRight />
        </Link>
      </div>
      <div style={cardStyles.railGrid}>
        <Link href="/explore/itinerary/bali-slow-travel-7d" style={{ textDecoration: "none", color: "inherit" }}>
          <FeatureBig />
        </Link>
        <div style={cardStyles.railSide}>
          <FeatureSmall
            img="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=70"
            tag="Honeymoon"
            days={"5 Hari \u00B7 4 Malam"}
            title="Raja Ampat untuk Berdua"
            author="Andini Mahardika"
            budget="Rp 8.4jt"
          />
          <FeatureSmall
            img="https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=70"
            tag="Adventure"
            days={"3 Hari \u00B7 2 Malam"}
            title="Sunrise Bromo & Madakaripura"
            author="Catur Hidayat"
            budget="Rp 1.6jt"
          />
        </div>
      </div>
    </section>
  );
}
