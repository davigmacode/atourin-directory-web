'use client';

import React from 'react';
import utilStyles from '@/styles/util-styles';
import { PlayBadge, AppleBadge } from './icons';

export default function PromoQRPopover({ onClose }) {
  return (
    <div style={utilStyles.pop}>
      <div style={utilStyles.popHead}>
        <span>{'\uD83D\uDCF1'} Unduh Aplikasi Atourin</span>
        <button style={utilStyles.popClose} onClick={onClose} aria-label="Tutup">{'\u00D7'}</button>
      </div>
      <div style={utilStyles.popBody}>
        <div style={utilStyles.popTitle}>Scan QR ini untuk download<br/>aplikasi Atourin!</div>
        <div style={utilStyles.popSub}>Dapatkan promo eksklusifnya!</div>
        <div style={utilStyles.qrFrame}>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&data=https%3A%2F%2Fatourin.com%2Fapp"
            alt="QR Atourin App"
            style={utilStyles.qrImg}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div style={utilStyles.popOr}>atau klik tombol di bawah:</div>
        <div style={utilStyles.storeCol}>
          <a href="#" style={utilStyles.storeBtn}>
            <PlayBadge />
            <span style={utilStyles.storeText}>
              <span style={{ fontSize: 9, fontWeight: 400, opacity: 0.85, lineHeight: 1.2 }}>GET IT ON</span>
              <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>Google Play</span>
            </span>
          </a>
          <a href="#" style={utilStyles.storeBtn}>
            <AppleBadge />
            <span style={utilStyles.storeText}>
              <span style={{ fontSize: 9, fontWeight: 400, opacity: 0.85, lineHeight: 1.2 }}>Download on the</span>
              <span style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>App Store</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
