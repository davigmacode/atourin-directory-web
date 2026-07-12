"use client";

import React from "react";
import Link from "next/link";
import {
  AIW_OUTLINE,
  AIW_RED,
  AIW_PURPLE,
  AIW_YELLOW,
  AIW_MUTED,
  AIW_DARK,
  AIW_TEXT,
  AIW_GREEN,
  AIW_LIGHT,
} from "@/styles/assistant-styles";

/* ── Product Card ── */
export function WCardProduct({ image, title, location, rating, reviews, price, oldPrice, badge }) {
  return (
    <div
      style={{
        width: 280,
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${AIW_OUTLINE}`,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          aspectRatio: "5/3",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {badge && (
          <span
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: AIW_RED,
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              padding: "3px 7px",
              borderRadius: 4,
              letterSpacing: 0.3,
            }}
          >
            {badge}
          </span>
        )}
        <span
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: 9999,
            background: "rgba(255,255,255,.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: AIW_PURPLE,
            fontSize: 14,
          }}
        >
          ♡
        </span>
      </div>
      <div style={{ padding: "11px 13px 13px" }}>
        <div style={{ fontSize: 10.5, color: AIW_MUTED, marginBottom: 3 }}>📍 {location}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: AIW_DARK, lineHeight: 1.25 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5, fontSize: 11, color: AIW_MUTED }}>
          <span style={{ color: AIW_YELLOW, fontSize: 12 }}>★</span>
          <span style={{ fontWeight: 600, color: AIW_TEXT }}>{rating}</span>
          <span>· {reviews} ulasan</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 9 }}>
          <div>
            {oldPrice && (
              <div style={{ fontSize: 10, color: "#A0A1A3", textDecoration: "line-through" }}>{oldPrice}</div>
            )}
            <div style={{ fontSize: 15, fontWeight: 700, color: AIW_PURPLE }}>{price}</div>
          </div>
          <button
            style={{
              height: 34,
              padding: "0 16px",
              border: "none",
              borderRadius: 8,
              background: AIW_PURPLE,
              color: "#fff",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onClick={() => alert("Pesan hotel/homestay")}
          >
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Carousel Card ── */
export function WCardCarousel({ items }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {items.map((it, i) => (
        <Link
          key={i}
          href="/itinerary"
          style={{
            width: 188,
            background: "#fff",
            borderRadius: 12,
            border: `1px solid ${AIW_OUTLINE}`,
            overflow: "hidden",
            textDecoration: "none",
            color: AIW_DARK,
            boxShadow: "0 1px 4px rgba(0,0,0,.04)",
          }}
        >
          <div
            style={{
              aspectRatio: "4/3",
              backgroundImage: `url(${it.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {it.badge && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  background: AIW_PURPLE,
                  color: "#fff",
                  fontSize: 8,
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: 3,
                }}
              >
                {it.badge}
              </span>
            )}
          </div>
          <div style={{ padding: "9px 11px 11px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, lineHeight: 1.2 }}>{it.title}</div>
            <div style={{ fontSize: 10, color: AIW_MUTED, marginTop: 3 }}>📍 {it.location}</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: AIW_PURPLE, marginTop: 5 }}>{it.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ── Itinerary Card ── */
export function WCardItinerary({ dayNum, dayLabel, items }) {
  return (
    <div
      style={{
        width: 300,
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${AIW_OUTLINE}`,
        padding: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 11 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: AIW_PURPLE,
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          }}
        >
          <div style={{ fontSize: 7.5, opacity: 0.9 }}>HARI</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{dayNum}</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: AIW_DARK }}>{dayLabel}</div>
          <div style={{ fontSize: 10.5, color: AIW_MUTED }}>{items.length} aktivitas</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 9 }}>
            <div
              style={{
                width: 38,
                fontSize: 10.5,
                color: AIW_PURPLE,
                fontWeight: 700,
                flexShrink: 0,
                paddingTop: 1,
              }}
            >
              {it.time}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: AIW_DARK, lineHeight: 1.3 }}>{it.title}</div>
              <div style={{ fontSize: 10.5, color: AIW_MUTED, marginTop: 1 }}>📍 {it.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Weather Card ── */
export function WCardWeather({ location, days }) {
  return (
    <div
      style={{
        width: 300,
        background: "linear-gradient(135deg,#E4E6F3,#F1F0FB)",
        borderRadius: 14,
        border: `1px solid ${AIW_OUTLINE}`,
        padding: 13,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, color: AIW_MUTED }}>Cuaca di</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: AIW_DARK }}>{location}</div>
        </div>
        <div
          style={{
            fontSize: 11,
            color: AIW_GREEN,
            fontWeight: 600,
            background: "#fff",
            padding: "4px 9px",
            borderRadius: 9999,
          }}
        >
          ☀ Cerah
        </div>
      </div>
      <div style={{ display: "flex", gap: 7 }}>
        {days.map((d, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: "rgba(255,255,255,.7)",
              borderRadius: 10,
              padding: "9px 4px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 9.5, color: AIW_MUTED, fontWeight: 600 }}>{d.day}</div>
            <div style={{ fontSize: 19, margin: "3px 0" }}>{d.icon}</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: AIW_DARK }}>{d.tempH}°</div>
            <div style={{ fontSize: 9.5, color: AIW_MUTED }}>{d.tempL}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Map Card ── */
export function WCardMap({ title, location }) {
  return (
    <div
      style={{
        width: 300,
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${AIW_OUTLINE}`,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div
        style={{
          height: 140,
          background: "#E8EEF6",
          position: "relative",
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(180,212,179,.45), transparent 40%), radial-gradient(circle at 70% 65%, rgba(218,225,237,.6), transparent 40%)",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 300 140" style={{ position: "absolute", inset: 0 }}>
          <path d="M-10 90 Q 90 45 175 70 T 310 55" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path
            d="M48 -10 Q 80 70 115 100 T 150 150"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity=".7"
          />
        </svg>
        {[{ x: 70, y: 60 }, { x: 150, y: 82 }, { x: 225, y: 55 }].map((p, i) => (
          <svg
            key={i}
            width="26"
            height="32"
            viewBox="0 0 24 30"
            style={{ position: "absolute", left: p.x, top: p.y, transform: "translate(-50%,-100%)" }}
          >
            <path
              d="M12 0 C5.4 0 0 5.4 0 12 C0 21 12 30 12 30 S24 21 24 12 C24 5.4 18.6 0 12 0 Z"
              fill={AIW_PURPLE}
            />
            <circle cx="12" cy="11" r="4" fill="#fff" />
          </svg>
        ))}
      </div>
      <div style={{ padding: "11px 13px 13px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: AIW_DARK }}>{title}</div>
        <div style={{ fontSize: 10.5, color: AIW_MUTED, marginTop: 2 }}>📍 {location}</div>
        <button
          style={{
            marginTop: 9,
            height: 32,
            padding: "0 13px",
            border: `1px solid ${AIW_PURPLE}`,
            borderRadius: 8,
            background: "#fff",
            color: AIW_PURPLE,
            fontSize: 11.5,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onClick={() => window.open(`https://maps.google.com/?q=${location}`, "_blank")}
        >
          Buka di peta ›
        </button>
      </div>
    </div>
  );
}

/* ── Booking Card ── */
export function WCardBooking({ title, image, date, guests, total }) {
  return (
    <div
      style={{
        width: 300,
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${AIW_OUTLINE}`,
        padding: 13,
        boxShadow: "0 2px 8px rgba(0,0,0,.05)",
      }}
    >
      <div style={{ display: "flex", gap: 11 }}>
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 10,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: AIW_DARK, lineHeight: 1.25 }}>{title}</div>
          <div style={{ fontSize: 10.5, color: AIW_MUTED, marginTop: 4, display: "flex", flexDirection: "column", gap: 2 }}>
            <span>📅 {date}</span>
            <span>👥 {guests}</span>
          </div>
        </div>
      </div>
      <div
        style={{
          borderTop: `1px dashed ${AIW_OUTLINE}`,
          marginTop: 11,
          paddingTop: 11,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: 9.5, color: AIW_MUTED }}>Total</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: AIW_PURPLE }}>{total}</div>
        </div>
        <button
          style={{
            height: 38,
            padding: "0 18px",
            border: "none",
            borderRadius: 8,
            background: AIW_PURPLE,
            color: "#fff",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            textDecoration: "none",
          }}
          onClick={() => alert("Lanjut bayar booking")}
        >
          Lanjut bayar →
        </button>
      </div>
    </div>
  );
}
