'use client';

import { useParams } from 'next/navigation';
import TopNav from '@/components/TopNav';
import SiteFooter from '@/components/SiteFooter';
import { useVillage } from '@/lib/hooks/use-village';

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Desa Wisata" />
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
            width: '60%',
            borderRadius: 'var(--atr-radius-md)',
            background: 'var(--atr-outline)',
            marginBottom: 'var(--atr-space-3)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
        <div
          style={{
            height: 20,
            width: '40%',
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
      <TopNav active="Desa Wisata" />
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
      <TopNav active="Desa Wisata" />
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
          Desa wisata tidak ditemukan
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

function formatPrice(price) {
  if (price === 0) return 'Gratis';
  return `Rp${price.toLocaleString('id-ID')}`;
}

export default function VillageDetailPage() {
  const { slug } = useParams();
  const { village, isLoading, isError, error } = useVillage(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!village) return <NotFound />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Desa Wisata" />
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
            src={village.img}
            alt={village.name}
            style={{
              width: '100%',
              height: 360,
              objectFit: 'cover',
              display: 'block',
            }}
          />
          {village.featured && (
            <span
              style={{
                position: 'absolute',
                top: 'var(--atr-space-3)',
                left: 'var(--atr-space-3)',
                background: 'var(--atr-yellow)',
                color: 'var(--atr-text)',
                fontSize: 'var(--atr-fs-label-sm)',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: 'var(--atr-radius-pill)',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              Featured
            </span>
          )}
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
          {village.name}
        </h1>
        <p
          style={{
            fontSize: 'var(--atr-fs-body-lg)',
            color: 'var(--atr-text-muted)',
            margin: '0 0 var(--atr-space-3)',
          }}
        >
          {village.region}
        </p>

        {/* ADWI Status chip */}
        {village.adwi && (
          <span
            style={{
              display: 'inline-block',
              background: village.adwiBg || 'var(--atr-bg-soft)',
              color: village.adwiFg || 'var(--atr-text)',
              fontSize: 'var(--atr-fs-label-sm)',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 'var(--atr-radius-pill)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 'var(--atr-space-5)',
            }}
          >
            {village.adwi}
          </span>
        )}

        {/* Info grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--atr-space-4)',
            marginBottom: 'var(--atr-space-6)',
          }}
        >
          <InfoCard label="Rating" value={`\u2605 ${village.rating}`} />
          <InfoCard label="Harga homestay" value={formatPrice(village.price)} />
          <InfoCard label="Keluarga" value={`${village.families} KK`} />
          <InfoCard label="Tema" value={village.theme || '-'} />
        </div>

        {/* Signature */}
        {village.signature && (
          <div
            style={{
              background: 'var(--atr-bg-soft)',
              borderRadius: 'var(--atr-radius-md)',
              padding: 'var(--atr-space-4)',
              marginBottom: 'var(--atr-space-4)',
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
              Ciri khas
            </div>
            <div
              style={{
                fontSize: 'var(--atr-fs-body-lg)',
                fontWeight: 600,
                color: 'var(--atr-text)',
              }}
            >
              {village.signature}
            </div>
          </div>
        )}

        {/* Activities */}
        {village.activities && village.activities.length > 0 && (
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
                marginBottom: 'var(--atr-space-2)',
              }}
            >
              Aktivitas
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {village.activities.map((a) => (
                <span
                  key={a}
                  style={{
                    background: 'var(--atr-bg)',
                    border: '1px solid var(--atr-outline)',
                    borderRadius: 'var(--atr-radius-pill)',
                    padding: '4px 12px',
                    fontSize: 'var(--atr-fs-body-sm)',
                    fontWeight: 600,
                    color: 'var(--atr-text)',
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        )}
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
