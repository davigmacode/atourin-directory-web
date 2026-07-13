"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ps, wishStyles } from "@/styles/profile-styles";
import { WISH_PRODUCTS, WISH_COLLECTIONS } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";

function ProductCard({ p, showRating, onMenu, menuOpen, onClose }) {
  return (
    <div style={wishStyles.prodCard}>
      <div style={wishStyles.prodMedia}>
        <img src={p.img} alt="" style={wishStyles.prodImg} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
        <button style={wishStyles.prodMenu} onClick={(e) => { e.stopPropagation(); onMenu && onMenu(p.id); }}>{PI.dots}</button>
        {menuOpen && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 20 }} onClick={onClose} />
            <div style={wishStyles.popover}>
              <div style={wishStyles.popHead}>Pindahkan ke Koleksi</div>
              {WISH_COLLECTIONS.filter((c) => !c.special).map((c) => (
                <div key={c.id} style={wishStyles.popItem} className="atr-pop" onClick={onClose}>
                  {PI.folder} {c.name} <span style={wishStyles.popCount}>{c.count}</span>
                </div>
              ))}
              <div style={wishStyles.popDivider} />
              <button style={wishStyles.popDelete} onClick={onClose}>{PI.trash} Hapus dari Wishlist</button>
            </div>
          </>
        )}
      </div>
      <div style={wishStyles.prodBody}>
        <div style={wishStyles.prodMetaRow}>
          <span style={wishStyles.prodCity}><span style={wishStyles.prodCityPin}>{PI.pin}</span> {p.city}</span>
          {showRating && p.rating && (
            <span style={wishStyles.prodRating}>{PI.star} {p.rating.toString().replace(".", ",")}{p.reviews ? ` (${p.reviews})` : ""}</span>
          )}
        </div>
        <div style={wishStyles.prodTitle}>{p.title}</div>
        <div style={wishStyles.prodPrice}>Rp{p.price.toLocaleString("id-ID")}</div>
        <div style={wishStyles.prodOpRow}>
          <span style={wishStyles.prodOpDot}>{p.operator[0]}</span>
          <span style={wishStyles.prodOpName}>{p.operator}</span>
        </div>
      </div>
    </div>
  );
}

function CollectionDetailView({ collectionId, onBack }) {
  const [menuId, setMenuId] = useState(null);
  const found = WISH_COLLECTIONS.find((c) => c.id === collectionId);
  const coll = found || { id: "all", name: "Semua Produk", count: 0, ids: [], special: true };
  const products = coll.ids.map((id) => WISH_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const isEmpty = products.length === 0;

  return (
    <div style={ps.panel}>
      <div style={wishStyles.detailHead}>
        <button style={wishStyles.backBtn} onClick={onBack}>{PI.back}</button>
        <div style={{ flex: 1 }}>
          <div style={wishStyles.detailTitle}>{coll.name}</div>
          <div style={wishStyles.detailSub}>{products.length} item tersimpan</div>
        </div>
        {!coll.special && !isEmpty && (
          <div style={{ display: "flex", gap: 10 }}>
            <button style={ps.btnGhost}>{PI.edit} Ubah</button>
            <button style={ps.btnDanger}>{PI.trash} Hapus</button>
          </div>
        )}
      </div>

      {isEmpty ? (
        <div style={wishStyles.emptyWrap}>
          <div style={wishStyles.emptyIcon}>{PI.heart}</div>
          <div style={wishStyles.emptyTitle}>Koleksi Masih Kosong</div>
          <div style={wishStyles.emptyText}>Mulai jelajahi berbagai aktivitas menarik dan simpan ke dalam koleksi ini.</div>
          <div style={{ marginTop: 22 }}>
            <Link href="/explore" style={{ textDecoration: "none" }}>
              <button style={ps.btnPrimary}>{PI.compass} Jelajahi Sekarang</button>
            </Link>
          </div>
        </div>
      ) : (
        <div style={wishStyles.prodGrid}>
          {products.map((p) => (
            <ProductCard key={p.id} p={p} showRating={coll.special}
              menuOpen={menuId === p.id}
              onMenu={(id) => setMenuId(id)}
              onClose={() => setMenuId(null)} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WishlistPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  function mosaicImgs(c) {
    const imgs = c.ids.map((id) => (WISH_PRODUCTS.find((p) => p.id === id) || {}).img).filter(Boolean);
    return imgs;
  }

  function handleCreate() {
    if (name.trim()) {
      if (typeof window !== "undefined" && window.atrToast) {
        window.atrToast(`Koleksi "${name}" berhasil dibuat!`);
      }
      setShowModal(false);
      setName("");
    }
  }

  if (selectedId) {
    return <CollectionDetailView collectionId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div style={ps.panel}>
      <PanelHead title="Wishlist & Koleksi" sub="Simpan mimpi perjalananmu, lalu rapikan ke dalam koleksi" />
      <div style={wishStyles.collGrid}>
        {WISH_COLLECTIONS.map((c) => {
          const imgs = mosaicImgs(c);
          return (
            <div key={c.id} style={wishStyles.collCard} className="atr-coll" onClick={() => setSelectedId(c.id)}>
              {c.special ? (
                <div style={wishStyles.specialMosaic}>
                  <span style={wishStyles.specialCell}>{PI.heart}</span>
                  <span style={wishStyles.specialCell}>{PI.star}</span>
                  <span style={wishStyles.specialCell}>{PI.compass}</span>
                  <span style={wishStyles.specialCell}>{PI.bookmark}</span>
                </div>
              ) : (
                <div style={wishStyles.mosaic}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={wishStyles.mosaicCell}>
                      {imgs[i]
                        ? <img src={imgs[i]} alt="" style={wishStyles.mosaicImg} onError={(e) => { e.currentTarget.style.opacity = 0; }} />
                        : <div style={{ ...wishStyles.mosaicImg, ...wishStyles.mosaicEmpty }}>{PI.bookmark}</div>}
                    </div>
                  ))}
                </div>
              )}
              <div style={wishStyles.collBody}>
                <div style={wishStyles.collName}>{c.name}</div>
                <div style={wishStyles.collCount}>{c.special ? c.subtitle : `${c.count} item`}</div>
              </div>
            </div>
          );
        })}

        <div style={wishStyles.createCard} className="atr-create" onClick={() => setShowModal(true)}>
          <span style={wishStyles.createIcon}>{PI.plus}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--atr-text)" }}>Buat Koleksi</span>
        </div>
      </div>

      {showModal && (
        <div style={ps.scrim} onClick={() => setShowModal(false)}>
          <div style={ps.modal} onClick={(e) => e.stopPropagation()}>
            <div style={ps.modalHead}>
              <div style={ps.modalTitle}>Buat Koleksi Baru</div>
              <button style={ps.modalClose} onClick={() => setShowModal(false)}>{PI.close}</button>
            </div>
            <label style={{ ...ps.formLabel, display: "block", marginBottom: 8 }}>Nama Koleksi</label>
            <input style={ps.input} placeholder="Contoh: Liburan Bali" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
            <div style={ps.modalActions}>
              <button style={ps.linkBtn} onClick={() => setShowModal(false)}>Batal</button>
              <button style={{ ...ps.btnPrimary, ...(name.trim() ? {} : { opacity: 0.5, cursor: "not-allowed", boxShadow: "none" }) }}
                onClick={handleCreate}>Buat Koleksi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
