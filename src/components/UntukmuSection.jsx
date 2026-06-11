"use client";

import React, { useState } from "react";
import PrefQuizModal from "./PrefQuizModal";

export default function UntukmuSection({ untukmu = [], isLoading = false }) {
  const [quiz, setQuiz] = useState(false);
  const [why, setWhy] = useState(null);

  return (
    <section
      style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 24px 8px" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--atr-purple)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {"\u2728"} Untukmu
          </div>
          <h2
            style={{
              fontSize: 24,
              letterSpacing: "-0.02em",
              margin: "6px 0 2px",
            }}
          >
            Rekomendasi sesuai minatmu
          </h2>
          <p
            style={{ fontSize: 14, color: "var(--atr-text-muted)", margin: 0 }}
          >
            Dipersonalisasi dari preferensi &amp; histori jelajahmu.
          </p>
        </div>
        <button
          onClick={() => setQuiz(true)}
          style={{
            border: "1px solid var(--atr-purple)",
            background: "#fff",
            color: "var(--atr-purple)",
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: 13.5,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "var(--atr-font-sans)",
            whiteSpace: "nowrap",
          }}
        >
          Atur preferensi
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginTop: 20,
        }}
        className="untukmu-grid"
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--atr-outline)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: "var(--atr-outline)",
                    borderRadius: "0 0 0 0",
                  }}
                />
                <div style={{ padding: 14 }}>
                  <div
                    style={{
                      height: 16,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "70%",
                    }}
                  />
                  <div
                    style={{
                      height: 12,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "45%",
                      marginTop: 8,
                    }}
                  />
                  <div
                    style={{
                      height: 12,
                      background: "var(--atr-outline)",
                      borderRadius: 6,
                      width: "55%",
                      marginTop: 10,
                    }}
                  />
                </div>
              </div>
            ))
          : untukmu.map((r, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid var(--atr-outline)",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "transform .15s, box-shadow .15s",
                }}
              >
                <div
                  style={{
                    aspectRatio: "4/3",
                    background: `url(${r.img}) center/cover`,
                    position: "relative",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: "#fff",
                      background: "rgba(27,26,46,0.78)",
                      padding: "4px 9px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {r.tag}
                  </span>
                </div>
                <div style={{ padding: 14 }}>
                  <div
                    style={{ fontSize: 14.5, fontWeight: 700, lineHeight: 1.3 }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--atr-text-muted)",
                      marginTop: 4,
                    }}
                  >
                    {"\uD83D\uDCCD"} {r.loc}
                  </div>
                  <button
                    onClick={() => setWhy(why === i ? null : i)}
                    style={{
                      marginTop: 10,
                      border: "none",
                      background: "none",
                      padding: 0,
                      color: "var(--atr-purple)",
                      fontSize: 11.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "var(--atr-font-sans)",
                      textAlign: "left",
                    }}
                  >
                    {r.why} <span style={{ opacity: 0.6 }}>{"\u24D8"}</span>
                  </button>
                  {why === i && (
                    <div
                      style={{
                        fontSize: 11,
                        color: "var(--atr-text-muted)",
                        marginTop: 7,
                        lineHeight: 1.45,
                        background: "var(--atr-bg-soft)",
                        padding: "8px 10px",
                        borderRadius: 8,
                      }}
                    >
                      Direkomendasikan karena cocok dengan tag yang sering kamu
                      lihat &amp; jawaban quiz preferensimu.
                    </div>
                  )}
                </div>
              </div>
            ))}
      </div>

      {quiz && <PrefQuizModal onClose={() => setQuiz(false)} />}
      <style>{`@media(max-width:900px){ .untukmu-grid{ grid-template-columns:1fr 1fr !important; } }`}</style>
    </section>
  );
}
