"use client";

import React, { useState } from "react";
import { hsx } from "@/styles/homestay-detail-styles";
import { ds } from "@/styles/detail-styles";

/* ── UI primitives ── */
export function SectionCard({ id, title, eyebrow, icon, children }) {
  return (
    <section id={id} style={ds.section}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            {icon && <span style={{ marginRight: 6 }}>{icon}</span>}
            {title}
          </h2>
          {eyebrow && <div style={ds.sectionSub}>{eyebrow}</div>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function ReadMore({ text, clamp = 4 }) {
  const [open, setOpen] = useState(false);
  const clamped = { ...ds.longTextClamped, WebkitLineClamp: clamp };
  return (
    <div>
      <p style={{ ...(open ? ds.longText : clamped), whiteSpace: "pre-line" }}>{text}</p>
      <button style={ds.readMoreBtn} onClick={() => setOpen(!open)}>
        {open ? "Sembunyikan ↑" : "Baca selengkapnya ↓"}
      </button>
    </div>
  );
}

export function FacilityItem({ icon, label, available = true }) {
  return (
    <div style={{ ...ds.facItem, ...(available ? {} : ds.facItemOff) }}>
      <span style={ds.facIcon}>{icon}</span>
      <span style={{ ...ds.facLabel, ...(available ? {} : ds.facStrike) }}>{label}</span>
    </div>
  );
}

/* ── ARTI carbon offset banner ── */
export function HomestayArti({ nights = 1 }) {
  const trees = Math.max(nights, 1);
  const co2 = (trees * 1.2).toFixed(1);
  return (
    <section id="arti" style={hsx.artiCard}>
      <div style={hsx.artiLeft}>
        <div style={hsx.artiIllu}>🌱</div>
        <div>
          <div style={hsx.artiKicker}>🌿 Adopsi Penanaman Pohon · ARTI by Atourin</div>
          <div style={hsx.artiHead}>Setiap malam menginapmu menanam 1 pohon</div>
          <p style={hsx.artiSubhead}>
            Dukung gerakan pariwisata ramah lingkungan bersama mitra Atourin di seluruh Indonesia.
            Pohon ditanam di kawasan reboisasi sekitar Borobudur, ikut menjaga ekosistem desa wisata yang kamu kunjungi.
          </p>
          <div style={hsx.artiCtaRow}>
            <span style={hsx.artiIncludeChip}>✓ SUDAH TERMASUK DI TIKETMU</span>
            <button style={hsx.artiLearnBtn} onClick={() => alert("Membuka info ARTI")}>
              Pelajari lebih lanjut →
            </button>
          </div>
        </div>
      </div>
      <div style={hsx.artiPills}>
        <div style={hsx.artiPill}>
          <span style={hsx.artiPillIcon}>💨</span>
          <div>
            <div style={hsx.artiPillLabel}>Emisi Karbon</div>
            <div style={hsx.artiPillVal}>{co2} KgCO₂e</div>
          </div>
        </div>
        <div style={hsx.artiPill}>
          <span style={hsx.artiPillIcon}>🌲</span>
          <div>
            <div style={hsx.artiPillLabel}>Pohon Ditanam</div>
            <div style={hsx.artiPillVal}>{trees} pohon</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── HOST ── */
export function HomestayHost({ host }) {
  return (
    <SectionCard title="Tuan Rumah" icon="🤝" eyebrow={host.since}>
      <div style={hsx.hostCard}>
        <div style={hsx.hostTopRow}>
          <div style={hsx.hostAvWrap}>
            <img src={host.avatar} alt="" style={hsx.hostAv} />
            {host.verified && (
              <span style={hsx.hostVerif}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={hsx.hostKicker}>{host.role}</div>
            <div style={hsx.hostName}>{host.name}</div>
            <div style={hsx.hostRole}>🗣 {host.languages.join(" · ")}</div>
          </div>
        </div>
        <p style={hsx.hostBlurb}>“{host.blurb}”</p>
        <div style={hsx.hostStats}>
          <div style={hsx.hostStat}>
            <span style={hsx.hostStatIcon}>⚡</span>
            <div>
              <div style={hsx.hostStatVal}>{host.responseRate}</div>
              <div style={hsx.hostStatLabel}>Respons</div>
            </div>
          </div>
          <div style={hsx.hostStat}>
            <span style={hsx.hostStatIcon}>💬</span>
            <div>
              <div style={hsx.hostStatVal}>{host.responseTime}</div>
              <div style={hsx.hostStatLabel}>Waktu balas</div>
            </div>
          </div>
          <div style={hsx.hostStat}>
            <span style={hsx.hostStatIcon}>✓</span>
            <div>
              <div style={hsx.hostStatVal}>Terverifikasi</div>
              <div style={hsx.hostStatLabel}>Sejak {host.since.replace("Sejak ", "")}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ── AMENITIES ── */
export function HomestayAmenities({ data }) {
  const on = data.amenities.filter((a) => a.on).length;
  const off = data.amenities.length - on;
  return (
    <SectionCard id="fasilitas" title="Fasilitas Homestay" icon="✨" eyebrow={`${on} tersedia · ${off} belum tersedia`}>
      <div style={ds.facGrid}>
        {data.amenities.map((a) => (
          <FacilityItem key={a.label} icon={a.icon} label={a.label} available={a.on} />
        ))}
      </div>
    </SectionCard>
  );
}

/* ── RULES ── */
export function HomestayRules({ data }) {
  return (
    <SectionCard id="aturan" title="Aturan Rumah" icon="📋" eyebrow="Hormati aturan tuan rumah selama menginap">
      <div style={hsx.rulesGrid}>
        {data.rules.map((r, i) => (
          <div key={i} style={hsx.ruleItem}>
            <span style={hsx.ruleIcon}>{r.icon}</span>
            <div>
              <div style={hsx.ruleTitle}>{r.title}</div>
              <div style={hsx.ruleBody}>{r.body}</div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ── TIPS ── */
export function HomestayTips({ data }) {
  return (
    <SectionCard title="Tips Menginap" icon="💡">
      <div style={ds.tipsGrid}>
        <div style={{ ...ds.tipBox, ...ds.tipBest }}>
          <span style={ds.tipIcon}>🌅</span>
          <div style={ds.tipTitle}>Waktu terbaik</div>
          <p style={ds.tipBody} dangerouslySetInnerHTML={{ __html: data.tips.best.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipBring }}>
          <span style={ds.tipIcon}>🎒</span>
          <div style={ds.tipTitle}>Bawa</div>
          <ul style={ds.tipList}>
            {data.tips.bring.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipWarn }}>
          <span style={ds.tipIcon}>⚠️</span>
          <div style={ds.tipTitle}>Perhatian</div>
          <ul style={ds.tipList}>
            {data.tips.notes.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

/* ── LOCATION ── */
export function HomestayLocation({ data }) {
  const landmarks = [
    { icon: "🛕", title: "Candi Borobudur", sub: "UNESCO Site · 5 min mobil", dist: "3,5 km" },
    { icon: "🌄", title: "Punthuk Setumbu", sub: "Spot sunrise Borobudur", dist: "8 km" },
    { icon: "🛕", title: "Candi Mendut & Pawon", sub: "Candi pendamping", dist: "3 km" },
    { icon: "✈️", title: "Bandara YIA", sub: "Yogyakarta Int'l Airport", dist: "55 km" },
    { icon: "🚉", title: "Stasiun Tugu Yogya", sub: "Akses kereta utama", dist: "42 km" },
  ];
  return (
    <SectionCard id="lokasi" title="Lokasi & Sekitar" icon="📍" eyebrow={data.address}>
      <div style={hsx.locWrap}>
        <div style={hsx.locMap}>
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
            alt="Peta Homestay"
            style={hsx.locImg}
          />
          <div style={hsx.locChip}>
            <div style={hsx.locChipTitle}>{data.name}</div>
            <div style={hsx.locChipSub}>{data.location}</div>
          </div>
          <span style={hsx.locPin}>📍</span>
          <button style={hsx.locDir} onClick={() => window.open(`https://maps.google.com/?q=${data.coords.lat},${data.coords.lng}`, "_blank")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
              <path d="M22 12L12 2 2 12l10 10 10-10z" stroke="#fff" strokeWidth="1.6" />
              <path d="M8 12h6v-3l4 4-4 4v-3H8" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>{" "}
            Buka di Google Maps
          </button>
        </div>
        <div style={hsx.landmarksCol}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--atr-text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Jarak ke tempat populer
          </div>
          {landmarks.map((l, i) => (
            <div key={i} style={hsx.landmarkRow}>
              <span style={hsx.landmarkIcon}>{l.icon}</span>
              <div>
                <div style={hsx.landmarkTitle}>{l.title}</div>
                <div style={hsx.landmarkSub}>{l.sub}</div>
              </div>
              <div style={hsx.landmarkDist}>{l.dist}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

/* ── REVIEWS ── */
export function HomestayReviews({ data }) {
  const isEmpty = data.reviews.length === 0;
  return (
    <section id="ulasan" style={ds.section}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            <span>⭐</span> Ulasan Pengalaman
          </h2>
          <div style={ds.sectionSub}>
            {isEmpty ? "Belum ada ulasan untuk homestay ini" : `${data.reviewCount} ulasan dari tamu`}
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div style={hsx.emptyReviews}>
          <div style={hsx.emptyIllu}>💬</div>
          <div style={hsx.emptyTitle}>Jadi yang pertama mengulas!</div>
          <p style={hsx.emptyBody}>
            Homestay ini belum mendapatkan ulasan. Kalau kamu sudah pernah menginap, bagikan pengalamanmu untuk membantu tamu lain memilih.
          </p>
          <button style={hsx.emptyCta} onClick={() => alert("Tulis ulasan")}>Tulis ulasan pertama</button>
        </div>
      ) : (
        <div style={ds.reviewTop}>
          <div style={ds.ratingSummary}>
            <div style={ds.ratingBig}>{data.rating.toFixed(1)}</div>
            <div style={ds.ratingStars}>★★★★★</div>
            <div style={ds.ratingCount}>dari {data.reviewCount} ulasan</div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── TERMS ── */
export function HomestayTerms({ data }) {
  return (
    <SectionCard title="Harap Diperhatikan" icon="📌" eyebrow="Syarat & ketentuan sebelum menginap">
      <div
        style={{
          background: "rgba(244,98,99,0.08)",
          border: "1px solid rgba(244,98,99,0.32)",
          borderRadius: 10,
          padding: 14,
          marginBottom: 14,
          fontSize: 13,
          color: "var(--atr-text)",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          lineHeight: 1.5,
        }}
      >
        <span style={{ fontSize: 18 }}>⚠️</span>
        <div>
          <strong>Pembatalan dan H-1 dikenakan 100% Cancellation Charge.</strong> Pastikan tanggal kunjunganmu sudah pasti sebelum memesan.
        </div>
      </div>
      <ol style={hsx.termsList}>
        {data.terms.map((t, i) => (
          <li
            key={i}
            style={hsx.termItem}
            dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }}
          />
        ))}
      </ol>
    </SectionCard>
  );
}

/* ── MITRA ── */
export function HomestayMitra({ data }) {
  const p = data.partner;
  return (
    <section id="mitra" style={ds.section}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            <span>🏛</span> Tentang Mitra
          </h2>
          <div style={ds.sectionSub}>Pengelola homestay ini adalah Mitra Atourin berikut</div>
        </div>
      </div>
      <div style={hsx.mitraCard}>
        <div style={hsx.mitraHead}>
          <img src={p.avatar} alt="" style={hsx.mitraAv} />
          <div>
            <div style={hsx.mitraType}>{p.type}</div>
            <div style={hsx.mitraName}>{p.name}</div>
            <div style={hsx.mitraLoc}>📍 {p.location}</div>
          </div>
        </div>
        <div style={hsx.mitraStats}>
          <div style={hsx.mitraStat}>
            <div style={hsx.mitraStatVal}>★ {p.rating}</div>
            <div style={hsx.mitraStatLabel}>Rating</div>
          </div>
          <div style={hsx.mitraStat}>
            <div style={hsx.mitraStatVal}>{p.productCount}</div>
            <div style={hsx.mitraStatLabel}>Produk</div>
          </div>
          <div style={hsx.mitraStat}>
            <div style={hsx.mitraStatVal}>{p.totalSold}</div>
            <div style={hsx.mitraStatLabel}>Terjual</div>
          </div>
        </div>
        <div style={hsx.mitraBlurb}>{p.blurb}</div>
        <div style={hsx.mitraCtaRow}>
          <button style={{ ...ds.primaryCta, padding: "11px 16px", width: "auto" }}>
            Lihat profil mitra →
          </button>
          <button style={{ ...ds.secondaryCta, padding: "11px 16px", width: "auto" }}>Hubungi</button>
        </div>
      </div>
    </section>
  );
}
