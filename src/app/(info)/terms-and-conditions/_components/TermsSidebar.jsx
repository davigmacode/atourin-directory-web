"use client";

import React from "react";
import Link from "next/link";
import { sx } from "@/styles/terms-and-conditions-styles";
import { TOC } from "@/data/terms-and-conditions-data";

export default function TermsSidebar({ active, setActive }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <aside style={{ ...sx.card, padding: 14, position: "sticky", top: 90 }}>
        {TOC.map((sec) => (
          <div key={sec.g} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--atr-text)", padding: "8px 10px" }}>
              {sec.g}
            </div>
            {sec.items.map((it) => (
              <button
                key={it}
                onClick={() => setActive(it)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px 8px 22px",
                  border: "none",
                  background: active === it ? "var(--atr-purple-50)" : "transparent",
                  color: active === it ? "var(--atr-purple)" : "var(--atr-text-muted)",
                  fontSize: 13.5,
                  fontWeight: active === it ? 700 : 500,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "var(--atr-font-sans)",
                }}
              >
                {it}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <div
        style={{
          ...sx.card,
          padding: 18,
          background: "var(--atr-purple-50)",
          border: "1px solid var(--atr-purple-light)",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          ❓
        </div>
        <div style={{ fontSize: 14.5, fontWeight: 700 }}>Butuh Bantuan?</div>
        <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginTop: 5, lineHeight: 1.5 }}>
          Tim support kami siap membantu pertanyaan Anda.
        </div>
        <Link
          href="/help-center"
          style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-purple)", marginTop: 10, display: "inline-block" }}
        >
          Pusat Bantuan →
        </Link>
      </div>
    </div>
  );
}
