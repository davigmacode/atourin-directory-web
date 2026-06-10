'use client';

import React from 'react';
import ex from '@/styles/explore-styles';
import { DESA_FEATURED } from '@/data/explore-data';

export default function DesaWisataStrip() {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={{ ...ex.eyebrow, color: 'var(--atr-arti)' }}>{'\uD83C\uDF3F'} Sustainable tourism</div>
          <h2 style={ex.secTitle}>Desa wisata unggulan</h2>
        </div>
        <a href="/" style={ex.viewAll}>Lihat semua desa wisata {'\u2192'}</a>
      </div>
      <div style={ex.desaGrid}>
        {DESA_FEATURED.map((d) => (
          <article key={d.name} style={ex.desaCard}>
            <img src={d.img} alt="" style={ex.desaImg} />
            <div style={ex.desaBody}>
              <span style={ex.desaTag}>{d.tag}</span>
              <div style={ex.desaName}>{d.name}</div>
              <div style={ex.desaMeta}>{d.province} · {d.reviews} reviews</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
