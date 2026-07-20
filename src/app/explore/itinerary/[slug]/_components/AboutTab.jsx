"use client";

import React, { useState } from "react";
import detailStyles from "@/styles/itinerary-detail-styles";
import { ChevronSm, CheckBadge } from "./Shared";

function AboutSection({ eyebrow, title, children }) {
  return (
    <div style={detailStyles.aboutSection}>
      {eyebrow && <div style={detailStyles.aboutEyebrow}>{eyebrow}</div>}
      {title && <div style={detailStyles.aboutTitle}>{title}</div>}
      {children}
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={detailStyles.faqItem}>
      <button style={detailStyles.faqQ} onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span
          style={{
            ...detailStyles.faqChev,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronSm />
        </span>
      </button>
      {open && <div style={detailStyles.faqA}>{answer}</div>}
    </div>
  );
}

export default function AboutTab({ itinerary }) {
  const authorName = typeof itinerary.author === 'object' ? (itinerary.author?.displayName || itinerary.author?.name || '') : (itinerary.author || '');
  const authorBio = typeof itinerary.author === 'object' ? (itinerary.author?.bio?.id || itinerary.author?.bio?.en || '') : '';
  const isVerified = typeof itinerary.author === 'object' ? !!itinerary.author?.isVerified : false;
  const city = itinerary.destination?.name || itinerary.city || '';
  const daysLabel = typeof itinerary.days === 'string'
    ? itinerary.days
    : ((itinerary.durationDays ? `${itinerary.durationDays} Hari` : '') + (itinerary.durationNights ? ` · ${itinerary.durationNights} Malam` : ''));
  const ratingVal = itinerary.ratingAverage || itinerary.rating || 0;
  const viewsVal = itinerary.viewsCount || itinerary.views || 0;

  return (
    <div style={detailStyles.aboutWrap}>
      {/* Overview */}
      <AboutSection eyebrow="Tentang" title={`Paket Perjalanan ${city}`}>
        <div style={detailStyles.aboutBody}>
          Nikmati pengalaman perjalanan terbaik {daysLabel} di {city}.
          Rencana ini disusun dengan sangat cermat agar Anda dapat menikmati daya tarik
          budaya lokal, keindahan alam, serta kuliner ikonik setempat secara maksimal
          tanpa terburu-buru.
        </div>
        <div style={detailStyles.aboutBody}>
          Sangat cocok untuk perjalanan keluarga, liburan bersama teman, atau petualangan
          mandiri. Semua akomodasi pendukung, transportasi lokal, dan pemandu lokal
          telah dikoordinasikan secara profesional.
        </div>
      </AboutSection>

      {/* Highlights */}
      <AboutSection eyebrow="Sorotan" title="Yang Akan Kamu Nikmati">
        <div style={detailStyles.highlightGrid}>
          {[
            {
              icon: "\u{1F3D6}",
              title: "Pantai & Pemandangan",
              desc: `Jelajahi garis pantai eksotis dan bentang alam memukau khas ${city}.`,
            },
            {
              icon: "\u{1F30B}",
              title: "Kearifan Budaya",
              desc: "Interaksi hangat dengan penduduk lokal Sasak dan melihat kerajinan tangan lokal.",
            },
            {
              icon: "\u{1F30A}",
              title: "Biota & Aktivitas Laut",
              desc: "Berenang, snorkeling, atau sekadar berfoto ria di air laut jernih.",
            },
            {
              icon: "\u{1F373}",
              title: "Kuliner Otentik",
              desc: "Mencicipi masakan khas tradisional lokal dengan rasa otentik.",
            },
          ].map((h, i) => (
            <div key={i} style={detailStyles.highlightCard}>
              <div style={detailStyles.highlightIcon}>{h.icon}</div>
              <div>
                <div style={detailStyles.highlightTitle}>{h.title}</div>
                <div style={detailStyles.highlightDesc}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </AboutSection>

      {/* Best Time */}
      <AboutSection eyebrow="Waktu Terbaik" title="Musim Kunjungan">
        <div style={detailStyles.monthGrid}>
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mei",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Okt",
            "Nov",
            "Des",
          ].map((m, i) => {
            const peak = i >= 4 && i <= 8;
            const shoulder = i === 3 || i === 9 || i === 10;
            return (
              <div
                key={m}
                style={{
                  ...detailStyles.monthCell,
                  background: peak
                    ? "#E4F4E4"
                    : shoulder
                      ? "#FFFBEE"
                      : "var(--atr-bg-soft)",
                }}
              >
                <div style={detailStyles.monthName}>{m}</div>
                <div style={detailStyles.monthBadge}>
                  {peak ? "High" : shoulder ? "Mid" : "Low"}
                </div>
              </div>
            );
          })}
        </div>
      </AboutSection>

      {/* FAQ */}
      <AboutSection eyebrow="FAQ" title="Pertanyaan Umum">
        <div style={detailStyles.faqList}>
          <FaqItem
            question="Apakah tiket penerbangan sudah termasuk?"
            answer="Tiket pesawat belum termasuk. Biaya paket ini hanya mencakup akomodasi, transportasi darat lokal, tiket masuk tempat wisata, dan pemandu lokal."
          />
          <FaqItem
            question="Dapatkah itinerary ini disesuaikan lagi?"
            answer="Tentu saja! Anda bisa dengan bebas mengedit rute perjalanan dan tanggal keberangkatan melalui tombol 'Edit & Personalisasi' setelah memesan."
          />
          <FaqItem
            question="Bagaimana kebijakan pembatalan & refund?"
            answer="Pembatalan H-7 mendapatkan refund 100%. Untuk pembatalan mendadak karena kendala cuaca buruk akan dikoordinasikan penundaan tanggal."
          />
        </div>
      </AboutSection>

      {/* Author card */}
      <AboutSection eyebrow="Penulis" title="Tentang Kreator">
        <div style={detailStyles.authorBigCard}>
          <div
            style={{
              ...detailStyles.authorBigImg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #A49EE4, #7068D5)",
              color: "#fff",
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            {authorName?.[0] || ''}
          </div>
          <div>
            <div style={detailStyles.authorBigName}>
              {authorName}
              {isVerified && (
                <span style={detailStyles.verifiedBadge}>
                  <CheckBadge /> {"Kreator Resmi"}
                </span>
              )}
            </div>
            <div style={detailStyles.authorBigRole}>Travel Creator & Specialist</div>
            <div style={detailStyles.authorBigBio}>
              {authorBio || "Berpengalaman memandu perjalanan wisata lokal dan asing. Fokus pada rute perjalanan berkelanjutan dan mengenalkan kebudayaan otentik."}
            </div>
            <div style={detailStyles.authorBigStats}>
              <span>{"\u{1F4CD}"} {city}</span>
              <span>{"\u{2B50}"} {ratingVal} Rating</span>
              <span>{"\u{1F465}"} {viewsVal} Dilihat</span>
            </div>
          </div>
        </div>
      </AboutSection>
    </div>
  );
}
