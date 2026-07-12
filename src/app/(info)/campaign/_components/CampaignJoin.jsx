"use client";

import React from "react";
import Link from "next/link";
import { stp } from "@/styles/campaign-styles";

export default function CampaignJoin() {
  return (
    <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
      <Link href="/contact" style={stp.btnPrimary}>
        ✉️ Hubungi Kami
      </Link>
      <Link href="/about" style={stp.btnGhost}>
        ⓘ Tentang Kami
      </Link>
    </div>
  );
}
