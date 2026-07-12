"use client";

import React, { useState, useMemo } from "react";
import { TopNav, SiteFooter } from "@/components/layout";
import { no } from "@/styles/notif-styles";

/* ── Static Data ── */
import { NOTIF_TABS, NOTIFS } from "@/data/notif-data";

/* ── Sub-components ── */
import NotifRow from "./_components/NotifRow";
import NotifModal from "./_components/NotifModal";

function IcCheckAll() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M2 13l4 4 8-9M12 17l1 1 8-9" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IcBellBig() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 9a6 6 0 1112 0c0 4 1.2 5.5 2 6.5H4c.8-1 2-2.5 2-6.5z"
        stroke="var(--atr-text-muted)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.5 19a2.5 2.5 0 005 0" stroke="var(--atr-text-muted)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const GROUP_ORDER = ["Hari ini", "Kemarin", "Minggu ini"];

export default function NotifikasiPage() {
  const [notifs, setNotifs] = useState(NOTIFS);
  const [tab, setTab] = useState("semua");
  const [openNotif, setOpenNotif] = useState(null);

  const unreadTotal = notifs.filter((n) => n.unread).length;

  function tabCount(id) {
    if (id === "semua") return notifs.filter((n) => n.unread).length;
    return notifs.filter((n) => n.cat === id && n.unread).length;
  }

  const filtered = useMemo(() => {
    return tab === "semua" ? notifs : notifs.filter((n) => n.cat === tab);
  }, [tab, notifs]);

  const grouped = useMemo(() => {
    const m = {};
    filtered.forEach((n) => {
      (m[n.group] = m[n.group] || []).push(n);
    });
    return GROUP_ORDER.filter((g) => m[g]).map((g) => [g, m[g]]);
  }, [filtered]);

  function markRead(id) {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  function markAll() {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function openDetail(n) {
    markRead(n.id);
    setOpenNotif(n);
  }

  return (
    <div data-screen-label="Notifikasi" style={no.page}>
      <TopNav active="Pesan" isLoggedIn userName="Widia" notifCount={unreadTotal} />

      <div style={no.wrap}>
        {/* heading */}
        <div style={no.head}>
          <div>
            <div style={no.title}>Notifikasi Saya</div>
            <div style={no.sub}>Pantau pesanan, promo, dan pengingat perjalananmu di satu tempat</div>
          </div>
          <button
            style={{ ...no.markAll, ...(unreadTotal === 0 ? no.markAllDisabled : {}) }}
            disabled={unreadTotal === 0}
            onClick={markAll}
          >
            <IcCheckAll /> Tandai semua dibaca
          </button>
        </div>

        <div style={no.tabsCard}>
          <style>{`
            .atr-notif-row:hover { background: var(--atr-purple-50) !important; }
            .atr-notif-tab:hover { background: var(--atr-bg-soft); }
          `}</style>

          {/* tabs */}
          <div style={no.tabsRow}>
            {NOTIF_TABS.map((tb) => {
              const on = tb.id === tab;
              const cnt = tabCount(tb.id);
              return (
                <button
                  key={tb.id}
                  className="atr-notif-tab"
                  style={{ ...no.tab, ...(on ? no.tabActive : {}) }}
                  onClick={() => setTab(tb.id)}
                >
                  {tb.label}
                  {cnt > 0 && <span style={{ ...no.tabCount, ...(on ? no.tabCountActive : {}) }}>{cnt}</span>}
                </button>
              );
            })}
          </div>

          {/* list */}
          {grouped.length === 0 ? (
            <div style={no.empty}>
              <div style={no.emptyIcon}>
                <IcBellBig />
              </div>
              <div style={no.emptyTitle}>Belum ada notifikasi</div>
              <div style={no.emptySub}>Notifikasi pada kategori ini akan muncul di sini.</div>
            </div>
          ) : (
            grouped.map(([g, items]) => (
              <div key={g}>
                <div style={no.groupLabel}>{g}</div>
                {items.map((n) => (
                  <NotifRow key={n.id} n={n} onOpen={openDetail} />
                ))}
              </div>
            ))
          )}

          {/* pagination */}
          {grouped.length > 0 && (
            <div style={no.pageFoot}>
              <span style={no.pageInfo}>Menampilkan {filtered.length} dari {notifs.length} notifikasi</span>
              <div style={no.pager}>
                <button style={{ ...no.pageBtn, ...no.pageBtnGhost }}>‹</button>
                <button style={{ ...no.pageBtn, ...no.pageBtnActive }}>1</button>
                <button style={no.pageBtn}>2</button>
                <button style={no.pageBtn}>3</button>
                <button style={{ ...no.pageBtn, ...no.pageBtnGhost }}>…</button>
                <button style={no.pageBtn}>7</button>
                <button style={no.pageBtn}>›</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <SiteFooter />

      {openNotif && <NotifModal n={openNotif} onClose={() => setOpenNotif(null)} />}
    </div>
  );
}
