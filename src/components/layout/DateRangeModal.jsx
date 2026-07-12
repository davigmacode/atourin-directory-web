"use client";

import React, { useState, useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

const ID_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const ID_DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function fmtDate(d) {
  if (!d) return ", ";
  return `${d.getDate()} ${ID_MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

function dayName(d) {
  const idx = (d.getDay() + 6) % 7; // ID week start Monday
  return ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"][idx];
}

function diffNights(a, b) {
  if (!a || !b) return 0;
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ArrowR() {
  return (
    <svg width="20" height="14" viewBox="0 0 24 14" fill="none">
      <path d="M2 7h18m0 0l-5-5m5 5l-5 5" stroke="var(--atr-purple)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const navArrowBtn = {
  width: 36,
  height: 36,
  borderRadius: 999,
  background: "#fff",
  border: "1px solid var(--atr-outline)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  color: "var(--atr-text)",
};

function DateSummary({ label, date, align = "left" }) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-purple)",
          letterSpacing: "0.12em",
          marginBottom: 4,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          justifyContent: align === "right" ? "flex-end" : "flex-start",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--atr-purple)" }} />
        {label}
      </div>
      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          color: date ? "var(--atr-text)" : "var(--atr-text-muted)",
        }}
      >
        {date ? fmtDate(date) : "Pilih tanggal"}
      </div>
      <div style={{ fontSize: 12, color: "var(--atr-text-muted)", marginTop: 2 }}>
        {date ? dayName(date) : ", "}
      </div>
    </div>
  );
}

function MonthGrid({ month, today, draftIn, draftOut, pickDay }) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const last = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const startCol = (first.getDay() + 6) % 7; // monday-start
  const cells = [];
  for (let i = 0; i < startCol; i++) cells.push(null);
  for (let d = 1; d <= last.getDate(); d++) {
    cells.push(new Date(month.getFullYear(), month.getMonth(), d));
  }
  while (cells.length % 7) cells.push(null);

  return (
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "var(--atr-text)",
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {ID_MONTHS[month.getMonth()]} {month.getFullYear()}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 2,
          marginBottom: 4,
        }}
      >
        {ID_DAYS.map((d, i) => (
          <div
            key={d}
            style={{
              fontSize: 11,
              fontWeight: 600,
              textAlign: "center",
              padding: "6px 0",
              color: i >= 5 ? "var(--atr-red)" : "var(--atr-text-muted)",
            }}
          >
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isPast = d < today;
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;
          const isIn = draftIn && d.getTime() === draftIn.getTime();
          const isOut = draftOut && d.getTime() === draftOut.getTime();
          const inRange = draftIn && draftOut && d > draftIn && d < draftOut;
          const endpoint = isIn || isOut;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => pickDay(d)}
              style={{
                aspectRatio: "1",
                borderRadius: endpoint ? 999 : 8,
                background: endpoint ? "var(--atr-purple)" : inRange ? "rgba(112,104,213,0.15)" : "transparent",
                color: endpoint
                  ? "#fff"
                  : isPast
                  ? "var(--atr-outline)"
                  : isWeekend
                  ? "var(--atr-red)"
                  : "var(--atr-text)",
                border: "none",
                fontSize: 13,
                fontWeight: endpoint ? 700 : 500,
                cursor: isPast ? "not-allowed" : "pointer",
                fontFamily: "var(--atr-font-sans)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background .12s",
              }}
              onMouseEnter={(e) => {
                if (!isPast && !endpoint && !inRange) e.currentTarget.style.background = "var(--atr-bg-soft)";
              }}
              onMouseLeave={(e) => {
                if (!isPast && !endpoint && !inRange) e.currentTarget.style.background = "transparent";
              }}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangeModal({ state }) {
  const [draftIn, setDraftIn] = useState(state.checkIn);
  const [draftOut, setDraftOut] = useState(state.checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [anchor, setAnchor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));

  useEffect(() => {
    if (state.openDate) {
      setDraftIn(state.checkIn);
      setDraftOut(state.checkOut);
    }
  }, [state.openDate, state.checkIn, state.checkOut]);

  useEffect(() => {
    if (!state.openDate) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.openDate]);

  if (!state.openDate) return null;

  function pickDay(d) {
    if (!draftIn || (draftIn && draftOut)) {
      setDraftIn(d);
      setDraftOut(null);
      return;
    }
    if (d < draftIn) {
      setDraftIn(d);
      setDraftOut(null);
      return;
    }
    if (d.getTime() === draftIn.getTime()) return;
    setDraftOut(d);
  }

  const m1 = anchor;
  const m2 = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1);
  const nights = diffNights(draftIn, draftOut);

  return (
    <div style={pesanStyles.scrim} onClick={() => state.setOpenDate(false)}>
      <div style={{ ...pesanStyles.modal, maxWidth: 840 }} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--atr-outline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ ...pesanStyles.modalTitle, textAlign: "left", marginBottom: 4 }}>
              Pilih Tanggal Menginap
            </h3>
            <div
              style={{
                fontSize: 13,
                color: "var(--atr-text-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {!draftIn
                ? "Klik tanggal check-in untuk memulai"
                : !draftOut
                ? "Pilih tanggal check-out"
                : `${nights} malam menginap`}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              style={pesanStyles.modalGhostBtn}
              onClick={() => {
                setDraftIn(null);
                setDraftOut(null);
              }}
            >
              ↻ Reset
            </button>
            <button style={pesanStyles.modalCloseBtn} onClick={() => state.setOpenDate(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Range summary card */}
        <div style={{ padding: "20px 24px", background: "var(--atr-bg-soft, #F8F7FE)", borderBottom: "1px solid var(--atr-outline)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: 16,
              alignItems: "center",
              background: "#fff",
              borderRadius: 14,
              padding: "16px 24px",
              border: draftIn || draftOut ? "1.5px solid var(--atr-purple)" : "1px solid var(--atr-outline)",
            }}
          >
            <DateSummary label="CHECK-IN" date={draftIn} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  background: "var(--atr-purple)",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  padding: "5px 14px",
                  borderRadius: 999,
                }}
              >
                {nights > 0 ? `${nights} malam` : ", "}
              </span>
              <ArrowR />
            </div>
            <DateSummary label="CHECK-OUT" date={draftOut} align="right" />
          </div>
        </div>

        {/* Month nav */}
        <div
          style={{
            padding: "16px 24px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            style={navArrowBtn}
            onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontWeight: 700,
              color: "var(--atr-text)",
            }}
          >
            <span>
              {ID_MONTHS[m1.getMonth()]} {m1.getFullYear()}
            </span>
            <span style={{ color: "var(--atr-outline)" }}>|</span>
            <span>
              {ID_MONTHS[m2.getMonth()]} {m2.getFullYear()}
            </span>
          </div>
          <button
            style={navArrowBtn}
            onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Two months grid */}
        <div style={{ padding: "10px 24px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <MonthGrid month={m1} today={today} draftIn={draftIn} draftOut={draftOut} pickDay={pickDay} />
          <MonthGrid month={m2} today={today} draftIn={draftIn} draftOut={draftOut} pickDay={pickDay} />
        </div>

        <div style={pesanStyles.modalFooter}>
          <span style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>
            {nights > 0 ? (
              <>
                <strong style={{ color: "var(--atr-text)" }}>{nights} malam</strong> · {fmtDate(draftIn)}{" "}
                → {fmtDate(draftOut)}
              </>
            ) : (
              "Belum ada tanggal yang dipilih"
            )}
          </span>
          <button
            style={{ ...pesanStyles.modalApplyBtn, opacity: draftIn && draftOut ? 1 : 0.5 }}
            disabled={!draftIn || !draftOut}
            onClick={() => {
              state.setCheckIn(draftIn);
              state.setCheckOut(draftOut);
              state.setOpenDate(false);
            }}
          >
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
