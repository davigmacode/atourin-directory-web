'use client';

import React, { useState } from 'react';
import ex from '@/styles/explore-styles';
import { FEATURED } from '@/data/explore-data';

export default function FeaturedCarousel() {
  const [idx, setIdx] = useState(0);
  const visible = 4;
  const maxIdx = Math.max(0, FEATURED.length - visible);
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{'\u2728'} Sedang trending</div>
          <h2 style={ex.secTitle}>Pilihan editor minggu ini</h2>
        </div>
        <div style={ex.carouselNav}>
          <button onClick={() => setIdx(Math.max(0, idx - 1))} style={{ ...ex.navBtn, ...(idx === 0 ? ex.navBtnDisabled : {}) }}>{'\u2039'}</button>
          <button onClick={() => setIdx(Math.min(maxIdx, idx + 1))} style={{ ...ex.navBtn, ...(idx === maxIdx ? ex.navBtnDisabled : {}) }}>{'\u203A'}</button>
        </div>
      </div>
      <div style={ex.carouselViewport}>
        <div style={{ ...ex.carouselTrack, transform: `translateX(-${idx * (100 / visible)}%)` }}>
          {FEATURED.map((f, i) => (
            <article key={i} style={ex.featCard}>
              <div style={ex.featImgWrap}>
                <img src={f.img} alt="" style={ex.featImg} />
                <span style={{ ...ex.featBadge, background: f.typeColor }}>{f.type}</span>
              </div>
              <div style={ex.featBody}>
                <div style={ex.featTitle}>{f.title}</div>
                <div style={ex.featFooter}>
                  <span style={ex.featLoc}>{'\uD83D\uDCCD'} {f.loc}</span>
                  <span style={ex.featRating}>{'\u2605'} {f.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div style={ex.carouselDots}>
        {Array.from({ length: maxIdx + 1 }).map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ ...ex.cDot, ...(i === idx ? ex.cDotActive : {}) }} />
        ))}
      </div>
    </section>
  );
}
