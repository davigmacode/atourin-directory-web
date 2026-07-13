"use client";

import React, { useState } from "react";
import Link from "next/link";
import { hm } from "@/styles/home-styles";
import {
  HI,
  Carousel,
  ProductCardH,
  PromoCardH,
  VillageCardH,
  ArticleCardH,
  VoucherCardH,
} from "./HomeCards";

export function SecHead({ kicker, title, sub, link, linkHref }) {
  return (
    <div style={hm.secHead}>
      <div>
        {kicker && <div style={hm.secKicker}>{kicker}</div>}
        <div style={hm.secTitle}>{title}</div>
        {sub && <div style={hm.secSub}>{sub}</div>}
      </div>
      {link && (
        <Link href={linkHref || "#"} style={{ ...hm.secLink, textDecoration: "none" }}>
          {link} {HI.arrowR}
        </Link>
      )}
    </div>
  );
}

/* ── PROMO SECTION ── */
export function PromoSection({ promos = [] }) {
  return (
    <section style={{ ...hm.section, ...hm.sectionPad }}>
      <SecHead kicker="Promo & Penawaran" title="Diskon spesial buat liburanmu" link="Lihat semua promo" linkHref="/promo" />
      <div style={hm.promoGrid}>
        {promos.map((p) => (
          <PromoCardH key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ── VOUCHER CODES SECTION ── */
export function VoucherSection({ vouchers = [] }) {
  return (
    <section style={{ ...hm.section, paddingBottom: 56 }}>
      <SecHead kicker="Kode Voucher" title="Cek dulu diskonnya!" sub="Salin kode voucher ini & pakai saat checkout perjalanan impianmu." link="Lihat semua promo" linkHref="/promo" />
      <Carousel>
        {vouchers.map((v) => (
          <VoucherCardH key={v.id} v={v} />
        ))}
      </Carousel>
    </section>
  );
}

/* ── POPULAR SECTION ── */
export function PopularSection({ accent, products = [], filters = [], onSave }) {
  const [filter, setFilter] = useState("Semua");
  const list = products.filter((p) => filter === "Semua" || (p.tags || []).includes(filter));
  return (
    <section style={{ ...hm.section, paddingBottom: 56 }}>
      <SecHead kicker="Paling dicari" title="Populer di Atourin" sub="Aktivitas & tiket favorit yang paling banyak dipesan minggu ini." link="Jelajahi semua" linkHref="/market/experience" />
      <div style={hm.chipRow}>
        {filters.map((f) => (
          <button
            key={f}
            style={{
              ...hm.chip,
              ...(f === filter
                ? { border: "1.5px solid " + accent, background: "var(--atr-purple-50)", color: accent }
                : {}),
            }}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <Carousel>
        {list.map((p) => (
          <ProductCardH key={p.id} p={p} onSave={onSave} />
        ))}
      </Carousel>
    </section>
  );
}

/* ── DESTINATIONS SECTION ── */
export function DestinationSection({ destinations = [] }) {
  return (
    <section style={{ ...hm.section, paddingBottom: 56 }}>
      <SecHead kicker="Destinasi Populer" title="Mau ke mana selanjutnya?" sub="Destinasi paling dicari penjelajah Atourin minggu ini." link="Lihat semua destinasi" linkHref="/explore/destinations" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="hm-dest-grid">
        {destinations.map((d) => (
          <Link
            key={d.name}
            href="/destinations"
            style={{
              position: "relative",
              aspectRatio: "5/4",
              borderRadius: 16,
              overflow: "hidden",
              textDecoration: "none",
              display: "block",
            }}
            className="hm-village"
          >
            <img
              src={d.img}
              alt={d.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .4s ease" }}
              onError={(e) => {
                e.currentTarget.style.opacity = 0;
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 38%, rgba(20,16,40,0.74) 100%)",
              }}
            />
            <div style={{ position: "absolute", left: 16, bottom: 14, color: "#fff" }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{d.name}</div>
              <div style={{ fontSize: 12.5, opacity: 0.9, marginTop: 2 }}>{d.count} aktivitas</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── JELAJAHI BY TYPE SECTION ── */
export function JelajahiSection({ accent, products = [], tabs = [], onSave }) {
  const [tab, setTab] = useState("experience");
  const byCat = { experience: "Experience", attraction: "Attraction", homestay: "Homestay" };
  const list = products.filter((p) => (tab === "experience" ? p.cat === "Experience" : true)).slice(0, 8);
  return (
    <section style={{ ...hm.section, ...hm.sectionPad }}>
      <SecHead kicker="Jelajahi" title="Pilih cara berliburmu" sub="Dari pengalaman seru, tiket atraksi, sampai menginap di homestay desa." />
      <div style={hm.jelTabs}>
        {tabs.map((t) => (
          <button
            key={t.id}
            style={{
              ...hm.chip,
              ...(t.id === tab
                ? { border: "1.5px solid " + accent, background: "var(--atr-purple-50)", color: accent }
                : {}),
            }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <Carousel>
        {list.map((p) => (
          <ProductCardH key={p.id} p={{ ...p, cat: byCat[tab] }} onSave={onSave} />
        ))}
      </Carousel>
    </section>
  );
}

/* ── VILLAGE SECTION ── */
export function VillageSection({ villages = [] }) {
  return (
    <section style={{ ...hm.section, paddingBottom: 56 }}>
      <SecHead kicker="Wisata Otentik" title="Rasakan Indonesia di Desa Wisata" sub="Menginap dan beraktivitas langsung bersama masyarakat lokal." link="Lihat semua desa" linkHref="/explore/tourism-villages" />
      <div style={hm.villageGrid}>
        {villages.map((v) => (
          <VillageCardH key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}

/* ── WHY ATOURIN ── */
export function WhySection({ why = [] }) {
  return (
    <section style={hm.whyBand}>
      <div style={{ ...hm.section, ...hm.sectionPad }}>
        <SecHead kicker="Kenapa Atourin" title="Liburan tenang, berdampak baik" sub="Lebih dari sekadar tiket, kami bantu kamu menjelajah dengan aman dan bertanggung jawab." />
        <div style={hm.whyGrid}>
          {why.map((w) => (
            <div key={w.id} style={hm.whyCard}>
              <span style={hm.whyIcon}>{HI[w.icon] || HI.sparkle}</span>
              <div style={hm.whyTitle}>{w.title}</div>
              <div style={hm.whyText}>{w.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── ARTICLES INSPIRASI ── */
export function InspirasiSection({ articles = [] }) {
  return (
    <section style={{ ...hm.section, ...hm.sectionPad }}>
      <SecHead kicker="Inspirasi Perjalanan" title="Cerita & tips dari para penjelajah" link="Lihat semua artikel" linkHref="/explore" />
      <div style={hm.articleGrid}>
        {articles.map((a) => (
          <ArticleCardH key={a.id} a={a} />
        ))}
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
export function TestiSection({ testimonials = [] }) {
  return (
    <section style={hm.whyBand}>
      <div style={{ ...hm.section, ...hm.sectionPad }}>
        <SecHead kicker="Kata Mereka" title="Dipercaya ribuan penjelajah" />
        <div style={hm.testiGrid}>
          {testimonials.map((t) => (
            <div key={t.id} style={hm.testiCard}>
              <div style={hm.testiStars}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <svg
                    key={n}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={t.rating >= n ? "#FFC442" : t.rating >= n - 0.5 ? "#FFC442" : "none"}
                    stroke="#FFC442"
                    strokeWidth="1.4"
                  >
                    <path
                      d="M12 2l3 6.5 7 .7-5.2 4.8 1.5 6.9L12 18.6 5.2 20.9l1.5-6.9L1.5 9.2l7-.7L12 2z"
                      strokeLinejoin="round"
                    />
                  </svg>
                ))}
              </div>
              <div style={hm.testiText}>"{t.text}"</div>
              <div style={hm.testiUser}>
                <img
                  src={t.avatar}
                  alt=""
                  style={hm.testiAvatar}
                  onError={(e) => {
                    e.currentTarget.style.background = "var(--atr-bg-cool)";
                  }}
                />
                <div>
                  <div style={hm.testiName}>{t.name}</div>
                  <div style={hm.testiTrip}>{t.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── APP BAND ── */
export function AppSection() {
  return (
    <section style={{ ...hm.section, paddingTop: 24, paddingBottom: 56 }}>
      <div style={hm.appBand}>
        <span style={{ ...hm.appBlob, width: 200, height: 200, top: -60, left: "38%" }} />
        <span style={{ ...hm.appBlob, width: 120, height: 120, bottom: -30, left: "20%" }} />
        <div style={hm.appLeft}>
          <div style={hm.appTitle}>Jelajah makin mudah lewat aplikasi Atourin</div>
          <div style={hm.appText}>
            Simpan e-tiket, lacak pesanan, dan dapatkan promo eksklusif khusus pengguna aplikasi.
          </div>
          <div style={hm.appBtns}>
            <a style={hm.storeBtn} className="hm-store" href="#">
              <span>{HI.play}</span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={hm.storeSm}>GET IT ON</span>
                <span style={hm.storeLg}>Google Play</span>
              </span>
            </a>
            <a style={hm.storeBtn} className="hm-store" href="#">
              <span>{HI.apple}</span>
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={hm.storeSm}>Download on the</span>
                <span style={hm.storeLg}>App Store</span>
              </span>
            </a>
          </div>
        </div>
        <div style={hm.appRight}>
          <img
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=70"
            alt=""
            style={hm.appPhone}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ── SEO SECTION ── */
export function SeoSection({ seo = {} }) {
  const [tab, setTab] = useState("Experience");
  const tabs = Object.keys(seo);
  return (
    <section style={hm.seoBand}>
      <div style={{ ...hm.section, ...hm.sectionPad }}>
        <SecHead kicker="Rekomendasi untukmu" title="Destinasi & aktivitas pilihan" />
        <div style={hm.seoTabs}>
          {tabs.map((t) => (
            <button
              key={t}
              style={{ ...hm.seoTab, ...(t === tab ? hm.seoTabOn : {}) }}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div style={hm.seoGrid}>
          {seo[tab]?.map((l) => (
            <a key={l} href="#" style={hm.seoLink} className="hm-seo">
              {HI.arrowR} {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── NEWSLETTER SECTION ── */
export function NewsletterSection() {
  return (
    <section style={{ ...hm.section, ...hm.sectionPad }}>
      <div style={hm.news}>
        <div>
          <div style={hm.newsTitle}>Jadi yang pertama tahu promo terbaru</div>
          <div style={hm.newsSub}>Daftar newsletter & dapatkan inspirasi perjalanan tiap minggu.</div>
        </div>
        <div style={hm.newsForm}>
          <input style={hm.newsInput} placeholder="Masukkan emailmu" />
          <button style={hm.newsBtn}>Langganan</button>
        </div>
      </div>
    </section>
  );
}
