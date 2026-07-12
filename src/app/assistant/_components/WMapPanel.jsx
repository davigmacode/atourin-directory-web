"use client";

import React from "react";
import {
  AIW_OUTLINE,
  AIW_DARK,
  AIW_MUTED,
  AIW_PURPLE,
  AIW_LIGHT,
  AIW_50,
} from "@/styles/assistant-styles";

const AIW_MAP_NEARBY = [
  { image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=300&q=70", title: "Pulau Padar (trekking sunrise)", dist: "1,2 km", price: "Rp 150K", rating: 4.95 },
  { image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=300&q=70", title: "Pink Beach snorkeling", dist: "2,5 km", price: "Rp 200K", rating: 4.85 },
  { image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=300&q=70", title: "Manta Point", dist: "3,8 km", price: "Rp 200K", rating: 4.9 },
];

export default function WMapPanel() {
  return (
    <div style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 460 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#E8EEF6",
          backgroundImage:
            "radial-gradient(circle at 25% 30%, rgba(180,212,179,.55), transparent 30%), radial-gradient(circle at 75% 24%, rgba(180,212,179,.4), transparent 32%), radial-gradient(circle at 80% 72%, rgba(218,225,237,.7), transparent 40%)",
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 500" preserveAspectRatio="none" style={{ position: "absolute", inset: 0 }}>
          <path d="M-20 180 Q 180 110 340 150 T 640 130" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M90 -20 Q 150 180 250 280 T 320 520" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".9" />
          <path d="M440 -10 Q 490 160 410 320 T 470 520" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".85" />
        </svg>
        {[{ x: 26, y: 32, hl: true, price: "150K" }, { x: 60, y: 26, price: "200K" }, { x: 46, y: 58, price: "200K" }, { x: 74, y: 50 }].map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%,-100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {p.price && (
              <div
                style={{
                  background: p.hl ? AIW_PURPLE : "#fff",
                  color: p.hl ? "#fff" : AIW_DARK,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "3px 9px",
                  borderRadius: 9999,
                  marginBottom: 2,
                  border: p.hl ? "none" : `1px solid ${AIW_OUTLINE}`,
                  whiteSpace: "nowrap",
                }}
              >
                {p.price}
              </div>
            )}
            <svg width={p.hl ? 32 : 26} height={p.hl ? 40 : 32} viewBox="0 0 24 30">
              <path
                d="M12 0 C5.4 0 0 5.4 0 12 C0 21 12 30 12 30 S24 21 24 12 C24 5.4 18.6 0 12 0 Z"
                fill={p.hl ? AIW_PURPLE : "#fff"}
                stroke={p.hl ? "#fff" : AIW_PURPLE}
                strokeWidth={p.hl ? 2 : 1.5}
              />
              <circle cx="12" cy="11" r="4" fill={p.hl ? "#fff" : AIW_PURPLE} />
            </svg>
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "46%",
            transform: "translate(-50%,-50%)",
            width: 16,
            height: 16,
            borderRadius: 9999,
            background: AIW_PURPLE,
            border: "3px solid #fff",
            boxShadow: "0 0 0 7px rgba(112,104,213,.2)",
          }}
        />
      </div>

      {/* nearby panel */}
      <div
        style={{
          position: "absolute",
          right: 18,
          top: 18,
          bottom: 18,
          width: 300,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 28px rgba(0,0,0,.14)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: `1px solid ${AIW_OUTLINE}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=100&auto=format&fit=crop&q=70"
            style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover" }}
            alt=""
          />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: AIW_DARK }}>3 spot seru di dekatmu</div>
            <div style={{ fontSize: 11, color: AIW_MUTED }}>Sekitar Labuan Bajo · terdekat</div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
          {AIW_MAP_NEARBY.map((it, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                padding: 9,
                marginBottom: 8,
                background: i === 0 ? AIW_50 : "#fff",
                border: `1px solid ${i === 0 ? AIW_LIGHT : AIW_OUTLINE}`,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 8, backgroundImage: `url(${it.image})`, backgroundSize: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: AIW_DARK, lineHeight: 1.2 }}>{it.title}</div>
                <div style={{ fontSize: 10.5, color: AIW_MUTED, marginTop: 2 }}>📍 {it.dist} · ★ {it.rating}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: AIW_PURPLE, marginTop: 2 }}>{it.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
