"use client";

import { useParams } from "next/navigation";
import TopNav from "@/components/TopNav";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { useAttraction } from "@/lib/hooks/use-attraction";

export default function AttractionDetailPage() {
  const { slug } = useParams();
  const { attraction, isLoading, isError } = useAttraction(slug);

  const s = { background: "var(--atr-outline)", borderRadius: 8 };

  if (isLoading) {
    return (
      <div>
        <TopNav active="Atraksi" />
        <div style={{ maxWidth: 1376, margin: "0 auto", padding: 32 }}>
          <div style={{ ...s, height: 24, width: "40%", marginBottom: 24 }} />
          <div
            style={{ ...s, height: 400, marginBottom: 24, borderRadius: 16 }}
          />
          <div style={{ ...s, height: 32, width: "60%", marginBottom: 16 }} />
          <div style={{ ...s, height: 16, width: "80%", marginBottom: 8 }} />
          <div style={{ ...s, height: 16, width: "75%" }} />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (isError || !attraction) {
    return (
      <div>
        <TopNav active="Atraksi" />
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{"\u26A0\uFE0F"}</div>
          <h2>Atraksi tidak ditemukan</h2>
          <a
            href="/attractions"
            style={{
              display: "inline-block",
              marginTop: 20,
              background: "var(--atr-purple)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            Kembali
          </a>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div>
      <TopNav active="Atraksi" />
      <div style={{ maxWidth: 1376, margin: "0 auto", padding: "24px 32px" }}>
        <Breadcrumb
          items={["Beranda", "Jelajahi", "Atraksi", attraction.name]}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 32,
            marginTop: 20,
          }}
        >
          <div>
            <img
              src={attraction.img}
              alt={attraction.name}
              style={{
                width: "100%",
                borderRadius: 16,
                aspectRatio: "16/9",
                objectFit: "cover",
              }}
            />
            <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 20 }}>
              {attraction.name}
            </h1>
            <p style={{ color: "var(--atr-text-muted)", marginTop: 8 }}>
              {attraction.region}
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  background: attraction.catBg,
                  color: attraction.catFg,
                  padding: "4px 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {attraction.cat}
              </span>
              <span style={{ color: "var(--atr-yellow)" }}>
                {"\u2605"} {attraction.rating}
              </span>
              <span style={{ color: "var(--atr-text-muted)" }}>
                ({attraction.reviews} ulasan)
              </span>
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              border: "1px solid var(--atr-outline)",
              borderRadius: 16,
              padding: 24,
              position: "sticky",
              top: 100,
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "var(--atr-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                fontWeight: 700,
              }}
            >
              Tiket
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "var(--atr-purple)",
                marginTop: 4,
              }}
            >
              {attraction.price === 0
                ? "Gratis"
                : `Rp ${(attraction.price / 1000).toLocaleString("id-ID")}rb`}
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                color: "var(--atr-text-muted)",
              }}
            >
              {attraction.hours}
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
