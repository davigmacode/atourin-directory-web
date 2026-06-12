'use client';

import { useParams } from 'next/navigation';
import TopNav from '@/components/TopNav';
import SiteFooter from '@/components/SiteFooter';
import { useDestination } from '@/lib/hooks/use-destination';

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Destinasi" />
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
        }}
      >
        <div
          style={{
            height: 320,
            borderRadius: 'var(--atr-radius-lg)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-5)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 32,
            width: '50%',
            borderRadius: 'var(--atr-radius-md)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-3)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 20,
            width: '35%',
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
      <TopNav active="Destinasi" />
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
      <TopNav active="Destinasi" />
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
          Destinasi tidak ditemukan
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

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { destination, isLoading, isError, error } = useDestination(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!destination) return <NotFound />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Destinasi" />
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
            src={destination.img}
            alt={destination.name}
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              display: 'block',
            }}
          />
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
          {destination.name}
        </h1>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-lg)',
            color: 'var(--atr-text-muted)',
            margin: '0 0 var(--atr-space-1)',
          }}
        >
          {destination.type} &middot; {destination.province}
        </p>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-md)',
            color: 'var(--atr-text-muted)',
            margin: '0 0 var(--atr-space-4)',
          }}
        >
          {destination.island}
        </p>

        {/* Tags */}
        {destination.tags && destination.tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              marginBottom: 'var(--atr-space-5)',
            }}
          >
            {destination.tags.map((t) => (
              <span
                key={t}
                style={{
                  background: 'var(--atr-purple-50)',
                  color: 'var(--atr-purple)',
                  fontSize: 'var(--atr-fs-label-sm)',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: 'var(--atr-radius-pill)',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--atr-space-4)',
            marginBottom: 'var(--atr-space-6)',
          }}
        >
          <InfoCard label="Rating" value={`\u2605 ${destination.rating}`} />
          <InfoCard label="Atraksi" value={`${destination.attr} tempat`} />
          <InfoCard label="Desa wisata" value={`${destination.desa} desa`} />
          <InfoCard label="Itinerary" value={`${destination.itin} paket`} />
          <InfoCard label="Pemandu" value={`${destination.guide} orang`} />
          <InfoCard label="Produk UMKM" value={`${destination.marketProducts} produk`} />
        </div>

        {/* Popularity badge */}
        <div
          style={{
            background: 'var(--atr-bg-soft)',
            borderRadius: 'var(--atr-radius-md)',
            padding: 'var(--atr-space-4)',
            textAlign: 'center',
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
            Popularitas
          </div>
          <div
            style={{
              fontSize: 'var(--atr-fs-display-md)',
              fontWeight: 700,
              color: 'var(--atr-purple)',
            }}
          >
            {destination.popular}%
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
