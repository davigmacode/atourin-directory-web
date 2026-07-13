"use client";

import React from "react";
import { TopNav, SiteFooter, Breadcrumb } from "@/components/layout";
import { ps } from "@/styles/profile-styles";
import ProfileSidebar from "./_components/ProfileSidebar";

export default function ProfileLayout({ children }) {
  return (
    <div style={ps.page}>
      <TopNav active="Pesan" isLoggedIn userName="Aulia Priyono" notifCount={3} />

      <style>{`
        .atr-pnav:hover { background: var(--atr-bg-soft); }
        .atr-logout:hover { background: rgba(244,98,99,0.06); }
        .atr-chip:hover { border-color: var(--atr-purple-light); }
        .atr-coll:hover, .atr-itin:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(31,27,51,0.1); }
        .atr-create:hover { border-color: var(--atr-purple-light); color: var(--atr-purple); }
        .atr-pop:hover { background: var(--atr-bg-soft); }
        .atr-ins-row:hover { border-color: var(--atr-purple-light); box-shadow: var(--atr-shadow-2); }
        .atr-create-card:hover { border-color: var(--atr-purple); background: var(--atr-purple-light); }
        .atr-menu-item:hover { background: var(--atr-bg-soft); }
        .atr-menu-item-danger:hover { background: rgba(244,98,99,0.08); }
        @keyframes atrMenuPop { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @media (max-width: 880px) {
          .atr-prof-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={ps.shell}>
        <div style={{ paddingTop: 14 }}>
          <Breadcrumb items={["Beranda", "Profil Saya"]} />
        </div>
        <div style={ps.layout} className="atr-prof-layout">
          <ProfileSidebar />
          <main style={{ minWidth: 0 }}>{children}</main>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
