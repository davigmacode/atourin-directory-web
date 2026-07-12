"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import {
  aw,
  AIW_OUTLINE,
  AIW_LIGHT,
  AIW_PURPLE,
  AIW_DARK,
  AIW_MUTED,
  AIW_TEXT,
  AIW_GREEN,
  AIW_50,
} from "@/styles/assistant-styles";

/* ── Static Data ── */
import {
  AIW_INTENTS,
  AIW_QUICK,
  AIW_RECENTS,
} from "@/data/assistant-data";

/* ── Sub-components ── */
import WModeSwitch from "./_components/WModeSwitch";
import WMapPanel from "./_components/WMapPanel";
import WVoicePanel from "./_components/WVoicePanel";
import {
  WCardProduct,
  WCardCarousel,
  WCardItinerary,
  WCardWeather,
  WCardMap,
  WCardBooking,
} from "./_components/WCards";

function aiwNow() {
  const d = new Date();
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

export default function AiAssistantPage() {
  const [started, setStarted] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("chat");
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [msgs, typing]);

  function detect(t) {
    const s = t.toLowerCase();
    if (/honeymoon|bulan madu|sunrise|ide|rekomendasi/.test(s)) return "honeymoon";
    if (/itinerary|plan|rencana|susun|\d ?hari/.test(s)) return "itinerary";
    if (/booking|pesanan|tiket|e-tiket/.test(s)) return "booking";
    if (/hotel|homestay|penginapan|nginap|kamar/.test(s)) return "hotel";
    if (/sekitar|dekat|terdekat|lokasi/.test(s)) return "sekitar";
    if (/cuaca|weather|hujan|cerah/.test(s)) return "cuaca";
    if (/arti|pohon|carbon|karbon/.test(s)) return "arti";
    if (/voucher|diskon|promo|kode/.test(s)) return "voucher";
    return "fallback";
  }

  function push(seq, i = 0) {
    if (i >= seq.length) {
      setTyping(false);
      return;
    }
    setTyping(true);
    setTimeout(() => {
      setMsgs((p) => [...p, { role: "bot", ...seq[i], time: aiwNow() }]);
      setTyping(false);
      setTimeout(() => push(seq, i + 1), 300);
    }, 820);
  }

  function send(text, intent) {
    if (!text || !text.trim()) return;
    setStarted(true);
    setInput("");
    setMsgs((p) => [...p, { role: "user", text, time: aiwNow() }]);
    const key = intent || detect(text);
    setTimeout(() => push(AIW_INTENTS[key] || AIW_INTENTS.fallback), 220);
  }

  function Bubble({ m }) {
    if (m.carousel)
      return (
        <div style={{ marginLeft: 42, marginBottom: 12 }}>
          <WCardCarousel items={m.carousel} />
        </div>
      );
    if (m.product)
      return (
        <div style={{ marginLeft: 42, marginBottom: 12 }}>
          <WCardProduct {...m.product} />
        </div>
      );
    if (m.itinerary)
      return (
        <div style={{ marginLeft: 42, marginBottom: 10 }}>
          <WCardItinerary {...m.itinerary} />
        </div>
      );
    if (m.map)
      return (
        <div style={{ marginLeft: 42, marginBottom: 12 }}>
          <WCardMap {...m.map} />
        </div>
      );
    if (m.weather)
      return (
        <div style={{ marginLeft: 42, marginBottom: 12 }}>
          <WCardWeather {...m.weather} />
        </div>
      );
    if (m.booking)
      return (
        <div style={{ marginLeft: 42, marginBottom: 12 }}>
          <WCardBooking {...m.booking} />
        </div>
      );
    if (m.followups)
      return (
        <div
          style={{
            marginLeft: 42,
            marginTop: -2,
            marginBottom: 14,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {m.followups.map((f, i) => (
            <button
              key={i}
              onClick={() => send(f)}
              style={{
                padding: "8px 14px",
                background: "#fff",
                border: `1px solid ${AIW_LIGHT}`,
                color: AIW_PURPLE,
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ↗ {f}
            </button>
          ))}
        </div>
      );
    const isUser = m.role === "user";
    return (
      <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", gap: 10, marginBottom: 12 }}>
        {!isUser && (
          <span style={{ fontSize: 26, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
            🤖
          </span>
        )}
        <div
          style={{
            maxWidth: "70%",
            background: isUser ? AIW_PURPLE : "#fff",
            color: isUser ? "#fff" : AIW_DARK,
            padding: "11px 15px",
            borderRadius: 16,
            borderBottomRightRadius: isUser ? 5 : 16,
            borderBottomLeftRadius: isUser ? 16 : 5,
            fontSize: 14,
            lineHeight: 1.5,
            border: isUser ? "none" : `1px solid ${AIW_OUTLINE}`,
          }}
        >
          {m.text}
          <div style={{ fontSize: 10, opacity: 0.55, marginTop: 5, textAlign: "right" }}>{m.time}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={aw.page}>
      <style>{`
        @keyframes aiwDot {
          0%,60%,100% { opacity: .3; transform: translateY(0) }
          30% { opacity: 1; transform: translateY(-3.5px) }
        }
        .aiw-dot { animation: aiwDot 1.1s infinite ease-in-out }
        @media (max-width: 860px) {
          .aiw-shell { grid-template-columns: 1fr !important }
          .aiw-side { display: none !important }
        }
      `}</style>

      <TopNav active="Pesan" isLoggedIn userName="Aulia" notifCount={3} />

      <div style={aw.shell} className="aiw-shell">
        {/* Sidebar */}
        <aside style={aw.side} className="aiw-side">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 28 }}>🤖</span>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 800, color: AIW_DARK }}>Atourin Assistant</div>
              <div style={{ fontSize: 11.5, color: AIW_GREEN, fontWeight: 600 }}>● Online</div>
            </div>
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: AIW_MUTED,
              margin: "8px 0 10px",
            }}
          >
            Asisten bisa bantu
          </div>
          {[
            ["🗓", "Susun itinerary harian"],
            ["🏨", "Cari hotel & homestay"],
            ["🎫", "Cek & lanjut booking"],
            ["📍", "Rekomendasi sekitarmu"],
            ["🌿", "Pantau Kebun ARTI"],
            ["💰", "Temukan voucher pas"],
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                padding: "9px 0",
                borderTop: i ? `1px solid ${AIW_OUTLINE}` : "none",
              }}
            >
              <span style={{ fontSize: 17 }}>{r[0]}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: AIW_TEXT }}>{r[1]}</span>
            </div>
          ))}
          <div
            style={{
              marginTop: 16,
              padding: 13,
              background: AIW_50,
              borderRadius: 12,
              fontSize: 12,
              color: AIW_MUTED,
              lineHeight: 1.5,
            }}
          >
            ✨ Asisten ini juga ada di aplikasi Atourin, chat sambil jalan, dengan konteks lokasi real-time.
          </div>
        </aside>

        {/* Chat */}
        <div style={aw.chat}>
          <div style={aw.headBold}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                fontSize: 22,
              }}
            >
              🤖
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Atourin Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>● Online · siap bantu plan & booking</div>
            </div>
            <WModeSwitch mode={mode} setMode={setMode} />
            <button
              onClick={() => {
                setStarted(false);
                setMsgs([]);
                setMode("chat");
              }}
              style={{
                background: "rgba(255,255,255,.18)",
                border: "none",
                color: "#fff",
                borderRadius: 9999,
                padding: "8px 14px",
                fontSize: 12.5,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              ⟳
            </button>
          </div>

          {mode === "map" ? (
            <WMapPanel />
          ) : mode === "voice" ? (
            <WVoicePanel />
          ) : !started ? (
            <div style={{ flex: 1, overflowY: "auto", padding: "26px 24px" }}>
              <span style={{ fontSize: 48, display: "inline-block", marginBottom: 10 }}>🤖</span>
              <div style={{ fontSize: 26, fontWeight: 800, color: AIW_DARK, lineHeight: 1.2 }}>
                Halo! Mau jalan-jalan ke mana, <span style={{ color: AIW_PURPLE }}>kamu?</span>
              </div>
              <div style={{ fontSize: 14.5, color: AIW_MUTED, marginTop: 8, maxWidth: 480, lineHeight: 1.5 }}>
                Aku bisa bantu cari experience, hotel, atau susun itinerary lengkap. Mulai cepat dari sini:
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))",
                  gap: 10,
                  maxWidth: 620,
                }}
              >
                {AIW_QUICK.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => send(q.user, q.intent)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "13px 14px",
                      background: "#fff",
                      border: `1px solid ${AIW_OUTLINE}`,
                      borderRadius: 12,
                      color: AIW_DARK,
                      fontSize: 13.5,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background: AIW_50,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      {q.icon}
                    </span>
                    {q.label}
                  </button>
                ))}
              </div>
              <div
                style={{
                  marginTop: 24,
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: AIW_MUTED,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Lanjutkan percakapan
              </div>
              <div style={{ border: `1px solid ${AIW_OUTLINE}`, borderRadius: 14, overflow: "hidden", maxWidth: 620 }}>
                {AIW_RECENTS.map((r, i) => (
                  <div
                    key={i}
                    onClick={() => send(r.title)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 11,
                      padding: "12px 14px",
                      borderTop: i ? `1px solid ${AIW_OUTLINE}` : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 9999,
                        background: AIW_50,
                        color: AIW_PURPLE,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 15,
                      }}
                    >
                      💬
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: AIW_DARK }}>{r.title}</div>
                      <div style={{ fontSize: 11.5, color: AIW_MUTED, marginTop: 1 }}>{r.time}</div>
                    </div>
                    <span style={{ color: AIW_MUTED, fontSize: 17 }}>›</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={aw.thread} ref={threadRef}>
              {msgs.map((m, i) => (
                <Bubble key={i} m={m} />
              ))}
              {typing && (
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 26, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    🤖
                  </span>
                  <div
                    style={{
                      background: "#fff",
                      border: `1px solid ${AIW_OUTLINE}`,
                      padding: "13px 18px",
                      borderRadius: 16,
                      borderBottomLeftRadius: 5,
                      display: "flex",
                      gap: 5,
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="aiw-dot"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: AIW_PURPLE,
                          animationDelay: i * 0.18 + "s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <form
            style={{ ...aw.composer, display: mode === "chat" ? "flex" : "none" }}
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              style={aw.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya apa aja, mis. 'plan 4 hari ke Labuan Bajo'…"
            />
            <button type="submit" style={aw.sendBtn} aria-label="Kirim">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
