"use client";

import React from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import { CheckBadge, ChatIcon } from "./Shared";

export default function AuthorStrip({ itinerary }) {
  const authorName = typeof itinerary.author === 'object' ? (itinerary.author?.displayName || itinerary.author?.name || '') : (itinerary.author || '');
  const isVerified = typeof itinerary.author === 'object' ? !!itinerary.author?.isVerified : false;
  const city = itinerary.destination?.name || itinerary.city || '';
  const viewsVal = itinerary.viewsCount || itinerary.views || 0;
  const reviewsVal = itinerary.reviewsCount || itinerary.reviews || 0;

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
          {authorName?.[0] || ''}
        </div>
        <div>
          <div style={detailStyles.authorLine1}>
            <span style={detailStyles.authorName}>{authorName}</span>
            {isVerified && (
              <span style={detailStyles.verifiedBadge}>
                <CheckBadge /> {"Kreator Resmi"}
              </span>
            )}
          </div>
          <div style={detailStyles.authorLine2}>
            <span>Kreator Itinerary di {city}</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>{viewsVal} kali dilihat</span>
            <span style={detailStyles.dotSep}>{"\u00B7"}</span>
            <span>{reviewsVal} ulasan</span>
          </div>
        </div>
      </div>
      <div style={detailStyles.authorRight}>
        <button style={detailStyles.followBtn}>Ikuti</button>
        <button
          style={detailStyles.messageBtn}
          onClick={() => alert(`Mengirim pesan ke ${authorName}...`)}
        >
          <ChatIcon /> Pesan
        </button>
      </div>
    </div>
  );
}
