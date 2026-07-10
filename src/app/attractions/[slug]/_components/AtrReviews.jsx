"use client";

import React, { useState, useRef, useEffect } from "react";
import { ds, rgS } from "@/styles/detail-styles";
import { RatingBreakdown, ReviewCard } from "./Shared";

/* ── AtrReviewGallery (review + gallery modal) ── */
export function AtrReviewGallery({ productId = "attraction", editorPhotos = [] }) {
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

const REVIEWS = [
  {
    name: "Andini Mahardika",
    av: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "12 Mei 2026",
    trip: "Verified Trip",
    verified: true,
    text: "Pemandangan alam yang sangat menakjubkan dan terawat dengan bersih. Pemandu wisatanya ramah serta banyak memberikan tips spot foto yang paling estetik. Wajib dikunjungi!",
    photos: [
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=200&auto=format&fit=crop&q=70",
    ],
  },
  {
    name: "Reza Pratama",
    av: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "28 April 2026",
    trip: "Family Trip",
    verified: true,
    text: "Sangat berkesan berlibur ke sini bersama anak-anak. Akses jalannya mudah, dan fasilitas pendukung seperti toilet serta tempat istirahat sangat memadai.",
  },
];

export default function AtrReviews({ attraction }) {
  const rating = attraction.rating || 4.8;
  const reviewCount = attraction.reviews || 120;

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
            productId={attraction.id || "attraction"}
            editorPhotos={[
              attraction.img,
              "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&auto=format&fit=crop&q=70",
            ].filter(Boolean)}
          />
        </div>
      </div>
      <RatingBreakdown
        avg={rating}
        count={reviewCount}
        dist={[78, 15, 5, 1, 1]}
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
