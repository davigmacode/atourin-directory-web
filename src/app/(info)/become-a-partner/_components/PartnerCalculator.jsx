"use client";

import React, { useState } from "react";
import Link from "next/link";
import { mt } from "@/styles/become-a-partner-styles";

export default function PartnerCalculator() {
  const [price, setPrice] = useState(250000);
  const [bookings, setBookings] = useState(40);
  const gross = price * bookings;
  const net = gross * 0.9; // after 10% commission

  const fmtRp = (n) => "Rp" + Math.round(n).toLocaleString("id-ID");

  return (
    <div style={mt.calc} className="mt-calc">
      <div style={mt.calcLeft}>
        <div style={mt.calcKicker}>Kalkulator Potensi</div>
        <div style={mt.calcTitle}>Perkirakan penghasilanmu</div>
        <div style={mt.calcDesc}>
          Geser sesuai produkmu untuk melihat estimasi pendapatan bulanan setelah komisi.
        </div>

        <div style={mt.field}>
          <div style={mt.fieldRow}>
            <span style={mt.fieldLabel}>Harga rata-rata per pesanan</span>
            <span style={mt.fieldVal}>{fmtRp(price)}</span>
          </div>
          <input
            type="range"
            min="50000"
            max="2000000"
            step="50000"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            style={mt.range}
          />
        </div>
        <div style={mt.field}>
          <div style={mt.fieldRow}>
            <span style={mt.fieldLabel}>Pesanan per bulan</span>
            <span style={mt.fieldVal}>{bookings}×</span>
          </div>
          <input
            type="range"
            min="5"
            max="300"
            step="5"
            value={bookings}
            onChange={(e) => setBookings(+e.target.value)}
            style={mt.range}
          />
        </div>
      </div>
      <div style={mt.calcRight}>
        <div style={mt.calcResultLabel}>Estimasi pendapatan / bulan</div>
        <div style={mt.calcResult}>{fmtRp(net)}</div>
        <div style={mt.calcBreak}>
          <div style={mt.calcBreakRow}>
            <span>Pendapatan kotor</span>
            <span>{fmtRp(gross)}</span>
          </div>
          <div style={mt.calcBreakRow}>
            <span>Komisi Atourin (10%)</span>
            <span style={{ color: "#FFE0A3" }}>−{fmtRp(gross * 0.1)}</span>
          </div>
        </div>
        <Link href="/partnership" style={mt.calcCta}>
          Mulai jualan sekarang →
        </Link>
        <div style={mt.calcNote}>
          *Estimasi ilustratif, hasil aktual bergantung pada performa produk.
        </div>
      </div>
    </div>
  );
}
