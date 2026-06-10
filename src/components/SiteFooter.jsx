'use client';

import React from 'react';
import { PartnerIcon, WaIcon, MailIcon, PlayIcon, AppleIcon, IgIcon, FbIcon, InIcon, YtIcon, TtIcon } from './icons';
import F from '@/styles/footer-styles';
import { t, cat } from '@/lib/i18n';

const PRODUK = [
  [cat('itinerary'), '/'], [cat('experience'), '/'], [cat('attraction'), '/'],
  [cat('homestay'), '/'], [cat('village'), '/'], [cat('guide'), '/'],
];
const INFO = [
  ['Tentang kami', '/'], ['Pusat bantuan', '/'], ['Hubungi kami', '/'],
  ['Kolaborasi', '/'], ['Karir', '/'],
];
const LAIN = [
  ['ARTI · Carbon Offset', '/'], ['Campaign', '/'],
  ['Atourin for Business', '/'], ['Syarat & Ketentuan', '/'],
  ['Kebijakan privasi', '/'], ['SDGs', '/'],
];
const PAY = ['OVO', 'ShopeePay', 'GoPay', 'BANK BRI', 'DANA', 'LinkAja', 'VISA', 'Mastercard', 'QRIS', 'BCA', 'BNI', 'Mandiri'];
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

      <div style={F.main} className="atrf-main">
        <div>
          <img src="/assets/atr/logo/atourin-wordmark.png" alt="Atourin" style={{ height: 30 }} />
          <p style={F.tagline}>One Stop Solution for Tourism Services. Jelajahi pengalaman lokal otentik di seluruh Indonesia.</p>
          <a href="/" style={F.partnerBtn} className="atrf-partner"><PartnerIcon /> Bermitra dengan Atourin</a>
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
        <div style={F.marquee} className="atrf-marq">
          <div style={F.track} data-track>
            {[...PAY, ...PAY].map((p, i) => <span key={p + i} style={F.payTile}>{p}</span>)}
          </div>
        </div>
      </div>

      <div style={F.bottom}>
        <span>© 2026 PT Atourin Teknologi Indonesia · All Rights Reserved</span>
        <span style={F.bottomLinks}>
          <a href="/" style={F.bl}>Syarat & Ketentuan</a>
          <a href="/" style={F.bl}>Kebijakan privasi</a>
          <span>{'\uD83C\uDDF4'} ID · EN</span>
        </span>
      </div>
    </footer>
  );
}
