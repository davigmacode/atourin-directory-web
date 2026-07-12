"use client";

import React, { useEffect } from "react";
import { pesanStyles } from "@/styles/pesan-styles";

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const stepperBtn = (disabled) => ({
  width: 32,
  height: 32,
  borderRadius: 999,
  background: "#fff",
  border: disabled ? "1.5px solid var(--atr-outline)" : "1.5px solid var(--atr-purple)",
  color: disabled ? "var(--atr-outline)" : "var(--atr-purple)",
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1,
  cursor: disabled ? "not-allowed" : "pointer",
  fontFamily: "var(--atr-font-sans)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

function GuestStepper({ label, value, min = 1, onChange, sublabel }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 0",
        borderBottom: "1px solid var(--atr-outline)",
      }}
    >
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--atr-text)" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>{sublabel}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={stepperBtn(value <= min)} disabled={value <= min} onClick={() => onChange(value - 1)}>
          −
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, minWidth: 20, textAlign: "center" }}>{value}</span>
        <button style={stepperBtn(false)} onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

export default function GuestModal({ state }) {
  useEffect(() => {
    if (!state.openGuests) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.openGuests]);

  if (!state.openGuests) return null;

  return (
    <div style={pesanStyles.scrim} onClick={() => state.setOpenGuests(false)}>
      <div style={{ ...pesanStyles.modal, maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div style={pesanStyles.modalHeader}>
          <button style={pesanStyles.modalCloseBtn} onClick={() => state.setOpenGuests(false)}>
            <CloseIcon />
          </button>
          <h3 style={pesanStyles.modalTitle}>Kamar & Tamu</h3>
          <span style={{ width: 28 }} />
        </div>
        <div style={pesanStyles.modalBody}>
          <GuestStepper label="Kamar" value={state.rooms} min={1} onChange={state.setRooms} />
          <GuestStepper
            label="Tamu"
            value={state.guests}
            min={1}
            onChange={state.setGuests}
            sublabel="Dewasa & anak-anak"
          />
        </div>
        <div style={pesanStyles.modalFooter}>
          <span style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>
            {state.rooms} kamar · {state.guests} tamu
          </span>
          <button style={pesanStyles.modalApplyBtn} onClick={() => state.setOpenGuests(false)}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
