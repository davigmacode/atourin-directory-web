"use client";

import React, { useState } from "react";
import { TopNav, SiteFooter, DateRangeModal } from "@/components/layout";
import { hp } from "@/styles/homestay-detail-styles";
import { ds } from "@/styles/detail-styles";
import { HMS_DETAIL_DATA } from "@/data/market";

/* ── Sub-components ── */
import {
  HomestayGallery,
  HomestayCinematic,
  HomestayHeaderCard,
} from "./_components/DetailHero";
import DetailSubnav from "./_components/DetailSubnav";
import DetailBooking from "./_components/DetailBooking";
import DetailBottomDock from "./_components/DetailBottomDock";
import {
  HomestaySummary,
  HomestayHelpCard,
} from "./_components/DetailSidebar";
import {
  SectionCard,
  ReadMore,
  HomestayArti,
  HomestayHost,
  HomestayAmenities,
  HomestayRules,
  HomestayTips,
  HomestayLocation,
  HomestayReviews,
  HomestayTerms,
  HomestayMitra,
} from "./_components/DetailSections";
import {
  HomestayNearby,
  HomestayRelated,
} from "./_components/DetailRelated";

export default function HomestayDetailPage() {
  const [checkIn, setCheckIn] = useState("2026-05-23");
  const [checkOut, setCheckOut] = useState("2026-05-24");
  const [qty, setQty] = useState({ single: 1, double: 1, family: 0 });
  const [isSaved, setIsSaved] = useState(false);
  const [openCal, setOpenCal] = useState(false);

  // States settings from tweaks
  const heroStyle = "gallery"; // "gallery" | "cinematic"
  const dockPosition = "sidebar"; // "sidebar" | "bottom"
  const isCine = heroStyle === "cinematic";
  const isBottomDock = dockPosition === "bottom";

  const state = { checkIn, checkOut, setCheckIn, setCheckOut, qty, setQty };

  return (
    <div
      data-screen-label="Homestay Detail · Harjiyanto"
      style={{ ...hp.page, paddingBottom: isBottomDock ? 110 : 0 }}
    >
      <TopNav active="Pesan" />

      <div style={hp.crumbBar}>
        <span style={{ fontSize: 13, color: "var(--atr-text-muted)" }}>
          Beranda · Homestay · Magelang · Borobudur ·{" "}
          <strong style={{ color: "var(--atr-text)" }}>Homestay Harjiyanto</strong>
        </span>
      </div>

      {isCine ? (
        <HomestayCinematic
          data={HMS_DETAIL_DATA}
          isSaved={isSaved}
          onShare={() => alert("Tautan disalin ke clipboard")}
          onSave={() => setIsSaved(!isSaved)}
        />
      ) : (
        <>
          <HomestayGallery data={HMS_DETAIL_DATA} />
          <div style={hp.containerWide}>
            <div id="tentang">
              <HomestayHeaderCard
                data={HMS_DETAIL_DATA}
                isSaved={isSaved}
                onShare={() => alert("Tautan disalin ke clipboard")}
                onSave={() => setIsSaved(!isSaved)}
              />
            </div>
          </div>
        </>
      )}

      {isCine && (
        <div style={hp.containerWide}>
          <div id="tentang" style={{ marginTop: 18 }}>
            <HomestayHeaderCard
              data={HMS_DETAIL_DATA}
              isSaved={isSaved}
              onShare={() => alert("Tautan disalin ke clipboard")}
              onSave={() => setIsSaved(!isSaved)}
            />
          </div>
        </div>
      )}

      <DetailSubnav />

      <div style={hp.mainGrid}>
        <div style={hp.mainCol}>
          <SectionCard title="Tentang Homestay" icon="📖">
            <ReadMore text={HMS_DETAIL_DATA.longDesc} clamp={4} />
          </SectionCard>

          <DetailBooking data={HMS_DETAIL_DATA} state={state} onOpenCal={() => setOpenCal(true)} />

          <HomestayArti />

          <div id="host">
            <HomestayHost host={HMS_DETAIL_DATA.host} />
          </div>

          <HomestayAmenities data={HMS_DETAIL_DATA} />
          <HomestayRules data={HMS_DETAIL_DATA} />
          <HomestayTips data={HMS_DETAIL_DATA} />
          <HomestayLocation data={HMS_DETAIL_DATA} />
          <HomestayReviews data={HMS_DETAIL_DATA} />
          <HomestayTerms data={HMS_DETAIL_DATA} />
          <HomestayMitra data={HMS_DETAIL_DATA} />
        </div>

        {!isBottomDock && (
          <aside style={hp.sideCol}>
            <HomestaySummary
              data={HMS_DETAIL_DATA}
              state={state}
              onCheckout={() => alert("Checkout")}
            />
            <HomestayHelpCard />
          </aside>
        )}
      </div>

      <div style={hp.containerWide}>
        <HomestayNearby data={HMS_DETAIL_DATA} />
      </div>

      <div style={{ maxWidth: 1376, margin: "0 auto", padding: "24px 0" }}>
        <HomestayRelated items={HMS_DETAIL_DATA.related} />
      </div>

      <SiteFooter />

      {isBottomDock && (
        <DetailBottomDock
          data={HMS_DETAIL_DATA}
          state={state}
          onCheckout={() => alert("Checkout")}
        />
      )}

      <DateRangeModal
        state={{
          openDate: openCal,
          setOpenDate: setOpenCal,
          checkIn: checkIn ? new Date(checkIn) : null,
          setCheckIn: (val) => setCheckIn(val ? val.toISOString().split("T")[0] : null),
          checkOut: checkOut ? new Date(checkOut) : null,
          setCheckOut: (val) => setCheckOut(val ? val.toISOString().split("T")[0] : null),
        }}
      />
    </div>
  );
}
