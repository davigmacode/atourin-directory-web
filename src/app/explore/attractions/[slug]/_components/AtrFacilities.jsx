"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard, FacilityItem } from "./Shared";

const DEFAULT_FACILITIES = [
  { icon: "\uD83D\uDEF5\uFE0F", label: "Parkir", on: true },
  { icon: "\uD83D\uDEBB", label: "Toilet", on: true },
  { icon: "\uD83D\uDCF8", label: "Spot Foto", on: true },
  { icon: "\uD83D\uDED0", label: "Souvenir", on: true },
  { icon: "\u267F", label: "Akses Disabilitas", on: false },
  { icon: "\uD83C\uDF7D\uFE0F", label: "Restoran", on: true },
  { icon: "\uD83D\uDD4C", label: "Musholla", on: true },
  { icon: "\uD83D\uDE34", label: "Camping Area", on: false },
  { icon: "\uD83D\uDCE1", label: "Sinyal HP", on: true },
  { icon: "\uD83D\uDCA7", label: "Air Bersih", on: true },
];

export default function AtrFacilities({ attraction }) {
  const list = (attraction.facilities && attraction.facilities.length > 0)
    ? attraction.facilities.map((f) => {
        const knownIcons = {
          'parkir': '🅿️',
          'toilet': '🚾',
          'spot-foto': '📷',
          'souvenir': '🛍️',
          'akses-disabilitas': '♿',
          'restoran': '🍽️',
          'musholla': '🕌',
          'camping-area': '😴',
          'sinyal-hp': '📡',
          'air-bersih': '💧',
          'pemandu-lokal': '🧭'
        };
        const icon = knownIcons[f.slug] || '✨';
        return { icon, label: f.name, on: f.available };
      })
    : DEFAULT_FACILITIES;
  const onCount = list.filter((f) => f.on).length;
  const offCount = list.length - onCount;

  return (
    <SectionCard
      title="Fasilitas"
      icon={"✨"}
      eyebrow={`${onCount} tersedia \u00B7 ${offCount} belum tersedia`}
    >
      <div style={ds.facGrid}>
        {list.map((f) => (
          <FacilityItem
            key={f.label}
            icon={f.icon}
            label={f.label}
            available={f.on}
          />
        ))}
      </div>
    </SectionCard>
  );
}
