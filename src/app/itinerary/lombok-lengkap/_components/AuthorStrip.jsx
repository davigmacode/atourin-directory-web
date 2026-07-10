"use client";

import React from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import { CheckBadge, ChatIcon } from "./Shared";

export default function AuthorStrip() {
  return (
    <div style={detailStyles.authorStrip}>
      <div style={detailStyles.authorLeft}>
        <img
          src="https://i.pravatar.cc/112?img=11"
          alt="Author"
          style={detailStyles.authorAvLg}
        />
        <div>
          <div style={detailStyles.authorLine1}>
            <span style={detailStyles.authorName}>Rizky Pratama</span>
            <span style={detailStyles.verifiedBadge}>
              <CheckBadge /> Travel Specialist
            </span>
          </div>
          <div style={detailStyles.authorLine2}>
            <span>Pemandu Wisata Lombok</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>18 Itinerary</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>Bergabung 2023</span>
          </div>
        </div>
      </div>
      <div style={detailStyles.authorRight}>
        <button style={detailStyles.followBtn}>Ikuti</button>
        <button style={detailStyles.messageBtn}>
          <ChatIcon /> Pesan
        </button>
      </div>
    </div>
  );
}
