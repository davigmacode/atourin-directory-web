"use client";

import React from "react";
import Link from "next/link";
import { ar } from "@/styles/arti-styles";

export default function ArtiHero() {
  return (
    <div style={ar.hero}>
      <div style={ar.blob1} />
      <div style={ar.blob2} />
      <div style={ar.heroInner}>
        <div style={ar.crumb}>
          <Link href="/" style={ar.crumbLink}>
            Beranda
          </Link>
          <span>›</span>
          <span>ARTI</span>
        </div>
        <span style={ar.badge}>🌱 ARTI · Carbon Offset Initiative</span>
        <h1 style={ar.h1} className="arti-h1">
          Setiap perjalanan menanam kehidupan
        </h1>
        <p style={ar.lead}>
          Tiap pesanan di Atourin mengompensasi jejak karbonmu lewat penanaman pohon nyata bersama petani lokal. Inilah
          kebunmu sejauh ini.
        </p>
        <div style={ar.bignum}>
          <div style={ar.bignumV}>12</div>
          <div style={ar.bignumL}>
            pohon sudah ditanam
            <br />
            atas namamu
          </div>
        </div>
        <div style={ar.treeRow}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              style={{ fontSize: [30, 38, 26, 42, 34, 40, 30, 36, 32, 38, 28, 34][i] }}
            >
              🌳
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
