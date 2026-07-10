"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";
import { StarIcon } from "./Shared";

function RatingBreakdown({ avg = 4.8, count = 0, dist = [78, 15, 4, 2, 1] }) {
  return (
    <div style={ds.reviewTop}>
      <div style={ds.ratingSummary}>
        <div style={ds.ratingBig}>{avg.toFixed(2)}</div>
        <div style={ds.ratingStars}>
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < Math.round(avg)} />
          ))}
        </div>
        <div style={ds.ratingCount}>
          dari {count.toLocaleString("id-ID")} ulasan
        </div>
      </div>
      <div style={ds.breakdownCol}>
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} style={ds.breakdownRow}>
            <span style={ds.breakdownStar}>
              {s} ★
            </span>
            <div style={ds.breakdownTrack}>
              <div style={{ ...ds.breakdownFill, width: `${dist[i]}%` }} />
            </div>
            <span style={ds.breakdownPct}>{dist[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ r }) {
  return (
    <div style={ds.reviewCard}>
      <img src={r.av} alt="" style={ds.reviewAv} />
      <div style={{ flex: 1 }}>
        <div style={ds.reviewHeader}>
          <div>
            <div style={ds.reviewName}>{r.name}</div>
            <div style={ds.reviewMeta}>
              <span style={ds.reviewStarRow}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <StarIcon key={idx} filled={idx < r.rating} />
                ))}
              </span>
              <span>{" \u00B7 "}</span>
              <span>{r.date}</span>
              {r.trip && (
                <>
                  <span>{" \u00B7 "}</span>
                  <span>{r.trip}</span>
                </>
              )}
            </div>
          </div>
          {r.verified && (
            <span style={ds.reviewVerified}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}>
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Pembelian Terverifikasi
            </span>
          )}
        </div>
        <p style={ds.reviewText}>{r.text}</p>
        {r.photos && r.photos.length > 0 && (
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            {r.photos.map((p, idx) => (
              <img
                key={idx}
                src={p}
                alt=""
                style={{ width: 80, height: 80, borderRadius: 8, objectFit: "cover" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SubRating({ label, v }) {
  return (
    <div
      style={{
        background: "var(--atr-bg-soft)",
        borderRadius: 10,
        padding: "12px 14px",
        textAlign: "center",
        border: "1px solid var(--atr-outline)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: "var(--atr-text-muted)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "var(--atr-purple)",
          marginTop: 4,
        }}
      >
        {v.toFixed(2)}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "var(--atr-yellow)",
          letterSpacing: "0.05em",
          marginTop: 2,
        }}
      >
        ★ ★ ★ ★ ★
      </div>
    </div>
  );
}

const DEFAULT_REVIEWS = [
  {
    name: "Anastasia Wijaya",
    av: "https://i.pravatar.cc/100?img=44",
    rating: 5,
    date: "10 Mei 2026",
    trip: "Sailing 3D2N \u00B7 Phinisi",
    verified: true,
    text: "Welli benar-benar tahu setiap sudut Komodo. Dia bawa kami ke spot snorkel yang tidak ada di rute biasa, kosong total, karang masih perawan. Bahasa Inggrisnya sangat fluent, briefing dive jelas dan kami semua merasa aman 100%. Kapal phinisi-nya bersih, makanan masakan ibu beliau enak banget. 10/10.",
  },
  {
    name: "Lukas Sebastian",
    av: "https://i.pravatar.cc/100?img=58",
    rating: 5,
    date: "2 Mei 2026",
    trip: "Diving 2D \u00B7 Manta Point",
    verified: true,
    text: "Sebagai diver dengan 200+ dives, jarang saya ketemu Divemaster yang segigih Welli soal safety. Buddy check tiap dive, briefing arus detail, dan dia spot 4 ekor manta untuk kami saat current memang lagi liar. Profesional sekali, akan kembali tahun depan untuk advanced trip.",
  },
  {
    name: "Famille Dupont",
    av: "https://i.pravatar.cc/100?img=20",
    rating: 5,
    date: "20 April 2026",
    trip: "Sailing 1D \u00B7 Family",
    verified: true,
    text: "Voyage parfait avec nos enfants (8 et 11 ans). Welli parle français très correctement, ce qui a beaucoup rassuré les petits. Patient, drôle, et toujours attentif à la sécurité. Padar au lever du soleil, inoubliable. Merci Welli !",
    photos: [
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=200&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=200&auto=format&fit=crop&q=70",
    ],
  },
  {
    name: "Bobby Sutanto",
    av: "https://i.pravatar.cc/100?img=7",
    rating: 4,
    date: "12 April 2026",
    trip: "Sailing 1D \u00B7 Group",
    verified: false,
    text: "Pemandu yang sangat berpengalaman dan tahu banyak cerita lokal. Saya kasih 4 karena di akhir trip jadwal sedikit molor karena cuaca, tapi itu di luar kontrol beliau. Komunikasi pre-trip sangat responsif. Boat-nya nyaman.",
  },
];

export default function GuideReviews({ guide }) {
  const rating = guide.rating || 4.95;
  const reviewsCount = guide.reviews || 218;

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>★ Ulasan Tamu</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <select style={{ ...ds.iconBtnGhost, padding: "8px 14px", fontFamily: "var(--atr-font-sans)" }}>
            <option>Semua trip</option>
            <option>Sailing</option>
            <option>Diving</option>
          </select>
        </div>
      </div>
      <RatingBreakdown
        avg={rating}
        count={reviewsCount}
        dist={[91, 7, 1, 1, 0]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 24,
        }}
      >
        <SubRating label="Pengetahuan" v={4.98} />
        <SubRating label="Komunikasi" v={4.95} />
        <SubRating label="Keamanan" v={5.0} />
        <SubRating label="Value" v={4.88} />
      </div>

      <div style={ds.reviewList}>
        {DEFAULT_REVIEWS.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
      <button style={ds.loadMoreBtn}>
        Muat 10 ulasan berikutnya ↓
      </button>
    </section>
  );
}
