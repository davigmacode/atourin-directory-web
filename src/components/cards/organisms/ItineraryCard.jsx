"use client";

import React from "react";
import cs from "@/styles/card-styles";
import CardCover from "../molecules/CardCover";
import CreatorInfo from "../molecules/CreatorInfo";
import Rating from "../atoms/Rating";

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
 *   ITIN_DATA: { title, img, days, tag, city, author, role,
 *                price, rating, reviews, views, day1 }
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

  const badges = [
    { content: it.days, style: cs.itinDaysBadge },
    {
      content: themeLabel,
      style: {
        ...cs.itinThemeBadge,
        background: themeBg,
        color: themeFg,
      },
    },
  ];

  return (
    <article
      style={{
        ...cs.itinCard,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <CardCover src={it.img} alt="" badges={badges} />
      <div style={cs.atrBody}>
        <h3 style={cs.atrName}>{it.title}</h3>
        <p style={cs.atrDesc}>{hook}</p>
        <div style={cs.itinInfoRow}>
          <span>📍 {stops} tempat</span>
          <span style={cs.itinDot}>·</span>
          <span>👥 Maks {maxPpl} orang</span>
        </div>
        <div style={cs.itinBudget}>
          <span style={cs.itinBudgetLabel}>Estimasi</span>
          <span style={cs.itinBudgetVal}>
            {budgetLabel}
            <span style={cs.itinBudgetUnit}>/orang</span>
          </span>
        </div>
        <div style={cs.itinFooter}>
          <CreatorInfo
            avatar={creatorAv}
            name={creatorName}
            role={creatorRole}
          />
          <div style={cs.itinRatingBlock}>
            <Rating rating={it.rating} showReviews={false} />
            <span style={cs.itinSaves}>💜 {saves}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
