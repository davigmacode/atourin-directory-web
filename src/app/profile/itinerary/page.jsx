"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ps, itinStyles } from "@/styles/profile-styles";
import { MY_ITINERARIES, SAVED_ITINERARIES } from "@/data/profile-data";
import { PI } from "../_components/icons";
import { PanelHead } from "../_components/profile-helpers";
import { EmptyState, SkProductCard } from "@/components/layout";

function ItinNewCard() {
  return (
    <Link href="/explore/itinerary" style={{ ...itinStyles.newCard, textDecoration: "none" }} className="atr-create-card">
      <span style={itinStyles.newIcon}>{PI.plus}</span>
      <span style={itinStyles.newTitle}>Buat itinerary baru</span>
      <span style={itinStyles.newSub}>Susun rencana perjalananmu sendiri, hari demi hari.</span>
    </Link>
  );
}

const MICON = {
  share: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.7"/><circle cx="17" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.7"/><path d="M8.2 11l6.6-3.6M8.2 13l6.6 3.6" stroke="currentColor" strokeWidth="1.7"/></svg>,
  copy: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.7"/><path d="M5 15V5a2 2 0 012-2h8" stroke="currentColor" strokeWidth="1.7"/></svg>,
  eye: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke="currentColor" strokeWidth="1.7"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7"/></svg>,
  upload: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 16V4M7 9l5-5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 20h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>,
  trash: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M7 7l1 13h8l1-13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  lock: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.7"/></svg>,
};

function MyItinCard({ it }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const draft = it.status === "draft";
  const isPublic = it.visibility === "Publik";

  useEffect(() => {
    if (!open) return undefined;
    function onDoc(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    const id = setTimeout(() => document.addEventListener("mousedown", onDoc), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [open]);

  function toast(o) {
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast(o);
    }
  }

  function edit(e) {
    e.preventDefault();
    toast({ type: "info", title: draft ? "Lanjutkan menyusun" : "Mode edit", msg: `Membuka "${it.title}".` });
  }

  function act(label, fn) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      fn();
    };
  }

  return (
    <div style={itinStyles.card} className="atr-itin">
      <div style={itinStyles.media}>
        <img src={it.img} alt="" style={itinStyles.img} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
        <div style={itinStyles.scrim} />
        <span style={itinStyles.tag}>{it.tag}</span>
        <div style={itinStyles.pills}>
          <span style={itinStyles.pill}>{PI.clock} {it.days}</span>
          <span style={itinStyles.pill}>{PI.pin} {it.stops} tempat</span>
        </div>
      </div>
      <div style={itinStyles.body}>
        <div style={itinStyles.statusRow}>
          {draft ? <span style={itinStyles.badgeDraft}>● Draft</span> : <span style={itinStyles.badgePub}>{PI.check} Terbit</span>}
          <span style={itinStyles.visMeta}>· {it.visibility} · diubah {it.updated}</span>
        </div>
        <div style={itinStyles.title}>{it.title}</div>
        <div style={itinStyles.myFoot}>
          {draft
            ? <button style={itinStyles.contBtn} onClick={edit}>{PI.edit} Lanjutkan menyusun</button>
            : <button style={itinStyles.editBtn} onClick={edit}>{PI.edit} Edit itinerary</button>}
          <div style={itinStyles.menuWrap} ref={menuRef}>
            <button style={{ ...itinStyles.iconBtn, ...(open ? { borderColor: "var(--atr-purple)", color: "var(--atr-purple)" } : {}) }} aria-label="Kelola itinerary" aria-haspopup="menu" aria-expanded={open} onClick={(e) => { e.preventDefault(); setOpen((v) => !v); }}>{PI.dots}</button>
            {open && (
              <div style={itinStyles.menu} role="menu">
                {draft && (
                  <button style={itinStyles.menuItem} className="atr-menu-item" role="menuitem" onClick={act("publish", () => toast({ type: "success", title: "Itinerary diterbitkan", msg: `"${it.title}" kini bisa dilihat publik.` }))}>
                    <span style={{ color: "var(--atr-arti)" }}>{MICON.upload}</span> Terbitkan
                  </button>
                )}
                <button style={itinStyles.menuItem} className="atr-menu-item" role="menuitem" onClick={act("share", () => toast({ type: "info", title: "Tautan disalin", msg: "Link itinerary siap kamu bagikan." }))}>
                  <span style={{ color: "var(--atr-text-muted)" }}>{MICON.share}</span> Bagikan
                </button>
                <button style={itinStyles.menuItem} className="atr-menu-item" role="menuitem" onClick={act("dup", () => toast({ type: "success", title: "Itinerary diduplikat", msg: `Salinan "${it.title}" dibuat sebagai draft.` }))}>
                  <span style={{ color: "var(--atr-text-muted)" }}>{MICON.copy}</span> Duplikat
                </button>
                <button style={itinStyles.menuItem} className="atr-menu-item" role="menuitem" onClick={act("vis", () => toast({ type: "info", title: isPublic ? "Diubah jadi privat" : "Diubah jadi publik", msg: isPublic ? "Hanya kamu yang bisa melihatnya." : "Sekarang bisa dilihat publik." }))}>
                  <span style={{ color: "var(--atr-text-muted)" }}>{isPublic ? MICON.lock : MICON.eye}</span> {isPublic ? "Jadikan privat" : "Jadikan publik"}
                </button>
                <div style={itinStyles.menuDivider} />
                <button style={{ ...itinStyles.menuItem, ...itinStyles.menuItemDanger }} className="atr-menu-item-danger" role="menuitem" onClick={act("del", () => toast({ type: "success", title: "Itinerary dihapus", msg: `"${it.title}" telah dihapus.`, action: { label: "Urungkan" } }))}>
                  <span>{MICON.trash}</span> Hapus
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedItinCard({ it }) {
  function unsave(e) {
    e.preventDefault();
    if (typeof window !== "undefined" && window.atrToast) {
      window.atrToast({ type: "success", title: "Dihapus dari tersimpan", msg: it.title });
    }
  }

  return (
    <Link href="/explore/itinerary" style={{ ...itinStyles.card, textDecoration: "none" }} className="atr-itin">
      <div style={itinStyles.media}>
        <img src={it.img} alt="" style={itinStyles.img} onError={(e) => { e.currentTarget.style.background = "var(--atr-bg-cool)"; }} />
        <div style={itinStyles.scrim} />
        <span style={itinStyles.tag}>{it.tag}</span>
        <button style={itinStyles.savedBadge} aria-label="Hapus dari tersimpan" onClick={unsave}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16l-6-4-6 4V4z" /></svg>
        </button>
        <div style={itinStyles.pills}>
          <span style={itinStyles.pill}>{PI.clock} {it.days}</span>
          <span style={itinStyles.pill}>{PI.pin} {it.city}</span>
        </div>
      </div>
      <div style={itinStyles.body}>
        <div style={itinStyles.title}>{it.title}</div>
        <div style={itinStyles.author}>
          <span style={itinStyles.avatar}>{it.author[0]}</span>
          <span style={itinStyles.role}>{it.author} · {it.role}</span>
        </div>
        <div style={itinStyles.foot}>
          <span style={itinStyles.savedMeta}>{PI.bookmark} {it.savedAt}</span>
          <span style={itinStyles.viewBtn}>Lihat {PI.chevR}</span>
        </div>
      </div>
    </Link>
  );
}

function ItinSkeletonGrid() {
  return (
    <div style={itinStyles.grid}>
      {[0, 1, 2].map((i) => <SkProductCard key={i} />)}
    </div>
  );
}

export default function MyItinerariesPage() {
  const [tab, setTab] = useState("my");
  const myList = MY_ITINERARIES || [];
  const savedList = SAVED_ITINERARIES || [];
  const isMy = tab === "my";
  const [loading, setLoading] = useState(false);

  function body() {
    if (loading) return <ItinSkeletonGrid />;
    return isMy ? (
      <div style={itinStyles.grid}>
        <ItinNewCard />
        {myList.map((it) => <MyItinCard key={it.id} it={it} />)}
      </div>
    ) : (
      <div style={itinStyles.grid}>
        {savedList.map((it) => <SavedItinCard key={it.id} it={it} />)}
      </div>
    );
  }

  return (
    <div style={ps.panel}>
      <PanelHead
        title="Itinerary Saya"
        sub={isMy ? "Rencana perjalanan yang kamu buat sendiri, bisa diedit & dibagikan" : "Itinerary dari kreator lain yang kamu simpan untuk dibuka lagi"}
      />
      <div style={itinStyles.tabs}>
        <button style={{ ...itinStyles.tab, ...(isMy ? itinStyles.tabOn : {}) }} onClick={() => setTab("my")}>
          {PI.edit} Itinerary Saya <span style={itinStyles.tabCount}>{myList.length}</span>
        </button>
        <button style={{ ...itinStyles.tab, ...(!isMy ? itinStyles.tabOn : {}) }} onClick={() => setTab("saved")}>
          {PI.bookmark} Tersimpan <span style={itinStyles.tabCount}>{savedList.length}</span>
        </button>
      </div>
      {body()}
    </div>
  );
}
