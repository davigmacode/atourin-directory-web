"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard } from "./Shared";

export default function AtrLocation({ attraction }) {
  const coords = attraction.coords || { lat: -8.3405, lng: 115.092 };
  return (
    <SectionCard title="Lokasi & Akses" icon={"📍"}>
      <div style={ds.mapBox} id="map">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
          alt=""
          style={ds.mapImg}
        />
        <span style={ds.mapPin}>{"📍"}</span>
        <span style={ds.mapCoordChip}>
          {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
        </span>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            attraction.name + " " + attraction.region,
          )}`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <button style={ds.mapDirBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M22 12L12 2 2 12l10 10 10-10z" stroke="#fff" strokeWidth="1.6" />
              <path
                d="M8 12h6v-3l4 4-4 4v-3H8"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            Buka di Maps
          </button>
        </a>
      </div>
      <div style={ds.accessTip}>
        <strong>Aksesibilitas</strong> {"\u00B7"} Berada dekat jalan raya utama
        provinsi. Dapat dijangkau menggunakan kendaraan roda dua (sepeda motor)
        maupun roda empat (mobil pribadi/taksi/bus pariwisata). Tempat parkir yang
        luas tersedia tepat di depan gerbang tiket masuk lokasi wisata.
      </div>
    </SectionCard>
  );
}
