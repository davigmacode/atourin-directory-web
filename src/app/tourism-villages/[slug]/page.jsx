'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { TopNav, SiteFooter, Breadcrumb } from '@/components/layout';
import { ds } from '@/styles/detail-styles';
import { useVillage } from '@/lib/hooks/use-village';

import DetailHero from './_components/DetailHero';
import VillageHeader from './_components/VillageHeader';
import VillageAbout from './_components/VillageAbout';
import VillageActivities from './_components/VillageActivities';
import VillagePackages from './_components/VillagePackages';
import VillageAttractions from './_components/VillageAttractions';
import VillageFacilities from './_components/VillageFacilities';
import VillageAccess from './_components/VillageAccess';
import VillageGallery from './_components/VillageGallery';
import VillageReviews from './_components/VillageReviews';
import SimilarVillages from './_components/SimilarVillages';
import ContactCard from './_components/ContactCard';
import CertsCard from './_components/CertsCard';

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg-soft)' }}>
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <div style={ds.crumbBar}>
          <div style={{ height: 20, width: 240, background: 'var(--atr-outline)', borderRadius: 4, animation: 'pulse 1.5s infinite' }} />
        </div>
        <div style={ds.containerWide}>
          <div
            style={{
              height: 440,
              borderRadius: 16,
              background: 'var(--atr-outline)',
              marginBottom: 12,
              animation: 'pulse 1.5s infinite',
            }}
          />
        </div>
        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <div style={{ height: 180, borderRadius: 14, background: 'var(--atr-outline)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ height: 120, borderRadius: 14, background: 'var(--atr-outline)', animation: 'pulse 1.5s infinite' }} />
            <div style={{ height: 280, borderRadius: 14, background: 'var(--atr-outline)', animation: 'pulse 1.5s infinite' }} />
          </div>
          <aside style={ds.sideCol}>
            <div style={{ height: 320, borderRadius: 14, background: 'var(--atr-outline)', animation: 'pulse 1.5s infinite' }} />
          </aside>
        </div>
      </div>
      <SiteFooter />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

function ErrorState({ error, onRetry }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg-soft)' }}>
      <TopNav active="Explore" />
      <div
        style={{
          maxWidth: 480,
          margin: '80px auto',
          padding: '24px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          &#x26A0;&#xFE0F;
        </div>
        <h1
          style={{
            fontSize: 24,
            color: 'var(--atr-text)',
            margin: '0 0 8px',
          }}
        >
          Gagal memuat data
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--atr-text-muted)',
            margin: '0 0 24px',
          }}
        >
          {error?.message || 'Terjadi kesalahan. Silakan coba lagi.'}
        </p>
        <button
          onClick={onRetry}
          style={{
            background: 'var(--atr-purple)',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '12px 32px',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'var(--atr-font-sans)',
          }}
        >
          Coba Lagi
        </button>
      </div>
      <SiteFooter />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg-soft)' }}>
      <TopNav active="Explore" />
      <div
        style={{
          maxWidth: 480,
          margin: '80px auto',
          padding: '24px 16px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>
          &#x1F50D;
        </div>
        <h1
          style={{
            fontSize: 24,
            color: 'var(--atr-text)',
            margin: '0 0 8px',
          }}
        >
          Desa wisata tidak ditemukan
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--atr-text-muted)',
            margin: 0,
          }}
        >
          Halaman yang Anda cari tidak tersedia atau telah dihapus.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}

export default function VillageDetailPage() {
  const { slug } = useParams();
  const { village, isLoading, isError, error } = useVillage(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!village) return <NotFound />;

  const regionParts = village.region ? village.region.split(",") : [];
  const kota = regionParts[0] ? regionParts[0].trim() : "Manggarai";
  const provinsi = regionParts[1] ? regionParts[1].trim() : "Nusa Tenggara Timur";

  return (
    <div data-screen-label="Tourism Village Detail" style={{ minHeight: '100vh', background: 'var(--atr-bg-soft)' }}>
      <TopNav active="Explore" />
      <div style={ds.pageWrap}>
        <div style={ds.crumbBar}>
          <div style={{ width: "100%" }}>
            <Breadcrumb
              items={["Jelajahi", provinsi, kota, "Desa Wisata", village.name]}
            />
          </div>
        </div>
        <div style={ds.containerWide}>
          <DetailHero village={village} />
        </div>
        <div style={ds.twoCol}>
          <div style={ds.mainCol}>
            <VillageHeader village={village} />
            <VillageAbout village={village} />
            <VillageActivities village={village} />
            <VillagePackages village={village} />
            <VillageAttractions village={village} />
            <VillageFacilities village={village} />
            <VillageAccess village={village} />
            <VillageGallery village={village} />
            <VillageReviews village={village} />
            <SimilarVillages village={village} />
          </div>
          <aside style={ds.sideCol}>
            <ContactCard village={village} />
            <CertsCard village={village} />
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
