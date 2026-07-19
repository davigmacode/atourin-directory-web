"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import tc from "../tab-card-styles";
import CardPrice from "../molecules/CardPrice";
import StatusDot from "../atoms/StatusDot";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function GuideCard({ p }) {
  const router = useRouter();
  const slug = `/explore/tour-guides/${slugify(p.name)}`;
  const verifiedBadge = p.verified ? (
    <span style={tc.guideVerified}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff">
        <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      &nbsp;Verified
    </span>
  ) : null;

  function handleCtaClick(e) {
    e.preventDefault();
    e.stopPropagation();
    router.push(slug);
  }

  return (
    <Link href={slug} style={{ ...tc.guideCard, textDecoration: "none", color: "inherit" }}>
      <div style={tc.guideImgWrap}>
        <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {verifiedBadge}
      </div>
      <div style={tc.guideBody}>
        <h3 style={tc.guideName}>{p.name}</h3>
        <div style={tc.guideSpecRow}>
          {p.spec.map((s) => (
            <span key={s} style={tc.guideSpec}>
              {s}
            </span>
          ))}
        </div>
        <div style={tc.guideLangRow}>
          {p.langs.map((l, j) => (
            <span key={j}>🌐 {l}</span>
          ))}
        </div>
        <div style={tc.guideMeta}>
          <span>
            ★ <strong>{p.rating}</strong>
          </span>
          <span style={{ color: "var(--atr-outline)" }}>·</span>
          <span>{p.trips} trip</span>
        </div>
        <p style={tc.guideBio}>&quot;{p.exp}&quot;</p>
        <CardPrice
          label="Mulai"
          value={`Rp ${(p.price / 1000).toFixed(0)}rb`}
          unit="/hari"
          right={
            <div style={tc.guideCerts}>
              {p.certs.map((c) => (
                <span key={c} style={tc.guideCert}>
                  {c}
                </span>
              ))}
            </div>
          }
        />
        <div style={tc.guideCtas}>
          <button type="button" onClick={handleCtaClick} style={tc.guideCtaSec}>
            Lihat profil
          </button>
          <button type="button" onClick={handleCtaClick} style={tc.guideCtaPri}>
            Hubungi →
          </button>
        </div>
      </div>
    </Link>
  );
}
