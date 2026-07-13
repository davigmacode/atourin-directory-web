"use client";

import React, { useState, useRef, useEffect } from "react";

const OTP_CHANNELS = {
  email: { label: "Email", icon: "✉️", verb: "email" },
  sms: { label: "SMS", icon: "💬", verb: "SMS" },
  whatsapp: { label: "WhatsApp", icon: "🟢", verb: "WhatsApp" },
};

export default function OtpModal({ open, onClose, onVerified, channel = "sms", target = "", title = "Verifikasi Identitas", subtitle, actionLabel = "Verifikasi", allowChannelSwitch = true }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [activeChannel, setActiveChannel] = useState(channel);
  const [countdown, setCountdown] = useState(30);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const inputs = useRef([]);

  // reset when opened
  useEffect(() => {
    if (open) {
      setDigits(["", "", "", "", "", ""]);
      setError("");
      setCountdown(30);
      setActiveChannel(channel);
      setVerifying(false);
      setTimeout(() => inputs.current[0] && inputs.current[0].focus(), 60);
    }
  }, [open, channel]);

  // countdown tick
  useEffect(() => {
    if (!open || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [open, countdown]);

  if (!open) return null;

  function setDigit(i, v) {
    v = v.replace(/[^0-9]/g, "").slice(-1);
    setDigits((d) => {
      const n = [...d];
      n[i] = v;
      return n;
    });
    setError("");
    if (v && i < 5) {
      inputs.current[i + 1] && inputs.current[i + 1].focus();
    }
  }

  function onKey(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputs.current[i - 1] && inputs.current[i - 1].focus();
    }
  }

  function onPaste(e) {
    const txt = (e.clipboardData.getData("text") || "").replace(/[^0-9]/g, "").slice(0, 6);
    if (txt.length) {
      e.preventDefault();
      const n = txt.split("");
      while (n.length < 6) n.push("");
      setDigits(n);
      const last = Math.min(txt.length, 6) - 1;
      inputs.current[last] && inputs.current[last].focus();
    }
  }

  function verify() {
    const code = digits.join("");
    if (code.length < 6) {
      setError("Masukkan 6 digit kode.");
      return;
    }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      onVerified && onVerified(code);
    }, 700);
  }

  const ch = OTP_CHANNELS[activeChannel] || OTP_CHANNELS.sms;
  const ov = {
    backdrop: { position: "fixed", inset: 0, background: "rgba(31,27,51,0.55)", backdropFilter: "blur(3px)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 },
    card: { width: "100%", maxWidth: 420, background: "#fff", borderRadius: 20, boxShadow: "0 24px 60px rgba(31,27,51,0.28)", padding: "28px 28px 24px", fontFamily: "var(--atr-font-sans)", position: "relative" },
    close: { position: "absolute", top: 16, right: 16, width: 34, height: 34, borderRadius: 999, border: "none", background: "var(--atr-bg-soft)", cursor: "pointer", fontSize: 16, color: "var(--atr-text-muted)" },
    icon: { width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg,#7068D5,#A49EE4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px" },
    title: { fontSize: 20, fontWeight: 800, textAlign: "center", letterSpacing: "-0.01em", color: "var(--atr-text)" },
    sub: { fontSize: 13.5, color: "var(--atr-text-muted)", textAlign: "center", marginTop: 8, lineHeight: 1.5 },
    target: { color: "var(--atr-text)", fontWeight: 700 },
    boxes: { display: "flex", gap: 10, justifyContent: "center", margin: "22px 0 6px" },
    box: (filled, err) => ({ width: 46, height: 56, borderRadius: 12, border: `2px solid ${err ? "#C44949" : filled ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: filled ? "var(--atr-purple-50)" : "#fff", textAlign: "center", fontSize: 24, fontWeight: 800, color: "var(--atr-text)", outline: "none", fontFamily: "var(--atr-font-sans)" }),
    hint: { fontSize: 11.5, color: "var(--atr-purple)", textAlign: "center", background: "var(--atr-purple-50)", borderRadius: 8, padding: "6px 10px", margin: "10px auto 0", maxWidth: 280 },
    err: { fontSize: 12.5, color: "#C44949", textAlign: "center", marginTop: 10, fontWeight: 600 },
    resend: { fontSize: 13, color: "var(--atr-text-muted)", textAlign: "center", marginTop: 16 },
    resendBtn: (on) => ({ background: "none", border: "none", color: on ? "var(--atr-purple)" : "var(--atr-faint)", fontWeight: 700, cursor: on ? "pointer" : "default", fontSize: 13 }),
    verifyBtn: { width: "100%", marginTop: 18, height: 50, borderRadius: 12, border: "none", background: "var(--atr-purple)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" },
    channels: { display: "flex", gap: 8, justifyContent: "center", marginTop: 14 },
    chBtn: (on) => ({ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, border: `1px solid ${on ? "var(--atr-purple)" : "var(--atr-outline)"}`, background: on ? "var(--atr-purple-50)" : "#fff", color: on ? "var(--atr-purple)" : "var(--atr-text-muted)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)" }),
  };

  return (
    <div style={ov.backdrop} onClick={onClose}>
      <div style={ov.card} onClick={(e) => e.stopPropagation()}>
        <button style={ov.close} onClick={onClose} aria-label="Tutup">✕</button>
        <div style={ov.icon}>🔒</div>
        <div style={ov.title}>{title}</div>
        <div style={ov.sub}>{subtitle || <>Kami kirim kode 6 digit lewat {ch.verb} ke <span style={ov.target}>{target}</span></>}</div>

        <div style={ov.boxes} onPaste={onPaste}>
          {digits.map((d, i) => (
            <input key={i} ref={(el) => (inputs.current[i] = el)} value={d} inputMode="numeric" maxLength={1}
              style={ov.box(!!d, !!error)} onChange={(e) => setDigit(i, e.target.value)} onKeyDown={(e) => onKey(i, e)} />
          ))}
        </div>
        <div style={ov.hint}>💡 Demo: ketik 6 angka apa saja</div>
        {error && <div style={ov.err}>{error}</div>}

        {allowChannelSwitch && (
          <div style={ov.channels}>
            {Object.keys(OTP_CHANNELS).map((k) => (
              <button key={k} style={ov.chBtn(activeChannel === k)} onClick={() => { setActiveChannel(k); setCountdown(30); }}>
                {OTP_CHANNELS[k].icon} {OTP_CHANNELS[k].label}
              </button>
            ))}
          </div>
        )}

        <div style={ov.resend}>
          Tidak menerima kode?{" "}
          <button style={ov.resendBtn(countdown <= 0)} disabled={countdown > 0} onClick={() => { if (countdown <= 0) setCountdown(30); }}>
            {countdown > 0 ? `Kirim ulang (${countdown}s)` : "Kirim ulang"}
          </button>
        </div>

        <button style={{ ...ov.verifyBtn, opacity: verifying ? 0.7 : 1 }} onClick={verify} disabled={verifying}>
          {verifying ? "Memverifikasi…" : actionLabel}
        </button>
      </div>
    </div>
  );
}
