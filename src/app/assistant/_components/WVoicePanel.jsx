"use client";

import React, { useState } from "react";
import {
  AIW_PURPLE,
  AIW_RED,
} from "@/styles/assistant-styles";

export default function WVoicePanel() {
  const [vs, setVs] = useState("idle");
  const bars = [14, 26, 18, 38, 28, 46, 32, 54, 40, 60, 44, 62, 48, 56, 40, 50, 36, 44, 30, 22];

  return (
    <div
      style={{
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(ellipse at 50% 28%, ${AIW_PURPLE} 0%, #5D55C4 72%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        padding: 30,
        minHeight: 460,
      }}
    >
      {vs !== "speaking" ? (
        <>
          <span style={{ fontSize: vs === "listening" ? 54 : 74, filter: "drop-shadow(0 8px 24px rgba(0,0,0,.3))" }}>
            🤖
          </span>
          {vs === "idle" ? (
            <>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 18, textAlign: "center", lineHeight: 1.3 }}>
                Klik tombol mic, ngomong aja
              </div>
              <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>Aku dengerin & langsung bantuin</div>
              <div style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 9, width: "100%", maxWidth: 360 }}>
                {['"Cari sailing trip Labuan Bajo"', '"Plan 4 hari ke Komodo, budget 12jt"', '"Homestay dekat Wae Rebo"'].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,.12)",
                      border: "1px solid rgba(255,255,255,.18)",
                      borderRadius: 9999,
                      padding: "10px 16px",
                      fontSize: 13.5,
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 24, fontWeight: 800, marginTop: 22, textAlign: "center", lineHeight: 1.35, maxWidth: 460 }}>
                "Cari sailing trip Labuan Bajo akhir pekan buat 2 orang..."
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center", height: 64, marginTop: 26 }}>
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 4,
                      height: h,
                      background: "#fff",
                      borderRadius: 9999,
                      opacity: 0.6,
                      animation: `aiwvbar 0.8s ${i * 0.04}s ease-in-out infinite alternate`,
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div style={{ width: "100%", maxWidth: 460 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 9999,
                  background: "rgba(255,255,255,.12)",
                  animation: "aiwpulse 1.6s ease-out infinite",
                }}
              />
              <div
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 9999,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 42,
                }}
              >
                🤖
              </div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 16, padding: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, opacity: 0.8, marginBottom: 6 }}>JAWABAN</div>
            <div style={{ fontSize: 15, lineHeight: 1.55 }}>
              Aku temuin <strong>Labuan Bajo Sailing 4D3N</strong>, Padar, Pink Beach & Komodo, Rp 5,8jt/orang termasuk phinisi
              & makan. Mau aku booking-in untuk Sabtu?
            </div>
          </div>
        </div>
      )}

      {/* mic control */}
      <div style={{ marginTop: 30 }}>
        {vs === "listening" ? (
          <button
            onClick={() => setVs("speaking")}
            style={{
              width: 76,
              height: 76,
              borderRadius: 9999,
              border: "none",
              background: AIW_RED,
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(244,98,99,.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 24, height: 24, background: "#fff", borderRadius: 4 }} />
          </button>
        ) : vs === "idle" ? (
          <button
            onClick={() => setVs("listening")}
            style={{
              width: 88,
              height: 88,
              borderRadius: 9999,
              border: "none",
              background: "#fff",
              color: AIW_PURPLE,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(0,0,0,.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm-7 9a7 7 0 0 0 6 6.93V20H8v2h8v-2h-3v-2.07A7 7 0 0 0 19 11h-2a5 5 0 0 1-10 0H5z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={() => setVs("idle")}
            style={{
              height: 46,
              padding: "0 22px",
              borderRadius: 9999,
              border: "1px solid rgba(255,255,255,.5)",
              background: "rgba(255,255,255,.12)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ↺ Tanya lagi
          </button>
        )}
      </div>

      <style>{`
        @keyframes aiwvbar {
          from { transform: scaleY(.4) }
          to { transform: scaleY(1) }
        }
        @keyframes aiwpulse {
          0% { transform: scale(1); opacity: .8 }
          100% { transform: scale(1.6); opacity: 0 }
        }
      `}</style>
    </div>
  );
}
