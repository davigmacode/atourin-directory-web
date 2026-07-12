"use client";

import React, { useState, useEffect } from "react";
import { ab } from "@/styles/about-styles";
import { GREETINGS } from "@/data/about-data";

export default function AboutHero() {
  const [gi, setGi] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setGi((x) => (x + 1) % GREETINGS.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const g = GREETINGS[gi];

  return (
    <section style={ab.hero}>
      <img
        src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&q=70"
        alt=""
        style={ab.heroBg}
        onError={(e) => {
          e.currentTarget.style.opacity = 0;
        }}
      />
      <div style={ab.heroBlob} />
      <div style={ab.heroInner}>
        <span style={ab.heroBadge}>👋 Tentang Atourin</span>
        <div style={ab.heroPre}>Kami menyapamu dalam</div>
        <div key={g.word} style={ab.greet}>
          {g.word}
          <span style={ab.caret} />
        </div>
        <div style={ab.greetFrom}>
          , sapaan hangat dalam bahasa <strong>{g.from}</strong>
        </div>
        <div style={ab.greetChips}>
          {GREETINGS.map((x, idx) => (
            <span key={x.word} style={{ ...ab.gChip, ...(idx === gi ? ab.gChipOn : {}) }}>
              {x.word}
            </span>
          ))}
        </div>
        <p style={ab.heroLead}>
          Kami <strong>Atourin</strong>, perusahaan teknologi pariwisata yang mempertemukan wisatawan dengan pengalaman
          lokal otentik di seluruh Nusantara, sambil memberdayakan desa wisata, pemandu, dan UMKM setempat.
        </p>
      </div>
    </section>
  );
}
