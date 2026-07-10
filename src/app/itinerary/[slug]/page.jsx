'use client';

import { useParams } from 'next/navigation';
import { TopNav, SiteFooter } from '@/components/layout';
import { useItinerary } from '@/lib/hooks/use-itinerary';

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Itinerary" />
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
        }}
      >
        <div
          style={{
            height: 280,
            borderRadius: 'var(--atr-radius-lg)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-5)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 32,
            width: '70%',
            borderRadius: 'var(--atr-radius-md)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-3)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 20,
            width: '30%',
            borderRadius: 'var(--atr-radius-md)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-4)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 80,
            borderRadius: 'var(--atr-radius-md)',
            background: 'var(--atr-outline)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
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
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Itinerary" />
      <div
        style={{
          maxWidth: 480,
          margin: '80px auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 'var(--atr-space-4)' }}>
          &#x26A0;&#xFE0F;
        </div>
        <h1
          style={{
            fontSize: 'var(--atr-fs-headline-md)',
            color: 'var(--atr-text)',
            margin: '0 0 var(--atr-space-2)',
          }}
        >
          Gagal memuat data
        </h1>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-md)',
            color: 'var(--atr-text-muted)',
            margin: '0 0 var(--atr-space-5)',
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
            borderRadius: 'var(--atr-radius-pill)',
            padding: '12px 32px',
            fontSize: 'var(--atr-fs-title-sm)',
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
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Itinerary" />
      <div
        style={{
          maxWidth: 480,
          margin: '80px auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 'var(--atr-space-4)' }}>
          &#x1F50D;
        </div>
        <h1
          style={{
            fontSize: 'var(--atr-fs-headline-md)',
            color: 'var(--atr-text)',
            margin: '0 0 var(--atr-space-2)',
          }}
        >
          Itinerary tidak ditemukan
        </h1>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-md)',
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

export default function ItineraryDetailPage() {
  const { slug } = useParams();
  const { itinerary, isLoading, isError, error } = useItinerary(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!itinerary) return <NotFound />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Itinerary" />
      <main
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
        }}
      >
        {/* Hero Image */}
        <div
          style={{
            borderRadius: 'var(--atr-radius-lg)',
            overflow: 'hidden',
            marginBottom: 'var(--atr-space-5)',
            position: 'relative',
          }}
        >
          <img
            src={itinerary.img}
            alt={itinerary.title}
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: 'var(--atr-space-3)',
              left: 'var(--atr-space-3)',
              background: 'var(--atr-purple)',
              color: '#fff',
              fontSize: 'var(--atr-fs-label-sm)',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 'var(--atr-radius-pill)',
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {itinerary.tag}
          </span>
        </div>

        {/* Header */}
        <h1
          style={{
            fontSize: 'var(--atr-fs-display-md)',
            fontWeight: 700,
            color: 'var(--atr-text)',
            margin: '0 0 var(--atr-space-1)',
            lineHeight: 1.2,
          }}
        >
          {itinerary.title}
        </h1>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-lg)',
            color: 'var(--atr-text-muted)',
            margin: '0 0 var(--atr-space-2)',
          }}
        >
          {itinerary.city}
        </p>

        {/* Meta row */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--atr-space-3)',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 'var(--atr-space-5)',
          }}
        >
          <MetaChip label={itinerary.days} />
        </div>

        {/* Info grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--atr-space-4)',
            marginBottom: 'var(--atr-space-6)',
          }}
        >
          <InfoCard label="Rating" value={`\u2605 ${itinerary.rating}`} />
          <InfoCard label="Harga" value={itinerary.price} />
          <InfoCard label="Ulasan" value={`${itinerary.reviews} review`} />
          <InfoCard label="Dilihat" value={`${itinerary.views} kali`} />
        </div>

        {/* Author info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--atr-space-3)',
            background: 'var(--atr-bg-soft)',
            borderRadius: 'var(--atr-radius-md)',
            padding: 'var(--atr-space-4)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'var(--atr-fs-body-md)',
                fontWeight: 700,
                color: 'var(--atr-text)',
              }}
            >
              {itinerary.author}
            </div>
            <div
              style={{
                fontSize: 'var(--atr-fs-body-sm)',
                color: 'var(--atr-text-muted)',
              }}
            >
              {itinerary.role}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: 'var(--atr-bg-soft)',
        borderRadius: 'var(--atr-radius-md)',
        padding: 'var(--atr-space-4)',
      }}
    >
      <div
        style={{
          fontSize: 'var(--atr-fs-label-sm)',
          color: 'var(--atr-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: 1,
          fontWeight: 700,
          marginBottom: 'var(--atr-space-1)',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 'var(--atr-fs-title-lg)',
          fontWeight: 700,
          color: 'var(--atr-text)',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MetaChip({ label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        borderRadius: 'var(--atr-radius-pill)',
        fontSize: 'var(--atr-fs-label-sm)',
        fontWeight: 700,
        background: 'var(--atr-bg-soft)',
        color: 'var(--atr-text)',
        border: '1px solid var(--atr-outline)',
      }}
    >
      {label}
    </span>
  );
}
