"use client";

import React, { useState } from "react";
import TopNav from "@/components/TopNav";
import Breadcrumb from "@/components/Breadcrumb";
import SiteFooter from "@/components/SiteFooter";
import { PROVINCES } from "@/data/explore-data";
import { useDestinations } from "@/lib/hooks/use-destinations";
import rg from "@/styles/destination-styles";

const SORT_OPTIONS = [
  { id: "alpha", label: "A\u2013Z" },
  { id: "alpha-rev", label: "Z\u2013A" },
  { id: "popular", label: "Terpopuler" },
  { id: "content", label: "Terbanyak konten" },
];

const ISLAND_LIST = [
  "Jawa",
  "Sumatera",
  "Kalimantan",
  "Sulawesi",
  "Bali & Nusa Tenggara",
  "Maluku",
  "Papua",
];

function ChevDownSm({ rotated }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transition: "transform .2s",
        transform: rotated ? "rotate(180deg)" : "none",
      }}
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="var(--atr-text-muted)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DestinationCard({ d }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="/"
      style={{ ...rg.destCard, ...(hover ? rg.destCardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={rg.destImgWrap}>
        <img src={d.img} alt="" style={rg.destImg} />
        <span style={rg.destTypeBadge}>{d.type}</span>
        {d.marketProducts > 0 && (
          <span style={rg.destMarketBadge}>
            {"\uD83D\uDED2"} {d.marketProducts} produk
          </span>
        )}
        {hover && (
          <div style={rg.destHoverOverlay}>
            <span style={rg.destHoverCTA}>
              Jelajahi {d.name} {"\u2192"}
            </span>
          </div>
        )}
      </div>
      <div style={rg.destBody}>
        <div style={rg.destHeaderRow}>
          <div style={{ flex: 1 }}>
            <h3 style={rg.destName}>{d.name}</h3>
            <div style={rg.destProvRow}>
              <span style={rg.destProv}>{d.province}</span>
              <span style={rg.destIslandPill}>{d.island}</span>
            </div>
          </div>
          <div style={rg.destRating}>
            <span style={rg.destStar}>{"\u2605"}</span>
            <strong>{d.rating}</strong>
          </div>
        </div>

        <div style={rg.destStatsBar}>
          <div style={rg.destStat}>
            <strong>{d.attr}</strong> <span>Atraksi</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.desa}</strong> <span>Desa</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.itin}</strong> <span>Itinerary</span>
          </div>
          <div style={rg.destStatDiv} />
          <div style={rg.destStat}>
            <strong>{d.guide}</strong> <span>Pemandu</span>
          </div>
        </div>

        <div style={rg.destTagRow}>
          {d.tags.slice(0, 3).map((t) => (
            <span key={t} style={rg.destTag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

function SkeletonCard() {
  const skeletonBg = { background: "var(--atr-outline)", borderRadius: 4 };
  return (
    <div style={{ ...rg.destCard, pointerEvents: "none" }}>
      <div style={{ ...rg.destImgWrap, background: "var(--atr-outline)" }} />
      <div style={rg.destBody}>
        <div
          style={{ ...skeletonBg, height: 20, width: "65%", marginBottom: 8 }}
        />
        <div
          style={{ ...skeletonBg, height: 14, width: "45%", marginBottom: 12 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ ...skeletonBg, height: 22, flex: 1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ErrorBanner() {
  return (
    <div style={rg.empty}>
      <div style={rg.emptyIcon}>{"\u26A0\uFE0F"}</div>
      <div style={rg.emptyTitle}>Gagal memuat data destinasi</div>
      <div style={rg.emptySub}>Silakan periksa koneksi kamu dan coba lagi</div>
    </div>
  );
}

export default function DestinationsPage() {
  const {
    data,
    pagination,
    isLoading,
    isValidating,
    isError,
    filters,
    setFilters,
    loadMore,
    hasMore,
  } = useDestinations();

  /* Multi-select and availability filters — kept client-side
     since the hook/API supports single-string island/province only. */
  const [selectedIslands, setSelectedIslands] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [avail, setAvail] = useState({
    attr: false,
    desa: false,
    guide: false,
  });

  /* UI-only local state */
  const [provDropdownOpen, setProvDropdownOpen] = useState(false);
  const [provSearch, setProvSearch] = useState("");

  /* Sync search and sort to the hook — drives server-side filtering */
  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilters({ ...filters, sort: e.target.value });
  };

  /* Client-side post-filter for values the hook doesn't support natively */
  const filtered = data.filter((d) => {
    if (selectedIslands.length > 0 && !selectedIslands.includes(d.island))
      return false;
    if (selectedProvinces.length > 0 && !selectedProvinces.includes(d.province))
      return false;
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.some((c) => d.tags.includes(c))
    )
      return false;
    if (avail.attr && d.attr <= 0) return false;
    if (avail.desa && d.desa <= 0) return false;
    if (avail.guide && d.guide <= 0) return false;
    return true;
  });

  /* Active filter chips */
  const activeFilters = [
    ...selectedIslands.map((i) => ({
      k: "island",
      v: i,
      remove: () => setSelectedIslands((prev) => prev.filter((x) => x !== i)),
    })),
    ...selectedProvinces.map((p) => ({
      k: "province",
      v: p,
      remove: () => setSelectedProvinces((prev) => prev.filter((x) => x !== p)),
    })),
    ...selectedCategories.map((c) => ({
      k: "category",
      v: c,
      remove: () =>
        setSelectedCategories((prev) => prev.filter((x) => x !== c)),
    })),
    ...(avail.attr
      ? [
          {
            k: "avail",
            v: "Tersedia Atraksi",
            remove: () => setAvail((prev) => ({ ...prev, attr: false })),
          },
        ]
      : []),
    ...(avail.desa
      ? [
          {
            k: "avail",
            v: "Tersedia Desa Wisata",
            remove: () => setAvail((prev) => ({ ...prev, desa: false })),
          },
        ]
      : []),
    ...(avail.guide
      ? [
          {
            k: "avail",
            v: "Tersedia Pemandu",
            remove: () => setAvail((prev) => ({ ...prev, guide: false })),
          },
        ]
      : []),
  ];

  function resetAll() {
    setFilters({ island: "", province: "", search: "", sort: "alpha" });
    setSelectedIslands([]);
    setSelectedProvinces([]);
    setSelectedCategories([]);
    setAvail({ attr: false, desa: false, guide: false });
    setProvSearch("");
    setProvDropdownOpen(false);
  }

  const provinceFilteredList = PROVINCES.filter((p) =>
    p.name.toLowerCase().includes(provSearch.toLowerCase()),
  );

  const headingTitle =
    selectedProvinces.length === 1
      ? `Destinasi di ${selectedProvinces[0]}`
      : selectedIslands.length === 1
        ? `Destinasi di ${selectedIslands[0]}`
        : "Semua Destinasi Wisata";

  /* ─── Loading state (initial fetch) ─── */
  if (isLoading && data.length === 0) {
    return (
      <div data-screen-label="Region Hub">
        <TopNav active="Destinasi" />
        <section style={rg.header}>
          <div style={rg.headerInner}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Semua Destinasi"]} />
            <h1 style={rg.h1}>Semua Destinasi Wisata</h1>
            <p style={rg.subtitle}>&nbsp;</p>
          </div>
        </section>
        <section style={rg.gridSection}>
          <div style={rg.destGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* ─── Error state ─── */
  if (isError) {
    return (
      <div data-screen-label="Region Hub">
        <TopNav active="Destinasi" />
        <section style={rg.header}>
          <div style={rg.headerInner}>
            <Breadcrumb items={["Beranda", "Jelajahi", "Semua Destinasi"]} />
            <h1 style={rg.h1}>Semua Destinasi Wisata</h1>
          </div>
        </section>
        <ErrorBanner />
        <SiteFooter />
      </div>
    );
  }

  return (
    <div data-screen-label="Region Hub">
      <TopNav active="Destinasi" />

      {/* Header */}
      <section style={rg.header}>
        <div style={rg.headerInner}>
          <Breadcrumb
            items={[
              "Beranda",
              "Jelajahi",
              selectedProvinces[0] || selectedIslands[0] || "Semua Destinasi",
            ]}
          />
          <h1 style={rg.h1}>{headingTitle}</h1>
          <p style={rg.subtitle}>
            {filtered.length} kota/kabupaten tersedia di Atourin
            {isValidating && " \u2022 Memuat\u2026"}
          </p>
          {selectedProvinces.length === 1 && (
            <div style={rg.provMiniHero}>
              <span style={rg.provHeroIcon}>{"\uD83D\uDCCD"}</span>
              <span>
                <strong>{selectedProvinces[0]}</strong>, Provinsi dengan{" "}
                {filtered.reduce((a, b) => a + b.attr, 0)} atraksi dan{" "}
                {filtered.reduce((a, b) => a + b.desa, 0)} desa wisata terdaftar
                di Atourin.
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Sticky filter bar */}
      <div style={rg.filterStick}>
        <div style={rg.filterInner}>
          <div style={rg.filterSearchWrap}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
              />
              <path
                d="M20 20l-3.5-3.5"
                stroke="var(--atr-text-muted)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              style={rg.filterSearch}
              placeholder="Cari kota atau kabupaten..."
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Province multiselect */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setProvDropdownOpen(!provDropdownOpen)}
              style={rg.filterBtn}
            >
              <span>
                Provinsi{" "}
                {selectedProvinces.length > 0 && (
                  <span style={rg.filterCount}>{selectedProvinces.length}</span>
                )}
              </span>
              <ChevDownSm rotated={provDropdownOpen} />
            </button>
            {provDropdownOpen && (
              <div style={rg.provDropdown}>
                <input
                  style={rg.provDropdownSearch}
                  placeholder="Cari provinsi..."
                  value={provSearch}
                  onChange={(e) => setProvSearch(e.target.value)}
                />
                <div style={rg.provDropdownList}>
                  {provinceFilteredList.map((p) => {
                    const checked = selectedProvinces.includes(p.name);
                    return (
                      <button
                        key={p.name}
                        onClick={() => {
                          if (checked)
                            setSelectedProvinces((prev) =>
                              prev.filter((x) => x !== p.name),
                            );
                          else
                            setSelectedProvinces((prev) => [...prev, p.name]);
                        }}
                        style={rg.provDropdownItem}
                      >
                        <span
                          style={{
                            ...rg.checkbox,
                            ...(checked ? rg.checkboxOn : {}),
                          }}
                        >
                          {checked && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 12l5 5L20 7"
                                stroke="#fff"
                                strokeWidth="3"
                                strokeLinecap="round"
                              />
                            </svg>
                          )}
                        </span>
                        <span>{p.name}</span>
                        <span style={rg.provDropdownIsland}>{p.island}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Island chips */}
          <div style={rg.islandStrip}>
            {ISLAND_LIST.map((i) => {
              const active = selectedIslands.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (active)
                      setSelectedIslands((prev) => prev.filter((x) => x !== i));
                    else setSelectedIslands((prev) => [...prev, i]);
                  }}
                  style={{
                    ...rg.islandStripChip,
                    ...(active ? rg.islandStripChipOn : {}),
                  }}
                >
                  {i}
                </button>
              );
            })}
          </div>

          {/* Avail checkboxes */}
          <div style={rg.availRow}>
            {[
              { k: "attr", l: "Atraksi" },
              { k: "desa", l: "Desa Wisata" },
              { k: "guide", l: "Pemandu" },
            ].map((a) => (
              <label key={a.k} style={rg.availLabel}>
                <input
                  type="checkbox"
                  checked={avail[a.k]}
                  onChange={(e) =>
                    setAvail((prev) => ({ ...prev, [a.k]: e.target.checked }))
                  }
                  style={rg.availInput}
                />
                <span
                  style={{
                    ...rg.availCheck,
                    ...(avail[a.k] ? rg.availCheckOn : {}),
                  }}
                >
                  {avail[a.k] && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12l5 5L20 7"
                        stroke="#fff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
                {a.l}
              </label>
            ))}
          </div>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={handleSortChange}
            style={rg.sortSelect}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                Urutkan: {s.label}
              </option>
            ))}
          </select>

          {activeFilters.length > 0 && (
            <button onClick={resetAll} style={rg.resetBtn}>
              Reset filter
            </button>
          )}
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div style={rg.activeChipsRow}>
            <span style={rg.activeLabel}>Filter aktif:</span>
            {activeFilters.map((f, i) => (
              <span key={i} style={rg.activeChip}>
                {f.v}
                <button onClick={f.remove} style={rg.activeChipX}>
                  {"\u00D7"}
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Result count + grid */}
      <section style={rg.gridSection}>
        <div style={rg.resultRow}>
          <span style={rg.resultText}>
            Menampilkan <strong>{filtered.length}</strong> dari{" "}
            <strong>{pagination?.total ?? filtered.length}</strong> destinasi
          </span>
        </div>

        {filtered.length === 0 ? (
          <div style={rg.empty}>
            <div style={rg.emptyIcon}>{"\uD83D\uDD0D"}</div>
            <div style={rg.emptyTitle}>
              Tidak ada destinasi yang sesuai filter kamu
            </div>
            <div style={rg.emptySub}>
              Coba hapus beberapa filter atau cari dengan kata kunci lain
            </div>
            <button onClick={resetAll} style={rg.emptyBtn}>
              Lihat semua destinasi
            </button>
          </div>
        ) : (
          <>
            <div style={rg.destGrid}>
              {filtered.map((d, i) => (
                <DestinationCard key={i} d={d} />
              ))}
            </div>
            {hasMore && (
              <div style={rg.loadMoreWrap}>
                <button onClick={loadMore} style={rg.loadMoreBtn}>
                  Muat lebih banyak (
                  {isValidating
                    ? "\u2026"
                    : `${pagination ? pagination.total - data.length : 0} tersisa`}
                  )
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
