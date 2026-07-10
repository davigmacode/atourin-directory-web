"use client";

import React, { useState } from "react";
import { ds } from "@/styles/detail-styles";

function ContactLine({ icon, label, value, link }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 13,
      }}
    >
      <span
        style={{
          color: "var(--atr-text-muted)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{icon}</span>
        {label}
      </span>
      <a
        href={link}
        style={{
          color: "var(--atr-text)",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        {value}
      </a>
    </div>
  );
}

function SocialDot({ icon, label }) {
  return (
    <button
      style={{
        flex: 1,
        background: "#fff",
        border: "1px solid var(--atr-outline)",
        borderRadius: 8,
        padding: "8px 4px",
        fontSize: 14,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <span>{icon}</span>
      <span
        style={{
          fontSize: 10,
          color: "var(--atr-text-muted)",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </button>
  );
}

const POKDARWIS_DATA = {
  "desa-wae-rebo": {
    name: "Pak Yosef Mbaha",
    role: "Ketua Pokdarwis \u00B7 sejak 2015",
    phone: "+62 813-3856-7720",
    email: "info@waerebo.id",
    web: "waerebo.id",
    avatar: "https://i.pravatar.cc/80?img=68",
  },
  "desa-penglipuran": {
    name: "I Wayan Moneng",
    role: "Ketua Pokdarwis \u00B7 sejak 2012",
    phone: "+62 812-9876-5432",
    email: "info@penglipuran.id",
    web: "penglipuran.id",
    avatar: "https://i.pravatar.cc/80?img=11",
  },
  "desa-nglanggeran": {
    name: "Mas Sugeng Handoko",
    role: "Pelopor Pokdarwis \u00B7 sejak 2007",
    phone: "+62 819-0414-2224",
    email: "info@nglanggeran.id",
    web: "nglanggeran.id",
    avatar: "https://i.pravatar.cc/80?img=33",
  },
};

export default function ContactCard({ village }) {
  const [save, setSave] = useState(false);

  const slug = village.name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-");

  const region = village.region || "";
  let defaultManager = {
    name: "Pak Budi Santoso",
    role: "Ketua Pokdarwis \u00B7 sejak 2019",
    phone: "+62 812-3456-7890",
    email: `info@${slug}.id`,
    web: `${slug}.id`,
    avatar: "https://i.pravatar.cc/80?img=12",
  };

  if (region.includes("Bali")) {
    defaultManager.name = "I Ketut Wijaya";
    defaultManager.role = "Ketua Pokdarwis \u00B7 sejak 2018";
    defaultManager.avatar = "https://i.pravatar.cc/80?img=15";
  } else if (region.includes("DIY") || region.includes("Yogyakarta") || region.includes("Jawa")) {
    defaultManager.name = "Pak Bambang Utomo";
    defaultManager.role = "Ketua Pokdarwis \u00B7 sejak 2016";
    defaultManager.avatar = "https://i.pravatar.cc/80?img=20";
  } else if (region.includes("NTB") || region.includes("Lombok")) {
    defaultManager.name = "Lalu Muhammad";
    defaultManager.role = "Ketua Pokdarwis \u00B7 sejak 2017";
    defaultManager.avatar = "https://i.pravatar.cc/80?img=53";
  }

  const manager = POKDARWIS_DATA[slug] || defaultManager;

  return (
    <div style={ds.bookCard}>
      <div style={ds.bookHead}>
        <span style={ds.bookEyebrow}>Pengelola Desa</span>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <img
            src={manager.avatar}
            alt={manager.name}
            style={{ width: 44, height: 44, borderRadius: 999 }}
          />
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "var(--atr-text)",
              }}
            >
              {manager.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--atr-text-muted)" }}>
              {manager.role}
            </div>
          </div>
        </div>
      </div>
      <div style={{ ...ds.priceTable, padding: "14px 14px", gap: 10 }}>
        <ContactLine
          icon={"\uD83D\uDCDE"}
          label="Telepon"
          value={manager.phone}
          link={`tel:${manager.phone.replace(/\s+/g, "")}`}
        />
        <ContactLine
          icon={"\u2709\uFE0F"}
          label="Email"
          value={manager.email}
          link={`mailto:${manager.email}`}
        />
        <ContactLine
          icon={"\uD83C\uDF10"}
          label="Website"
          value={manager.web}
          link={`https://${manager.web}`}
        />
        <div
          style={{
            display: "flex",
            gap: 8,
            paddingTop: 6,
            borderTop: "1px dashed var(--atr-outline)",
            width: "100%",
          }}
        >
          <SocialDot icon={"\uD83D\uDCF7"} label="IG" />
          <SocialDot icon={"\uD83D\uDCD8"} label="FB" />
          <SocialDot icon={"\uD83C\uDFB5"} label="TT" />
        </div>
      </div>
      <button
        style={ds.primaryCta}
        onClick={() => alert(`Memesan paket wisata desa ${village.name}...`)}
      >
        {"\uD83D\uDCE6"} Pesan Paket Wisata
      </button>
      <button
        style={ds.secondaryCta}
        onClick={() => window.open(`https://wa.me/${manager.phone.replace(/[^0-9]/g, "")}`, "_blank")}
      >
        {"\uD83D\uDCAC"} Hubungi Pengelola (WA)
      </button>
      <div style={ds.iconRow}>
        <button
          style={{ ...ds.iconBtnGhost, ...(save ? ds.iconBtnOn : {}) }}
          onClick={() => setSave(!save)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "currentColor" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          {save ? "Tersimpan" : "Simpan"}
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Tautan desa wisata disalin ke clipboard")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle
              cx="6"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle
              cx="18"
              cy="6"
              r="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <circle
              cx="18"
              cy="18"
              r="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
          Bagikan
        </button>
        <button
          style={{
            ...ds.iconBtnGhost,
            color: "var(--atr-purple)",
            borderColor: "var(--atr-purple-light)",
            background: "var(--atr-purple-50)",
          }}
          onClick={() => alert("Affiliate link Pokdarwis disalin")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M9 15l6-6" />
            <path d="M11 6l1-1a4 4 0 015.7 5.7l-1 1M13 18l-1 1A4 4 0 016.3 13.3l1-1" />
          </svg>{" "}
          Komisi
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Informasi desa diunduh untuk penggunaan luar jaringan (offline)")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v11m0 0l-4-4m4 4l4-4" />
            <path d="M5 19h14" />
          </svg>{" "}
          Offline
        </button>
      </div>
    </div>
  );
}
