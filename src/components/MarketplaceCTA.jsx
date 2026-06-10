'use client';

import React from 'react';
import ex from '@/styles/explore-styles';

export default function MarketplaceCTA() {
  return (
    <section style={ex.ctaWrap}>
      <div style={ex.ctaInner}>
        <div>
          <div style={ex.ctaEyebrow}>{'\uD83D\uDED2'} Marketplace</div>
          <h2 style={ex.ctaTitle}>Siap untuk perjalanan nyata?</h2>
          <p style={ex.ctaSub}>Pesan paket aktivitas, transportasi, dan akomodasi langsung dari mitra terpercaya Atourin di seluruh Indonesia.</p>
          <button style={ex.ctaBtn}>Jelajahi Marketplace {'\u2192'}</button>
        </div>
        <div style={ex.ctaIllust}>
          <div style={ex.ctaIllustCard}>{'\uD83C\uDFAB'}</div>
          <div style={ex.ctaIllustCard2}>{'\uD83D\uDEE0\uFE0F'}</div>
          <div style={ex.ctaIllustCard3}>{'\uD83E\uDD5E'}</div>
        </div>
      </div>
    </section>
  );
}
