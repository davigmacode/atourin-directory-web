'use client';

import React, { useState } from 'react';
import TopNav from '@/components/TopNav';
import Breadcrumb from '@/components/Breadcrumb';
import SiteFooter from '@/components/SiteFooter';
import { dirStyles, cardStyles } from '@/styles/attraction-styles';

/* ── Icons ── */
function PinSm() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2"/></svg>;
}
function StarFill() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)"><path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z"/></svg>;
}

/* ── Stat ── */
function Stat({ n, label }) {
  return (
    <div style={dirStyles.stat}>
      <div style={dirStyles.statN}>{n}</div>
      <div style={dirStyles.statL}>{label}</div>
    </div>
  );
}

/* ── CategoryTabs ── */
const DIRECTORY_TABS = [
  { label: 'Itinerary',   count: '2.4K', href: '/' },
  { label: 'Destinasi',   count: '180',  href: '/destinations' },
  { label: 'Atraksi',     count: '1.2K', href: '/attractions' },
  { label: 'Tour Guide',  count: '640',  href: '/tour-guides' },
  { label: 'Desa Wisata', count: '320',  href: '/tourism-villages' },
];
function CategoryTabs({ active = 'Desa Wisata' }) {
  return (
    <div style={dirStyles.tabsBar}>
      <div style={dirStyles.tabsInner}>
        {DIRECTORY_TABS.map((t) => {
          const isActive = active === t.label;
          return (
            <a key={t.label} href={t.href} style={{ ...dirStyles.tab, ...(isActive ? dirStyles.tabActive : {}), textDecoration: 'none' }}>
              <span>{t.label}</span>
              <span style={{ ...dirStyles.tabCount, ...(isActive ? dirStyles.tabCountActive : {}) }}>{t.count}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ── Villages Hero ── */
const vh = {
  collage: { position: 'absolute', inset: 0 },
  imgMain: { position: 'absolute', top: 20, left: 20, width: '70%', height: '62%', objectFit: 'cover', borderRadius: 18, boxShadow: '0 18px 36px rgba(31,27,51,0.18)' },
  imgTop: { position: 'absolute', top: 14, right: 0, width: '36%', height: '36%', objectFit: 'cover', borderRadius: 14, boxShadow: '0 10px 22px rgba(31,27,51,0.14)' },
  imgBottom: { position: 'absolute', bottom: 20, right: 40, width: '52%', height: '38%', objectFit: 'cover', borderRadius: 14, boxShadow: '0 12px 26px rgba(31,27,51,0.14)' },
  adwiBadge: { position: 'absolute', top: 60, right: 30, background: 'var(--atr-yellow)', color: '#3D2900', borderRadius: 12, padding: '12px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 22px rgba(0,0,0,0.18)', zIndex: 3, transform: 'rotate(-4deg)' },
  adwiLabel: { fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1.2 },
  adwiYear: { fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 4 },
  kpiCard: { position: 'absolute', bottom: 30, left: 0, background: '#fff', borderRadius: 14, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 12px 26px rgba(31,27,51,0.16)', zIndex: 3 },
  kpiIcon: { fontSize: 22, background: 'rgba(81,176,84,0.16)', borderRadius: 10, width: 40, height: 40, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  kpiNum: { fontSize: 13, fontWeight: 700, color: 'var(--atr-text)' },
  kpiLabel: { fontSize: 11, color: 'var(--atr-text-muted)' },
};

function VillagesHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: '100%' }}><Breadcrumb items={['Beranda', 'Jelajahi', 'Desa Wisata']} /></div>
          <h1 style={dirStyles.heroTitle}>Tinggal di rumah warga, <span style={{ color: 'var(--atr-purple)' }}>hidup seperti lokal.</span></h1>
          <p style={dirStyles.heroSubtitle}>Desa wisata terkurasi Kemenparekraf, dari Wae Rebo di Flores hingga Penglipuran di Bali. Homestay, workshop kerajinan, tarian tradisional, dan kuliner asli kampung.</p>
          <div style={dirStyles.heroCtaRow}>
            <button style={dirStyles.heroPrimary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
              Telusuri ADWI 2026
            </button>
            <button style={dirStyles.heroSecondary}>Apa itu desa wisata?</button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="320+" label="Desa terkurasi"/>
            <Stat n="34" label="Provinsi"/>
            <Stat n="92" label="ADWI Maju & Mandiri"/>
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={vh.collage}>
            <img src="https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&auto=format&fit=crop&q=70" alt="" style={vh.imgMain}/>
            <img src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70" alt="" style={vh.imgTop}/>
            <img src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&auto=format&fit=crop&q=70" alt="" style={vh.imgBottom}/>
            <div style={vh.adwiBadge}>
              <div style={vh.adwiLabel}>ANUGERAH DESA<br/>WISATA INDONESIA</div>
              <div style={vh.adwiYear}>2026</div>
            </div>
            <div style={vh.kpiCard}>
              <span style={vh.kpiIcon}>{'\uD83C\uDFE0'}</span>
              <div>
                <div style={vh.kpiNum}>1.840+ homestay</div>
                <div style={vh.kpiLabel}>tersedia di seluruh Indonesia</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Village Card ── */
const VIL_DATA = [
  { img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70',         name: 'Desa Wae Rebo',       region: 'Manggarai, NTT',        adwi: 'Mandiri', adwiBg: 'rgba(180,122,0,0.16)', adwiFg: '#B47A00', theme: 'Budaya & Adat', activities: ['Homestay', 'Tarian', 'Trekking'], price: 350000, rating: 4.95, families: 7, signature: 'Mbaru Niang', featured: true },
  { img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70',  name: 'Desa Penglipuran',     region: 'Bangli, Bali',          adwi: 'Mandiri', adwiBg: 'rgba(180,122,0,0.16)', adwiFg: '#B47A00', theme: 'Budaya & Adat', activities: ['Homestay', 'Workshop', 'Kuliner'], price: 200000, rating: 4.88, families: 76, signature: 'Pekarangan seragam' },
  { img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70',  name: 'Desa Nglanggeran',     region: 'Gunungkidul, DIY',      adwi: 'Maju',    adwiBg: 'rgba(81,176,84,0.16)', adwiFg: '#2D8838', theme: 'Alam & Ekowisata', activities: ['Trekking', 'Homestay', 'Coklat'], price: 175000, rating: 4.82, families: 38, signature: 'Gunung api purba' },
  { img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70',  name: 'Desa Pemuteran',       region: 'Buleleng, Bali',        adwi: 'Maju',    adwiBg: 'rgba(81,176,84,0.16)', adwiFg: '#2D8838', theme: 'Bahari', activities: ['Snorkel', 'Coral Garden', 'Homestay'], price: 250000, rating: 4.85, families: 24, signature: 'Bio-rock coral' },
  { img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70',  name: 'Desa Pentingsari',     region: 'Sleman, DIY',           adwi: 'Mandiri', adwiBg: 'rgba(180,122,0,0.16)', adwiFg: '#B47A00', theme: 'Pertanian', activities: ['Bertani', 'Workshop', 'Memasak'], price: 165000, rating: 4.78, families: 48, signature: 'Sawah terasering' },
  { img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop&q=70',  name: 'Desa Sasak Sade',      region: 'Lombok Tengah, NTB',    adwi: 'Berkembang', adwiBg: 'rgba(31,111,176,0.14)', adwiFg: '#1F6FB0', theme: 'Budaya & Adat', activities: ['Tenun', 'Tari Peresean'], price: 0, rating: 4.7, families: 150, signature: 'Rumah Sasak adat' },
  { img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70',  name: 'Desa Tete Batu',       region: 'Lombok Timur, NTB',     adwi: 'Maju',    adwiBg: 'rgba(81,176,84,0.16)', adwiFg: '#2D8838', theme: 'Alam & Ekowisata', activities: ['Trekking', 'Air terjun', 'Sawah'], price: 220000, rating: 4.84, families: 34, signature: 'Monkey Forest' },
  { img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop&q=70',  name: 'Desa Saribu Gonjong',  region: 'Tanah Datar, Sumbar',    adwi: 'Berkembang', adwiBg: 'rgba(31,111,176,0.14)', adwiFg: '#1F6FB0', theme: 'Budaya & Adat', activities: ['Rumah Gadang', 'Workshop Tenun', 'Kuliner'], price: 180000, rating: 4.65, families: 28, signature: 'Rumah Gadang berundak' },
  { img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70',  name: 'Desa Ranu Pani',       region: 'Lumajang, Jatim',       adwi: 'Rintisan', adwiBg: 'rgba(196,73,73,0.14)', adwiFg: '#C44949', theme: 'Alam & Ekowisata', activities: ['Hiking Semeru', 'Homestay', 'Danau'], price: 150000, rating: 4.72, families: 19, signature: 'Pintu masuk Semeru' },
  { img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600&auto=format&fit=crop&q=70',         name: 'Desa Liang Ndara',     region: 'Manggarai Barat, NTT', adwi: 'Berkembang', adwiBg: 'rgba(31,111,176,0.14)', adwiFg: '#1F6FB0', theme: 'Budaya & Adat', activities: ['Tari Caci', 'Homestay', 'Sawah Lingko'], price: 280000, rating: 4.78, families: 22, signature: 'Tari Caci tradisional' },
  { img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70',  name: 'Desa Tenganan',       region: 'Karangasem, Bali',      adwi: 'Maju',    adwiBg: 'rgba(81,176,84,0.16)', adwiFg: '#2D8838', theme: 'Kerajinan', activities: ['Tenun Gringsing', 'Lontar', 'Mekare'], price: 250000, rating: 4.86, families: 42, signature: 'Tenun ikat ganda' },
  { img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70',  name: 'Desa Tinalah',        region: 'Kulon Progo, DIY',       adwi: 'Mandiri', adwiBg: 'rgba(180,122,0,0.16)', adwiFg: '#B47A00', theme: 'Alam & Ekowisata', activities: ['River tubing', 'Camping', 'Homestay'], price: 195000, rating: 4.8, families: 35, signature: 'Sungai Tinalah' },
];

function VillageCard({ img, name, region, adwi, adwiBg, adwiFg, theme, activities, price, rating, families, signature, featured }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      style={{ ...cardStyles.card, ...(hover ? { transform: 'translateY(-3px)', boxShadow: '0 12px 24px rgba(31,27,51,0.08)' } : {}), cursor: 'pointer' }}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={() => alert('Buka detail desa wisata\u2026')}
    >
      <div style={cardStyles.cardImgWrap}>
        <img src={img} alt="" style={cardStyles.cardImg}/>
        <span style={{ ...cardStyles.cardTag, background: adwiBg, color: adwiFg }}>ADWI {adwi}</span>
        {featured && (
          <div style={{ position: 'absolute', top: 14, right: 14, background: 'var(--atr-yellow)', color: '#3D2900', fontSize: 10, fontWeight: 800, padding: '4px 9px', borderRadius: 4, letterSpacing: '0.04em' }}>
            UNGGULAN
          </div>
        )}
        <div style={cardStyles.cardImgBottom}>
          <span style={cardStyles.cardCityPill}><PinSm/> {region}</span>
        </div>
      </div>
      <div style={cardStyles.cardBody}>
        <div>
          <h3 style={cardStyles.cardTitle}>{name}</h3>
          <div style={{ fontSize: 12, color: 'var(--atr-text-muted)', marginTop: 4 }}>
            {'\u2728'} <em>{signature}</em>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, fontSize: 11 }}>
          <span style={{ background: 'var(--atr-bg-soft)', color: 'var(--atr-text)', padding: '4px 9px', borderRadius: 999, fontWeight: 600 }}>
            {theme}
          </span>
          {activities.slice(0, 2).map(a => (
            <span key={a} style={{ background: '#fff', border: '1px solid var(--atr-outline)', color: 'var(--atr-text-muted)', padding: '4px 9px', borderRadius: 999 }}>
              {a}
            </span>
          ))}
          {activities.length > 2 && (
            <span style={{ color: 'var(--atr-text-muted)', padding: '4px 4px' }}>+{activities.length - 2}</span>
          )}
        </div>

        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={cardStyles.ratingRow}>
              <StarFill /> <strong>{rating}</strong>
            </div>
            <div style={{ fontSize: 11, color: 'var(--atr-text-muted)' }}>{'\uD83C\uDFE0'} {families} KK homestay</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {price === 0 ? <span style={{ fontSize: 12, fontWeight: 700, color: '#2D8838' }}>Gratis</span>
              : <>
                  <div style={{ fontSize: 10, color: 'var(--atr-text-muted)' }}>mulai</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--atr-purple)' }}>Rp {(price/1000).toLocaleString('id-ID')}rb<span style={{ fontWeight: 500, fontSize: 10, color: 'var(--atr-text-muted)' }}> /malam</span></div>
                </>
            }
          </div>
        </div>
      </div>
    </article>
  );
}

function VillagesGrid() {
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>{'\uD83C\uDFE0'} Direktori desa wisata</div>
          <h2 style={cardStyles.railTitle}>Semua desa wisata Indonesia</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {VIL_DATA.map((v, i) => <VillageCard key={i} {...v}/>)}
      </div>
      <div style={cardStyles.paginationRow}>
        <button style={cardStyles.loadMore}>Muat 24 desa lagi</button>
        <div style={cardStyles.pageInfo}>Menampilkan 12 dari 318</div>
      </div>
    </section>
  );
}

/* ── FilterBar ── */
const VIL_FILTERS = [
  { label: 'Provinsi', icon: 'pin' },
  { label: 'Kategori ADWI', icon: 'tag' },
  { label: 'Tema utama', icon: 'users' },
  { label: 'Aktivitas', icon: 'clock' },
  { label: 'Harga homestay', icon: 'wallet' },
];
const VIL_FILTER_OPTIONS = {
  Provinsi: ['Bali', 'DI Yogyakarta', 'NTT', 'NTB', 'Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'Sumatera Barat', 'Sumatera Utara', 'Sulawesi Selatan'],
  'Kategori ADWI': ['Mandiri', 'Maju', 'Berkembang', 'Rintisan', 'Belum terklasifikasi'],
  'Tema utama': ['Budaya & Adat', 'Alam & Ekowisata', 'Kerajinan', 'Kuliner Lokal', 'Edukasi', 'Religi', 'Pertanian', 'Bahari'],
  Aktivitas: ['Homestay', 'Workshop kerajinan', 'Trekking', 'Bersepeda', 'Tarian tradisional', 'Memasak bareng', 'Memancing', 'Bertani'],
  'Harga homestay': ['< Rp150rb', 'Rp150rb \u2013 Rp300rb', 'Rp300rb \u2013 Rp500rb', '> Rp500rb'],
};
const SORT_OPTIONS = ['Paling populer', 'Rating tertinggi', 'Harga terendah', 'Harga tertinggi'];

function FilterGlyph({ kind }) {
  const c = 'var(--atr-purple)';
  if (kind === 'pin') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z" stroke={c} strokeWidth="1.8" /><circle cx="12" cy="9.5" r="2.5" stroke={c} strokeWidth="1.8" /></svg>;
  if (kind === 'clock') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.8" /><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (kind === 'wallet') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="13" rx="2" stroke={c} strokeWidth="1.8" /><path d="M16 12.5h3" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (kind === 'users') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="9" r="3" stroke={c} strokeWidth="1.8" /><circle cx="17" cy="10" r="2.4" stroke={c} strokeWidth="1.8" /><path d="M3 19c0-3 2.7-5 6-5s6 2 6 5M15 19c0-2 1.5-4 4-4s4 1.5 4 4" stroke={c} strokeWidth="1.8" strokeLinecap="round" /></svg>;
  if (kind === 'tag') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 12V4h8l10 10-8 8-10-10z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" /><circle cx="8" cy="8" r="1.4" fill={c} /></svg>;
  return null;
}
function ChevDown({ rotated }) {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transition: 'transform .2s', transform: rotated ? 'rotate(180deg)' : 'none' }}><path d="M6 9l6 6 6-6" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" /></svg>;
}
function CheckIcon() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function FilterBar() {
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState('Paling populer');
  const [activeChips, setActiveChips] = useState(['Bali', 'ADWI Mandiri', 'Budaya & Adat']);

  function toggleFilter(label) { setOpenFilter(openFilter === label ? null : label); setOpenSort(false); }
  function pickFilter(label, value) { if (!activeChips.includes(value)) setActiveChips([...activeChips, value]); setOpenFilter(null); }
  function removeChip(c) { setActiveChips(activeChips.filter(x => x !== c)); }

  return (
    <div style={dirStyles.filterWrap}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {VIL_FILTERS.map((f) => {
            const open = openFilter === f.label;
            return (
              <div key={f.label} style={{ position: 'relative' }}>
                <button onClick={() => toggleFilter(f.label)} style={{ ...dirStyles.filterChip, ...(open ? { border: '1px solid var(--atr-purple)', background: '#F6F4FF' } : {}) }}>
                  <FilterGlyph kind={f.icon} /><span>{f.label}</span><ChevDown rotated={open} />
                </button>
                {open && (
                  <div style={dirStyles.dropdown}>
                    {(VIL_FILTER_OPTIONS[f.label] || []).map((opt) => {
                      const checked = activeChips.includes(opt);
                      return (
                        <button key={opt} onClick={() => pickFilter(f.label, opt)} style={dirStyles.dropdownItem}>
                          <span style={{ ...dirStyles.checkbox, ...(checked ? dirStyles.checkboxOn : {}) }}>{checked && <CheckIcon />}</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={dirStyles.filterRight}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setOpenSort(!openSort); setOpenFilter(null); }} style={dirStyles.sortBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {sort}<ChevDown rotated={openSort} />
            </button>
            {openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: 'auto' }}>
                {SORT_OPTIONS.map((s) => (
                  <button key={s} onClick={() => { setSort(s); setOpenSort(false); }}
                    style={{ ...dirStyles.dropdownItem, ...(s === sort ? { color: 'var(--atr-purple)', fontWeight: 600 } : {}) }}>
                    <span style={{ ...dirStyles.radio, ...(s === sort ? { border: '1.5px solid var(--atr-purple)', boxShadow: 'inset 0 0 0 3px var(--atr-purple)', background: '#fff' } : {}) }} />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}><strong>318</strong> desa wisata cocok untukmu</span>
        <div style={dirStyles.activeChips}>
          {activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>{c}<span style={dirStyles.chipX} onClick={() => removeChip(c)}>{'\u00D7'}</span></span>
          ))}
          {activeChips.length > 0 && <button onClick={() => setActiveChips([])} style={dirStyles.clearAll}>Hapus semua</button>}
        </div>
      </div>
    </div>
  );
}

/* ── CTABand ── */
function CTABand() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #6F66D5 0%, #524BAA 100%)', marginTop: 80, borderRadius: 24, maxWidth: 1376, marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', padding: '56px' }}>
        <div style={{ color: '#fff' }}>
          <div style={cardStyles.eyebrow}>{'\uD83D\uDEE0'} Bikin sendiri</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em', marginTop: 8, marginBottom: 14, color: '#fff' }}>
            Tidak nemu yang pas?<br />Susun itinerary kamu sendiri.
          </h2>
          <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.55, marginBottom: 24, maxWidth: 480 }}>
            Drag & drop aktivitas dari direktori Atourin, atau biarkan asisten AI menyusun draft awal untukmu dalam 30 detik.
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: 'var(--atr-purple)', border: 'none', borderRadius: 10, padding: '14px 22px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="var(--atr-purple)" strokeWidth="2.2" strokeLinecap="round" /></svg>
              Mulai dari nol
            </button>
            <button style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: '14px 22px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--atr-font-sans)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              Coba dengan AI
            </button>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
}

/* ── Page ── */
export default function TourismVillagesPage() {
  return (
    <div data-screen-label="Tourism Villages Directory">
      <TopNav active="Desa Wisata" />
      <VillagesHero />
      <CategoryTabs active="Desa Wisata" />
      <FilterBar />
      <VillagesGrid />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
