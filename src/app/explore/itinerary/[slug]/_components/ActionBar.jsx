"use client";

import React from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import {
  PlanIcon,
  InfoIcon,
  ShareIcon,
  BookmarkIcon,
  PrintIcon,
  MoreIcon,
} from "./Shared";

export default function ActionBar({ activeTab, setActiveTab }) {
  return (
    <div style={detailStyles.actionBar}>
      <div style={detailStyles.actionInner}>
        <div style={detailStyles.tabsLeft}>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "plan" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("plan")}
          >
            <PlanIcon /> Rencana Perjalanan
          </button>
          <button
            style={{
              ...detailStyles.detailTab,
              ...(activeTab === "about" ? detailStyles.detailTabActive : {}),
            }}
            onClick={() => setActiveTab("about")}
          >
            <InfoIcon /> Tentang
          </button>
        </div>
        <div style={detailStyles.actionsRight}>
          <button style={detailStyles.iconBtn} aria-label="Share">
            <ShareIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="Bookmark">
            <BookmarkIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="Print">
            <PrintIcon />
          </button>
          <button style={detailStyles.iconBtn} aria-label="More">
            <MoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
