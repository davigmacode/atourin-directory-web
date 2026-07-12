"use client";

import React, { useState, useEffect } from "react";
import { hp } from "@/styles/homestay-detail-styles";

const HSUBNAV = [
  { id: "tentang", label: "Tentang" },
  { id: "tiket", label: "Pesan" },
  { id: "host", label: "Tuan Rumah" },
  { id: "fasilitas", label: "Fasilitas" },
  { id: "aturan", label: "Aturan" },
  { id: "lokasi", label: "Lokasi" },
  { id: "ulasan", label: "Ulasan" },
  { id: "mitra", label: "Mitra" },
];

export default function DetailSubnav() {
  const [active, setActive] = useState(HSUBNAV[0].id);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + 160;
      let cur = HSUBNAV[0].id;
      for (const s of HSUBNAV) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) {
          cur = s.id;
        }
      }
      setActive(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function jump(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 130;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div style={hp.subnavWrap}>
      <div style={hp.subnavInner}>
        {HSUBNAV.map((s) => (
          <button
            key={s.id}
            onClick={(e) => jump(e, s.id)}
            style={{ ...hp.subnavLink, ...(active === s.id ? hp.subnavLinkActive : {}) }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
