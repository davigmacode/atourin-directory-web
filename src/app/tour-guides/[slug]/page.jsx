'use client';

import { useParams } from 'next/navigation';
import TopNav from '@/components/TopNav';
import SiteFooter from '@/components/SiteFooter';
import { useGuide } from '@/lib/hooks/use-guide';

function LoadingSkeleton() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Pemandu" />
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 'var(--atr-space-5)',
            alignItems: 'center',
            marginBottom: 'var(--atr-space-6)',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'var(--atr-outline)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 28,
                width: '50%',
                borderRadius: 'var(--atr-radius-md)',
                background: 'var(--atr-outline)',
                marginBottom: 'var(--atr-space-2)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
            <div
              style={{
                height: 18,
                width: '30%',
                borderRadius: 'var(--atr-radius-md)',
                background: 'var(--atr-outline)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
        <div
          style={{
            height: 100,
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
      <TopNav active="Pemandu" />
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
      <TopNav active="Pemandu" />
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
          Pemandu tidak ditemukan
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
  return `Rp${price.toLocaleString('id-ID')}/hari`;
}

export default function GuideDetailPage() {
  const { slug } = useParams();
  const { guide, isLoading, isError, error } = useGuide(slug);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <ErrorState error={error} onRetry={() => window.location.reload()} />;
  if (!guide) return <NotFound />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--atr-bg)' }}>
      <TopNav active="Pemandu" />
      <main
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: 'var(--atr-space-6) var(--atr-space-4)',
        }}
      >
        {/* Profile header */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--atr-space-5)',
            alignItems: 'flex-start',
            marginBottom: 'var(--atr-space-6)',
          }}
        >
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <img
              src={guide.img}
              alt={guide.name}
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                objectFit: 'cover',
                display: 'block',
                border: '3px solid var(--atr-outline)',
              }}
            />
            {guide.verified && (
              <span
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: 'var(--atr-arti)',
                  color: '#fff',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  border: '2px solid var(--atr-bg)',
                }}
              >
                &#x2713;
              </span>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1
              style={{
                fontSize: 'var(--atr-fs-display-md)',
                fontWeight: 700,
                color: 'var(--atr-text)',
                margin: '0 0 var(--atr-space-1)',
                lineHeight: 1.2,
              }}
            >
              {guide.name}
            </h1>
            <p
              style={{
                fontSize: 'var(--atr-fs-body-lg)',
                color: 'var(--atr-text-muted)',
                margin: '0 0 var(--atr-space-3)',
              }}
            >
              {guide.region}
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {guide.spec?.map((s) => (
                <span
                  key={s}
                  style={{
                    background: guide.specBg || 'var(--atr-bg-soft)',
                    color: guide.specFg || 'var(--atr-text)',
                    fontSize: 'var(--atr-fs-label-sm)',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--atr-radius-pill)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
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
          <InfoCard label="Rating" value={`\u2605 ${guide.rating}`} />
          <InfoCard label="Harga" value={formatPrice(guide.price)} />
          <InfoCard label="Perjalanan" value={`${guide.trips} trip`} />
          <InfoCard label="Pengalaman" value={guide.exp || '-'} />
        </div>

        {/* Languages */}
        {guide.langs && guide.langs.length > 0 && (
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
                marginBottom: 'var(--atr-space-2)',
              }}
            >
              Bahasa
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {guide.langs.map((l) => (
                <span
                  key={l}
                  style={{
                    background: 'var(--atr-bg)',
                    border: '1px solid var(--atr-outline)',
                    borderRadius: 'var(--atr-radius-pill)',
                    padding: '4px 10px',
                    fontSize: 'var(--atr-fs-body-sm)',
                    fontWeight: 600,
                    color: 'var(--atr-text)',
                  }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {guide.certs && guide.certs.length > 0 && (
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
              Sertifikasi
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {guide.certs.map((c) => (
                <span
                  key={c}
                  style={{
                    background: 'var(--atr-bg)',
                    border: '1px solid var(--atr-outline)',
                    borderRadius: 'var(--atr-radius-pill)',
                    padding: '4px 10px',
                    fontSize: 'var(--atr-fs-body-sm)',
                    fontWeight: 600,
                    color: 'var(--atr-text)',
                  }}
                >
                  {c}
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
