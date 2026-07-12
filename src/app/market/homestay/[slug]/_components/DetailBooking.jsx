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
function CalSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="var(--atr-purple)" strokeWidth="1.6" />
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="var(--atr-purple)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="var(--atr-purple)" strokeWidth="1.6" />
      <path d="M8 11l4 4 4-4" stroke="var(--atr-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="#1F5E2A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function BedSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 18V8h7a4 4 0 014 4v0H3M21 18v-6H3M3 18v3M21 18v3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeopleSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M14 19c0-2 1.5-4 4-4s3 1.5 3 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function RulerSm() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M3 9l6-6 12 12-6 6L3 9zM7 7l3 3M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function FlameSm() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 4 4 5 4 9a4 4 0 11-8 0c0-2 1-3 2-4-1 3 2 4 2 0 0-2-1-3 0-5z" />
    </svg>
  );
}

/* ── Stepper ── */
export function Stepper({ qty, onChange, max = 99 }) {
  return (
    <div style={hb.stepperWrap}>
      <button
        onClick={() => onChange(Math.max(0, qty - 1))}
        style={{ ...hb.stepBtn, ...(qty === 0 ? hb.stepBtnDisabled : {}) }}
      >
        −
      </button>
      <span style={hb.stepVal}>{qty}</span>
      <button
        onClick={() => onChange(Math.min(max, qty + 1))}
        style={{ ...hb.stepBtn, ...(qty >= max ? hb.stepBtnDisabled : {}) }}
      >
        +
      </button>
    </div>
  );
}

/* ── RoomCard ── */
export function RoomCard({ room, qty, onChange, nights }) {
  const active = qty > 0;
  const subtotal = qty * nights * room.price;
  return (
    <div style={{ ...hb.roomCard, ...(active ? hb.roomCardActive : {}) }}>
      <img src={room.img} alt="" style={hb.roomImg} />
      <div style={hb.roomBody}>
        <div style={hb.roomTopRow}>
          <span style={hb.roomName}>{room.name}</span>
          {room.almost && (
            <span style={hb.roomStockBadge}>
              <FlameSm /> HAMPIR HABIS · SISA {room.stock} KAMAR
            </span>
          )}
        </div>
        <div style={hb.roomSpecs}>
          <span style={hb.roomSpec}><BedSm /> {room.bed}</span>
          <span style={hb.roomSpec}><PeopleSm /> {room.capacity}</span>
          <span style={hb.roomSpec}><RulerSm /> {room.size}</span>
        </div>
        <div style={hb.roomAmen}>
          {room.amenities.map((a) => (
            <span key={a} style={hb.roomAmenChip}>
              {a}
            </span>
          ))}
        </div>
      </div>
      <div style={hb.roomRight}>
        <div style={hb.roomPriceRow}>
          <span style={hb.roomPrice}>Rp {room.price.toLocaleString("id-ID")}</span>
          <span style={hb.roomPriceUnit}>per malam</span>
        </div>
        <Stepper qty={qty} onChange={onChange} max={room.stock} />
        {active && nights > 0 && (
          <div style={{ fontSize: 11, color: "var(--atr-text-muted)", textAlign: "right" }}>
            {qty} kamar × {nights} malam
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--atr-text)", marginTop: 2 }}>
              = Rp {subtotal.toLocaleString("id-ID")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── DateRangeChip ── */
export function DateRangeChip({ start, end, onClick }) {
  const s = start ? new Date(start) : null;
  const e = end ? new Date(end) : null;
  const nights = nightsBetween(start, end);

  return (
    <button type="button" style={hb.rangeChip} onClick={onClick}>
      <span style={hb.rangeIcon}><CalSvg /></span>
      <div style={{ textAlign: "left" }}>
        <div style={hb.rangeLabel}>Check-in</div>
        <div style={hb.rangeVal}>
          {s ? `${s.getDate()} ${MONTHS_ID_SHORT[s.getMonth()]} ${s.getFullYear()}` : ", "}
        </div>
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={hb.rangeLabel}>Check-out</div>
        <div style={hb.rangeVal}>
          {e ? `${e.getDate()} ${MONTHS_ID_SHORT[e.getMonth()]} ${e.getFullYear()}` : ", "}
        </div>
      </div>
      <span style={hb.rangeNightsBadge}>{nights} malam</span>
      <span style={hb.rangeArrow}>›</span>
    </button>
  );
}

/* ── HomestayBookingSection ── */
export default function DetailBooking({ data, state, onOpenCal }) {
  const nights = nightsBetween(state.checkIn, state.checkOut);
  return (
    <section id="tiket" style={hb.bookSection}>
      <div style={hb.bookHeader}>
        <div>
          <div style={hb.bookEyebrow}>
            <CalSvg /> Pesan Kamar
          </div>
          <h2 style={hb.bookTitle}>Pilih jadwal & kamar</h2>
          <div style={hb.bookSub}>Tentukan tanggal check-in & check-out, lalu pilih kamar yang tersedia</div>
        </div>
        <div style={hb.bookFootnote}>
          <span style={hb.footChip}>
            <CheckSm /> Konfirmasi instan
          </span>
          <span style={{ color: "var(--atr-text-muted)", fontWeight: 600 }}>· Bebas cancel sampai H-3</span>
        </div>
      </div>

      {/* Date range */}
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          📅 Tanggal Menginap
        </div>
        <DateRangeChip start={state.checkIn} end={state.checkOut} onClick={onOpenCal} />
      </div>

      {/* Rooms */}
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          🛏 Pilih Kamar · {nights} malam
        </div>
        <div style={hb.roomList}>
          {data.rooms_list.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              qty={state.qty[room.id] || 0}
              onChange={(v) => state.setQty({ ...state.qty, [room.id]: v })}
              nights={nights}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
