"use client";

import React from "react";
import { Breadcrumb } from "@/components/layout";
import { PlusIcon, Stat } from "./FilterBar";
import { dirStyles, attrHero } from "@/styles/attraction-styles";
import { ATTR_IMG } from "@/data/attractions";

export default function AttractionHero() {
  return (
    <section style={dirStyles.hero}>
      <div style={dirStyles.heroInner}>
        <div style={dirStyles.heroLeft}>
          <div style={{ width: "100%" }}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Atraksi"]} />
          </div>
          <h1 style={dirStyles.heroTitle}>
            Tempat-tempat{" "}
            <span style={{ color: "var(--atr-purple)" }}>
              wajib dikunjungi.
            </span>
          </h1>
          <p style={dirStyles.heroSubtitle}>
            Pantai, air terjun, candi, museum, hingga puncak gunung. Ribuan
            atraksi yang sudah dikurasi & direview oleh wisatawan dan local
            expert Atourin.
          </p>
          <div style={dirStyles.heroCtaRow}>
            <a
              href="/"
              style={{ ...dirStyles.heroPrimary, textDecoration: "none" }}
            >
              <PlusIcon color="#fff" />
              Tambahkan ke itinerary
            </a>
            <button style={dirStyles.heroSecondary}>
              Lihat peta interaktif
            </button>
          </div>
          <div style={dirStyles.heroStats}>
            <Stat n="1.2K+" label="Atraksi tersedia" />
            <Stat n="220+" label="Kota & kabupaten" />
            <Stat n="38K" label="Review terverifikasi" />
          </div>
        </div>
        <div style={dirStyles.heroRight}>
          <div style={attrHero.collage}>
            <img src={ATTR_IMG.padar} alt="" style={attrHero.collageImg1} />
            <img src={ATTR_IMG.borobudur} alt="" style={attrHero.collageImg2} />
            <img src={ATTR_IMG.tanjung} alt="" style={attrHero.collageImg3} />
            <div style={attrHero.floatStat}>
              <div style={attrHero.floatStatNum}>
                4.85
                <span style={{ fontSize: 11, opacity: 0.7 }}> {"\u2605"}</span>
              </div>
              <div style={attrHero.floatStatLabel}>
                Rating rata-rata atraksi populer
              </div>
            </div>
            <div style={attrHero.floatCat}>
              <span style={attrHero.floatCatIcon}>{"\uD83D\uDD33"}</span>
              <div>
                <div style={attrHero.floatCatTitle}>Gunung & Alam</div>
                <div style={attrHero.floatCatMeta}>342 atraksi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
