'use client';

import React from 'react';
import { PartnerIcon, WaIcon, MailIcon, PlayIcon, AppleIcon, IgIcon, FbIcon, InIcon, YtIcon, TtIcon } from '@/components/icons';
import F from '@/styles/footer-styles';
import { t, cat } from '@/lib/i18n';

const PRODUK = [
  [cat('itinerary'), '/explore/itinerary'], [cat('experience'), '/market/experience'], [cat('attraction'), '/market/attractions'],
  [cat('homestay'), '/market/homestay'], [cat('village'), '/explore/tourism-villages'], [cat('guide'), '/explore/tour-guides'],
];
const INFO = [
  ['Tentang kami', '/about'], ['Pusat bantuan', '/help-center'], ['Hubungi kami', '/contact'],
  ['Kolaborasi', '/partnership'], ['Karir', '/career'],
];
const LAIN = [
  ['ARTI · Carbon Offset', '/arti'], ['Campaign', '/campaign'],
  ['Atourin for Business', '/become-a-partner'], ['Syarat & Ketentuan', '/terms-and-conditions'],
  ['Kebijakan privasi', '/privacy-policy'], ['SDGs', '/sdgs'],
];
const PAY = ['OVO', 'ShopeePay', 'GoPay', 'BANK BRI', 'DANA', 'LinkAja', 'VISA', 'Mastercard', 'QRIS', 'BCA', 'BNI', 'Mandiri'];

function WonderfulIndonesiaMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width="48" height="36" viewBox="0 0 60 48" fill="none">
        <path d="M30 6c-6 6-6 18 0 24" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 6c6 6 6 18 0 24" stroke="#F4A261" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 6c8 4 12 14 8 22" stroke="#2A9D8F" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 6c-8 4-12 14-8 22" stroke="#F1C40F" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 6c10 2 16 10 14 20" stroke="#9B59B6" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 6c-10 2-16 10-14 20" stroke="#3498DB" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="40" r="2" fill="#E63946"/>
      </svg>
      <div>
        <div style={{ fontSize: 11, fontWeight: 400, color: '#1F1B33', letterSpacing: '0.02em' }}>wonderful</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1F1B33', letterSpacing: '-0.01em', marginTop: -2 }}>INDONESIA</div>
      </div>
    </div>
  );
}

function GstcMark() {
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width="50" height="20" viewBox="0 0 60 24" fill="none">
        <path d="M8 12c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7z" stroke="#7E1D1D" strokeWidth="1.8"/>
        <path d="M22 12c0-4 3-7 7-7s7 3 7 7-3 7-7 7-7-3-7-7z" stroke="#7E1D1D" strokeWidth="1.8"/>
        <text x="40" y="16" fontSize="10" fontWeight="700" fill="#7E1D1D" fontFamily="Product Sans">GSTC</text>
      </svg>
      <div style={{ fontSize: 8, fontWeight: 700, color: '#7E1D1D', letterSpacing: '0.15em', marginTop: 2 }}>MEMBER</div>
    </div>
  );
}

function KomdigiMark() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="1" fill="#E74C3C"/>
        <rect x="14" y="2" width="10" height="10" rx="1" fill="#3498DB"/>
        <rect x="2" y="14" width="10" height="10" rx="1" fill="#F1C40F"/>
        <rect x="14" y="14" width="10" height="10" rx="1" fill="#2ECC71"/>
        <rect x="20" y="20" width="6" height="6" rx="1" fill="#9B59B6"/>
      </svg>
      <span style={{ fontSize: 13, fontWeight: 700, color: '#1F1B33', letterSpacing: '0.12em' }}>KOMDIGI</span>
    </div>
  );
}

const SOCIAL = [
  ['ig', <IgIcon key="ig" />], ['fb', <FbIcon key="fb" />], ['in', <InIcon key="in" />],
  ['yt', <YtIcon key="yt" />], ['tt', <TtIcon key="tt" />],
];

export default function SiteFooter() {
  return (
    <footer style={F.wrap}>
      <style>{`@keyframes atrFootMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .atrf-link:hover{color:var(--atr-purple)!important}
        .atrf-soc:hover{border-color:var(--atr-purple)!important;color:var(--atr-purple)!important}
        .atrf-partner:hover{filter:brightness(1.06)}
        .atrf-marq:hover [data-track]{animation-play-state:paused}
        @media (max-width:1000px){
.atrf-main{grid-template-columns:1fr 1fr 1fr !important}
.atrf-pay{flex-direction:column;align-items:flex-start !important} }
        @media (max-width:600px){
.atrf-main{grid-template-columns:1fr 1fr !important} }
      `}</style>

      {/* Newsletter */}
      <div style={F.news}>
        <div>
          <div style={F.newsT}>Inspirasi perjalanan, langsung ke inbox-mu</div>
          <div style={F.newsS}>Promo, destinasi tersembunyi, &amp; tips dari penjelajah, tiap minggu.</div>
        </div>
        <div style={F.newsForm}>
          <input style={F.newsInput} placeholder="Masukkan email kamu" />
          <button style={F.newsBtn} onClick={() => window.atrToast && window.atrToast('Terima kasih! Kamu berlangganan newsletter Atourin')}>Langganan</button>
        </div>
      </div>

      <div style={F.main} className="atrf-main">
        <div>
          <img src="/assets/atr/logo/atourin-wordmark.png" alt="Atourin" style={{ height: 30 }} />
          <p style={F.tagline}>One Stop Solution for Tourism Services. Jelajahi pengalaman lokal otentik di seluruh Indonesia.</p>
          <a href="/become-a-partner" style={F.partnerBtn} className="atrf-partner"><PartnerIcon /> Bermitra dengan Atourin</a>
          <div style={F.contactRow}>
            <a href="#" style={F.contactItem}><span style={F.contactIcon}><WaIcon /></span> +62 812-2040-1113</a>
            <a href="mailto:info@atourin.com" style={F.contactItem}><span style={F.contactIcon}><MailIcon /></span> info@atourin.com</a>
          </div>
        </div>
        {[
          [t('foot.produk'), PRODUK],
          [t('foot.informasi'), INFO],
          [t('foot.lainnya'), LAIN],
        ].map(([title, listArr]) => (
          <div key={title}>
            <div style={F.colTitle}>{title}</div>
            <ul style={F.list}>{listArr.map(([l, href]) => <li key={l}><a href={href} style={F.link} className="atrf-link">{l}</a></li>)}</ul>
          </div>
        ))}
        <div>
          <div style={F.colTitle}>{t('foot.getApp')}</div>
          <div style={F.appCol}>
            <a href="#" style={F.appBtn}><PlayIcon /><span><span style={F.appSm}>GET IT ON</span><span style={F.appLg}>Google Play</span></span></a>
            <a href="#" style={{ ...F.appBtn, background: '#1F1B33', borderColor: '#1F1B33', color: '#fff' }}><AppleIcon /><span><span style={F.appSm}>Download on the</span><span style={F.appLg}>App Store</span></span></a>
          </div>
          <div style={{ ...F.colTitle, marginTop: 22 }}>{t('foot.follow')}</div>
          <div style={F.socialRow}>{SOCIAL.map(([k, ic]) => <a key={k} href="#" style={F.socialDot} className="atrf-soc" aria-label={k}>{ic}</a>)}</div>
        </div>
      </div>

      <div style={F.payRow} className="atrf-pay">
        <div style={F.trust}>
          <span style={F.trustChip}><WonderfulIndonesiaMark /></span>
          <span style={F.trustChip}><GstcMark /></span>
          <span style={F.trustChip}><KomdigiMark /></span>
        </div>
        <div style={F.marquee} className="atrf-marq">
          <div style={F.track} data-track>
            {[...PAY, ...PAY].map((p, i) => <span key={p + i} style={F.payTile}>{p}</span>)}
          </div>
        </div>
      </div>

      <div style={F.bottom}>
        <span>© 2026 PT Atourin Teknologi Indonesia · All Rights Reserved</span>
        <span style={F.bottomLinks}>
          <a href="/terms-and-conditions" style={F.bl}>Syarat &amp; Ketentuan</a>
          <a href="/privacy-policy" style={F.bl}>Kebijakan privasi</a>
          <span>{'\uD83C\uDDF4'} ID · EN</span>
        </span>
      </div>
    </footer>
  );
}
