'use client';

import React, { useState } from 'react';
import TopNav from '@/components/TopNav';
import Breadcrumb from '@/components/Breadcrumb';
import SiteFooter from '@/components/SiteFooter';
import { PROVINCES } from '@/data/explore-data';
import rg from '@/styles/destination-styles';

const DESTINATIONS = [
  { name: 'Lombok Tengah', type: 'Kabupaten', province: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60', attr: 42, desa: 12, itin: 28, guide: 18, rating: 4.8, tags: ['Bahari', 'Petualangan', 'Budaya'], marketProducts: 36, popular: 92 },
  { name: 'Yogyakarta', type: 'Kota', province: 'DI Yogyakarta', island: 'Jawa', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60', attr: 128, desa: 18, itin: 64, guide: 45, rating: 4.9, tags: ['Budaya', 'Sejarah', 'Kuliner'], marketProducts: 84, popular: 97 },
  { name: 'Sleman', type: 'Kabupaten', province: 'DI Yogyakarta', island: 'Jawa', img: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=800&auto=format&fit=crop&q=60', attr: 92, desa: 24, itin: 32, guide: 28, rating: 4.7, tags: ['Alam', 'Desa Wisata'], marketProducts: 48, popular: 85 },
  { name: 'Magelang', type: 'Kabupaten', province: 'Jawa Tengah', island: 'Jawa', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', attr: 56, desa: 16, itin: 38, guide: 22, rating: 4.85, tags: ['Heritage', 'Budaya', 'Alam'], marketProducts: 42, popular: 90 },
  { name: 'Bandung', type: 'Kota', province: 'Jawa Barat', island: 'Jawa', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60', attr: 184, desa: 8, itin: 72, guide: 56, rating: 4.7, tags: ['Kuliner', 'Alam', 'Belanja'], marketProducts: 124, popular: 94 },
  { name: 'Garut', type: 'Kabupaten', province: 'Jawa Barat', island: 'Jawa', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 48, desa: 14, itin: 22, guide: 18, rating: 4.6, tags: ['Alam', 'Petualangan'], marketProducts: 28, popular: 70 },
  { name: 'Probolinggo', type: 'Kabupaten', province: 'Jawa Timur', island: 'Jawa', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', attr: 38, desa: 6, itin: 26, guide: 14, rating: 4.8, tags: ['Alam', 'Petualangan'], marketProducts: 32, popular: 86 },
  { name: 'Surabaya', type: 'Kota', province: 'Jawa Timur', island: 'Jawa', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', attr: 96, desa: 4, itin: 28, guide: 32, rating: 4.5, tags: ['Sejarah', 'Kuliner'], marketProducts: 56, popular: 75 },
  { name: 'Malang', type: 'Kota', province: 'Jawa Timur', island: 'Jawa', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 112, desa: 10, itin: 46, guide: 28, rating: 4.75, tags: ['Alam', 'Kuliner', 'Heritage'], marketProducts: 64, popular: 88 },
  { name: 'Banyuwangi', type: 'Kabupaten', province: 'Jawa Timur', island: 'Jawa', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', attr: 62, desa: 18, itin: 32, guide: 16, rating: 4.85, tags: ['Bahari', 'Alam'], marketProducts: 38, popular: 82 },
  { name: 'Denpasar', type: 'Kota', province: 'Bali', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60', attr: 142, desa: 12, itin: 88, guide: 64, rating: 4.6, tags: ['Bahari', 'Kuliner', 'Belanja'], marketProducts: 168, popular: 95 },
  { name: 'Gianyar (Ubud)', type: 'Kabupaten', province: 'Bali', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&auto=format&fit=crop&q=60', attr: 156, desa: 22, itin: 96, guide: 72, rating: 4.95, tags: ['Budaya', 'Alam', 'Spa'], marketProducts: 142, popular: 98 },
  { name: 'Badung (Kuta)', type: 'Kabupaten', province: 'Bali', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60', attr: 198, desa: 6, itin: 124, guide: 88, rating: 4.55, tags: ['Bahari', 'Belanja'], marketProducts: 224, popular: 99 },
  { name: 'Karangasem', type: 'Kabupaten', province: 'Bali', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60', attr: 78, desa: 18, itin: 42, guide: 28, rating: 4.8, tags: ['Bahari', 'Budaya'], marketProducts: 52, popular: 78 },
  { name: 'Labuan Bajo', type: 'Kota', province: 'Nusa Tenggara Timur', island: 'Bali & Nusa Tenggara', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60', attr: 32, desa: 6, itin: 52, guide: 24, rating: 4.92, tags: ['Bahari', 'Petualangan'], marketProducts: 78, popular: 92 },
  { name: 'Toba Samosir', type: 'Kabupaten', province: 'Sumatera Utara', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', attr: 42, desa: 14, itin: 22, guide: 12, rating: 4.7, tags: ['Alam', 'Budaya'], marketProducts: 26, popular: 78 },
  { name: 'Padang', type: 'Kota', province: 'Sumatera Barat', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&auto=format&fit=crop&q=60', attr: 56, desa: 8, itin: 28, guide: 18, rating: 4.7, tags: ['Kuliner', 'Bahari'], marketProducts: 32, popular: 80 },
  { name: 'Bukittinggi', type: 'Kota', province: 'Sumatera Barat', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=60', attr: 38, desa: 6, itin: 18, guide: 12, rating: 4.6, tags: ['Heritage', 'Alam'], marketProducts: 18, popular: 70 },
  { name: 'Banda Aceh', type: 'Kota', province: 'Aceh', island: 'Sumatera', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=60', attr: 28, desa: 4, itin: 12, guide: 8, rating: 4.5, tags: ['Sejarah', 'Religi'], marketProducts: 14, popular: 60 },
  { name: 'Makassar', type: 'Kota', province: 'Sulawesi Selatan', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 64, desa: 4, itin: 22, guide: 18, rating: 4.55, tags: ['Kuliner', 'Bahari', 'Sejarah'], marketProducts: 28, popular: 76 },
  { name: 'Toraja Utara', type: 'Kabupaten', province: 'Sulawesi Selatan', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 32, desa: 14, itin: 28, guide: 14, rating: 4.85, tags: ['Budaya', 'Heritage'], marketProducts: 24, popular: 84 },
  { name: 'Manado', type: 'Kota', province: 'Sulawesi Utara', island: 'Sulawesi', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 42, desa: 6, itin: 18, guide: 16, rating: 4.6, tags: ['Bahari', 'Kuliner'], marketProducts: 26, popular: 78 },
  { name: 'Raja Ampat', type: 'Kabupaten', province: 'Papua Barat', island: 'Papua', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', attr: 18, desa: 8, itin: 22, guide: 12, rating: 4.95, tags: ['Bahari', 'Petualangan'], marketProducts: 42, popular: 95 },
  { name: 'Jayapura', type: 'Kota', province: 'Papua', island: 'Papua', img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&auto=format&fit=crop&q=60', attr: 22, desa: 4, itin: 8, guide: 6, rating: 4.5, tags: ['Budaya', 'Alam'], marketProducts: 12, popular: 62 },
  { name: 'Balikpapan', type: 'Kota', province: 'Kalimantan Timur', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60', attr: 32, desa: 6, itin: 12, guide: 10, rating: 4.4, tags: ['Bahari', 'Kuliner'], marketProducts: 14, popular: 58 },
  { name: 'Banjarmasin', type: 'Kota', province: 'Kalimantan Selatan', island: 'Kalimantan', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&auto=format&fit=crop&q=60', attr: 28, desa: 8, itin: 14, guide: 8, rating: 4.5, tags: ['Sungai', 'Kuliner'], marketProducts: 16, popular: 65 },
  { name: 'Ambon', type: 'Kota', province: 'Maluku', island: 'Maluku', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60', attr: 24, desa: 6, itin: 10, guide: 8, rating: 4.7, tags: ['Bahari', 'Sejarah'], marketProducts: 12, popular: 70 },
  { name: 'Ternate', type: 'Kota', province: 'Maluku Utara', island: 'Maluku', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=800&auto=format&fit=crop&q=60', attr: 18, desa: 4, itin: 8, guide: 6, rating: 4.6, tags: ['Heritage', 'Bahari'], marketProducts: 8, popular: 60 },
];

const SORT_OPTIONS = [
  { id: 'alpha', label: 'A\u2013Z' },
  { id: 'alpha-rev', label: 'Z\u2013A' },
  { id: 'popular', label: 'Terpopuler' },
  { id: 'content', label: 'Terbanyak konten' },
];

const ISLAND_LIST = ['Jawa', 'Sumatera', 'Kalimantan', 'Sulawesi', 'Bali & Nusa Tenggara', 'Maluku', 'Papua'];

function ChevDownSm({ rotated }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ transition: 'transform .2s', transform: rotated ? 'rotate(180deg)' : 'none' }}>
      <path d="M6 9l6 6 6-6" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function DestinationCard({ d }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/"
      style={{ ...rg.destCard, ...(hover ? rg.destCardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={rg.destImgWrap}>
        <img src={d.img} alt="" style={rg.destImg} />
        <span style={rg.destTypeBadge}>{d.type}</span>
        {d.marketProducts > 0 && (
          <span style={rg.destMarketBadge}>{'\uD83D\uDED2'} {d.marketProducts} produk</span>
        )}
        {hover && (
          <div style={rg.destHoverOverlay}>
            <span style={rg.destHoverCTA}>Jelajahi {d.name} {'\u2192'}</span>
          </div>
        )}
      </div>
      <div style={rg.destBody}>
        <div style={rg.destHeaderRow}>
          <div style={{ flex: 1 }}>
            <h3 style={rg.destName}>{d.name}</h3>
            <div style={rg.destProvRow}>
              <span style={rg.destProv}>{d.province}</span>
              <span style={rg.destIslandPill}>{d.island}</span>
            </div>
          </div>
          <div style={rg.destRating}>
            <span style={rg.destStar}>{'\u2605'}</span>
            <strong>{d.rating}</strong>
          </div>
        </div>

        <div style={rg.destStatsBar}>
          <div style={rg.destStat}><strong>{d.attr}</strong> <span>Atraksi</span></div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}><strong>{d.desa}</strong> <span>Desa</span></div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}><strong>{d.itin}</strong> <span>Itinerary</span></div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}><strong>{d.guide}</strong> <span>Pemandu</span></div>
        </div>

        <div style={rg.destTagRow}>
          {d.tags.slice(0, 3).map(t => <span key={t} style={rg.destTag}>{t}</span>)}
        </div>
      </div>
    </a>
  );
}

export default function DestinationsPage() {
  const [search, setSearch] = useState('');
  const [selectedIslands, setSelectedIslands] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [avail, setAvail] = useState({ attr: false, desa: false, guide: false });
  const [sort, setSort] = useState('alpha');
  const [provDropdownOpen, setProvDropdownOpen] = useState(false);
  const [provSearch, setProvSearch] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = DESTINATIONS
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter(d => selectedIslands.length === 0 || selectedIslands.includes(d.island))
    .filter(d => selectedProvinces.length === 0 || selectedProvinces.includes(d.province))
    .filter(d => selectedCategories.length === 0 || selectedCategories.some(c => d.tags.includes(c)))
    .filter(d => !avail.attr || d.attr > 0)
    .filter(d => !avail.desa || d.desa > 0)
    .filter(d => !avail.guide || d.guide > 0)
    .sort((a, b) => {
      if (sort === 'alpha') return a.name.localeCompare(b.name);
      if (sort === 'alpha-rev') return b.name.localeCompare(a.name);
      if (sort === 'popular') return b.popular - a.popular;
      return (b.attr + b.desa + b.itin + b.guide) - (a.attr + a.desa + a.itin + a.guide);
    });

  const visible = filtered.slice(0, visibleCount);
  const activeFilters = [
    ...selectedIslands.map(i => ({ k: 'island', v: i, remove: () => setSelectedIslands(selectedIslands.filter(x => x !== i)) })),
    ...selectedProvinces.map(p => ({ k: 'province', v: p, remove: () => setSelectedProvinces(selectedProvinces.filter(x => x !== p)) })),
    ...selectedCategories.map(c => ({ k: 'category', v: c, remove: () => setSelectedCategories(selectedCategories.filter(x => x !== c)) })),
    ...(avail.attr ? [{ k: 'avail', v: 'Tersedia Atraksi', remove: () => setAvail({ ...avail, attr: false }) }] : []),
    ...(avail.desa ? [{ k: 'avail', v: 'Tersedia Desa Wisata', remove: () => setAvail({ ...avail, desa: false }) }] : []),
    ...(avail.guide ? [{ k: 'avail', v: 'Tersedia Pemandu', remove: () => setAvail({ ...avail, guide: false }) }] : []),
  ];

  function resetAll() {
    setSearch(''); setSelectedIslands([]); setSelectedProvinces([]); setSelectedCategories([]);
    setAvail({ attr: false, desa: false, guide: false }); setSort('alpha'); setVisibleCount(12);
  }

  const provinceFilteredList = PROVINCES.filter(p =>
    p.name.toLowerCase().includes(provSearch.toLowerCase())
  );

  const headingTitle = selectedProvinces.length === 1
    ? `Destinasi di ${selectedProvinces[0]}`
    : selectedIslands.length === 1
      ? `Destinasi di ${selectedIslands[0]}`
      : 'Semua Destinasi Wisata';

  return (
    <div data-screen-label="Region Hub">
      <TopNav active="Destinasi" />

      {/* Header */}
      <section style={rg.header}>
        <div style={rg.headerInner}>
          <Breadcrumb items={['Beranda', 'Jelajahi', selectedProvinces[0] || selectedIslands[0] || 'Semua Destinasi']} />
          <h1 style={rg.h1}>{headingTitle}</h1>
          <p style={rg.subtitle}>{filtered.length} kota/kabupaten tersedia di Atourin</p>
          {selectedProvinces.length === 1 && (
            <div style={rg.provMiniHero}>
              <span style={rg.provHeroIcon}>{'\uD83D\uDCCD'}</span>
              <span>
                <strong>{selectedProvinces[0]}</strong>, Provinsi dengan {filtered.reduce((a, b) => a + b.attr, 0)} atraksi
                dan {filtered.reduce((a, b) => a + b.desa, 0)} desa wisata terdaftar di Atourin.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Sticky filter bar */}
      <div style={rg.filterStick}>
        <div style={rg.filterInner}>
          <div style={rg.filterSearchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2" /><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round" /></svg>
            <input style={rg.filterSearch} placeholder="Cari kota atau kabupaten..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          {/* Province multiselect */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProvDropdownOpen(!provDropdownOpen)} style={rg.filterBtn}>
              <span>Provinsi {selectedProvinces.length > 0 && <span style={rg.filterCount}>{selectedProvinces.length}</span>}</span>
              <ChevDownSm rotated={provDropdownOpen} />
            </button>
            {provDropdownOpen && (
              <div style={rg.provDropdown}>
                <input style={rg.provDropdownSearch} placeholder="Cari provinsi..." value={provSearch} onChange={(e) => setProvSearch(e.target.value)} />
                <div style={rg.provDropdownList}>
                  {provinceFilteredList.map(p => {
                    const checked = selectedProvinces.includes(p.name);
                    return (
                      <button key={p.name} onClick={() => {
                        if (checked) setSelectedProvinces(selectedProvinces.filter(x => x !== p.name));
                        else setSelectedProvinces([...selectedProvinces, p.name]);
                      }} style={rg.provDropdownItem}>
                        <span style={{ ...rg.checkbox, ...(checked ? rg.checkboxOn : {}) }}>
                          {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>}
                        </span>
                        <span>{p.name}</span>
                        <span style={rg.provDropdownIsland}>{p.island}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Island chips */}
          <div style={rg.islandStrip}>
            {ISLAND_LIST.map(i => {
              const active = selectedIslands.includes(i);
              return (
                <button key={i} onClick={() => {
                  if (active) setSelectedIslands(selectedIslands.filter(x => x !== i));
                  else setSelectedIslands([...selectedIslands, i]);
                }} style={{ ...rg.islandStripChip, ...(active ? rg.islandStripChipOn : {}) }}>{i}</button>
              );
            })}
          </div>

          {/* Avail checkboxes */}
          <div style={rg.availRow}>
            {[
              { k: 'attr', l: 'Atraksi' },
              { k: 'desa', l: 'Desa Wisata' },
              { k: 'guide', l: 'Pemandu' },
            ].map(a => (
              <label key={a.k} style={rg.availLabel}>
                <input type="checkbox" checked={avail[a.k]} onChange={(e) => setAvail({ ...avail, [a.k]: e.target.checked })} style={rg.availInput} />
                <span style={{ ...rg.availCheck, ...(avail[a.k] ? rg.availCheckOn : {}) }}>
                  {avail[a.k] && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>}
                </span>
                {a.l}
              </label>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={rg.sortSelect}>
            {SORT_OPTIONS.map(s => <option key={s.id} value={s.id}>Urutkan: {s.label}</option>)}
          </select>

          {activeFilters.length > 0 && (
            <button onClick={resetAll} style={rg.resetBtn}>Reset filter</button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div style={rg.activeChipsRow}>
            <span style={rg.activeLabel}>Filter aktif:</span>
            {activeFilters.map((f, i) => (
              <span key={i} style={rg.activeChip}>
                {f.v}
                <button onClick={f.remove} style={rg.activeChipX}>{'\u00D7'}</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Result count + grid */}
      <section style={rg.gridSection}>
        <div style={rg.resultRow}>
          <span style={rg.resultText}>
            Menampilkan <strong>{visible.length}</strong> dari <strong>{filtered.length}</strong> destinasi
          </span>
        </div>

        {visible.length === 0 ? (
          <div style={rg.empty}>
            <div style={rg.emptyIcon}>{'\uD83D\uDD0D'}</div>
            <div style={rg.emptyTitle}>Tidak ada destinasi yang sesuai filter kamu</div>
            <div style={rg.emptySub}>Coba hapus beberapa filter atau cari dengan kata kunci lain</div>
            <button onClick={resetAll} style={rg.emptyBtn}>Lihat semua destinasi</button>
          </div>
        ) : (
          <>
            <div style={rg.destGrid}>
              {visible.map((d, i) => <DestinationCard key={i} d={d} />)}
            </div>
            {filtered.length > visibleCount && (
              <div style={rg.loadMoreWrap}>
                <button onClick={() => setVisibleCount(visibleCount + 12)} style={rg.loadMoreBtn}>Muat lebih banyak ({filtered.length - visibleCount} tersisa)</button>
              </div>
            )}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
