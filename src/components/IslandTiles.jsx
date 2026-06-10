'use client';

import React from 'react';
import ex from '@/styles/explore-styles';
import { ISLANDS } from '@/data/explore-data';

export default function IslandTiles() {
  return (
    <section style={ex.section}>
      <div style={ex.secHeader}>
        <div>
          <div style={ex.eyebrow}>{'\uD83D\uDDFA'} Pilih region</div>
          <h2 style={ex.secTitle}>Jelajahi per pulau</h2>
        </div>
      </div>
      <div style={ex.islandGrid}>
        {ISLANDS.map((isl, i) => (
          <a key={isl.name} href="/" style={{ ...ex.islandTile, ...(i === 0 ? ex.islandTileBig : {}) }}>
            <img src={isl.img} alt="" style={ex.islandImg} />
            <div style={ex.islandOverlay} />
            <div style={ex.islandBody}>
              <div style={ex.islandName}>{isl.name}</div>
              <div style={ex.islandMeta}>{isl.provinces} provinsi {'\u2192'}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
