"use client";

import React, { useState, useRef, useEffect } from "react";
import { ds, rgS, adStyles } from "@/styles/detail-styles";

/* ── Attraction data ── */
export const ATR = {
  name: "Pulau Padar",
  cat: "Alam \u00B7 Trekking",
  catBg: "#D9F2DA",
  catFg: "#2D8838",
  kecamatan: "Komodo",
  kota: "Manggarai Barat",
  provinsi: "Nusa Tenggara Timur",
  rating: 4.95,
  reviews: 1240,
  coords: { lat: -8.6447, lng: 119.571 },
  tags: ["Alam", "Trekking", "Sunset", "Fotografi", "Viewpoint", "Pulau"],
  shortDesc:
    "Pulau ikonik di Taman Nasional Komodo dengan trekking pendek ke viewpoint legendaris, pemandangan tiga teluk berpasir putih, pink, dan hitam yang membentang ke segala arah.",
  longDesc:
    "Pulau Padar adalah salah satu pulau terbesar ketiga di kawasan Taman Nasional Komodo, terkenal karena pemandangan tiga teluknya yang berbeda warna pasir. Trek ke puncaknya berupa anak tangga kayu sepanjang sekitar 800 meter dengan total 819 anak tangga, cukup menantang namun bisa ditempuh dalam 30\u201345 menit. Sesampainya di atas, Anda akan disambut panorama 360\u00b0 tiga teluk: pasir putih di sebelah utara, pasir pink akibat fragmen koral merah di selatan, dan pasir hitam vulkanik di timur, sebuah komposisi alam yang langka di dunia.\n\nWaktu kunjungan paling populer adalah pagi (06.00\u201308.00) saat cahaya golden hour pertama menerangi teluk, atau sore (15.30\u201317.30) untuk sunset. Disarankan datang dengan kapal phinisi atau speedboat dari Labuan Bajo (sekitar 2 jam perjalanan). Pulau ini tidak berpenghuni, tidak ada warung, toilet, atau air bersih di pulau, jadi pastikan Anda membawa perbekalan dari kapal Anda.\n\nPulau Padar sering dikombinasikan dalam paket sailing 1 hari atau 2D1N bersama Pink Beach, Manta Point, dan Pulau Komodo. Tiket masuk sudah termasuk konservasi TN Komodo.",
  images: [
    "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1400&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&auto=format&fit=crop&q=70",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=70",
  ],
  totalPhotos: 24,
};

/* ── SVG icons ── */
export function Pin() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M12 2C7.6 2 4 5.4 4 9.6c0 5.4 7 12 7.3 12.3.4.3 1 .3 1.4 0 .3-.3 7.3-6.9 7.3-12.3C20 5.4 16.4 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ── Shared components ── */
export function StatusChip({ open }) {
  return (
    <span
      style={{ ...ds.statusChip, ...(open ? ds.statusOpen : ds.statusClosed) }}
    >
      <span
        style={{ ...ds.statusDot, background: open ? "#1F7A21" : "#8C2A2B" }}
      />
      {open ? "Buka Sekarang" : "Tutup"}
    </span>
  );
}

export function ReadMore({ text, clamp = 4 }) {
  const [open, setOpen] = useState(false);
  const clamped = { ...ds.longTextClamped, WebkitLineClamp: clamp };
  return (
    <div>
      <p style={open ? ds.longText : clamped}>{text}</p>
      <button style={ds.readMoreBtn} onClick={() => setOpen(!open)}>
        {open ? "Sembunyikan \u2191" : "Baca selengkapnya \u2193"}
      </button>
    </div>
  );
}

export function SectionCard({
  title,
  eyebrow,
  icon,
  link,
  linkLabel,
  children,
  style = {},
}) {
  return (
    <section style={{ ...ds.section, ...style }}>
      <div style={ds.sectionHeader}>
        <div>
          <h2 style={ds.sectionTitle}>
            {icon && <span>{icon}</span>}
            {title}
          </h2>
          {eyebrow && <div style={ds.sectionSub}>{eyebrow}</div>}
        </div>
        {link && (
          <a href={link} style={ds.sectionLink}>
            {linkLabel || "Lihat semua"} <span>{"\u2192"}</span>
          </a>
        )}
      </div>
      {children}
    </section>
  );
}

export function FacilityItem({ icon, label, available = true }) {
  return (
    <div style={{ ...ds.facItem, ...(available ? {} : ds.facItemOff) }}>
      <span style={ds.facIcon}>{icon}</span>
      <span style={{ ...ds.facLabel, ...(available ? {} : ds.facStrike) }}>
        {label}
      </span>
    </div>
  );
}

export function RatingBreakdown({
  avg = 4.8,
  count = 0,
  dist = [78, 15, 4, 2, 1],
}) {
  return (
    <div style={ds.reviewTop}>
      <div style={ds.ratingSummary}>
        <div style={ds.ratingBig}>{avg.toFixed(1)}</div>
        <div style={ds.ratingStars}>{"\u2605\u2605\u2605\u2605\u2605"}</div>
        <div style={ds.ratingCount}>
          dari {count.toLocaleString("id-ID")} ulasan
        </div>
      </div>
      <div style={ds.breakdownCol}>
        {[5, 4, 3, 2, 1].map((s, i) => (
          <div key={s} style={ds.breakdownRow}>
            <span style={ds.breakdownStar}>
              {s} {"\u2605"}
            </span>
            <div style={ds.breakdownTrack}>
              <div style={{ ...ds.breakdownFill, width: `${dist[i]}%` }} />
            </div>
            <span style={ds.breakdownPct}>{dist[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReviewCard({ r }) {
  return (
    <div style={ds.reviewCard}>
      <img src={r.av} alt="" style={ds.reviewAv} />
      <div>
        <div style={ds.reviewHeader}>
          <div>
            <div style={ds.reviewName}>{r.name}</div>
            <div style={ds.reviewMeta}>
              <span style={ds.reviewStarRow}>{"\u2605".repeat(r.rating)}</span>
              <span>{" \u00B7 "}</span>
              <span>{r.date}</span>
              {r.trip && (
                <>
                  <span>{" \u00B7 "}</span>
                  <span>{r.trip}</span>
                </>
              )}
            </div>
          </div>
          {r.verified && (
            <span style={ds.reviewVerified}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              Pembelian Terverifikasi
            </span>
          )}
        </div>
        <p style={ds.reviewText}>{r.text}</p>
        {r.photos && (
          <div style={ds.reviewPhotos}>
            {r.photos.map((p, i) => (
              <img key={i} src={p} alt="" style={ds.reviewPhoto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function MiniAttractionCard({ a }) {
  return (
    <a href="/" style={ds.miniCard}>
      <img src={a.img} alt="" style={ds.miniImg} />
      <div style={ds.miniBody}>
        <span style={{ ...ds.miniCat, color: a.catFg }}>{a.cat}</span>
        <span style={ds.miniName}>{a.name}</span>
        <div style={ds.miniMeta}>
          <span style={ds.miniRating}>
            {"\u2605"} <strong>{a.rating}</strong>
          </span>
          <span style={ds.miniPrice}>
            {a.price === 0 ? "Gratis" : `Rp ${(a.price / 1000).toFixed(0)}rb`}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ── AtrReviewGallery (review + gallery modal) ── */
export function AtrReviewGallery({ productId = "pulau-padar", editorPhotos = [] }) {
  const [photos, setPhotos] = useState([]);
  const [modal, setModal] = useState(null);
  const [galTab, setGalTab] = useState("semua");
  const [lightbox, setLightbox] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      setPhotos(
        JSON.parse(
          localStorage.getItem("atr.travelerPhotos." + productId) || "[]",
        ),
      );
    } catch (e) {}
  }, [productId]);

  function addPhotos(newOnes) {
    const next = [...newOnes, ...photos];
    setPhotos(next);
    try {
      localStorage.setItem(
        "atr.travelerPhotos." + productId,
        JSON.stringify(next),
      );
    } catch (e) {}
  }

  const [reviewStars, setReviewStars] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewFiles, setReviewFiles] = useState([]);

  function onReviewFiles(e) {
    const list = [...(e.target.files || [])];
    list.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => setReviewFiles((p) => [...p, reader.result]);
      reader.readAsDataURL(f);
    });
  }
  function submitReview() {
    const date = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    addPhotos(
      reviewFiles.map((src) => ({
        src,
        by: "Aulia Priyono",
        date,
        caption: reviewText.slice(0, 60),
      })),
    );
    setModal("gallery");
    setGalTab("wisatawan");
    setReviewFiles([]);
    setReviewText("");
    setReviewStars(5);
  }

  const allPhotos = [...editorPhotos, ...photos.map((p) => p.src)];
  const filteredPhotos =
    galTab === "wisatawan" ? photos.map((p) => p.src) : allPhotos;

  return (
    <>
      <button
        style={rgS.entryBtn}
        onClick={() => {
          setGalTab("wisatawan");
          setModal("gallery");
        }}
      >
        {"\uD83D\uDCF7"} Galeri ({allPhotos.length})
      </button>
      <button style={rgS.writeBtn} onClick={() => setModal("review")}>
        + Tulis ulasan
      </button>

      {modal === "review" && (
        <div style={rgS.scrim} onClick={() => setModal(null)}>
          <div style={rgS.modal} onClick={(e) => e.stopPropagation()}>
            <div style={rgS.modalHead}>
              <div style={rgS.modalTitle}>Tulis Ulasan</div>
              <button style={rgS.x} onClick={() => setModal(null)}>
                {"\u2715"}
              </button>
            </div>
            <div style={rgS.modalBody}>
              <div style={rgS.label}>Rating kamu</div>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setReviewStars(n)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: 30,
                      color: n <= reviewStars ? "#FFB420" : "var(--atr-outline)",
                      padding: 0,
                      lineHeight: 1,
                    }}
                  >
                    {"\u2605"}
                  </button>
                ))}
              </div>
              <div style={rgS.label}>Ceritakan pengalamanmu</div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Apa yang berkesan dari kunjunganmu?"
                style={rgS.textarea}
              />
              <div style={rgS.label}>
                Tambah foto{" "}
                <span
                  style={{
                    color: "var(--atr-text-muted)",
                    fontWeight: 400,
                  }}
                >
                  (masuk ke galeri produk \u00B7 tab &quot;Dari Wisatawan&quot;)
                </span>
              </div>
              <div style={rgS.photoRow}>
                {reviewFiles.map((src, i) => (
                  <div key={i} style={rgS.photoThumb}>
                    <img src={src} alt="" style={rgS.photoThumbImg} />
                    <button
                      style={rgS.photoRm}
                      onClick={() => setReviewFiles((p) => p.filter((_, j) => j !== i))}
                    >
                      {"\u2715"}
                    </button>
                  </div>
                ))}
                <button
                  style={rgS.uploadTile}
                  onClick={() => fileRef.current && fileRef.current.click()}
                >
                  <span style={{ fontSize: 22 }}>{"\uFF0B"}</span>
                  <span style={{ fontSize: 10.5 }}>Unggah</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={onReviewFiles}
                />
              </div>
            </div>
            <div style={rgS.modalFoot}>
              <button style={rgS.ghostBtn} onClick={() => setModal(null)}>
                Batal
              </button>
              <button style={rgS.primaryBtn} onClick={submitReview}>
                Kirim Ulasan
              </button>
            </div>
          </div>
        </div>
      )}

      {modal === "gallery" && (
        <div style={rgS.scrim} onClick={() => setModal(null)}>
          <div style={rgS.modal} onClick={(e) => e.stopPropagation()}>
            <div style={rgS.modalHead}>
              <div style={rgS.modalTitle}>Galeri Foto</div>
              <button style={rgS.x} onClick={() => setModal(null)}>
                {"\u2715"}
              </button>
            </div>
            <div style={rgS.tabs}>
              {[
                ["semua", `Semua (${allPhotos.length})`],
                ["wisatawan", `Dari Wisatawan (${photos.length})`],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setGalTab(id)}
                  style={{ ...rgS.tab, ...(galTab === id ? rgS.tabOn : {}) }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div style={rgS.modalBody}>
              {filteredPhotos.length === 0 ? (
                <div style={rgS.empty}>
                  <div style={{ fontSize: 38 }}>{"\uD83D\uDCF7"}</div>
                  <div style={{ fontWeight: 700, marginTop: 8 }}>
                    Belum ada foto dari wisatawan
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--atr-text-muted)",
                      marginTop: 4,
                    }}
                  >
                    Jadi yang pertama berbagi momen kunjunganmu!
                  </div>
                  <button
                    style={{ ...rgS.primaryBtn, marginTop: 14 }}
                    onClick={() => setModal("review")}
                  >
                    + Tulis ulasan & unggah foto
                  </button>
                </div>
              ) : (
                <div style={rgS.grid}>
                  {filteredPhotos.map((src, i) => (
                    <div
                      key={i}
                      style={rgS.gridCell}
                      onClick={() => setLightbox(src)}
                    >
                      <img src={src} alt="" style={rgS.gridImg} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div style={rgS.lightbox} onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="" style={rgS.lightboxImg} />
        </div>
      )}
    </>
  );
}

/* ── AtrWeatherStrip (weather forecast) ── */
export function AtrWeatherStrip({ location, days, advisory }) {
  const list = days || [
    { day: "Kamis", icon: "\u2600\uFE0F", hi: 32, lo: 26, label: "Cerah" },
    { day: "Jumat", icon: "\u2600\uFE0F", hi: 32, lo: 26, label: "Cerah" },
    { day: "Sabtu", icon: "\u26C5", hi: 31, lo: 25, label: "Berawan" },
  ];
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#EEF0FB,#F7F7FC)",
        border: "1px solid var(--atr-outline)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 8,
        }}
      >
        Cuaca Saat Kunjungan
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${list.length},1fr)`,
          gap: 8,
        }}
      >
        {list.map((d, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,.75)",
              borderRadius: 12,
              padding: "11px 6px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 10.5,
                color: "var(--atr-text-muted)",
                fontWeight: 700,
              }}
            >
              {d.day}
            </div>
            <div style={{ fontSize: 26, margin: "5px 0" }}>{d.icon}</div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: "var(--atr-text)",
              }}
            >
              {d.hi}
              {"\u00B7"}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--atr-text-muted)",
                }}
              >
                {" "}
                / {d.lo}
                {"\u00B7"}
              </span>
            </div>
            <div
              style={{
                fontSize: 10,
                color: "var(--atr-text-muted)",
                marginTop: 2,
              }}
            >
              {d.label}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: "var(--atr-text)",
          lineHeight: 1.5,
          background: "rgba(255,196,66,.16)",
          borderRadius: 10,
          padding: "9px 12px",
        }}
      >
        {"\uD83D\uDCA1"}{" "}
        {advisory ||
          "Trekking Padar paling nyaman saat sunrise (05.30\u201307.00), bawa air & topi."}
      </div>
    </div>
  );
}

export function AtrGallery({ images, total }) {
  return (
    <div style={ds.galleryRow}>
      <div style={ds.galleryMain}>
        <img src={images[0]} alt="" style={ds.galleryMainImg} />
      </div>
      <div style={ds.galleryThumbCol}>
        <div style={ds.galleryThumbRow}>
          <div style={ds.galleryThumb}>
            <img src={images[1]} alt="" style={ds.galleryThumbImg} />
          </div>
          <div style={ds.galleryThumb}>
            <img src={images[2]} alt="" style={ds.galleryThumbImg} />
          </div>
        </div>
        <div style={ds.galleryThumbRow}>
          <div style={ds.galleryThumb}>
            <img src={images[3]} alt="" style={ds.galleryThumbImg} />
          </div>
          <div style={ds.galleryThumb}>
            <img src={images[4]} alt="" style={ds.galleryThumbImg} />
            <button style={ds.galleryMore}>
              <span style={ds.galleryMoreNum}>+{total - 5}</span>
              <span style={ds.galleryMoreLabel}>Lihat semua</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AtrHeader() {
  return (
    <section style={ds.section}>
      <div style={ds.hdrBadgeRow}>
        <span
          style={{ ...ds.catBadge, background: ATR.catBg, color: ATR.catFg }}
        >
          {"\uD83E\uDEA8"} {ATR.cat}
        </span>
        <span style={{ ...ds.catBadge, background: "#FFF4D9", color: "#B47A00" }}>
          {"\u26F0"} Taman Nasional
        </span>
      </div>
      <h1 style={ds.hdrTitle}>{ATR.name}</h1>
      <div style={ds.hdrMetaRow}>
        <span style={ds.hdrMetaItem}>
          <Pin /> Kec. {ATR.kecamatan}, {ATR.kota}, {ATR.provinsi}
        </span>
        <a href="#map" style={ds.hdrMetaLink}>
          Lihat di Google Maps {"\u2192"}
        </a>
        <span style={{ color: "var(--atr-outline)" }}>{"\u00B7"}</span>
        <a
          href="#reviews"
          style={{
            ...ds.hdrMetaItem,
            color: "var(--atr-text)",
            textDecoration: "none",
          }}
        >
          <span style={{ color: "var(--atr-yellow)" }}>{"\u2B50"}</span>{" "}
          <strong>{ATR.rating}</strong>
          <span style={{ color: "var(--atr-text-muted)" }}>
            dari {ATR.reviews.toLocaleString("id-ID")} ulasan
          </span>
        </a>
      </div>
      <div style={ds.hdrTagRow}>
        {ATR.tags.map((t) => (
          <span key={t} style={ds.hdrTag}>
            #{t.toLowerCase()}
          </span>
        ))}
      </div>
      <p style={ds.hdrShortDesc}>{ATR.shortDesc}</p>
    </section>
  );
}

export function AtrDescription() {
  return (
    <SectionCard title="Tentang Atraksi Ini" icon={"📖"}>
      <ReadMore text={ATR.longDesc} clamp={4} />
    </SectionCard>
  );
}

const FACILITIES = [
  { icon: "\uD83D\uDEF5\uFE0F", label: "Parkir", on: true },
  { icon: "\uD83D\uDEBB", label: "Toilet", on: true },
  { icon: "\uD83D\uDEE1", label: "Life Jacket", on: true },
  { icon: "\uD83D\uDCF8", label: "Spot Foto", on: true },
  { icon: "\uD83D\uDED0", label: "Souvenir", on: true },
  { icon: "\uD83D\uDEE4\uFE0F", label: "Trek Tangga", on: true },
  { icon: "\u267F", label: "Akses Disabilitas", on: false },
  { icon: "\uD83C\uDF7D\uFE0F", label: "Restoran", on: false },
  { icon: "\uD83D\uDD4C", label: "Musholla", on: false },
  { icon: "\uD83D\uDE34", label: "Camping Area", on: false },
  { icon: "\uD83D\uDCE1", label: "Sinyal HP", on: false },
  { icon: "\uD83D\uDCA7", label: "Air Bersih", on: false },
];

export function AtrFacilities() {
  return (
    <SectionCard
      title="Fasilitas"
      icon={"✨"}
      eyebrow="6 tersedia \u00B7 6 belum tersedia"
    >
      <div style={ds.facGrid}>
        {FACILITIES.map((f) => (
          <FacilityItem
            key={f.label}
            icon={f.icon}
            label={f.label}
            available={f.on}
          />
        ))}
      </div>
    </SectionCard>
  );
}

export function AtrLocation() {
  return (
    <SectionCard title="Lokasi & Akses" icon={"📍"}>
      <div style={ds.mapBox} id="map">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1400&auto=format&fit=crop&q=70"
          alt=""
          style={ds.mapImg}
        />
        <span style={ds.mapPin}>{"📍"}</span>
        <span style={ds.mapCoordChip}>
          {ATR.coords.lat}, {ATR.coords.lng}
        </span>
        <button style={ds.mapDirBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 12L12 2 2 12l10 10 10-10z" stroke="#fff" strokeWidth="1.6" />
            <path
              d="M8 12h6v-3l4 4-4 4v-3H8"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Buka di Maps
        </button>
      </div>
      <div style={ds.accessTip}>
        <strong>Dari Labuan Bajo</strong> {"\u00B7"} Jarak ~40 km laut. Ditempuh
        dengan <strong>speedboat (1,5-2 jam)</strong> atau{" "}
        <strong>kapal phinisi (3-4 jam)</strong> dari Pelabuhan Marina Labuan
        Bajo. Tidak dapat diakses lewat darat. Disarankan tergabung dalam paket
        sailing bersama Pink Beach & Komodo untuk efisiensi waktu.
      </div>
    </SectionCard>
  );
}

export function AtrTips() {
  return (
    <SectionCard title="Tips Berkunjung" icon={"💡"}>
      <div style={ds.tipsGrid}>
        <div style={{ ...ds.tipBox, ...ds.tipBest }}>
          <span style={ds.tipIcon}>{"🌅"}</span>
          <div style={ds.tipTitle}>Waktu terbaik</div>
          <p style={ds.tipBody}>
            Pagi <strong>06.00{"\u2013"}08.00</strong> untuk golden hour, atau
            sore <strong>15.30{"\u2013"}17.30</strong> untuk sunset. Hindari
            siang karena tangga sangat panas dan tidak ada peneduh.
          </p>
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipBring }}>
          <span style={ds.tipIcon}>{"🎒"}</span>
          <div style={ds.tipTitle}>Disarankan bawa</div>
          <ul style={ds.tipList}>
            <li>Sepatu trekking / sneakers</li>
            <li>Sunblock SPF 50+ & topi</li>
            <li>Air mineral 1L per orang</li>
            <li>Kacamata hitam</li>
            <li>Kamera (DSLR / drone)</li>
          </ul>
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipWarn }}>
          <span style={ds.tipIcon}>{"⚠️"}</span>
          <div style={ds.tipTitle}>Perhatian</div>
          <ul style={ds.tipList}>
            <li>Trek 819 anak tangga, cukup menanjak</li>
            <li>Tidak ada toilet/warung di pulau</li>
            <li>Dilarang membawa drone tanpa izin TN</li>
            <li>Jangan turun ke teluk pink (dilindungi)</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

const NEARBY = [
  {
    name: "Pink Beach",
    cat: "Pantai",
    catFg: "#C44949",
    rating: 4.85,
    price: 50000,
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Manta Point",
    cat: "Bahari",
    catFg: "#1F6FB0",
    rating: 4.95,
    price: 200000,
    img: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Pulau Komodo",
    cat: "Alam",
    catFg: "#2D8838",
    rating: 4.92,
    price: 150000,
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Bukit Sylvia",
    cat: "Petualangan",
    catFg: "#B85C00",
    rating: 4.7,
    price: 0,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Goa Batu Cermin",
    cat: "Gua",
    catFg: "#7068D5",
    rating: 4.3,
    price: 25000,
    img: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&auto=format&fit=crop&q=70",
  },
  {
    name: "Pulau Kanawa",
    cat: "Pantai",
    catFg: "#C44949",
    rating: 4.6,
    price: 75000,
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
  },
];

export function AtrNearby() {
  return (
    <SectionCard
      title={"Atraksi Lain di " + ATR.kota}
      icon={"🗺️"}
      link="/"
      linkLabel={"Lihat semua atraksi di " + ATR.kota}
    >
      <div style={ds.hScroll}>
        {NEARBY.map((a, i) => (
          <MiniAttractionCard key={i} a={a} />
        ))}
      </div>
    </SectionCard>
  );
}

const RELATED_ITIN = [
  {
    title: "Labuan Bajo Sailing 4D3N, Padar, Pink Beach & Komodo",
    img: "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&auto=format&fit=crop&q=70",
    days: "4H 3M",
    theme: "Adventure",
    themeFg: "#B85C00",
    themeBg: "#FFE9D6",
    stops: 9,
    budget: 5800000,
    rating: 4.95,
    creator: "Welli Wilyanto",
    creatorAv: "https://i.pravatar.cc/60?img=15",
  },
  {
    title: "Komodo One Day Tour, Padar & Pink Beach",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    days: "1H",
    theme: "Nature",
    themeFg: "#2D8838",
    themeBg: "#D9F2DA",
    stops: 4,
    budget: 1200000,
    rating: 4.88,
    creator: "Atourin Official",
    creatorAv: "https://i.pravatar.cc/60?img=32",
  },
  {
    title: "Diving Komodo 5D4N, Manta Point & Castle Rock",
    img: "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
    days: "5H 4M",
    theme: "Adventure",
    themeFg: "#B85C00",
    themeBg: "#FFE9D6",
    stops: 10,
    budget: 8400000,
    rating: 4.92,
    creator: "Komodo Dive Center",
    creatorAv: "https://i.pravatar.cc/60?img=51",
  },
];

export function AtrItineraries() {
  return (
    <SectionCard
      title="Itinerary yang Melewati Sini"
      icon={"📓"}
      eyebrow="3 itinerary mencakup Pulau Padar"
      link="/"
      linkLabel="Lihat semua itinerary"
    >
      <div style={adStyles.itinList}>
        {RELATED_ITIN.map((it, i) => (
          <a key={i} href="/" style={adStyles.itinRow}>
            <img src={it.img} alt="" style={adStyles.itinImg} />
            <div style={adStyles.itinBody}>
              <div style={adStyles.itinBadgeRow}>
                <span style={adStyles.itinDayBadge}>{it.days}</span>
                <span
                  style={{
                    ...adStyles.itinThemeBadge,
                    background: it.themeBg,
                    color: it.themeFg,
                  }}
                >
                  {it.theme}
                </span>
              </div>
              <div style={adStyles.itinTitle}>{it.title}</div>
              <div style={adStyles.itinMetaRow}>
                <span>{"📍"} {it.stops} tempat</span>
                <span>{"\u00B7"}</span>
                <span style={{ color: "var(--atr-text)" }}>
                  {"\u2B50"} <strong>{it.rating}</strong>
                </span>
                <span>{"\u00B7"}</span>
                <span style={adStyles.itinCreator}>
                  <img
                    src={it.creatorAv}
                    alt=""
                    style={adStyles.itinCreatorAv}
                  />{" "}
                  {it.creator}
                </span>
              </div>
            </div>
            <div style={adStyles.itinRight}>
              <span style={adStyles.itinPriceLabel}>Mulai dari</span>
              <span style={adStyles.itinPrice}>
                Rp {(it.budget / 1000000).toFixed(1)}jt
              </span>
              <span style={{ fontSize: 11, color: "var(--atr-text-muted)" }}>
                /orang
              </span>
            </div>
          </a>
        ))}
      </div>
    </SectionCard>
  );
}

const REVIEWS = [
  {
    name: "Andini Mahardika",
    av: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "12 Mei 2026",
    trip: "Sailing 4D3N",
    verified: true,
    text: "View dari puncak benar-benar tidak ada duanya di Indonesia. Trek tangga lumayan menantang tapi worth it sekali. Datang jam 06.00, sepi, langit ungu-jingga, dan kami berempat punya seluruh puncak untuk diri sendiri selama 30 menit. Sangat direkomendasikan datang pagi!",
    photos: [
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=200&auto=format&fit=crop&q=70",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=200&auto=format&fit=crop&q=70",
    ],
  },
  {
    name: "Reza Pratama",
    av: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "28 April 2026",
    trip: "Day Trip",
    verified: true,
    text: "Worth setiap rupiah dan setiap tetes keringat. Pemandu kami dari Atourin menjelaskan asal-usul warna pasir dengan detail dan bawa air dingin tambahan untuk kami di atas. Highlight trip Labuan Bajo.",
  },
  {
    name: "Maria Hutapea",
    av: "https://i.pravatar.cc/100?img=22",
    rating: 4,
    date: "15 April 2026",
    trip: "Honeymoon",
    verified: false,
    text: "Pemandangan top, tapi tangga kayunya mulai rusak di beberapa bagian, perlu hati-hati. Tidak ada toilet di pulau jadi pastikan ke toilet dulu di kapal. Bawa banyak air, lupakan sandal jepit.",
  },
];

export function AtrReviews() {
  return (
    <section style={ds.section} id="reviews">
      <div style={ds.sectionHeader}>
        <h2 style={ds.sectionTitle}>{"⭐"} Ulasan Wisatawan</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <AtrReviewGallery
            productId="pulau-padar"
            editorPhotos={[
              "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
              "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop&q=70",
              "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=600&auto=format&fit=crop&q=70",
              "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=600&auto=format&fit=crop&q=70",
            ]}
          />
        </div>
      </div>
      <RatingBreakdown
        avg={ATR.rating}
        count={ATR.reviews}
        dist={[82, 13, 3, 1, 1]}
      />
      <div style={ds.reviewList}>
        {REVIEWS.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
      <button style={ds.loadMoreBtn}>
        Muat 10 ulasan berikutnya {"\u2193"}
      </button>
    </section>
  );
}

export function BookingBox() {
  const [save, setSave] = useState(false);
  return (
    <div style={ds.bookCard}>
      <div style={ds.bookHead}>
        <span style={ds.bookEyebrow}>Tiket Masuk</span>
        <div style={ds.bookFromRow}>
          <span style={ds.bookFromVal}>Mulai Rp 75rb</span>
          <span style={ds.bookFromUnit}>/orang</span>
        </div>
      </div>

      <div style={ds.priceTable}>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"👤"} Dewasa (WNI)</span>
          <span style={ds.priceVal}>Rp 75.000</span>
        </div>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"👶"} Anak (&lt; 12 thn)</span>
          <span style={ds.priceVal}>Rp 40.000</span>
        </div>
        <div style={ds.priceRow}>
          <span style={ds.priceLabel}>{"🌐"} WNA</span>
          <span style={ds.priceVal}>Rp 250.000</span>
        </div>
        <div
          style={{
            ...ds.priceRow,
            borderTop: "1px dashed var(--atr-outline)",
            paddingTop: 8,
            marginTop: 2,
          }}
        >
          <span
            style={{
              ...ds.priceLabel,
              fontSize: 11,
              color: "var(--atr-text-muted)",
            }}
          >
            + Konservasi TN Komodo
          </span>
          <span
            style={{
              ...ds.priceVal,
              fontSize: 11,
              color: "var(--atr-text-muted)",
            }}
          >
            Rp 50.000
          </span>
        </div>
      </div>

      <AtrWeatherStrip location="Pulau Padar, Labuan Bajo" />

      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--atr-text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 8,
          }}
        >
          Jam Operasional
        </div>
        <div style={ds.opRow}>
          <span style={ds.opDay}>Setiap hari</span>
          <span style={ds.opHours}>07.00 {"–"} 17.00 WITA</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <StatusChip open={true} />
        </div>
      </div>

      <button style={ds.primaryCta}>{"🎫"} Pesan Tiket / Paket</button>
      <button style={ds.secondaryCta}>{"🧭"} Sewa Pemandu di Sini</button>

      <div style={ds.iconRow}>
        <button
          style={{ ...ds.iconBtnGhost, ...(save ? ds.iconBtnOn : {}) }}
          onClick={() => setSave(!save)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={save ? "currentColor" : "none"}
          >
            <path
              d="M6 3h12v18l-6-4-6 4V3z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
          {save ? "Tersimpan" : "Simpan"}
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Tautan disalin ke clipboard")}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8.5 10.5L15.5 7M8.5 13.5L15.5 17" stroke="currentColor" strokeWidth="1.8" />
          </svg>
          Bagikan
        </button>
        <button
          style={{
            ...ds.iconBtnGhost,
            color: "var(--atr-purple)",
            borderColor: "var(--atr-purple-light)",
            background: "var(--atr-purple-50)",
          }}
          title="Dapat komisi jika ada yang booking via link-mu"
          onClick={() => alert("Link affiliate disalin")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <path d="M9 15l6-6" />
            <path d="M11 6l1-1a4 4 0 015.7 5.7l-1 1" />
            <path d="M13 18l-1 1A4 4 0 016.3 13.3l1-1" />
          </svg>{" "}
          Komisi
        </button>
        <button
          style={ds.iconBtnGhost}
          onClick={() => alert("Diunduh untuk offline")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4v11m0 0l-4-4m4 4l4-4" />
            <path d="M5 19h14" />
          </svg>{" "}
          Offline
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          color: "var(--atr-text-muted)",
          lineHeight: 1.4,
          paddingTop: 4,
          borderTop: "1px dashed var(--atr-outline)",
          marginTop: 4,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        <span>Tiket resmi {"\u00B7"} Bisa refund 24 jam sebelum kedatangan</span>
      </div>
    </div>
  );
}

export function QuickInfoSide() {
  return (
    <div style={{ ...ds.bookCard, padding: 16 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--atr-text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Info Singkat
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          fontSize: 13,
        }}
      >
        <InfoLine icon={"⏱"} label="Durasi kunjungan" value={"2\u20134 jam"} />
        <InfoLine icon={"📶"} label="Sinyal HP" value="Tidak ada" />
        <InfoLine icon={"🌊"} label="Best season" value={"Apr \u2013 Nov (kering)"} />
        <InfoLine icon={'\uD83C\uDFAF'} label="Tingkat kesulitan" value="Sedang (trek tangga)" />
        <InfoLine icon={'\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67'} label="Cocok untuk" value="Dewasa, remaja" />
      </div>
    </div>
  );
}

export function InfoLine({ icon, label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          color: "var(--atr-text-muted)",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span>{icon}</span>
        {label}
      </span>
      <span
        style={{
          color: "var(--atr-text)",
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {value}
      </span>
    </div>
  );
}
