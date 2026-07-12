"use client";

import React from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import { InfoIcon, PlanIcon, StarIcon } from "./Shared";

export default function ActionBar({ activeTab, setActiveTab }) {
  return (
    <div style={detailStyles.actionBar}>
      <div style={detailStyles.actionInner}>
        <div style={detailStyles.tabsLeft}>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "biography" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("biography")}
          >
            <InfoIcon /> Tentang & Biografi
          </button>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "trips" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("trips")}
          >
            <PlanIcon /> Paket & Pengalaman
          </button>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "reviews" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("reviews")}
          >
            <StarIcon filled /> Ulasan Traveler
          </button>
        </div>
      </div>
    </div>
  );
}
