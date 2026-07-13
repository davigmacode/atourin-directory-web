"use client";

import React, { useEffect } from "react";

/* ── Inject styles once in browser ── */
function useFeedbackStyles() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("atr-fb-styles")) return;
    const s = document.createElement("style");
    s.id = "atr-fb-styles";
    s.textContent = `
      @keyframes atrShimmer { 0%{background-position:-468px 0} 100%{background-position:468px 0} }
      @keyframes atrFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
      .atr-sk { background:#ECEAF6; background-image:linear-gradient(90deg,#ECEAF6 0px,#F6F5FC 80px,#ECEAF6 160px); background-size:600px 100%; animation:atrShimmer 1.3s linear infinite; }
    `;
    document.head.appendChild(s);
  }, []);
}

export function Sk({ w = "100%", h = 14, r = 8, style = {} }) {
  useFeedbackStyles();
  return <span className="atr-sk" style={{ display: "block", width: w, height: h, borderRadius: r, ...style }} />;
}

export function SkText({ lines = 3, lastW = "60%", gap = 9 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Sk key={i} h={11} w={i === lines - 1 ? lastW : "100%"} />
      ))}
    </div>
  );
}

export function SkProductCard() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 18, overflow: "hidden" }}>
      <Sk h={168} r={0} />
      <div style={{ padding: 16 }}>
        <Sk h={11} w="40%" />
        <div style={{ height: 10 }} />
        <Sk h={15} w="92%" />
        <div style={{ height: 7 }} />
        <Sk h={15} w="70%" />
        <div style={{ height: 18 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Sk h={18} w="45%" />
          <Sk h={28} w={28} r={999} />
        </div>
      </div>
    </div>
  );
}

export function SkList({ count = 3 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: 16, background: "#fff", border: "1px solid var(--atr-outline)", borderRadius: 16, padding: 14 }}>
          <Sk w={92} h={92} r={14} />
          <div style={{ flex: 1, paddingTop: 4 }}>
            <Sk h={13} w="35%" />
            <div style={{ height: 11 }} />
            <Sk h={15} w="80%" />
            <div style={{ height: 14 }} />
            <Sk h={12} w="50%" />
          </div>
        </div>
      ))}
    </div>
  );
}

const SP = {
  purple: "#7068D5",
  purpleSoft: "#A49EE4",
  purpleLite: "#E4E1F7",
  yellow: "#FFC442",
  red: "#F46263",
  green: "#51B054",
  cool: "#E4E6F3",
  cool2: "#D4ECF4",
  ink: "#3C3A5E",
  cloud: "#F2F1FB",
};

function SpotBase({ children, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="92" fill={SP.cool} opacity="0.55" />
      <circle cx="100" cy="100" r="66" fill={SP.cloud} />
      {children}
    </svg>
  );
}

function Pin({ x = 100, y = 64, s = 1, fill = SP.purple }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -34c-17 0 -30 13 -30 30 0 22 30 52 30 52s30 -30 30 -52c0 -17 -13 -30 -30 -30z" fill={fill} />
      <circle cx="0" cy="-4" r="13" fill="#fff" />
    </g>
  );
}

export function AtrSpot({ name = "search", size = 150 }) {
  switch (name) {
    case "search":
      return (
        <SpotBase size={size}>
          <Pin x="86" y="74" s="0.92" fill={SP.purpleSoft} />
          <g transform="translate(118 116)">
            <circle cx="0" cy="0" r="30" fill="#fff" stroke={SP.purple} strokeWidth="7" />
            <line x1="22" y1="22" x2="44" y2="44" stroke={SP.purple} strokeWidth="9" strokeLinecap="round" />
            <circle cx="0" cy="0" r="13" fill={SP.yellow} />
          </g>
        </SpotBase>
      );
    case "saved":
      return (
        <SpotBase size={size}>
          <path d="M100 142c-3 0-44-26-44-58 0-16 12-27 26-27 9 0 15 4 18 10 3-6 9-10 18-10 14 0 26 11 26 27 0 32-41 58-44 58z" fill={SP.red} />
          <circle cx="86" cy="78" r="6" fill="#fff" opacity="0.6" />
        </SpotBase>
      );
    case "orders":
      return (
        <SpotBase size={size}>
          <rect x="62" y="52" width="76" height="96" rx="10" fill="#fff" stroke={SP.purple} strokeWidth="6" />
          <line x1="76" y1="76" x2="124" y2="76" stroke={SP.purpleSoft} strokeWidth="7" strokeLinecap="round" />
          <line x1="76" y1="96" x2="124" y2="96" stroke={SP.cool} strokeWidth="7" strokeLinecap="round" />
          <line x1="76" y1="116" x2="106" y2="116" stroke={SP.cool} strokeWidth="7" strokeLinecap="round" />
          <circle cx="128" cy="130" r="20" fill={SP.green} />
          <path d="M120 130l6 6 11-12" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </SpotBase>
      );
    case "notif":
      return (
        <SpotBase size={size}>
          <path d="M100 56c-16 0-26 12-26 30 0 20-8 26-8 32h68c0-6-8-12-8-32 0-18-10-30-26-30z" fill="#fff" stroke={SP.purple} strokeWidth="6" strokeLinejoin="round" />
          <path d="M90 124a10 10 0 0 0 20 0" fill={SP.purple} />
          <circle cx="100" cy="52" r="7" fill={SP.purple} />
          <circle cx="128" cy="66" r="13" fill={SP.red} />
        </SpotBase>
      );
    case "itinerary":
      return (
        <SpotBase size={size}>
          <path d="M70 132V64l30-12 30 12 0 68-30-12z" fill="#fff" stroke={SP.purple} strokeWidth="6" strokeLinejoin="round" />
          <path d="M100 52v68" stroke={SP.cool} strokeWidth="5" strokeDasharray="2 9" strokeLinecap="round" />
          <path d="M82 92c0-9 7-15 15-15s15 6 15 15c0 11-15 24-15 24s-15-13-15-24z" fill={SP.yellow} />
          <circle cx="97" cy="91" r="6" fill="#fff" />
        </SpotBase>
      );
    case "review":
      return (
        <SpotBase size={size}>
          <rect x="56" y="64" width="88" height="60" rx="14" fill="#fff" stroke={SP.purple} strokeWidth="6" />
          <path d="M86 124l-12 16v-16z" fill="#fff" stroke={SP.purple} strokeWidth="6" strokeLinejoin="round" />
          <path d="M100 78l5.5 11 12 1.5-9 8 2.5 12-11-6-11 6 2.5-12-9-8 12-1.5z" fill={SP.yellow} />
        </SpotBase>
      );
    case "cart":
      return (
        <SpotBase size={size}>
          <path d="M62 70h12l8 50h44l10-34H82" fill="none" stroke={SP.purple} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="92" cy="134" r="9" fill={SP.purple} />
          <circle cx="124" cy="134" r="9" fill={SP.purple} />
          <circle cx="120" cy="62" r="15" fill={SP.yellow} />
          <path d="M120 56v12M114 62h12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </SpotBase>
      );
    case "error":
    default:
      return (
        <SpotBase size={size}>
          <Pin x="100" y="80" s="1.04" fill={SP.purple} />
          <path d="M93 70a7 7 0 0 1 14 0c0 5-7 5-7 11" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="91" r="3.4" fill="#fff" />
        </SpotBase>
      );
  }
}

export function EmptyState({ art = "error", title, desc, action, secondary, compact = false, children }) {
  useFeedbackStyles();
  return (
    <div style={{ ...es.wrap, ...(compact ? es.wrapCompact : {}) }}>
      <div style={{ animation: "atrFloat 5s ease-in-out infinite" }}>
        <AtrSpot name={art} size={compact ? 120 : 160} />
      </div>
      {title && <div style={{ ...es.title, ...(compact ? { fontSize: 18 } : {}) }}>{title}</div>}
      {desc && <div style={es.desc}>{desc}</div>}
      {(action || secondary) && (
        <div style={es.actions}>
          {action && (action.href
            ? <a href={action.href} style={es.primary}>{action.label}</a>
            : <button style={es.primary} onClick={action.onClick}>{action.label}</button>)}
          {secondary && (secondary.href
            ? <a href={secondary.href} style={es.secondary}>{secondary.label}</a>
            : <button style={es.secondary} onClick={secondary.onClick}>{secondary.label}</button>)}
        </div>
      )}
      {children}
    </div>
  );
}

const es = {
  wrap: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "56px 24px", maxWidth: 460, margin: "0 auto" },
  wrapCompact: { padding: "34px 20px" },
  title: { fontSize: 21, fontWeight: 700, color: "var(--atr-text)", marginTop: 14, letterSpacing: "-0.01em", textWrap: "balance" },
  desc: { fontSize: 14.5, color: "var(--atr-text-muted)", marginTop: 8, lineHeight: 1.55, textWrap: "pretty" },
  actions: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", justifyContent: "center" },
  primary: { background: "var(--atr-purple)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", textDecoration: "none", boxShadow: "0 10px 24px rgba(112,104,213,0.32)" },
  secondary: { background: "#fff", color: "var(--atr-text)", border: "1.5px solid var(--atr-outline)", borderRadius: 12, padding: "12px 22px", fontSize: 14.5, fontWeight: 700, cursor: "pointer", fontFamily: "var(--atr-font-sans)", textDecoration: "none" },
};
