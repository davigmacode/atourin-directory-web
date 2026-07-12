"use client";

import React from "react";
import { pesanStyles } from "@/styles/pesan-styles";

export default function SkeletonCard() {
  return (
    <div style={{ ...pesanStyles.card, cursor: "default" }}>
      <div
        style={{
          ...pesanStyles.cardImgWrap,
          background: "linear-gradient(110deg, #EFEFF5 8%, #F8F8FC 18%, #EFEFF5 33%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.4s linear infinite",
        }}
      />
      <div style={pesanStyles.cardBody}>
        <div style={{ height: 12, width: "55%", background: "#EFEFF5", borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 14, width: "85%", background: "#EFEFF5", borderRadius: 4, marginBottom: 4 }} />
        <div style={{ height: 14, width: "65%", background: "#EFEFF5", borderRadius: 4, marginBottom: 12 }} />
        <div style={{ height: 18, width: "40%", background: "#EFEFF5", borderRadius: 4 }} />
        <div style={pesanStyles.cardDivider} />
        <div style={{ height: 14, width: "60%", background: "#EFEFF5", borderRadius: 4, marginTop: 10 }} />
      </div>
    </div>
  );
}
