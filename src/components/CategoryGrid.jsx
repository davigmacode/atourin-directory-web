'use client';

import React from 'react';
import ex from '@/styles/explore-styles';
import { CATEGORIES } from '@/data/explore-data';

export default function CategoryGrid() {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{'\uD83C\uDFAF'} Berdasarkan kategori</div>
          <h2 style={ex.secTitle}>Apa yang kamu cari?</h2>
        </div>
      </div>
      <div style={ex.catGrid}>
        {CATEGORIES.map((c) => (
          <a key={c.name} href="/" style={ex.catCard}>
            <div style={{ ...ex.catIcon, background: c.color }}>{c.icon}</div>
            <div style={ex.catName}>{c.name}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
