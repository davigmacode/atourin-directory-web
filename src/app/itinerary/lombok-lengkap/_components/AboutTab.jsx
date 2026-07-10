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

export default function AboutTab() {
  return (
    <div style={detailStyles.aboutWrap}>
      {/* Overview */}
      <AboutSection eyebrow="Tentang" title="Paket Liburan Lengkap Lombok">
        <div style={detailStyles.aboutBody}>
          Nikmati pengalaman liburan 4 hari 3 malam yang mencakup destinasi
          terbaik Lombok. Dari pantai eksotis Kuta Mandalika, Bukit Merese
          dengan sunrise spektakuler, hingga kekayaan budaya Suku Sasak di Desa
          Sade. Setiap aktivitas telah dirancang untuk memberikan kenyamanan dan
          pengalaman otentik.
        </div>
        <div style={detailStyles.aboutBody}>
          Paket ini cocok untuk pasangan, kelompok kecil, atau solo traveler
          yang ingin menjelajahi Lombok tanpa repot mengatur transportasi dan
          akomodasi. Pemandu lokal yang ramah akan menemani perjalanan Anda.
        </div>
      </AboutSection>

      {/* Highlights */}
      <AboutSection eyebrow="Sorotan" title="Yang Akan Kamu Nikmati">
        <div style={detailStyles.highlightGrid}>
          {[
            {
              icon: "\u{1F3D6}",
              title: "Pantai Eksotis",
              desc: "Pasir putih & air jernih di Kuta, Tanjung Aan, dan pantai selatan Lombok.",
            },
            {
              icon: "\u{1F30B}",
              title: "Budaya Sasak",
              desc: "Kunjungan ke Desa Sade & proses menenun songket tradisional.",
            },
            {
              icon: "\u{1F30A}",
              title: "Snorkeling",
              desc: "Jelajahi biota laut di perairan Gili Nanggu & Kedis.",
            },
            {
              icon: "\u{1F373}",
              title: "Kuliner Khas",
              desc: "Ayam taliwang, plecing kangkung, dan seafood segar.",
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
            question="Apakah tiket pesawat sudah termasuk?"
            answer="Tiket pesawat belum termasuk dalam paket ini. Harga yang tercantum adalah untuk paket darat (akomodasi, transportasi lokal, makan, tiket masuk, dan pemandu)."
          />
          <FaqItem
            question="Bisakah saya meminta perubahan jadwal?"
            answer="Tentu. Kamu bisa menyesuaikan jadwal, durasi, dan aktivitas melalui tombol 'Edit & Personalisasi'. Tim kami akan membantu mengatur ulang rencana sesuai keinginan."
          />
          <FaqItem
            question="Apakah ada asuransi perjalanan?"
            answer="Asuransi perjalanan belum termasuk secara default, namun dapat ditambahkan sebagai opsi tambahan saat proses pemesanan. Kami merekomendasikan untuk mengambil asuransi perjalanan untuk keamanan ekstra."
          />
          <FaqItem
            question="Bagaimana jika cuaca buruk?"
            answer="Rencana perjalanan bersifat fleksibel. Pemandu lokal akan menyesuaikan aktivitas berdasarkan kondisi cuaca untuk memastikan keselamatan dan kenyamanan Anda."
          />
        </div>
      </AboutSection>

      {/* Author card */}
      <AboutSection eyebrow="Penulis" title="Tentang Pemandu">
        <div style={detailStyles.authorBigCard}>
          <img
            src="https://i.pravatar.cc/200?img=11"
            alt="Rizky Pratama"
            style={detailStyles.authorBigImg}
          />
          <div>
            <div style={detailStyles.authorBigName}>
              Rizky Pratama
              <span style={detailStyles.verifiedBadge}>
                <CheckBadge /> Travel Specialist
              </span>
            </div>
            <div style={detailStyles.authorBigRole}>Pemandu Wisata Lombok</div>
            <div style={detailStyles.authorBigBio}>
              Berpengalaman lebih dari 5 tahun memandu wisatawan lokal dan
              mancanegara menjelajahi keindahan Lombok. Menguasai bahasa
              Indonesia, Inggris, dan bahasa Sasak.
            </div>
            <div style={detailStyles.authorBigStats}>
              <span>{"\u{1F4CD}"} 18 Itinerary</span>
              <span>{"\u{2B50}"} 4.9 Rating</span>
              <span>{"\u{1F465}"} 200+ Wisatawan</span>
            </div>
          </div>
        </div>
      </AboutSection>
    </div>
  );
}
