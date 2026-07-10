"use client";

import React from "react";
import { ds } from "@/styles/detail-styles";
import { SectionCard } from "./Shared";

export default function AtrTips({ attraction }) {
  const isTrekking = attraction.trekking;
  return (
    <SectionCard title="Tips Berkunjung" icon={"💡"}>
      <div style={ds.tipsGrid}>
        <div style={{ ...ds.tipBox, ...ds.tipBest }}>
          <span style={ds.tipIcon}>{"🌅"}</span>
          <div style={ds.tipTitle}>Waktu terbaik</div>
          <p style={ds.tipBody}>
            Pagi hari pukul <strong>08.00{"\u2013"}10.00</strong> or sore hari
            pukul <strong>15.30{"\u2013"}17.00</strong> untuk menghindari terik
            matahari berlebih dan mendapatkan pencahayaan foto terbaik.
          </p>
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipBring }}>
          <span style={ds.tipIcon}>{"🎒"}</span>
          <div style={ds.tipTitle}>Disarankan bawa</div>
          <ul style={ds.tipList}>
            {isTrekking ? (
              <>
                <li>Sepatu gunung / sneakers antislip</li>
                <li>Air mineral minimal 1L</li>
                <li>Topi & kacamata hitam</li>
              </>
            ) : (
              <>
                <li>Kamera / handphone baterai penuh</li>
                <li>Kacamata hitam & tabir surya</li>
                <li>Uang tunai secukupnya</li>
              </>
            )}
            <li>Kantong sampah pribadi</li>
          </ul>
        </div>
        <div style={{ ...ds.tipBox, ...ds.tipWarn }}>
          <span style={ds.tipIcon}>{"⚠️"}</span>
          <div style={ds.tipTitle}>Perhatian</div>
          <ul style={ds.tipList}>
            <li>Buanglah sampah pada tempatnya</li>
            <li>Patuhi seluruh peraturan adat setempat</li>
            <li>Dilarang merusak sarana/fasilitas umum</li>
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}
