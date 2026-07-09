"use client";

import React from "react";
import SafeImage from "./SafeImage";
import dh from "@/styles/destination-detail";

function formatBudget(budget) {
  if (typeof budget === "string") return budget;
  if (budget == null) return "-";
  if (budget >= 1000000) return `~Rp ${(budget / 1000000).toFixed(1)}jt`;
  if (budget >= 1000) return `~Rp ${(budget / 1000).toFixed(0)}rb`;
  return `Rp ${budget}`;
}

/**
 * ItineraryCard — card for itinerary listings.
 *
 * Supports two data shapes:
 *   Prototype: { title, img, days, theme, themeColor, themeFg, stops,
 *                maxPpl, budget, creator, creatorAv, creatorType,
 *                rating, saves, hook }
 *   Existing ITIN_DATA: { title, img, days, tag, city, author, role,
 *                         price, rating, reviews, views, day1 }
 */
export default function ItineraryCard({ it }) {
  const themeLabel = it.theme || it.tag || "";
  const themeBg = it.themeColor || "var(--atr-purple-50)";
  const themeFg = it.themeFg || "var(--atr-purple)";
  const stops = it.stops || it.day1?.length || 0;
  const maxPpl = it.maxPpl || "-";
  const creatorName = it.creator || it.author || "";
  const creatorRole = it.creatorType || it.role || "";
  const creatorAv = it.creatorAv || "";
  const saves = it.saves || it.views || it.reviews || 0;
  const hook = it.hook || it.day1?.join(", ") || "";
  const budgetLabel = it.budget ? formatBudget(it.budget) : it.price || "-";

  return (
    <article
      style={{
        ...dh.itinCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div style={dh.atrImgWrap}>
        <SafeImage src={it.img} alt="" />
        <span style={dh.itinDaysBadge}>{it.days}</span>
        <span
          style={{
            ...dh.itinThemeBadge,
            background: themeBg,
            color: themeFg,
          }}
        >
          {themeLabel}
        </span>
      </div>
      <div style={dh.atrBody}>
        <h3 style={dh.atrName}>{it.title}</h3>
        <p style={dh.atrDesc}>{hook}</p>
        <div style={dh.itinInfoRow}>
          <span>📍 {stops} tempat</span>
          <span style={dh.itinDot}>·</span>
          <span>👥 Maks {maxPpl} orang</span>
        </div>
        <div style={dh.itinBudget}>
          <span style={dh.itinBudgetLabel}>Estimasi</span>
          <span style={dh.itinBudgetVal}>
            {budgetLabel}
            <span style={dh.itinBudgetUnit}>/orang</span>
          </span>
        </div>
        <div style={dh.itinFooter}>
          <div style={dh.itinCreator}>
            {creatorAv && (
              <img
                src={creatorAv}
                alt=""
                style={dh.itinCreatorAv}
              />
            )}
            <div>
              <div style={dh.itinCreatorName}>
                {creatorName}
              </div>
              <div style={dh.itinCreatorRole}>
                {creatorRole}
              </div>
            </div>
          </div>
          <div style={dh.itinRatingBlock}>
            <span style={dh.atrRating}>
              ★ <strong>{it.rating}</strong>
            </span>
            <span style={dh.itinSaves}>💜 {saves}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
