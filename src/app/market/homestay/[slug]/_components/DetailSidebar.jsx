"use client";

import React from "react";
import { hb } from "@/styles/homestay-detail-styles";

/* ── Helpers ── */
function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const start = new Date(a);
  const end = new Date(b);
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

const MONTHS_ID_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"];

/* ── SVGs ── */
function BagSvg() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l-1 12H6L5 8z" stroke="var(--atr-purple)" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 8V6a4 4 0 018 0v2" stroke="var(--atr-purple)" strokeWidth="1.6" />
    </svg>
  );
}

function BagSvgWhite() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l-1 12H6L5 8z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 8V6a4 4 0 018 0v2" stroke="#fff" strokeWidth="1.8" />
    </svg>
  );
}

function PinXs() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function LockSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function ChatSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M4 5h16v11H8l-4 4V5z" stroke="var(--atr-purple)" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function WaSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M3 21l1.5-5.2A8.5 8.5 0 1 1 8.2 19L3 21z" stroke="#25D366" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function MailSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="13" rx="2" stroke="var(--atr-purple)" strokeWidth="1.6" />
      <path d="M4 8l8 6 8-6" stroke="var(--atr-purple)" strokeWidth="1.6" />
    </svg>
  );
}

/* ── HomestaySummary ── */
export function HomestaySummary({ data, state, onCheckout }) {
  const nights = nightsBetween(state.checkIn, state.checkOut);
  const lines = data.rooms_list
    .map((r) => ({ ...r, qty: state.qty[r.id] || 0 }))
    .filter((l) => l.qty > 0);
  const subtotal = lines.reduce((acc, l) => acc + l.qty * nights * l.price, 0);
  const total = subtotal;
  const totalRooms = lines.reduce((a, l) => a + l.qty, 0);

  const sd = state.checkIn ? new Date(state.checkIn) : null;
  const ed = state.checkOut ? new Date(state.checkOut) : null;

  return (
    <div style={hb.sumCard}>
      <div style={hb.sumHead}>
        <span style={hb.sumHeadIcon}>
          <BagSvg />
        </span>
        <div>
          <div style={hb.sumTitle}>Ringkasan Pesanan</div>
          <div style={hb.sumSub}>Detail pesanan & pembayaran</div>
        </div>
      </div>

      <div style={hb.sumProd}>
        <img src={data.images[0]} alt="" style={hb.sumProdImg} />
        <div>
          <div style={hb.sumProdName}>{data.name}</div>
          <div style={hb.sumProdMeta}>
            <PinXs /> {data.shortLocation}
          </div>
        </div>
      </div>

      <div style={hb.sumStay}>
        <div style={hb.sumStayCell}>
          <div style={hb.sumStayLabel}>Check-in</div>
          <div style={hb.sumStayVal}>
            {sd ? `${sd.getDate()} ${MONTHS_ID_SHORT[sd.getMonth()]}` : ", "}
          </div>
        </div>
        <div style={hb.sumStayCell}>
          <div style={hb.sumStayLabel}>Check-out</div>
          <div style={hb.sumStayVal}>
            {ed ? `${ed.getDate()} ${MONTHS_ID_SHORT[ed.getMonth()]}` : ", "}
          </div>
        </div>
      </div>

      {lines.length === 0 ? (
        <div
          style={{
            background: "var(--atr-bg-soft)",
            borderRadius: 10,
            padding: "18px 14px",
            textAlign: "center",
            fontSize: 12,
            color: "var(--atr-text-muted)",
            lineHeight: 1.5,
          }}
        >
          Pilih kamar dulu untuk lanjut
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {lines.map((l) => (
            <div key={l.id} style={hb.sumLine}>
              <span style={hb.sumLineMuted}>
                {l.qty}× {l.name}
                <br />
                <span style={{ fontSize: 11 }}>
                  {nights} malam @ Rp {l.price.toLocaleString("id-ID")}
                </span>
              </span>
              <span style={hb.sumLineStrong}>
                Rp {(l.qty * nights * l.price).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
          <div style={hb.sumDashed} />
          <div style={hb.sumLine}>
            <span style={hb.sumLineMuted}>Subtotal</span>
            <span style={hb.sumLineStrong}>Rp {subtotal.toLocaleString("id-ID")}</span>
          </div>
        </div>
      )}

      <div style={hb.artiRow}>
        <span style={hb.artiIcon}>🌱</span>
        <div>
          <div style={hb.artiTitle}>1 pohon ditanam / malam</div>
          <div style={hb.artiSub}>Termasuk via ARTI</div>
        </div>
        <span style={hb.artiPill}>FREE</span>
      </div>

      <div style={hb.sumTotalRow}>
        <span style={hb.sumTotalLabel}>Total {totalRooms > 0 && `(${totalRooms} kamar)`}</span>
        <span style={hb.sumTotalVal}>Rp {total.toLocaleString("id-ID")}</span>
      </div>

      <button
        disabled={lines.length === 0}
        onClick={onCheckout}
        style={{ ...hb.sumCta, ...(lines.length === 0 ? hb.sumCtaDisabled : {}) }}
      >
        <BagSvgWhite /> Pesan Sekarang
      </button>

      <div style={hb.sumHelp}>
        <LockSm /> Pembayaran aman & terverifikasi
      </div>
    </div>
  );
}

/* ── HomestayHelpCard ── */
export function HomestayHelpCard() {
  return (
    <div style={hb.helpCard}>
      <div style={hb.helpTitle}>
        <ChatSm /> Butuh bantuan?
      </div>
      <div style={{ fontSize: 12, color: "var(--atr-text-muted)", lineHeight: 1.5 }}>
        Tim Atourin siap membantu dari jam 08.00 – 21.00 WIB.
      </div>
      <div style={hb.helpRow}>
        <WaSm /> +62 812-2040-1113
      </div>
      <div style={hb.helpRow}>
        <MailSm /> info@atourin.com
      </div>
    </div>
  );
}
