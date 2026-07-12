"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { hm } from "@/styles/home-styles";

/* ── Global Hero Icons ── */
export const HI = {
  search: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.9" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  ),
  pin: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  star: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFC442">
      <path d="M12 2l3 6.5 7 .7-5.2 4.8 1.5 6.9L12 18.6 5.2 20.9l1.5-6.9L1.5 9.2l7-.7L12 2z" />
    </svg>
  ),
  heart: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 20s-7-4.6-9.3-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.3 6.5C19 15.4 12 20 12 20z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
  arrowR: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevL: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  chevR: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sparkle: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  camera: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  ticket: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4V8z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  home: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-6 8 6M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  village: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M3 21V11l5-4 5 4M13 21V8l4-3 4 3v13M3 21h18M7 14v3M17 12v3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  guide: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  tag: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12.5V5a2 2 0 012-2h7.5a2 2 0 011.4.6l6.5 6.5a2 2 0 010 2.8l-7.6 7.6a2 2 0 01-2.8 0L3.6 13.9A2 2 0 013 12.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  ),
  route: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M6 8.5V14a4 4 0 004 4h4M18 15.5V10a4 4 0 00-4-4h-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  doc: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h8l4 4v14H6V3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13 3v5h5M9 13h6M9 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  help: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9.5 9.5a2.5 2.5 0 014.7 1.2c0 1.7-2.2 2-2.2 3.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  ),
  leaf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 15c2-3 5-5 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  verified: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.2 1.6 2.7-.2 1 2.5 2.2 1.6-.6 2.6.6 2.6-2.2 1.6-1 2.5-2.7-.2L12 21l-2.2-1.6-2.7.2-1-2.5L3.9 15.5l.6-2.6-.6-2.6L6.1 8l1-2.5 2.7.2L12 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  shield: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  play: (
    <svg width="20" height="22" viewBox="0 0 24 24">
      <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1 9.4-9.4v-.2L3.7 2.2z" fill="#00C3FF" />
      <path d="M16.8 15.4l-3.2-3.2v-.2l3.2-3.2.1.1 3.7 2.1c1.1.6 1.1 1.6 0 2.2l-3.7 2.1z" fill="#FFCE00" />
      <path d="M16.9 15.3L13.6 12 3.6 21.9c.4.4.9.4 1.6.1l11.7-6.7z" fill="#00DE76" />
      <path d="M16.9 8.7L5.2 2.1c-.7-.4-1.2-.4-1.6 0L13.6 12z" fill="#FF3A44" />
    </svg>
  ),
  apple: (
    <svg width="20" height="22" viewBox="0 0 24 24" fill="#fff">
      <path d="M17.5 12.5c0-2.7 2.2-4 2.3-4-1.2-1.8-3.2-2-3.9-2.1-1.6-.2-3.2 1-4 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.6 2.8-2 3.4-.5 8.5 1.4 11.3.9 1.4 2 2.9 3.5 2.9 1.4-.1 1.9-.9 3.6-.9 1.6 0 2.1.9 3.6.9 1.5 0 2.4-1.4 3.3-2.8.7-1 1-2 1.3-3-3.2-1.2-2.9-3.7-2.9-5.1zM14.7 4c.7-.9 1.2-2.2 1-3.5-1.1.1-2.5.8-3.2 1.7-.7.8-1.3 2.1-1.1 3.4 1.2.1 2.5-.6 3.3-1.6z" />
    </svg>
  ),
};

function detailHref(cat) {
  if (cat === "Attraction") return "/market/attractions";
  if (cat === "Homestay") return "/market/homestay";
  return "/market/experience";
}

/* ── CAROUSEL ── */
export function Carousel({ children }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 580, behavior: "smooth" });
  };
  return (
    <div style={hm.carouselWrap}>
      <button style={{ ...hm.arrowBtn, left: -18 }} className="hm-arrow" onClick={() => scroll(-1)} aria-label="Sebelumnya">
        {HI.chevL}
      </button>
      <div ref={ref} style={hm.carousel} className="hm-carousel">
        {children}
      </div>
      <button style={{ ...hm.arrowBtn, right: -18 }} className="hm-arrow" onClick={() => scroll(1)} aria-label="Berikutnya">
        {HI.chevR}
      </button>
    </div>
  );
}

/* ── PRODUCT CARD ── */
export function ProductCardH({ p, onSave }) {
  const [liked, setLiked] = useState(false);
  const pct = p.priceOld ? Math.round(((p.priceOld - p.price) / p.priceOld) * 100) : 0;

  function toggleLike(e) {
    e.stopPropagation();
    const next = !liked;
    setLiked(next);
    if (next && onSave) onSave(p);
  }

  return (
    <article style={hm.prodCard} className="hm-prod">
      <Link href={detailHref(p.cat)} style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={hm.prodMedia}>
          <img src={p.img} alt="" style={hm.prodImg} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
          <span style={hm.prodCatTag}>{p.cat}</span>
          {pct > 0 && <span style={hm.prodDiscTag}>Hemat {pct}%</span>}
          <button style={hm.prodHeart} className="hm-heart" aria-label={liked ? "Hapus dari wishlist" : "Simpan"} aria-pressed={liked} onClick={toggleLike}>
            <img src={liked ? "assets/atr/heart-like.png" : "assets/atr/heart-unlike.png"} alt="" style={{ width: 19, height: 19, display: "block", objectFit: "contain" }} />
          </button>
          <span style={hm.prodRateChip}>
            {HI.star} {p.rating.toString().replace(".", ",")} <span style={hm.prodRateRev}>({p.reviews})</span>
          </span>
        </div>
        <div style={hm.prodBody}>
          <span style={hm.prodCity}>
            {HI.pin} {p.city}
          </span>
          <div style={hm.prodTitle}>{p.title}</div>
          <div style={hm.prodPriceBlock}>
            {pct > 0 && (
              <div style={hm.prodPriceWasRow}>
                <span style={hm.prodPriceWas}>Rp {p.priceOld.toLocaleString("id-ID")}</span>
                <span style={hm.prodOffBadge}>-{pct}%</span>
              </div>
            )}
            <div style={hm.prodPriceNowRow}>
              <span style={hm.prodPrice}>Rp {p.price.toLocaleString("id-ID")}</span>
              <span style={hm.prodPer}>/ orang</span>
            </div>
          </div>
          <div style={hm.prodDivider} />
          <div style={hm.prodOp}>
            <span style={hm.prodOpDot}>{p.operator[0]}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {p.operator}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ── PROMO CARD ── */
const PROMO_TONE_H = { purple: "var(--atr-purple)", green: "#2F8A3B", blue: "#2F6FA5", red: "var(--atr-red)" };
export function PromoCardH({ p }) {
  return (
    <div style={hm.promoCard} className="hm-promo">
      <Link href="/market/experience" style={{ textDecoration: "none", color: "inherit" }}>
        <img src={p.img} alt="" style={hm.promoImg} onError={(e) => { e.currentTarget.style.opacity = 0; }} />
        <div style={hm.promoScrim} />
        <div style={hm.promoContent}>
          <span style={{ ...hm.promoBadge, background: PROMO_TONE_H[p.tone] }}>{p.badge}</span>
          <div>
            <div style={hm.promoTitle}>{p.title}</div>
            <div style={hm.promoMeta}>Berlaku {p.period}</div>
            <span style={hm.promoCode}>{p.code}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ── VILLAGE CARD ── */
export function VillageCardH({ v }) {
  return (
    <div style={hm.villageCard} className="hm-village">
      <Link href="/tourism-villages" style={{ textDecoration: "none", color: "inherit" }}>
        <img src={v.img} alt="" style={hm.villageImg} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
        <div style={hm.villageScrim} />
        <span style={hm.villageBadge}>
          {HI.star} {v.rating.toString().replace(".", ",")}
        </span>
        <div style={hm.villageBody}>
          <div style={hm.villageName}>{v.name}</div>
          <div style={hm.villageRegion}>
            {HI.pin} {v.region}
          </div>
          <div style={hm.villageCount}>{v.count} aktivitas tersedia</div>
        </div>
      </Link>
    </div>
  );
}

/* ── ARTICLE CARD ── */
export function ArticleCardH({ a }) {
  return (
    <article style={hm.artCard} className="hm-art">
      <Link href="/explore-hub" style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", height: "100%" }}>
        <img src={a.img} alt="" style={hm.artImg} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
        <div style={hm.artBody}>
          <div style={hm.artMeta}>
            <span style={hm.artCat}>{a.cat}</span>
            <span style={hm.artDate}>{a.date}</span>
          </div>
          <div style={hm.artTitle}>{a.title}</div>
          <div style={hm.artExcerpt}>{a.excerpt}</div>
          <span style={{ ...hm.secLink, fontSize: 13, marginTop: "auto" }}>
            Baca selengkapnya {HI.arrowR}
          </span>
        </div>
      </Link>
    </article>
  );
}

/* ── VOUCHER COUPON CARD ── */
function TicketGlyph() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 8a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 000-4V8z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M14 6v12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function CopyGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.9" />
      <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export function VoucherCardH({ v }) {
  const [copied, setCopied] = useState(false);

  function copy(e) {
    if (e) e.stopPropagation();
    try {
      navigator.clipboard?.writeText(v.code);
    } catch (err) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div style={hm.voucherCard}>
      <div style={hm.voucherTop}>
        <span style={hm.voucherTicket}>
          <TicketGlyph />
        </span>
        <div>
          <div style={hm.voucherVal}>{v.value}</div>
          <div style={hm.voucherKind}>{v.kind}</div>
        </div>
      </div>
      <div>
        <div style={hm.voucherTitle}>{v.title}</div>
        <div style={hm.voucherPartner}>
          {HI.pin} {v.partner}
        </div>
      </div>
      <div style={hm.voucherDash}>
        <span style={hm.voucherNotchL} />
        <span style={hm.voucherNotchR} />
      </div>
      <div style={hm.voucherCodeRow}>
        <span style={hm.voucherCode}>{v.code}</span>
        <button style={hm.voucherCopy} onClick={copy}>
          <CopyGlyph /> {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
      <div style={hm.voucherFoot}>
        <span style={hm.voucherMin}>{v.min}</span>
        <span style={hm.voucherTnc} onClick={(e) => e.stopPropagation()}>
          S&amp;K
        </span>
      </div>
    </div>
  );
}
