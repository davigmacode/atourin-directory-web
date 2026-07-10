"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ds } from "@/styles/detail-styles";
import { VIL_DATA } from "@/data/villages";
import SectionCard from "./SectionCard";

const relVlgStyles = {
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 },
  card: {
    background: "var(--atr-bg-soft)",
    border: "1px solid var(--atr-outline)",
    borderRadius: 12,
    overflow: "hidden",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },
  img: {
    width: "100%",
    aspectRatio: "16 / 10",
    objectFit: "cover",
    display: "block",
  },
  body: { padding: 14, display: "flex", flexDirection: "column", gap: 8 },
  name: { fontSize: 15, fontWeight: 700, color: "var(--atr-text)" },
  desc: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "var(--atr-text-muted)",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function SimilarVillages({ village }) {
  const router = useRouter();

  // Find 3 other villages in the same region, or just fallback to other villages
  const regionParts = village.region ? village.region.split(",") : [];
  const prov = regionParts[1] ? regionParts[1].trim() : "";

  let list = VIL_DATA.filter((v) => v.name !== village.name);

  // Prioritize same province if possible
  const sameProvList = list.filter((v) => v.region.includes(prov));
  if (sameProvList.length >= 3) {
    list = sameProvList;
  }

  // Take top 3
  const items = list.slice(0, 3);

  const regionPartsMain = village.region ? village.region.split(",") : [];
  const kotaMain = regionPartsMain[0] ? regionPartsMain[0].trim() : "Manggarai";

  return (
    <SectionCard
      title={"Desa Wisata Lainnya di " + kotaMain}
      icon={"\uD83C\uDFE0"}
      link="/tourism-villages"
      linkLabel="Lihat semua desa wisata"
    >
      <div style={relVlgStyles.grid}>
        {items.map((v, i) => {
          const slug = slugify(v.name);
          const vStatusFg = v.adwiFg || "#2D8838";
          const vStatusBg = v.adwiBg || "#D9F2DA";

          return (
            <div
              key={i}
              onClick={() => router.push(`/tourism-villages/${slug}`)}
              style={relVlgStyles.card}
            >
              <img src={v.img} alt={v.name} style={relVlgStyles.img} />
              <div style={relVlgStyles.body}>
                <span
                  style={{
                    ...ds.catBadge,
                    background: vStatusBg,
                    color: vStatusFg,
                    width: "fit-content",
                    padding: "2px 8px",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: vStatusFg,
                      marginRight: 2,
                    }}
                  />
                  Desa {v.adwi || "Mandiri"}
                </span>
                <div style={relVlgStyles.name}>{v.name}</div>
                <p style={relVlgStyles.desc}>
                  {v.signature ? `Terkenal dengan ciri khas ${v.signature}.` : ""} Keunikan budaya dan kearifan lokal bertema {v.theme || "Pedesaan"}.
                </p>
                <div style={{ fontSize: 12, color: "var(--atr-text)" }}>
                  {"\u2605"} <strong>{v.rating || 4.7}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
