'use client';

import React from 'react';
import ex from '@/styles/explore-styles';

export default function StatsBanner() {
  return (
    <section style={ex.stats}>
      <div style={ex.statsInner}>
        {[
          { n: '34', l: 'Provinsi' },
          { n: '486', l: 'Destinasi' },
          { n: '5,240', l: 'Atraksi' },
          { n: '892', l: 'Desa Wisata' },
          { n: '1,260', l: 'Pemandu' },
        ].map((s) => (
          <div key={s.l} style={ex.statCell}>
            <div style={ex.statN}>{s.n}</div>
            <div style={ex.statL}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
