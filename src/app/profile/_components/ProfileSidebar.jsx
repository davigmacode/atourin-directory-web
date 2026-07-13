"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ps } from "@/styles/profile-styles";
import { USER } from "@/data/profile-data";
import { PI } from "./icons";

const NAV_ACCOUNT = [
  { id: "profil", label: "Profil", path: "/profile", group: "profil", icon: PI.user },
  { id: "pengaturan", label: "Pengaturan Akun", path: "/profile/settings", group: "pengaturan", icon: PI.gear },
];

const NAV_ACTIVITY = [
  { id: "pesanan", label: "Pesanan", path: "/profile/orders", group: "pesanan", icon: PI.order },
  { id: "itinerary", label: "Itinerary", path: "/profile/itinerary", group: "itinerary", icon: PI.book },
  { id: "wishlist", label: "Wishlist", path: "/profile/wishlist", group: "wishlist", icon: PI.bookmark },
  { id: "ulasan", label: "Ulasan", path: "/profile/reviews", group: "ulasan", icon: PI.chat },
  { id: "asuransi", label: "Asuransi", path: "/profile/insurance", group: "asuransi", icon: PI.shield },
  { id: "referral", label: "Undang Teman", path: "/profile/referral", group: "referral", icon: PI.sparkle },
  { id: "loyalty", label: "Poin & Reward", path: "/profile/loyalty", group: "loyalty", icon: PI.star },
  { id: "wallet", label: "Atourin Pay", path: "/profile/wallet", group: "wallet", icon: PI.wallet },
  { id: "journal", label: "Trip Journal", path: "/profile/journal", group: "journal", icon: PI.book },
  { id: "affiliate", label: "Program Affiliate", path: "/profile/affiliate", group: "affiliate", icon: PI.wallet },
];

function groupOf(pathname) {
  if (pathname === "/profile" || pathname === "/profile/edit") return "profil";
  if (pathname.startsWith("/profile/settings")) return "pengaturan";
  if (pathname.startsWith("/profile/orders")) return "pesanan";
  if (pathname.startsWith("/profile/itinerary")) return "itinerary";
  if (pathname.startsWith("/profile/wishlist")) return "wishlist";
  if (pathname.startsWith("/profile/reviews")) return "ulasan";
  if (pathname.startsWith("/profile/insurance")) return "asuransi";
  if (pathname.startsWith("/profile/referral")) return "referral";
  if (pathname.startsWith("/profile/loyalty")) return "loyalty";
  if (pathname.startsWith("/profile/wallet")) return "wallet";
  if (pathname.startsWith("/profile/journal")) return "journal";
  if (pathname.startsWith("/profile/affiliate")) return "affiliate";
  return "";
}

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const active = groupOf(pathname);

  function handleLogout() {
    try {
      localStorage.setItem("atr_auth", "0");
    } catch (e) {}
    router.push("/");
  }

  function NavBtn({ item }) {
    const on = active === item.group;
    return (
      <Link href={item.path} style={{ textDecoration: "none", display: "block", width: "100%" }}>
        <span
          style={{ ...ps.navItem, ...(on ? ps.navItemActive : {}) }}
          className="atr-pnav"
        >
          <span style={{ ...ps.navItemIcon, ...(on ? ps.navItemIconActive : {}) }}>{item.icon}</span>
          <span>{item.label}</span>
          {on && <span style={ps.navChevron}>{PI.chevR}</span>}
        </span>
      </Link>
    );
  }

  const pct = Math.round((USER.tierProgress || 0) * 100);

  return (
    <aside style={ps.side}>
      <div style={ps.profCard}>
        <div style={ps.profCover}>
          <span style={{ ...ps.profCoverBlob, width: 90, height: 90, top: -30, right: -10 }} />
          <span style={{ ...ps.profCoverBlob, width: 50, height: 50, bottom: -16, left: 24 }} />
        </div>
        <div style={ps.profBody}>
          <img src={USER.avatar} alt="" style={ps.profAvatar} />
          <div style={ps.profName}>{USER.name}</div>
          <div style={ps.profTier}>{PI.sparkle} Member {USER.tier}</div>

          {USER.badges && (
            <div title="Lencana pencapaian" style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8 }}>
              {USER.badges.map((b) => (
                <span key={b.name} title={b.name} style={{ width: 26, height: 26, borderRadius: 999, background: "var(--atr-bg-soft)", border: "1px solid var(--atr-outline)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{b.icon}</span>
              ))}
              <Link href="/profile/loyalty" title="Lihat semua lencana" style={{ textDecoration: "none" }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: "var(--atr-purple-50)", color: "var(--atr-purple)", border: "1px solid var(--atr-purple-light)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>+</span>
              </Link>
            </div>
          )}

          <Link href="/profile/loyalty" title="Lihat Poin & Reward" style={{ textDecoration: "none", display: "block" }}>
            <div style={ps.profPtsRow} className="atr-pts-card">
              <span style={ps.profPtsLabel}>{USER.points.toLocaleString("id-ID")} Poin</span>
              <span style={ps.profPtsNext}>{USER.pointsToNext.toLocaleString("id-ID")} lagi → {USER.nextTier} ›</span>
            </div>
            <div style={ps.profBar}><div style={{ ...ps.profBarFill, width: pct + "%" }} /></div>
          </Link>

          <div style={ps.profStats}>
            {USER.stats.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <div style={ps.profStatDiv} />}
                <div style={ps.profStat}>
                  <div style={ps.profStatVal}>{s.value}</div>
                  <div style={ps.profStatLabel}>{s.label}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div style={ps.navGroup}>
        <div style={ps.navLabel}>Akun</div>
        {NAV_ACCOUNT.map((it) => <NavBtn key={it.id} item={it} />)}
      </div>

      <div style={ps.navGroup}>
        <div style={ps.navLabel}>Aktivitas</div>
        {NAV_ACTIVITY.map((it) => <NavBtn key={it.id} item={it} />)}
      </div>

      <button style={ps.logout} className="atr-logout" onClick={handleLogout}>{PI.logout} Keluar</button>
    </aside>
  );
}
