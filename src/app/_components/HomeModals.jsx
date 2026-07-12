"use client";

import React, { useState, useEffect } from "react";
import { hm } from "@/styles/home-styles";
import { HI } from "./HomeCards";

const wb = {
  scrim: {
    position: "fixed",
    inset: 0,
    zIndex: 2000,
    background: "rgba(31,27,51,0.55)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    opacity: 1,
  },
  modal: {
    background: "#fff",
    borderRadius: 26,
    width: "min(440px, 100%)",
    overflow: "hidden",
    boxShadow: "0 40px 90px rgba(31,27,51,0.45)",
    position: "relative",
    opacity: 1,
    animation: "wbPop .28s cubic-bezier(0.2,0.7,0.3,1.2)",
  },
  media: { position: "relative", height: 224, background: "var(--atr-bg-cool)" },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  close: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "rgba(255,255,255,0.95)",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--atr-text)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  badge: {
    position: "absolute",
    left: 18,
    top: 18,
    background: "rgba(255,255,255,0.95)",
    color: "var(--atr-purple)",
    fontSize: 12,
    fontWeight: 800,
    padding: "6px 14px",
    borderRadius: 999,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    letterSpacing: "0.02em",
  },
  body: { padding: "28px 32px 30px", textAlign: "center" },
  title: {
    fontSize: 27,
    fontWeight: 700,
    letterSpacing: "-0.025em",
    color: "var(--atr-text)",
    lineHeight: 1.15,
    textWrap: "balance",
  },
  sub: { fontSize: 15, color: "var(--atr-text-muted)", marginTop: 12, lineHeight: 1.55 },
  terms: { color: "var(--atr-text)", fontWeight: 600, textDecoration: "underline", cursor: "pointer" },
  cta: {
    width: "100%",
    marginTop: 24,
    background: "linear-gradient(135deg, #7068D5 0%, #9B6AAB 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "16px 20px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    boxShadow: "0 10px 24px rgba(112,104,213,0.35)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secondary: { marginTop: 16, fontSize: 13.5, color: "var(--atr-text-muted)" },
  secondaryLink: { color: "var(--atr-purple)", fontWeight: 700, cursor: "pointer" },
};

const sv = {
  modal: {
    background: "#fff",
    borderRadius: 22,
    width: "min(480px, 100%)",
    maxHeight: "calc(100vh - 48px)",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 30px 70px rgba(31,27,51,0.4)",
    animation: "wbPop .26s cubic-bezier(0.2,0.7,0.3,1.2)",
    opacity: 1,
  },
  head: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "22px 24px 18px",
    borderBottom: "1px solid var(--atr-outline)",
  },
  title: { fontSize: 21, fontWeight: 700, color: "var(--atr-text)", letterSpacing: "-0.01em" },
  sub: { fontSize: 13.5, color: "var(--atr-text-muted)", marginTop: 3 },
  close: {
    background: "var(--atr-bg-soft)",
    border: "none",
    borderRadius: 999,
    width: 34,
    height: 34,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "var(--atr-text-muted)",
    flexShrink: 0,
  },
  body: { padding: "18px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 },

  success: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    background: "linear-gradient(135deg, #ECF8EE 0%, #F6FCF7 100%)",
    border: "1px solid rgba(81,176,84,0.3)",
    borderRadius: 14,
    padding: 14,
  },
  successImg: { width: 70, height: 70, borderRadius: 12, objectFit: "cover", flexShrink: 0 },
  successOk: { display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 800, color: "#2F8A3B" },
  successOkDot: {
    width: 18,
    height: 18,
    borderRadius: 999,
    background: "#2F8A3B",
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  successTitle: { fontSize: 16, fontWeight: 700, color: "var(--atr-text)", marginTop: 4, lineHeight: 1.25 },
  successLoc: { fontSize: 12.5, color: "var(--atr-text-muted)", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 5 },

  listLabel: { fontSize: 12, fontWeight: 800, color: "var(--atr-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "10px 12px",
    borderRadius: 12,
    cursor: "pointer",
    border: "1px solid transparent",
    background: "#fff",
    width: "100%",
    fontFamily: "var(--atr-font-sans)",
    textAlign: "left",
    transition: "background .12s",
  },
  rowOn: { background: "var(--atr-purple-50)", border: "1px solid var(--atr-purple-light)" },
  rowThumb: { width: 44, height: 44, borderRadius: 11, objectFit: "cover", flexShrink: 0, background: "var(--atr-bg-cool)" },
  rowThumbSpecial: {
    width: 44,
    height: 44,
    borderRadius: 11,
    flexShrink: 0,
    background: "var(--atr-purple-50)",
    color: "var(--atr-purple)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--atr-purple-light)",
  },
  rowName: { fontSize: 14.5, fontWeight: 700, color: "var(--atr-text)" },
  rowCount: { fontSize: 12, color: "var(--atr-text-muted)", marginTop: 1 },
  check: {
    width: 24,
    height: 24,
    borderRadius: 999,
    border: "2px solid var(--atr-outline)",
    flexShrink: 0,
    marginLeft: "auto",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkOn: { background: "var(--atr-purple)", border: "2px solid var(--atr-purple)", color: "#fff" },

  foot: { padding: "16px 24px", borderTop: "1px solid var(--atr-outline)", display: "flex", flexDirection: "column", gap: 12 },
  createBtn: {
    border: "1.5px dashed var(--atr-outline)",
    borderRadius: 12,
    padding: "14px 16px",
    background: "#fff",
    color: "var(--atr-text)",
    fontSize: 14.5,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    width: "100%",
  },
  createForm: { display: "flex", gap: 10 },
  createInput: {
    flex: 1,
    border: "1px solid var(--atr-outline)",
    borderRadius: 11,
    padding: "12px 14px",
    fontSize: 14,
    color: "var(--atr-text)",
    fontFamily: "var(--atr-font-sans)",
    background: "var(--atr-bg-soft)",
    outline: "none",
  },
  doneBtn: {
    background: "var(--atr-purple)",
    color: "#fff",
    border: "none",
    borderRadius: 11,
    padding: "0 22px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "var(--atr-font-sans)",
    flexShrink: 0,
  },
};

function Plus() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CheckSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── WELCOME MODAL ── */
export function WelcomeModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div style={wb.scrim} onClick={onClose}>
      <style>{`@keyframes wbPop{from{transform:translateY(18px) scale(.97)}to{transform:none}}`}</style>
      <div style={wb.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={wb.media}>
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=70"
            alt=""
            style={wb.img}
            onError={(e) => {
              e.currentTarget.style.opacity = 0;
            }}
          />
          <span style={wb.badge}>🎁 Promo Member Baru</span>
          <button style={wb.close} onClick={onClose} aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div style={wb.body}>
          <div style={wb.title}>Liburan pertamamu, hemat 15%</div>
          <div style={wb.sub}>
            Daftar sekarang & nikmati potongan hingga{" "}
            <strong style={{ color: "var(--atr-text)" }}>Rp 170.000</strong> untuk pemesanan pertamamu.{" "}
            <span style={wb.terms}>Syarat berlaku</span>.
          </div>
          <button style={wb.cta} onClick={onClose}>
            Daftar &amp; klaim promo
          </button>
          <div style={wb.secondary}>
            Sudah punya akun?{" "}
            <span style={wb.secondaryLink} onClick={onClose}>
              Masuk
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SAVE MODAL ── */
export function SaveModal({ product, collections = [], onClose }) {
  const [selected, setSelected] = useState(["all"]);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [cols, setCols] = useState(collections);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function toggle(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function create() {
    const n = name.trim();
    if (!n) return;
    const id = "c" + Date.now();
    setCols((c) => [...c, { id, name: n, count: 0, special: false }]);
    setSelected((s) => [...s, id]);
    setName("");
    setCreating(false);
  }

  return (
    <div style={wb.scrim} onClick={onClose}>
      <div style={sv.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div style={sv.head}>
          <div>
            <div style={sv.title}>Simpan ke Koleksi</div>
            <div style={sv.sub}>Atur wishlist-mu agar lebih rapi</div>
          </div>
          <button style={sv.close} onClick={onClose} aria-label="Tutup">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div style={sv.body}>
          <div style={sv.success}>
            <img
              src={product.img}
              alt=""
              style={sv.successImg}
              onError={(e) => {
                e.currentTarget.style.background = "var(--atr-bg-cool)";
              }}
            />
            <div style={{ minWidth: 0 }}>
              <span style={sv.successOk}>
                <span style={sv.successOkDot}>
                  <CheckSm />
                </span>{" "}
                Berhasil Disimpan
              </span>
              <div style={sv.successTitle}>{product.title}</div>
              <div style={sv.successLoc}>
                {HI.pin} {product.city}
              </div>
            </div>
          </div>

          <div style={sv.listLabel}>Simpan ke koleksi</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {cols.map((c) => {
              const on = selected.includes(c.id);
              return (
                <button
                  key={c.id}
                  className="sv-row"
                  style={{ ...sv.row, ...(on ? sv.rowOn : {}) }}
                  onClick={() => toggle(c.id)}
                >
                  {c.special ? (
                    <span style={sv.rowThumbSpecial}>{HI.heart}</span>
                  ) : (
                    <img
                      src={c.img}
                      alt=""
                      style={sv.rowThumb}
                      onError={(e) => {
                        e.currentTarget.style.opacity = 0;
                      }}
                    />
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={sv.rowName}>{c.name}</div>
                    <div style={sv.rowCount}>{c.count + (on ? 1 : 0)} item</div>
                  </div>
                  <span style={{ ...sv.check, ...(on ? sv.checkOn : {}) }}>{on && <CheckSm />}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={sv.foot}>
          {creating ? (
            <div style={sv.createForm}>
              <input
                style={sv.createInput}
                placeholder="Contoh: Liburan Bali"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") create();
                }}
              />
              <button
                style={{ ...sv.doneBtn, ...(name.trim() ? {} : { opacity: 0.5, cursor: "not-allowed" }) }}
                onClick={create}
              >
                Buat
              </button>
            </div>
          ) : (
            <button style={sv.createBtn} className="sv-create" onClick={() => setCreating(true)}>
              <Plus /> Buat Koleksi Baru
            </button>
          )}
          <button style={{ ...sv.doneBtn, padding: "13px 18px", width: "100%" }} onClick={onClose}>
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
