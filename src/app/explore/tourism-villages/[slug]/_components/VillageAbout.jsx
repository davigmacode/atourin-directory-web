"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";

function ReadMore({ text, clamp = 5 }) {
  const [open, setOpen] = useState(false);
  const clamped = { ...ds.longTextClamped, WebkitLineClamp: clamp };
  return (
    <div>
      <p style={open ? ds.longText : clamped}>{text}</p>
      <button style={ds.readMoreBtn} onClick={() => setOpen(!open)}>
        {open ? "Sembunyikan \u2191" : "Baca selengkapnya \u2193"}
      </button>
    </div>
  );
}

export default function VillageAbout({ village }) {
  const descText =
    village.description ||
    village.longDesc ||
    village.desc ||
    `${village.name} adalah desa wisata bertema ${village.theme || "Kebudayaan"} yang memikat, terletak di kawasan ${village.region}. Wisatawan yang berkunjung ke sini dapat menikmati keasrian lingkungan pedesaan yang asri, kebudayaan lokal yang dijaga ketat turun-temurun, serta keunikan ciri khas setempat berupa ${village.signature || "tradisi kearifan lokal"}. Keramahan penduduk lokal dan keindahan panorama alam di sekitar desa siap memberikan pengalaman liburan yang berkesan dan menenangkan dari kesibukan perkotaan.`;

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>
          <span>{"\uD83C\uDFE0"}</span> Tentang Desa
        </h2>
      </div>
      <ReadMore text={descText} clamp={5} />
    </section>
  );
}
