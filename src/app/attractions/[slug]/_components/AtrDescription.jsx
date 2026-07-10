"use client";

import React from "react";
import { SectionCard, ReadMore } from "./Shared";

export default function AtrDescription({ attraction }) {
  const longDesc =
    attraction.longDesc ||
    attraction.desc ||
    `Wisata ${attraction.name} menawarkan keindahan alam yang memikat dan udara yang menyegarkan di kawasan ${attraction.region}. Tempat ini sangat cocok untuk menghabiskan waktu bersama keluarga besar di akhir pekan.`;

  return (
    <SectionCard title="Tentang Atraksi Ini" icon={"📖"}>
      <ReadMore text={longDesc} clamp={4} />
    </SectionCard>
  );
}
