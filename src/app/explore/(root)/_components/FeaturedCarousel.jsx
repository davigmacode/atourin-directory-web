"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/cards";
import ex from "@/styles/explore-styles";

const ITEMS_PER_SLIDE = 4;
const GAP = 16;

export default function FeaturedCarousel({ featured = [], isLoading = false }) {
  const [idx, setIdx] = useState(0);
  const viewportRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  const maxIdx = Math.max(0, featured.length - ITEMS_PER_SLIDE);

  useEffect(() => {
    function measure() {
      if (!viewportRef.current) return;
      const vw = viewportRef.current.offsetWidth;
      // 4 cards + 3 gaps fill the viewport exactly
      setCardWidth((vw - GAP * (ITEMS_PER_SLIDE - 1)) / ITEMS_PER_SLIDE);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const translateX = idx * (cardWidth + GAP);

  const getFeaturedRoute = (item) => {
    const type = item.type;
    const titleLower = item.title.toLowerCase();
    let slug = titleLower.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (titleLower.includes("pentingsari")) slug = "pentingsari";
    if (titleLower.includes("borobudur")) slug = "borobudur-sunrise";
    if (titleLower.includes("lombok")) slug = "lombok-lengkap-3d2n";
    if (titleLower.includes("bali slow")) slug = "bali-slow-travel-7d";
    if (titleLower.includes("danau toba")) slug = "danau-toba-samosir";

    if (type === "Itinerary") return `/explore/itinerary/${slug}`;
    if (type === "Desa Wisata") return `/explore/tourism-villages/${slug}`;
    if (type === "Atraksi") return `/explore/attractions/${slug}`;
    return "/explore";
  };

  const cardStyle = {
    ...ex.featCard,
    flex: `0 0 ${cardWidth > 0 ? `${cardWidth}px` : "calc(25% - 12px)"}`,
    width: cardWidth > 0 ? cardWidth : undefined,
  };

  const skeletonCard = (i) => (
    <div key={i} style={cardStyle}>
      <div
        style={{
          ...ex.featImgWrap,
          background: "var(--atr-outline)",
        }}
      />
      <div style={ex.featBody}>
        <div
          style={{
            height: 14,
            background: "var(--atr-outline)",
            borderRadius: 6,
            width: "80%",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div
            style={{
              height: 12,
              background: "var(--atr-outline)",
              borderRadius: 6,
              width: "50%",
            }}
          />
          <div
            style={{
              height: 12,
              background: "var(--atr-outline)",
              borderRadius: 6,
              width: "20%",
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{"\u2728"} Sedang trending</div>
          <h2 style={ex.secTitle}>Pilihan editor minggu ini</h2>
        </div>
        <div style={ex.carouselNav}>
          <button
            onClick={() => setIdx(Math.max(0, idx - 1))}
            style={{ ...ex.navBtn, ...(idx === 0 ? ex.navBtnDisabled : {}) }}
          >
            {"\u2039"}
          </button>
          <button
            onClick={() => setIdx(Math.min(maxIdx, idx + 1))}
            style={{
              ...ex.navBtn,
              ...(idx === maxIdx ? ex.navBtnDisabled : {}),
            }}
          >
            {"\u203A"}
          </button>
        </div>
      </div>
      <div ref={viewportRef} style={ex.carouselViewport}>
        <div
          style={{
            ...ex.carouselTrack,
            gap: GAP,
            transform: `translateX(-${translateX}px)`,
          }}
        >
          {isLoading
            ? Array.from({ length: ITEMS_PER_SLIDE }).map((_, i) => skeletonCard(i))
            : featured.map((f, i) => (
                <Link
                  href={getFeaturedRoute(f)}
                  key={i}
                  style={{ textDecoration: "none", color: "inherit", flex: cardStyle.flex }}
                >
                  <article style={{ ...cardStyle, flex: "1 1 auto" }}>
                    <div style={ex.featImgWrap}>
                      <SafeImage src={f.img} alt="" style={ex.featImg} />
                      <span style={{ ...ex.featBadge, background: f.typeColor }}>
                        {f.type}
                      </span>
                    </div>
                    <div style={{ ...ex.featBody, flex: 1 }}>
                      <div style={ex.featTitle}>{f.title}</div>
                      <div style={ex.featFooter}>
                        <span style={ex.featLoc}>
                          {"\uD83D\uDCCD"} {f.loc}
                        </span>
                        <span style={ex.featRating}>
                          {"\u2605"} {f.rating}
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
        </div>
      </div>
      {!isLoading && (
        <div style={ex.carouselDots}>
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{ ...ex.cDot, ...(i === idx ? ex.cDotActive : {}) }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
