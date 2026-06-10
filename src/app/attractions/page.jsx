'use client';

import React, { useState, useRef, useEffect } from 'react';
import TopNav from '@/components/TopNav';
import Breadcrumb from '@/components/Breadcrumb';
import SiteFooter from '@/components/SiteFooter';
import { dirStyles, cardStyles, attrHero } from '@/styles/attraction-styles';

/* ── Images ── */
const ATTR_IMG = {
  padar: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=1200&auto=format&fit=crop&q=70',
  borobudur: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop&q=70',
  bromo: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=70',
  ulundanu: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&auto=format&fit=crop&q=70',
  tanjung: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop&q=70',
  prambanan: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200&auto=format&fit=crop&q=70',
  toba: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=1200&auto=format&fit=crop&q=70',
  raja: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=70',
  manta: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&auto=format&fit=crop&q=70',
  tirta: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200&auto=format&fit=crop&q=70',
  sendang: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&auto=format&fit=crop&q=70',
  kawah: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1200&auto=format&fit=crop&q=70',
};

/* ── Filters ── */
const ATTR_FILTERS = [
  { label: 'Provinsi', icon: 'pin' },
  { label: 'Kategori', icon: 'tag' },
  { label: 'Tiket masuk', icon: 'wallet' },
  { label: 'Fasilitas', icon: 'users' },
  { label: 'Rating', icon: 'clock' },
];
const ATTR_FILTER_OPTIONS = {
  Provinsi: ['Bali', 'DI Yogyakarta', 'Jawa Timur', 'NTB', 'NTT', 'Jawa Barat', 'Sumatera Utara', 'Papua Barat Daya', 'Sulawesi Selatan', 'Aceh'],
  Kategori: ['Pantai', 'Air Terjun', 'Gunung', 'Candi & Sejarah', 'Museum', 'Religi', 'Taman', 'Snorkeling & Diving', 'Pemandian', 'Kuliner'],
  'Tiket masuk': ['Gratis', '< Rp25rb', 'Rp25rb \u2013 Rp100rb', 'Rp100rb \u2013 Rp250rb', '> Rp250rb'],
  Fasilitas: ['Parkir', 'Toilet', 'Mushola', 'Restoran', 'Penyewaan alat', 'Ramah anak', 'Akses kursi roda'],
  Rating: ['\u2605 4.5+', '\u2605 4.0+', '\u2605 3.5+', 'Semua rating'],
};
const SORT_OPTIONS = ['Paling populer', 'Terbaru', 'Rating tertinggi', 'Harga terendah', 'Harga tertinggi'];

const ATTR_DATA = [
  { img: ATTR_IMG.padar,    name: 'Pulau Padar Viewpoint', cat: 'Alam', catBg: '#D9F2DA', catFg: '#2D8838', region: 'Labuan Bajo, NTT',    price: 50000, rating: 4.95, reviews: 412, hours: '06.00\u201318.00', trekking: true, save: false },
  { img: ATTR_IMG.borobudur, name: 'Candi Borobudur',       cat: 'Sejarah', catBg: '#FFF4D9', catFg: '#B47A00', region: 'Magelang, Jateng',   price: 75000, rating: 4.9, reviews: 1240, hours: '06.30\u201317.30', trekking: false, save: false },
  { img: ATTR_IMG.bromo,    name: 'Gunung Bromo',          cat: 'Gunung', catBg: '#EDE9FF', catFg: '#5448B5', region: 'Probolinggo, Jatim', price: 35000, rating: 4.88, reviews: 856, hours: '24 jam', trekking: true, save: true },
  { img: ATTR_IMG.ulundanu,  name: 'Pura Ulun Danu Beratan', cat: 'Religi', catBg: '#FFE9E9', catFg: '#C44949', region: 'Tabanan, Bali',      price: 50000, rating: 4.8, reviews: 624, hours: '07.00\u201319.00', trekking: false, save: false },
  { img: ATTR_IMG.tanjung,  name: 'Pantai Tanjung Aan',    cat: 'Pantai', catBg: '#E2F1FF', catFg: '#1F6FB0', region: 'Lombok Tengah, NTB', price: 0, rating: 4.75, reviews: 388, hours: '24 jam', trekking: false, save: false },
  { img: ATTR_IMG.prambanan, name: 'Candi Prambanan',       cat: 'Sejarah', catBg: '#FFF4D9', catFg: '#B47A00', region: 'Sleman, DIY',        price: 75000, rating: 4.85, reviews: 942, hours: '06.30\u201317.00', trekking: false, save: false },
  { img: ATTR_IMG.toba,     name: 'Danau Toba',            cat: 'Alam', catBg: '#D9F2DA', catFg: '#2D8838', region: 'Sumatera Utara',    price: 0, rating: 4.7, reviews: 510, hours: '24 jam', trekking: false, save: false },
  { img: ATTR_IMG.raja,     name: 'Wayag Viewpoint',       cat: 'Alam', catBg: '#D9F2DA', catFg: '#2D8838', region: 'Raja Ampat, Pabar',  price: 200000, rating: 4.98, reviews: 320, hours: '05.30\u201317.00', trekking: true, save: true },
  { img: ATTR_IMG.sendang,  name: 'Air Terjun Tiu Kelep',  cat: 'Air Terjun', catBg: '#E2F1FF', catFg: '#1F6FB0', region: 'Lombok Utara, NTB',  price: 25000, rating: 4.72, reviews: 234, hours: '07.00\u201317.00', trekking: true, save: false },
  { img: ATTR_IMG.kawah,    name: 'Kawah Putih Ciwidey',   cat: 'Alam', catBg: '#D9F2DA', catFg: '#2D8838', region: 'Bandung, Jabar',     price: 75000, rating: 4.5, reviews: 678, hours: '07.00\u201317.00', trekking: false, save: false },
  { img: ATTR_IMG.manta,    name: 'Manta Point Karang Makassar', cat: 'Diving', catBg: '#E2F1FF', catFg: '#1F6FB0', region: 'Labuan Bajo, NTT', price: 350000, rating: 4.92, reviews: 192, hours: '08.00\u201315.00', trekking: false, save: false },
  { img: ATTR_IMG.tirta,    name: 'Pura Tirta Empul',      cat: 'Religi', catBg: '#FFE9E9', catFg: '#C44949', region: 'Tampaksiring, Bali', price: 50000, rating: 4.78, reviews: 540, hours: '07.00\u201318.00', trekking: false, save: false },
];

/* ── SVG icons ── */
function HeartIcon({ filled, color = 'var(--atr-text)' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'var(--atr-red)' : 'none'}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" stroke={filled ? 'var(--atr-red)' : color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
function ClockSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function PinSm() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function StarFill() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--atr-yellow)">
      <path d="M12 3l2.6 6 6.4.6-4.8 4.4 1.5 6.4L12 17l-5.7 3.4 1.5-6.4L3 9.6l6.4-.6L12 3z" />
    </svg>
  );
}
function PlusIcon({ color = 'var(--atr-text)' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
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
function GridIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" /><rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" /><rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" /><rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8" /></svg>;
}
function MapIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}
function SortIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 4v16M3 8l4-4 4 4M17 20V4M13 16l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
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
  { label: 'Tour Guide',  count: '640',  href: '/' },
  { label: 'Desa Wisata', count: '320',  href: '/' },
];

function CategoryTabs({ active = 'Atraksi' }) {
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

/* ── FilterBar ── */
function FilterBar({ state, filters = ATTR_FILTERS, filterOptions = ATTR_FILTER_OPTIONS, resultLabel = 'atraksi', totalResults = 1247 }) {
  const wrapRef = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        state.setOpenFilter(null);
        state.setOpenSort(false);
      }
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function toggleFilter(label) {
    state.setOpenFilter(state.openFilter === label ? null : label);
    state.setOpenSort(false);
  }
  function pickFilter(label, value) {
    if (!state.activeChips.includes(value)) {
      state.setActiveChips([...state.activeChips, value]);
    }
    state.setOpenFilter(null);
  }
  function removeChip(c) {
    state.setActiveChips(state.activeChips.filter((x) => x !== c));
  }

  return (
    <div style={dirStyles.filterWrap} ref={wrapRef}>
      <div style={dirStyles.filterRow}>
        <div style={dirStyles.filterLeft}>
          {filters.map((f) => {
            const open = state.openFilter === f.label;
            return (
              <div key={f.label} style={{ position: 'relative' }}>
                <button
                  onClick={() => toggleFilter(f.label)}
                  style={{ ...dirStyles.filterChip, ...(open ? { border: '1px solid var(--atr-purple)', background: '#F6F4FF' } : {}) }}
                >
                  <FilterGlyph kind={f.icon} /><span>{f.label}</span><ChevDown rotated={open} />
                </button>
                {open && (
                  <div style={dirStyles.dropdown}>
                    {(filterOptions[f.label] || []).map((opt) => {
                      const checked = state.activeChips.includes(opt);
                      return (
                        <button key={opt} onClick={() => pickFilter(f.label, opt)} style={dirStyles.dropdownItem}>
                          <span style={{ ...dirStyles.checkbox, ...(checked ? dirStyles.checkboxOn : {}) }}>
                            {checked && <CheckIcon />}
                          </span>
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
          <div style={dirStyles.viewToggle}>
            <button onClick={() => state.setView('grid')} style={{ ...dirStyles.viewBtn, ...(state.view === 'grid' ? dirStyles.viewBtnActive : {}) }}>
              <GridIcon /> Grid
            </button>
            <button onClick={() => state.setView('map')} style={{ ...dirStyles.viewBtn, ...(state.view === 'map' ? dirStyles.viewBtnActive : {}) }}>
              <MapIcon /> Peta
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <button onClick={() => { state.setOpenSort(!state.openSort); state.setOpenFilter(null); }} style={dirStyles.sortBtn}>
              <SortIcon /> {state.sort}<ChevDown rotated={state.openSort} />
            </button>
            {state.openSort && (
              <div style={{ ...dirStyles.dropdown, right: 0, left: 'auto' }}>
                {SORT_OPTIONS.map((s) => (
                  <button key={s} onClick={() => { state.setSort(s); state.setOpenSort(false); }}
                    style={{ ...dirStyles.dropdownItem, ...(s === state.sort ? { color: 'var(--atr-purple)', fontWeight: 600 } : {}) }}>
                    <span style={{ ...dirStyles.radio, ...(s === state.sort ? dirStyles.radioOn : {}) }} />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={dirStyles.activeRow}>
        <span style={dirStyles.resultCount}>
          <strong>{totalResults}</strong> {resultLabel} cocok untukmu
        </span>
        <div style={dirStyles.activeChips}>
          {state.activeChips.map((c) => (
            <span key={c} style={dirStyles.activeChip}>
              {c}
              <span style={dirStyles.chipX} onClick={() => removeChip(c)}>{'\u00D7'}</span>
            </span>
          ))}
          {state.activeChips.length > 0 && (
            <button onClick={() => state.setActiveChips([])} style={dirStyles.clearAll}>Hapus semua</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── AttractionHero ── */
function AttractionHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: '100%' }}><Breadcrumb items={['Beranda', 'Jelajahi', 'Atraksi']} /></div>
          <h1 style={dirStyles.heroTitle}>Tempat-tempat <span style={{ color: 'var(--atr-purple)' }}>wajib dikunjungi.</span></h1>
          <p style={dirStyles.heroSubtitle}>Pantai, air terjun, candi, museum, hingga puncak gunung. Ribuan atraksi yang sudah dikurasi & direview oleh wisatawan dan local expert Atourin.</p>
          <div style={dirStyles.heroCtaRow}>
            <a href="/" style={{ ...dirStyles.heroPrimary, textDecoration: 'none' }}>
              <PlusIcon color="#fff" />
              Tambahkan ke itinerary
            </a>
            <button style={dirStyles.heroSecondary}>Lihat peta interaktif</button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="1.2K+" label="Atraksi tersedia" />
            <Stat n="220+" label="Kota & kabupaten" />
            <Stat n="38K" label="Review terverifikasi" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={attrHero.collage}>
            <img src={ATTR_IMG.padar} alt="" style={attrHero.collageImg1} />
            <img src={ATTR_IMG.borobudur} alt="" style={attrHero.collageImg2} />
            <img src={ATTR_IMG.tanjung} alt="" style={attrHero.collageImg3} />
            <div style={attrHero.floatStat}>
              <div style={attrHero.floatStatNum}>4.85<span style={{ fontSize: 11, opacity: 0.7 }}> {'\u2605'}</span></div>
              <div style={attrHero.floatStatLabel}>Rating rata-rata atraksi populer</div>
            </div>
            <div style={attrHero.floatCat}>
              <span style={attrHero.floatCatIcon}>{'\uD83D\uDD33'}</span>
              <div>
                <div style={attrHero.floatCatTitle}>Gunung & Alam</div>
                <div style={attrHero.floatCatMeta}>342 atraksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── AttractionGrid + AttrCard ── */
function AttractionGrid({ state }) {
  const [data, setData] = useState(ATTR_DATA);
  function toggleSave(i) { setData(data.map((d, idx) => idx === i ? { ...d, save: !d.save } : d)); }
  return (
    <section style={cardStyles.gridSection}>
      <div style={cardStyles.gridHeader}>
        <div>
          <div style={cardStyles.eyebrow}>{'\uD83D\uDCCD'} Direktori atraksi</div>
          <h2 style={cardStyles.railTitle}>Semua tempat wisata</h2>
        </div>
      </div>
      <div style={cardStyles.grid}>
        {data.map((a, i) => <AttrCard key={i} {...a} onSave={() => toggleSave(i)} />)}
      </div>
      <div style={cardStyles.paginationRow}>
        <button style={cardStyles.loadMore}>Muat 24 atraksi lagi</button>
        <div style={cardStyles.pageInfo}>Menampilkan 12 dari 1.247</div>
      </div>
    </section>
  );
}

function AttrCard({ img, name, cat, catBg, catFg, region, price, rating, reviews, hours, trekking, save, onSave }) {
  const [hover, setHover] = useState(false);
  return (
    <article
      style={{ ...cardStyles.card, ...(hover ? { transform: 'translateY(-3px)', boxShadow: '0 12px 24px rgba(31,27,51,0.08)' } : {}), cursor: 'pointer' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => alert('Buka detail atraksi\u2026')}
    >
      <div style={cardStyles.cardImgWrap}>
        <img src={img} alt="" style={cardStyles.cardImg} />
        <span style={{ ...cardStyles.cardTag, background: catBg, color: catFg }}>{cat}</span>
        <button
          style={{ ...cardStyles.cardSave, ...(save ? cardStyles.cardSaveOn : {}) }}
          onClick={(e) => { e.stopPropagation(); onSave(); }}
        >
          <HeartIcon filled={save} color={save ? '#fff' : 'var(--atr-text)'} />
        </button>
        {trekking && (
          <div style={cardStyles.cardImgBottom}>
            <span style={{ ...cardStyles.cardDaysPill, background: 'rgba(180,122,0,0.92)' }}>{'\uD83E\uDD7E'} Perlu trekking</span>
          </div>
        )}
      </div>
      <div style={cardStyles.cardBody}>
        <h3 style={cardStyles.cardTitle}>{name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--atr-text-muted)' }}>
          <PinSm /> {region}
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--atr-text-muted)', flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><ClockSm /> {hours}</span>
          {price === 0
            ? <span style={{ color: '#2D8838', fontWeight: 700 }}>{'\u00B7'} Gratis masuk</span>
            : <span>{'\u00B7'} Tiket Rp {(price / 1000).toLocaleString('id-ID')}rb</span>}
        </div>
        <div style={{ ...cardStyles.cardFooter, paddingTop: 10 }}>
          <div style={cardStyles.ratingRow}>
            <StarFill /> <strong>{rating}</strong>
            <span style={cardStyles.reviewCount}>({reviews} review)</span>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--atr-purple)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Lihat detail {'\u2192'}</span>
        </div>
      </div>
    </article>
  );
}

/* ── CTABand + BuilderMock ── */
function CTABand() {
  return (
    <section style={{ ...cardStyles.ctaBand, marginTop: 80, marginLeft: 'auto', marginRight: 'auto' }}>
      <div style={cardStyles.ctaInner}>
        <div style={cardStyles.ctaLeft}>
          <div style={cardStyles.eyebrow}>{'\uD83D\uDEE0'} Bikin sendiri</div>
          <h2 style={cardStyles.ctaTitle}>
            Tidak nemu yang pas?<br />
            Susun itinerary kamu sendiri.
          </h2>
          <p style={cardStyles.ctaSub}>
            Drag & drop aktivitas dari direktori Atourin, atau biarkan asisten
            AI menyusun draft awal untukmu dalam 30 detik.
          </p>
          <div style={cardStyles.ctaBtnRow}>
            <button style={cardStyles.ctaPrimary}>
              <PlusIcon color="var(--atr-purple)" /> Mulai dari nol
            </button>
            <button style={cardStyles.ctaSecondary}>
              <SparkleIcon /> Coba dengan AI
            </button>
          </div>
        </div>
        <div style={cardStyles.ctaRight}>
          <BuilderMock />
        </div>
      </div>
    </section>
  );
}

function BuilderMock() {
  return (
    <div style={cardStyles.builderCard}>
      <div style={cardStyles.builderHeader}>
        <div style={cardStyles.builderTitle}>3 Hari di Yogyakarta</div>
        <div style={cardStyles.builderTabs}>
          <span style={{ ...cardStyles.builderTab, ...cardStyles.builderTabActive }}>Hari 1</span>
          <span style={cardStyles.builderTab}>Hari 2</span>
          <span style={cardStyles.builderTab}>Hari 3</span>
        </div>
      </div>
      <div style={cardStyles.builderActivities}>
        {[
          { t: '08:00', title: 'Sarapan Gudeg Yu Djum', tag: 'Food', color: '#FFF4D9', tc: '#B47A00' },
          { t: '10:30', title: 'Keraton Yogyakarta', tag: 'Culture', color: '#EDE9FF', tc: 'var(--atr-purple)' },
          { t: '14:00', title: 'Taman Sari Water Castle', tag: 'Sightseeing', color: '#E2F1FF', tc: '#1F6FB0' },
          { t: '19:00', title: 'Malioboro Sunset Walk', tag: 'Walk', color: '#E6F7E6', tc: '#2D8838' },
        ].map((a, i) => (
          <div key={i} style={cardStyles.builderRow}>
            <div style={cardStyles.builderTime}>{a.t}</div>
            <div style={cardStyles.builderDot}>
              <div style={cardStyles.builderInnerDot} />
              {i < 3 && <div style={cardStyles.builderLine} />}
            </div>
            <div style={cardStyles.builderItem}>
              <div style={cardStyles.builderItemTitle}>{a.title}</div>
              <span style={{ ...cardStyles.builderItemTag, background: a.color, color: a.tc }}>{a.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── useDirectoryState hook ── */
function useDirectoryState(defaultChips = ['Bali', 'Pantai', '< Rp25rb']) {
  const [view, setView] = useState('grid');
  const [activeChips, setActiveChips] = useState(defaultChips);
  const [openFilter, setOpenFilter] = useState(null);
  const [openSort, setOpenSort] = useState(false);
  const [sort, setSort] = useState('Paling populer');
  const [filterValues, setFilterValues] = useState({});
  return { view, setView, activeChips, setActiveChips, openFilter, setOpenFilter, openSort, setOpenSort, sort, setSort, filterValues, setFilterValues };
}

/* ── Page ── */
export default function AttractionsPage() {
  const state = useDirectoryState(['Bali', 'Pantai', '< Rp25rb']);
  return (
    <div data-screen-label="Attractions Directory">
      <TopNav active="Atraksi" />
      <AttractionHero />
      <CategoryTabs active="Atraksi" />
      <FilterBar state={state} filters={ATTR_FILTERS} filterOptions={ATTR_FILTER_OPTIONS} resultLabel="atraksi" totalResults={1247} />
      <AttractionGrid state={state} />
      <CTABand />
      <SiteFooter />
    </div>
  );
}
