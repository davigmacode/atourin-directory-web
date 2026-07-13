"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ps, orderStyles } from "@/styles/profile-styles";
import { ORDER_STATS, ORDER_TABS, ORDERS, TRIP_TYPES, RATING_CATS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";
import { EmptyState, SkList } from "@/components/layout";

const ORDER_TONE = {
  blue: "#3B82C4", yellow: "var(--atr-yellow)", purple: "var(--atr-purple)", dark: "#3C3A52",
};

function StarRow({ value, onSet }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={orderStyles.starRow} onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const on = (hover || value) >= n;
        return (
          <button key={n} style={orderStyles.starBtn} onMouseEnter={() => setHover(n)} onClick={() => onSet(n)} type="button" aria-label={`${n} bintang`}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill={on ? "#FFC442" : "none"} stroke={on ? "#FFC442" : "#CBCBD6"} strokeWidth="1.6">
              <path d="M12 2l3 6.5 7 .7-5.2 4.8 1.5 6.9L12 18.6 5.2 20.9l1.5-6.9L1.5 9.2l7-.7L12 2z" strokeLinejoin="round" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function ReviewModal({ order, onClose }) {
  const [trip, setTrip] = useState(null);
  const [ratings, setRatings] = useState({});

  function handleSubmit() {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast("Terima kasih! Ulasanmu membantu penjelajah lain.");
    }
    onClose();
  }

  return (
    <div style={ps.scrim} onClick={onClose}>
      <div style={orderStyles.reviewModal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={orderStyles.rmHead}>
          <div>
            <div style={orderStyles.rmTitle}>Berikan Ulasan Anda</div>
            <div style={orderStyles.rmSub}>{order.title}</div>
          </div>
          <button style={ps.modalClose} onClick={onClose} aria-label="Tutup">{PI.close}</button>
        </div>

        <div style={orderStyles.rmBody}>
          <div>
            <div style={orderStyles.rmSecTitle}>Tipe Perjalanan</div>
            <div style={orderStyles.tripChips}>
              {TRIP_TYPES.map((tp) => (
                <button key={tp} className="atr-trip" type="button"
                  style={{ ...orderStyles.tripChip, ...(trip === tp ? orderStyles.tripChipOn : {}) }}
                  onClick={() => setTrip(tp)}>{tp}</button>
              ))}
            </div>
          </div>

          <div style={orderStyles.catGrid}>
            {RATING_CATS.map((c) => (
              <div key={c} style={orderStyles.catCard}>
                <div style={orderStyles.catLabel}>{c}</div>
                <StarRow value={ratings[c] || 0} onSet={(n) => setRatings((r) => ({ ...r, [c]: n }))} />
              </div>
            ))}
          </div>

          <div>
            <div style={orderStyles.rmSecTitle}>Ulasan</div>
            <textarea style={orderStyles.rmTextarea} placeholder="Tulis ulasan Anda di sini..." />
          </div>
        </div>

        <div style={orderStyles.rmFoot}>
          <button style={orderStyles.rmCancel} onClick={onClose}>Batal</button>
          <button style={orderStyles.rmSubmit} onClick={handleSubmit}>Kirim Ulasan</button>
        </div>
      </div>
    </div>
  );
}

function statusBadge(status) {
  if (status === "belum") return <span style={{ ...orderStyles.badge, background: "rgba(255,196,66,0.2)", color: "#9A6A00" }}>{PI.clock} Menunggu Pembayaran</span>;
  if (status === "selesai") return <span style={{ ...orderStyles.badge, background: "rgba(60,58,82,0.1)", color: "#3C3A52" }}>{PI.check} Selesai</span>;
  if (status === "aktif") return <span style={{ ...orderStyles.badge, background: "var(--atr-purple-50)", color: "var(--atr-purple)" }}>{PI.ticket} Aktif</span>;
  if (status === "batal") return <span style={{ ...orderStyles.badge, background: "rgba(244,98,99,0.12)", color: "var(--atr-red)" }}>{PI.xcircle} Dibatalkan</span>;
  return <span style={{ ...orderStyles.badge, background: "var(--atr-bg-soft)", color: "var(--atr-text-muted)", border: "1px solid var(--atr-outline)" }}>{PI.slash} Kedaluwarsa</span>;
}

export default function MyOrdersPage() {
  const [tab, setTab] = useState("Semua");
  const [q, setQ] = useState("");
  const [reviewOrder, setReviewOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const filtered = ORDERS.filter((o) => {
    const okTab = tab === "Semua"
      || (tab === "Belum Bayar" && o.status === "belum")
      || (tab === "Selesai" && o.status === "selesai")
      || (tab === "Aktif" && o.status === "aktif")
      || (tab === "Mengisi Data" && o.status === "mengisi")
      || (tab === "Dibatalkan" && o.status === "batal");
    const okQ = !q || (o.title + o.id).toLowerCase().includes(q.toLowerCase());
    return okTab && okQ;
  });

  return (
    <div style={ps.panel}>
      <PanelHead title="Pesanan Saya" sub="Pantau semua perjalananmu, dari menunggu bayar sampai petualangan selesai" />

      <div style={orderStyles.statGrid}>
        {ORDER_STATS.map((s) => (
          <div key={s.key} style={orderStyles.statCard}>
            <span style={{ ...orderStyles.statIcon, background: ORDER_TONE[s.tone] }}>{PI[s.icon]}</span>
            <span style={orderStyles.statCount}>{s.count}</span>
            <div style={{ flexBasis: "100%" }}>
              <div style={orderStyles.statLabel}>{s.label}</div>
              <div style={orderStyles.statSub}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={ps.tabBar}>
        {ORDER_TABS.map((t) => (
          <button key={t} style={{ ...ps.tab, ...(t === tab ? ps.tabActive : {}) }} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      <div style={ps.search}>
        <span style={{ color: "var(--atr-text-muted)" }}>{PI.search}</span>
        <input style={ps.searchInput} placeholder="Cari pesanan (ID, Nama Produk)..." value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      {loading ? (
        <div style={{ marginTop: 18 }}><SkList count={3} /></div>
      ) : filtered.length === 0 ? (
        <EmptyState
          art="orders"
          title={tab === "Semua" ? "Belum ada pesanan" : `Tidak ada pesanan ${tab}`}
          desc={tab === "Semua" ? "Yuk mulai petualanganmu! Pesanan yang kamu buat akan tampil di sini." : "Belum ada pesanan di kategori ini. Coba kategori lain."}
          action={{ label: "Mulai jelajahi", href: "/explore" }}
        />
      ) : filtered.map((o) => {
        const cancelled = o.status === "batal";
        return (
          <div key={o.id} style={orderStyles.card}>
            <div style={orderStyles.cardImgWrap}>
              <img src={o.img} alt="" style={{ ...orderStyles.cardImg, ...(cancelled ? { filter: "grayscale(1)", opacity: 0.85 } : {}) }} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
            </div>
            <div style={orderStyles.cardBody}>
              <div style={orderStyles.cardTop}>
                <div>
                  <span style={orderStyles.cardCode}>#{o.id}</span>
                  <span style={{ ...orderStyles.cardCode, fontWeight: 600, marginLeft: 8 }}>· {o.date}</span>
                  <div style={orderStyles.cardTitle}>{o.title}</div>
                  <div style={orderStyles.cardPriceLabel}>Total Pembayaran</div>
                  <div style={orderStyles.cardPrice}>Rp{o.total.toLocaleString("id-ID")}</div>
                </div>
                {statusBadge(o.status)}
              </div>
              <div style={orderStyles.cardFoot}>
                {o.status === "belum" && <Link href="/checkout" style={{ textDecoration: "none" }}><button style={orderStyles.payBtn}>Bayar Sekarang</button></Link>}
                {o.status === "selesai" && o.reviewed && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, marginRight: "auto", background: "rgba(81,176,84,0.12)", color: "#2F8A3B", padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 700 }}>
                    {PI.check} Sudah diulas · <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: "#9A6A00" }}>{PI.star} {o.myRating.toString().replace(".", ",")}</span>
                  </span>
                )}
                {o.status === "selesai" && !o.reviewed && <button style={ps.btnGhost} onClick={() => setReviewOrder(o)}>{PI.chat} Beri Ulasan</button>}
                {o.status === "selesai" && o.reviewed && <button style={ps.btnGhost} onClick={() => setReviewOrder(o)}>{PI.chat} Lihat Ulasan</button>}
                {o.status === "batal" && <Link href="/explore" style={{ textDecoration: "none" }}><button style={ps.btnGhost}>{PI.plus} Pesan Lagi</button></Link>}
                {o.status !== "belum" && <Link href="/profile/orders" style={{ textDecoration: "none" }}><button style={ps.btnPrimary}>Lihat Detail</button></Link>}
              </div>
            </div>
          </div>
        );
      })}

      {reviewOrder && <ReviewModal order={reviewOrder} onClose={() => setReviewOrder(null)} />}
    </div>
  );
}
