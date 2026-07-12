"use client";

import React from "react";
import Link from "next/link";
import { hsx } from "@/styles/homestay-detail-styles";
import { ds } from "@/styles/detail-styles";
import { SectionCard } from "./DetailSections";

/* ── MiniAttractionCard ── */
export function MiniAttractionCard({ a }) {
  return (
    <Link href="/market/attractions" style={ds.miniCard}>
      <img src={a.img} alt="" style={ds.miniImg} />
      <div style={ds.miniBody}>
        <span style={{ ...ds.miniCat, color: a.catFg }}>{a.cat}</span>
        <span style={ds.miniName}>{a.name}</span>
        <div style={ds.miniMeta}>
          <span style={ds.miniRating}>
            ★ <strong>{a.rating}</strong>
          </span>
          <span style={ds.miniPrice}>{a.price === 0 ? "Gratis" : `Rp ${(a.price / 1000).toFixed(0)}rb`}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── HomestayNearby ── */
export function HomestayNearby({ data }) {
  return (
    <SectionCard
      title="Aktivitas Dekat Homestay"
      icon="🗺"
      eyebrow={`${data.nearby.length} hal yang bisa kamu lakukan dari Homestay Harjiyanto`}
    >
      <div style={ds.hScroll}>
        {data.nearby.map((a, i) => (
          <MiniAttractionCard key={i} a={a} />
        ))}
      </div>
    </SectionCard>
  );
}

/* ── HomestayRelated ── */
export function HomestayRelated({ items }) {
  return (
    <section style={{ ...ds.section, margin: "0 32px 32px" }}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            <span>🔥</span> Produk Terkait
          </h2>
          <div style={ds.sectionSub}>Pilihan menarik lainnya untuk perjalananmu</div>
        </div>
        <Link href="/market/homestay" style={ds.sectionLink}>
          Lihat semua <span>→</span>
        </Link>
      </div>
      <div style={hsx.relWrap}>
        {items.map((p, i) => (
          <Link key={i} href="/market/homestay" style={hsx.relCard}>
            <div style={hsx.relImgWrap}>
              <img src={p.img} alt="" style={hsx.relImg} />
              <span style={hsx.relTag}>{p.tag}</span>
            </div>
            <div style={hsx.relBody}>
              <span style={hsx.relRegion}>📍 {p.region}</span>
              <span style={hsx.relName}>{p.name}</span>
              <span style={hsx.relPrice}>Rp {p.price.toLocaleString("id-ID")}</span>
              <div style={hsx.relOp}>
                <img src={p.opAvatar} alt="" style={hsx.relOpAv} />
                <span>{p.operator}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
