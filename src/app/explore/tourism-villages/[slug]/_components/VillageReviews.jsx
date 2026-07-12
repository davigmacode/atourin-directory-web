"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";

function RatingBreakdown({ avg = 4.8, count = 0, dist = [88, 9, 2, 1, 0] }) {
  return (
    <div style={ds.reviewTop}>
      <div style={ds.ratingSummary}>
        <div style={ds.ratingBig}>{avg.toFixed(1)}</div>
        <div style={ds.ratingStars}>{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <div style={ds.ratingCount}>
          dari {count.toLocaleString("id-ID")} ulasan
        </div>
      </div>
      <div style={ds.breakdownCol}>
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} style={ds.breakdownRow}>
            <span style={ds.breakdownStar}>
              {s} {"\u2605"}
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
      <img src={r.av} alt={r.name} style={ds.reviewAv} />
      <div>
        <div style={ds.reviewHeader}>
          <div>
            <div style={ds.reviewName}>{r.name}</div>
            <div style={ds.reviewMeta}>
              <span style={ds.reviewStarRow}>{"\u2605".repeat(r.rating)}</span>
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
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Kunjungan Terverifikasi
            </span>
          )}
        </div>
        <p style={ds.reviewText}>{r.text}</p>
        {r.photos && (
          <div style={ds.reviewPhotos}>
            {r.photos.map((p, i) => (
              <img key={i} src={p} alt="Review photo" style={ds.reviewPhoto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VillageReviews({ village }) {
  const reviews = [
    {
      name: "Rian Hidayat",
      av: "https://i.pravatar.cc/100?img=33",
      rating: 5,
      date: "14 Juni 2026",
      trip: "Paket 2D1N",
      verified: true,
      text: `Luar biasa! Pengalaman menetap di ${village.name} sangat berkesan. Keramahan warganya tiada duanya, makanannya sederhana tapi nikmat tiada tara. Sangat cocok bagi yang ingin melepas penat dan menikmati ketenangan budaya lokal yang masih asli.`,
    },
    {
      name: "Tika Larasati",
      av: "https://i.pravatar.cc/100?img=49",
      rating: 5,
      date: "28 Mei 2026",
      trip: "Eksplorasi Adat",
      verified: true,
      text: `Belajar banyak mengenai sejarah dan kearifan lokal di sini. Guide wisatanya ramah dan menjelaskan tradisi secara mendetail. Sangat tersentuh dengan cara warga setempat merawat lingkungan. Sangat direkomendasikan!`,
      photos: [
        "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=200&auto=format&fit=crop&q=70",
      ],
    },
    {
      name: "Dimas & Sarah",
      av: "https://i.pravatar.cc/100?img=11",
      rating: 4,
      date: "10 Mei 2026",
      trip: "Trip Keluarga",
      verified: true,
      text: `Pemandangannya menakjubkan dan udaranya segar sekali. Satu-satunya catatan adalah akses perjalanan yang menantang, tapi begitu sampai di lokasi, semua lelah terbayarkan tuntas. Persiapkan fisik dan alas kaki yang nyaman!`,
    },
  ];

  return (
    <section style={ds.section}>
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>
          <span>{"\u2B50"}</span> Ulasan Wisatawan
        </h2>
        <button
          style={{ ...ds.secondaryCta, width: "auto", padding: "10px 16px" }}
          onClick={() => alert("Membuka form penulisan ulasan...")}
        >
          + Tulis ulasan
        </button>
      </div>
      <RatingBreakdown
        avg={village.rating || 4.8}
        count={village.reviews || 124}
        dist={[84, 12, 3, 1, 0]}
      />
      <div style={ds.reviewList}>
        {reviews.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
      <button
        style={ds.loadMoreBtn}
        onClick={() => alert("Memuat ulasan lebih banyak...")}
      >
        Muat ulasan berikutnya {"\u2193"}
      </button>
    </section>
  );
}
