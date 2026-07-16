"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard } from "./Shared";

export default function AtrLocation({ attraction }) {
  const lat = attraction.location?.latitude ?? -8.3405;
  const lng = attraction.location?.longitude ?? 115.092;
  const address = attraction.location?.address;
  const accessibilityList = attraction.location?.accessibility || [];
  const region = attraction.destination
    ? `${attraction.destination.name}, ${attraction.destination.province?.name || ""}`
    : attraction.region || "Indonesia";

  return (
    <SectionCard title="Lokasi & Akses" icon={"📍"}>
      {address && (
        <div style={{ fontSize: 13, color: "var(--atr-text-muted)", marginBottom: 12, lineHeight: "1.4" }}>
          <strong>Alamat:</strong> {address}
        </div>
      )}
      <div style={ds.mapBox} id="map">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
          alt=""
          style={ds.mapImg}
        />
        <span style={ds.mapPin}>{"📍"}</span>
        <span style={ds.mapCoordChip}>
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
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
      {accessibilityList.length > 0 ? (
        <div style={ds.accessTip}>
          <strong>Aksesibilitas</strong> {"\u00B7"} {accessibilityList.join(" \u00B7 ")}
        </div>
      ) : (
        <div style={ds.accessTip}>
          <strong>Aksesibilitas</strong> {"\u00B7"} Dapat dijangkau menggunakan kendaraan pribadi maupun transportasi lokal.
        </div>
      )}
    </SectionCard>
  );
}
