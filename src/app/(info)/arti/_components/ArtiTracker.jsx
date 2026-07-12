"use client";

import React from "react";
import { ar, G_COLOR } from "@/styles/arti-styles";
import { ARTI_GROWTH, ARTI_UPDATES } from "@/data/arti-data";

export default function ArtiTracker() {
  return (
    <div>
      <div style={ar.sectionH}>Lacak pohonmu</div>
      <div style={ar.sectionSub}>Pantau satu pohon dari kebunmu secara langsung.</div>
      <div style={ar.card}>
        <div style={ar.trackerHero}>
          <img
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 35%, rgba(31,27,59,0.72) 100%)",
            }}
          />
          <div style={{ position: "absolute", left: 16, bottom: 14, color: "#fff" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(255,255,255,0.2)",
                padding: "3px 10px",
                borderRadius: 999,
                fontSize: 10.5,
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7BC97F" }} /> ARTI
              TREE #12
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.015em" }}>Pohon Beringin</div>
            <div style={{ fontSize: 12.5, opacity: 0.9, marginTop: 3 }}>📍 Desa Liang Ndara, Manggarai · NTT</div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--atr-text-muted)", fontWeight: 600 }}>
                Status pertumbuhan
              </div>
              <div
                style={{
                  fontSize: 15.5,
                  fontWeight: 800,
                  color: G_COLOR,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 3,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: G_COLOR }} /> Sehat &amp;
                tumbuh
              </div>
            </div>
            <div style={{ fontSize: 30 }}>🌳</div>
          </div>

          <div style={ar.growthRow}>
            {ARTI_GROWTH.map((g, i) => (
              <div
                key={i}
                style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
              >
                <span style={{ fontSize: 20 + i * 4, lineHeight: 1, opacity: g.done || g.active ? 1 : 0.3 }}>
                  {g.e}
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: g.active ? 800 : 500,
                    color: g.active ? "var(--atr-purple)" : "var(--atr-text-muted)",
                  }}
                >
                  {g.s}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
            {[
              { v: "8 bln", l: "Umur" },
              { v: "1,2 m", l: "Tinggi" },
              { v: "20,7 kg", l: "CO₂ tersimpan" },
            ].map((s, i, arr) => (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  borderRight: i < arr.length - 1 ? "1px solid var(--atr-outline)" : "none",
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 800, color: G_COLOR }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "var(--atr-text-muted)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FARMER */}
      <div style={ar.farmerCard}>
        <img
          src="https://i.pravatar.cc/80?img=68"
          alt=""
          style={{ width: 48, height: 48, borderRadius: "50%" }}
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", fontWeight: 600 }}>
            Petani penjaga
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, marginTop: 1 }}>Bapak Yohanes</div>
          <div style={{ fontSize: 11.5, color: "var(--atr-text-muted)", marginTop: 2 }}>
            Desa Liang Ndara · Sudah jaga 247 pohon
          </div>
        </div>
        <button
          onClick={() => alert("Mengirimkan pesan ke Bapak Yohanes...")}
          style={{
            background: "var(--atr-purple-50)",
            color: "var(--atr-purple)",
            border: "none",
            borderRadius: 999,
            padding: "9px 16px",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--atr-font-sans)",
          }}
        >
          Kirim pesan
        </button>
      </div>

      {/* UPDATES */}
      <div
        style={{
          ...ar.sectionH,
          marginTop: 28,
          fontSize: 14,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        Update dari petani
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
        {ARTI_UPDATES.map((u, i) => (
          <div
            key={i}
            style={{ ...ar.card, padding: 14, display: "flex", gap: 12, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#E6F7E6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 18,
              }}
            >
              🌳
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{u.t}</div>
                <div style={{ fontSize: 11, color: "var(--atr-text-muted)", flexShrink: 0 }}>{u.d}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 4, lineHeight: 1.5 }}>
                {u.s}
              </div>
              {u.img && (
                <img
                  src={u.img}
                  alt=""
                  style={{ width: 96, height: 96, borderRadius: 8, marginTop: 8, objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.style.opacity = 0;
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
