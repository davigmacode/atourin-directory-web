"use client";

import React from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import { CheckBadge, ChatIcon } from "./Shared";

export default function AuthorStrip({ itinerary }) {
  return (
    <div style={detailStyles.authorStrip}>
      <div style={detailStyles.authorLeft}>
        <div
          style={{
            ...detailStyles.authorAvLg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #A49EE4, #7068D5)",
            color: "#fff",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {itinerary.author?.[0]}
        </div>
        <div>
          <div style={detailStyles.authorLine1}>
            <span style={detailStyles.authorName}>{itinerary.author}</span>
            <span style={detailStyles.verifiedBadge}>
              <CheckBadge /> {itinerary.role || "Local Guide"}
            </span>
          </div>
          <div style={detailStyles.authorLine2}>
            <span>Kreator Itinerary di {itinerary.city}</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>{itinerary.views} kali dilihat</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>{itinerary.reviews} ulasan</span>
          </div>
        </div>
      </div>
      <div style={detailStyles.authorRight}>
        <button style={detailStyles.followBtn}>Ikuti</button>
        <button
          style={detailStyles.messageBtn}
          onClick={() => alert(`Mengirim pesan ke ${itinerary.author}...`)}
        >
          <ChatIcon /> Pesan
        </button>
      </div>
    </div>
  );
}
