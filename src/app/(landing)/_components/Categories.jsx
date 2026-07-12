"use client";

import React from "react";
import Link from "next/link";
import { hm } from "@/styles/home-styles";
import { HI } from "./HomeCards";

export default function Categories({ categories = [] }) {
  return (
    <section style={hm.launcherWrap}>
      <div style={hm.launcherCard}>
        <div style={hm.launcherHead}>
          <div>
            <div style={hm.launcherTitle}>Mau jelajah apa hari ini?</div>
            <div style={hm.launcherSub}>Akses cepat ke semua layanan Atourin</div>
          </div>
          <Link href="/explore-hub" style={{ ...hm.secLink, textDecoration: "none" }}>
            Lihat semua {HI.arrowR}
          </Link>
        </div>
        <div style={hm.catGrid} className="hm-launcher-grid">
          {categories.map((c) => (
            <Link key={c.id} href={c.href || "#"} style={hm.catTile} className="hm-cat">
              <span style={{ ...hm.catIcon, background: c.tint }}>{HI[c.icon] || HI.sparkle}</span>
              <span style={hm.catLabel}>{c.label}</span>
            </Link>
          ))}
        </div>
        <Link
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 18,
            padding: "16px 20px",
            borderRadius: 16,
            background: "linear-gradient(135deg, #7068D5 0%, #A49EE4 100%)",
            color: "#fff",
            textDecoration: "none",
            boxShadow: "0 10px 26px rgba(112,104,213,0.28)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=70"
            alt=""
            style={{ width: 52, height: 52, borderRadius: 12, objectFit: "cover", flexShrink: 0 }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em" }}>
              Bingung mau ke mana? Tanya AI Asisten ✨
            </div>
            <div style={{ fontSize: 13.5, opacity: 0.92, marginTop: 3 }}>
              Plan itinerary, cari hotel, cek cuaca, &amp; booking, cukup dengan ngobrol. Mode chat,
              peta, &amp; suara.
            </div>
          </div>
          <span
            style={{
              background: "#fff",
              color: "#7068D5",
              fontSize: 14,
              fontWeight: 700,
              padding: "11px 20px",
              borderRadius: 9999,
              flexShrink: 0,
            }}
          >
            Coba sekarang →
          </span>
        </Link>
      </div>
    </section>
  );
}
