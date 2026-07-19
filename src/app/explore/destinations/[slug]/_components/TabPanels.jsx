"use client";

import React, { useState } from "react";
import dh from "@/styles/destination-detail";
import {
  AttractionCardGrid,
  AttractionCardList,
} from "@/components/cards";
import { FChip, FGroup, FilterBar, toggleArr } from "@/components/cards/FilterChips";

import DesaCard from "./organisms/DesaCard";
import ItineraryCard from "./organisms/ItineraryCard";
import GuideCard from "./organisms/GuideCard";
import InfoSection from "./organisms/InfoSection";

/* ==========================================================
   ATRAKSI TAB
   ========================================================== */
export function AtraksiTab({ dest }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sort, setSort] = useState("popular");
  const [view, setView] = useState("grid");

  const data = dest.relatedAttractions || [];

  const allCats = [...new Set(data.map((a) => a.cat))];

  const filtered = data
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        (a.desc || "").toLowerCase().includes(search.toLowerCase()),
    )
    .filter((a) => catFilter.length === 0 || catFilter.includes(a.cat))
    .filter(
      (a) =>
        !priceFilter ||
        (priceFilter === "free"
          ? a.price === 0
          : priceFilter === "<25"
            ? a.price > 0 && a.price < 25000
            : priceFilter === "25-100"
              ? a.price >= 25000 && a.price <= 100000
              : a.price > 100000),
    )
    .filter((a) => !ratingFilter || a.rating >= parseFloat(ratingFilter))
    .sort((a, b) =>
      sort === "rating"
        ? b.rating - a.rating
        : sort === "price"
          ? a.price - b.price
          : b.reviews - a.reviews,
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round"/></svg>
            <input style={dh.filterSearchInput} placeholder={`Cari atraksi di ${dest.name}...`} value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={dh.filterSort}>
            <option value="popular">Urutkan: Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
            <option value="price">Harga terendah</option>
          </select>
          <div style={dh.viewToggle}>
            <button onClick={() => setView("grid")} style={{...dh.viewBtn, ...(view === "grid" ? dh.viewBtnOn : {})}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/><rect x="13" y="13" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.8"/></svg>
            </button>
            <button onClick={() => setView("list")} style={{...dh.viewBtn, ...(view === "list" ? dh.viewBtnOn : {})}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>
        <FGroup label="Kategori">
          {allCats.map((c) => (
            <FChip key={c} active={catFilter.includes(c)} onClick={() => toggleArr(catFilter, setCatFilter, c)}>{c}</FChip>
          ))}
        </FGroup>
        <FGroup label="Harga tiket">
          {[{k:"free",l:"Gratis"},{k:"<25",l:"< Rp25.000"},{k:"25-100",l:"Rp25-100rb"},{k:">100",l:"> Rp100.000"}].map((p) => (
            <FChip key={p.k} active={priceFilter === p.k} onClick={() => setPriceFilter(priceFilter === p.k ? "" : p.k)}>{p.l}</FChip>
          ))}
        </FGroup>
        <FGroup label="Rating">
          {[{k:"4",l:"★ 4.0+"},{k:"3",l:"★ 3.0+"}].map((r) => (
            <FChip key={r.k} active={ratingFilter === r.k} onClick={() => setRatingFilter(ratingFilter === r.k ? "" : r.k)}>{r.l}</FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}><strong>{filtered.length}</strong> atraksi ditemukan</span>
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:60,color:"var(--atr-text-muted)"}}>
          <div style={{fontSize:48,marginBottom:12}}>🔍</div>
          <p style={{fontSize:15}}>Belum ada data atraksi untuk {dest.name}.</p>
        </div>
      )}

      {view === "grid" ? (
        <div style={dh.atrGrid}>
          {filtered.map((a, i) => <AttractionCardGrid key={i} a={a} />)}
        </div>
      ) : (
        <div style={dh.atrList}>
          {filtered.map((a, i) => <AttractionCardList key={i} a={a} />)}
        </div>
      )}
    </div>
  );
}

/* ==========================================================
   DESA WISATA TAB
   ========================================================== */
const DESA_STATUS_COLOR = {
  Rintisan: "#5C5C5C",
  Berkembang: "#B47A00",
  Maju: "#1F6FB0",
  Mandiri: "#2D8838",
};

export function DesaTab({ dest }) {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [sort, setSort] = useState("popular");

  const data = dest.relatedVillages || [];

  const allThemes = [...new Set(data.map((d) => d.theme))];

  const filtered = data
    .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => catFilter.length === 0 || catFilter.some((c) => d.theme.includes(c)))
    .filter((d) => statusFilter.length === 0 || statusFilter.includes(d.adwi))
    .sort((a, b) =>
      sort === "rating" ? b.rating - a.rating :
      sort === "alpha" ? a.name.localeCompare(b.name) :
      b.rating - a.rating
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round"/></svg>
            <input style={dh.filterSearchInput} placeholder="Cari desa wisata..." value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={dh.filterSort}>
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
            <option value="alpha">Nama A-Z</option>
          </select>
        </div>
        <FGroup label="Tema">
          {allThemes.map((c) => (
            <FChip key={c} active={catFilter.includes(c)} onClick={() => toggleArr(catFilter, setCatFilter, c)}>{c}</FChip>
          ))}
        </FGroup>
        <FGroup label="Status desa">
          {["Rintisan","Berkembang","Maju","Mandiri"].map((s) => (
            <FChip key={s} active={statusFilter.includes(s)} onClick={() => toggleArr(statusFilter, setStatusFilter, s)}>
              <span style={{...dh.statusDot, background: DESA_STATUS_COLOR[s]}}/> {s}
            </FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}><strong>{filtered.length}</strong> desa wisata ditemukan</span>
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:60,color:"var(--atr-text-muted)"}}>
          <div style={{fontSize:48,marginBottom:12}}>🌾</div>
          <p style={{fontSize:15}}>Belum ada data desa wisata untuk {dest.name}.</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((d, i) => <DesaCard key={i} d={d} />)}
      </div>
    </div>
  );
}

/* ==========================================================
   ITINERARY TAB
   ========================================================== */
export function ItineraryTab({ dest }) {
  const [search, setSearch] = useState("");
  const [themeFilter, setThemeFilter] = useState([]);
  const [sort, setSort] = useState("popular");

  const data = dest.relatedItineraries || [];

  const allThemes = [...new Set(data.map((i) => i.tag))];

  const filtered = data
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
    .filter((i) => themeFilter.length === 0 || themeFilter.includes(i.tag))
    .sort((a, b) => b.rating - a.rating);

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round"/></svg>
            <input style={dh.filterSearchInput} placeholder="Cari itinerary..." value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={dh.filterSort}>
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating tertinggi</option>
          </select>
        </div>
        <FGroup label="Tema">
          {allThemes.map((t) => (
            <FChip key={t} active={themeFilter.includes(t)} onClick={() => toggleArr(themeFilter, setThemeFilter, t)}>{t}</FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}><strong>{filtered.length}</strong> itinerary ditemukan</span>
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:60,color:"var(--atr-text-muted)"}}>
          <div style={{fontSize:48,marginBottom:12}}>🗺️</div>
          <p style={{fontSize:15}}>Belum ada data itinerary untuk {dest.name}.</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {filtered.map((it, i) => <ItineraryCard key={i} it={it} />)}
      </div>
    </div>
  );
}

/* ==========================================================
   PEMANDU TAB
   ========================================================== */
export function PemanduTab({ dest }) {
  const [search, setSearch] = useState("");
  const [specFilter, setSpecFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState("");
  const [sort, setSort] = useState("rating");

  const data = dest.relatedTourGuides || [];

  const allSpecs = [...new Set(data.flatMap((g) => g.spec))];

  const filtered = data
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => specFilter.length === 0 || specFilter.some((s) => p.spec.includes(s)))
    .filter((p) => !ratingFilter || p.rating >= parseFloat(ratingFilter))
    .sort((a, b) =>
      sort === "exp" ? b.trips - a.trips :
      sort === "price" ? a.price - b.price :
      b.rating - a.rating
    );

  return (
    <div style={dh.tabContent}>
      <FilterBar>
        <div style={dh.filterTopRow}>
          <div style={dh.filterSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="var(--atr-text-muted)" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="var(--atr-text-muted)" strokeWidth="2" strokeLinecap="round"/></svg>
            <input style={dh.filterSearchInput} placeholder="Cari pemandu..." value={search} onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={dh.filterSort}>
            <option value="rating">Rating tertinggi</option>
            <option value="exp">Pengalaman terlama</option>
            <option value="price">Harga terendah</option>
          </select>
        </div>
        <FGroup label="Spesialisasi">
          {allSpecs.map((s) => (
            <FChip key={s} active={specFilter.includes(s)} onClick={() => toggleArr(specFilter, setSpecFilter, s)}>{s}</FChip>
          ))}
        </FGroup>
        <FGroup label="Rating">
          {[{k:"4.5",l:"★ 4.5+"},{k:"4",l:"★ 4.0+"}].map((r) => (
            <FChip key={r.k} active={ratingFilter === r.k} onClick={() => setRatingFilter(ratingFilter === r.k ? "" : r.k)}>{r.l}</FChip>
          ))}
        </FGroup>
      </FilterBar>

      <div style={dh.resultMeta}>
        <span style={dh.resultText}><strong>{filtered.length}</strong> pemandu ditemukan</span>
      </div>

      {filtered.length === 0 && (
        <div style={{textAlign:"center",padding:60,color:"var(--atr-text-muted)"}}>
          <div style={{fontSize:48,marginBottom:12}}>👤</div>
          <p style={{fontSize:15}}>Belum ada data pemandu untuk {dest.name}.</p>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {filtered.map((p, i) => <GuideCard key={i} p={p} />)}
      </div>
    </div>
  );
}

/* ==========================================================
   CERITA TAB
   ========================================================== */
const CERITA_WEB = [
  {
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&auto=format&fit=crop&q=70",
    title: "Petualangan tak terlupakan",
    author: "Dimas Prasetyo",
    days: 3,
    date: "Mei 2026",
    likes: 48,
    excerpt: "Tiga hari keliling, highlight-nya jelas pemandangan yang luar biasa!",
  },
  {
    img: "https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?w=600&auto=format&fit=crop&q=70",
    title: "Sunrise yang tak terlupakan",
    author: "Nadia Ananta",
    days: 4,
    date: "Apr 2026",
    likes: 31,
    excerpt: "Trek pagi ke puncak worth it banget. Pemandangan luar biasa!",
  },
  {
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop&q=70",
    title: "Pengalaman pertama yang amazing",
    author: "Rizky Hidayat",
    days: 2,
    date: "Mar 2026",
    likes: 27,
    excerpt: "Pengalaman pertama yang bikin pengen balik lagi.",
  },
];

export function CeritaTab() {
  return (
    <div style={{padding:"4px 0 8px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap",marginBottom:16}}>
        <div>
          <h2 style={{fontSize:22,letterSpacing:"-0.02em",margin:"0 0 4px"}}>Cerita Wisatawan</h2>
          <p style={{fontSize:14,color:"var(--atr-text-muted)",margin:0}}>Journal publik dari wisatawan yang pernah menjelajahi destinasi ini.</p>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}} className="cerita-grid">
        {CERITA_WEB.map((c, i) => (
          <div key={i} style={{border:"1px solid var(--atr-outline)",borderRadius:16,overflow:"hidden",background:"#fff",cursor:"pointer"}}>
            <div style={{height:160,background:`url(${c.img}) center/cover`}}/>
            <div style={{padding:16}}>
              <div style={{fontSize:16,fontWeight:700}}>{c.title}</div>
              <div style={{fontSize:13,color:"var(--atr-text-muted)",marginTop:6,lineHeight:1.5}}>{c.excerpt}</div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginTop:12,fontSize:12.5,color:"var(--atr-text-muted)"}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                  <span style={{width:24,height:24,borderRadius:999,background:"var(--atr-purple-50)",color:"var(--atr-purple)",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800}}>{c.author[0]}</span>
                  {c.author}
                </span>
                <span>· {c.days} hari · {c.date}</span>
                <span style={{marginLeft:"auto",color:"var(--atr-red)"}}>❤ {c.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:10,alignItems:"flex-start",background:"rgba(81,176,84,0.08)",border:"1px solid rgba(81,176,84,0.3)",borderRadius:12,padding:"13px 16px",fontSize:13,color:"#2A6B3B",lineHeight:1.5,marginTop:18}}>
        <span>🏆</span>
        <span>Bagikan ceritamu! Journal publik pertama dapat <b>50 ATR Points</b>, dan bonus 25 poin saat dilihat 10+ orang.</span>
      </div>
      <style>{`@media(max-width:760px){.cerita-grid{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}

/* ==========================================================
   INFO TAB
   ========================================================== */
export function InfoTab({ dest }) {
  const [faqOpen, setFaqOpen] = useState(null);

  const facts = [
    { label: "Luas wilayah", value: dest.area || "-" },
    { label: "Populasi", value: dest.population || "-" },
    { label: "Waktu terbaik", value: dest.bestTime || "Apr – Nov" },
    { label: "Bahasa daerah", value: dest.language || "-" },
  ];

  const faqs = [
    { q: `Apa waktu terbaik berkunjung ke ${dest.name}?`, a: `Waktu terbaik adalah April hingga November saat musim kemarau. Cuaca cerah dan laut tenang, cocok untuk aktivitas outdoor.` },
    { q: `Bagaimana cara menuju ${dest.name}?`, a: `Anda bisa menggunakan pesawat terbang menuju bandara terdekat, atau menggunakan kapal feri dari kota-kota besar.` },
    { q: `Apa saja yang perlu dibawa?`, a: `Bawalah pakaian ringan, sunscreen, topi, obat anti mabuk (jika naik kapal), dan kamera untuk mengabadikan momen.` },
  ];

  return (
    <div style={dh.tabContent}>
      <div style={dh.infoGrid}>
        <InfoSection icon="🌅" title={`Tentang ${dest.name}`}>
          <p style={dh.infoBody}>
            {dest.name} adalah {dest.type?.toLowerCase() || "destinasi"} di Provinsi {dest.province}, Indonesia. Destinasi ini menawarkan berbagai atraksi wisata menarik dengan rating ★ {dest.rating} dari pengunjung.
          </p>
          <p style={dh.infoBody}>
            Dengan {dest.attr} atraksi, {dest.desa} desa wisata, {dest.itin} itinerary, dan {dest.guide} pemandu wisata profesional, {dest.name} menjadi salah satu destinasi favorit di Indonesia.
          </p>
          <div style={dh.factsGrid}>
            {facts.map((f, i) => (
              <div key={i} style={dh.factCell}>
                <div style={dh.factLabel}>{f.label}</div>
                <div style={dh.factVal}>{f.value}</div>
              </div>
            ))}
          </div>
        </InfoSection>

        <InfoSection icon="💡" title="Tips wisatawan">
          <div style={dh.dosDontsGrid}>
            <div style={dh.dosCol}>
              <div style={dh.dosTitle}>✅ Yang sebaiknya dilakukan</div>
              <ul style={dh.dosList}>
                <li>Booking akomodasi 1-2 minggu sebelumnya</li>
                <li>Gunakan sunscreen untuk perlindungan kulit</li>
                <li>Bawa perlengkapan pribadi yang diperlukan</li>
                <li>Hormati adat dan budaya setempat</li>
              </ul>
            </div>
            <div style={dh.dontsCol}>
              <div style={dh.dontsTitle}>❌ Hindari ini</div>
              <ul style={dh.dontsList}>
                <li>Jangan merusak fasilitas wisata</li>
                <li>Jangan membuang sampah sembarangan</li>
                <li>Hindari bepergian saat cuaca ekstrem</li>
                <li>Jangan mengambil benda-benda alam sebagai souvenir</li>
              </ul>
            </div>
          </div>
        </InfoSection>

        <InfoSection icon="❓" title="FAQ">
          {faqs.map((item, i) => (
            <div key={i} style={dh.faqItem}>
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={dh.faqQ}>
                <span>{item.q}</span>
                <span style={{transform:faqOpen === i ? "rotate(180deg)" : "none",transition:"transform .2s",display:"inline-flex"}}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </span>
              </button>
              {faqOpen === i && <div style={dh.faqA}>{item.a}</div>}
            </div>
          ))}
        </InfoSection>

        <InfoSection icon="📞" title="Kontak berguna">
          <div style={dh.contactTable}>
            {[
              { name: "Info Wisata", phone: "(021) 1234 5678", map: "Pusat Informasi Wisata" },
              { name: "Polisi", phone: "110", map: "Kantor Polisi Terdekat" },
              { name: "Ambulans", phone: "118 / 119", map: "RS Terdekat" },
            ].map((c, i) => (
              <div key={i} style={dh.contactRow}>
                <div style={dh.contactName}>{c.name}</div>
                <div style={dh.contactPhone}>📞 {c.phone}</div>
                <div style={dh.contactMap}>📍 {c.map}</div>
              </div>
            ))}
          </div>
        </InfoSection>
      </div>
    </div>
  );
}
