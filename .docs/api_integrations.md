# API Integration Strategy — UI Interaction & UX Patterns

> **Status:** Draft — not yet implemented.
> **Goal:** Define how the UI layer interacts with the API via SWR, and the UX patterns for loading, error, empty, and offline states.

---

## 1. Data Fetching Library: SWR

All API communication uses [SWR](https://swr.vercel.app/) (stale-while-revalidate).

```bash
npm install swr
```

### Global SWR Config

```js
// src/lib/swr-config.js
'use client';

import { SWRConfig } from 'swr';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export const swrFetcher = async (url) => {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) {
    const error = new Error('API request failed');
    error.status = res.status;
    throw error;
  }
  return res.json();
};

export const defaultConfig = {
  fetcher: swrFetcher,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  dedupingInterval: 5000,     // Dedup same request within 5s
  errorRetryCount: 2,
  errorRetryInterval: 3000,   // Wait 3s before retry
};

export function SWRProvider({ children }) {
  return (
    <SWRConfig value={defaultConfig}>
      {children}
    </SWRConfig>
  );
}
```

### Integration in Root Layout

```jsx
// src/app/layout.jsx
import { SWRProvider } from '@/lib/swr-config';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
```

---

## 2. SWR Hook Patterns

### 2.1 Listing Page (with filters)

```js
// src/lib/hooks/use-destinations.js
'use client';

import useSWR from 'swr';
import { useState, useCallback } from 'react';

const PER_PAGE = 12;

export function useDestinations() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    island: '',
    province: '',
    search: '',
    sort: 'alpha',
  });
  const [allData, setAllData] = useState([]); // Accumulated load-more data

  const query = new URLSearchParams({
    page: String(page),
    limit: String(PER_PAGE),
    ...filters,
  }).toString();

  const { data, error, isLoading, isValidating } = useSWR(
    `/destinations?${query}`
  );

  // Accumulate for "Load More"
  useEffect(() => {
    if (data?.data) {
      setAllData((prev) => page === 1 ? data.data : [...prev, ...data.data]);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (data?.meta?.page < data?.meta?.totalPages) {
      setPage((p) => p + 1);
    }
  }, [data]);

  const resetFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setAllData([]);
  }, []);

  return {
    data: allData,
    meta: data?.meta,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    filters,
    setFilters: resetFilters,
    loadMore,
    hasMore: data ? data.meta.page < data.meta.totalPages : false,
  };
}
```

### 2.2 Detail Page (by slug)

```js
// src/lib/hooks/use-attraction.js
'use client';

import useSWR from 'swr';

export function useAttraction(slug) {
  const { data, error, isLoading } = useSWR(
    slug ? `/attractions/${slug}` : null, // null = don't fetch
    { revalidateOnFocus: false } // Detail data rarely changes
  );

  return {
    attraction: data,
    isLoading,
    isError: !!error,
    error,
  };
}
```

### 2.3 Dependent / Parallel Fetching

```js
// Fetch guide + reviews simultaneously
const { data: guide } = useSWR(`/guides/${slug}`);
const { data: reviews } = useSWR(`/reviews?entity=guide&id=${guide?.id}`);
```

---

## 3. UX State Patterns

Every API-dependent component must handle 4 states: **loading**, **error**, **empty**, and **success**.

### 3.1 Listing Page — Data Display

```jsx
function DestinationsList() {
  const { data, isLoading, isError, loadMore, hasMore } = useDestinations();

  // ── Loading (first load) ──
  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return <ErrorState message="Gagal memuat destinasi" onRetry={() => window.location.reload()} />;
  }

  // ── Empty ──
  if (data.length === 0) {
    return <EmptyState
      icon="🔍"
      title="Tidak ada destinasi yang sesuai filter kamu"
      action="Hapus filter"
      onAction={() => resetFilters({})}
    />;
  }

  // ── Success ──
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {data.map((item) => <DestinationCard key={item.id} {...item} />)}
      </div>

      {hasMore && (
        <button onClick={loadMore} disabled={isValidating}>
          {isValidating ? 'Memuat...' : `Muat lebih banyak (${meta.total - data.length} tersisa)`}
        </button>
      )}
    </>
  );
}
```

### 3.2 Detail Page

```jsx
function AttractionDetail({ slug }) {
  const { attraction, isLoading, isError } = useAttraction(slug);

  if (isLoading) return <DetailSkeleton />;
  if (isError) return <ErrorState message="Gagal memuat detail atraksi" />;
  if (!attraction) return null;

  return (
    <>
      <AttractionHero data={attraction} />
      <AttractionBody data={attraction} />
      <Sidebar>
        <BookingBox price={attraction.price} />
      </Sidebar>
    </>
  );
}
```

### 3.3 Shared Components

```jsx
// ── Loading Skeleton ──
function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--atr-bg-soft)',
      borderRadius: 14,
      aspectRatio: '3 / 4',
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  );
}

// ── Error State ──
function ErrorState({ message, onRetry }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 64 }}>⚠️</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>{message}</div>
      <button onClick={onRetry} style={{
        marginTop: 20,
        background: 'var(--atr-purple)', color: '#fff',
        borderRadius: 10, padding: '12px 24px', fontWeight: 700,
        border: 'none', cursor: 'pointer',
      }}>
        Coba lagi
      </button>
    </div>
  );
}

// ── Empty State ──
function EmptyState({ icon, title, action, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 64 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, marginTop: 12 }}>{title}</div>
      <button onClick={onAction} style={{
        marginTop: 20,
        background: 'var(--atr-purple)', color: '#fff',
        borderRadius: 10, padding: '12px 24px', fontWeight: 700,
        border: 'none', cursor: 'pointer',
      }}>
        {action}
      </button>
    </div>
  );
}
```

### 3.4 Visual Feedback During Revalidation

For "Load More" and filter changes, show subtle indicator without blocking UI:

```jsx
function FilterBar() {
  const { filters, setFilters, isValidating } = useDestinations();

  return (
    <div style={{ position: 'relative' }}>
      {/* Filter chips */}
      <button onClick={() => setFilters({ ...filters, sort: 'alpha' })}>
        A–Z
      </button>

      {/* Subtle loading indicator */}
      {isValidating && (
        <div style={{
          position: 'absolute', bottom: -4, left: 0, right: 0,
          height: 2, background: 'var(--atr-purple)',
          animation: 'slide 1s ease-in-out infinite',
        }} />
      )}
    </div>
  );
}
```

---

## 4. Mock Strategy (Development)

During development, SWR fetches from Next.js API Route handlers that serve mock data.

### Setup

```js
// src/app/api/attractions/route.js
import { ATTR_DATA, ATTR_FILTER_OPTIONS } from '@/data/attractions';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sort = searchParams.get('sort') || 'popular';

  let data = [...ATTR_DATA];

  // Apply filters (client or server)
  // ... (same logic as current client-side filter)

  // Paginate
  const total = data.length;
  const start = (page - 1) * limit;
  const paged = data.slice(start, start + limit);

  return Response.json({
    data: paged,
    meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
```

This way, during development, SWR calls `/api/attractions` → route handler → mock data. When production API is ready, swap `NEXT_PUBLIC_API_URL` to point to external server.

---

## 5. Fallback Chain

```
useSWR('/api/attractions')
  → Next.js rewrite (next.config.mjs)
    → External API (production) or API Route (dev)
      → Success: render data
      → Error: SWR retries 2x
        → Still fails: error state with retry button
```

SWR handles retries automatically via `errorRetryCount`. No manual fallback logic needed in components.

---

## 6. Optimistic UI

For toggles (save/favorite, follow):

```js
// src/lib/hooks/use-save.js
export function useSave(endpoint) {
  const { mutate } = useSWRConfig();
  const { data } = useSWR(endpoint);

  const toggleSave = useCallback(async (id, currentState) => {
    // Optimistic update
    const updated = data.map((item) =>
      item.id === id ? { ...item, save: !currentState } : item
    );
    mutate(endpoint, updated, false); // false = don't revalidate yet

    // Actual API call
    try {
      await fetch(`${API_BASE}${endpoint}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ save: !currentState }),
      });
    } catch {
      // Rollback on error
      mutate(endpoint, data, false);
    } finally {
      mutate(endpoint); // Revalidate
    }
  }, [data, endpoint, mutate]);

  return { toggleSave };
}
```

---

## 7. SWR Global Configuration Summary

| Config | Value | Rationale |
|--------|-------|-----------|
| `dedupingInterval` | 5000 | Prevent duplicate requests within 5s |
| `errorRetryCount` | 2 | Auto-retry twice before showing error |
| `errorRetryInterval` | 3000 | Wait 3s between retries |
| `revalidateOnFocus` | true | Keep data fresh when user returns to tab |
| `revalidateOnReconnect` | true | Refresh after network drop |
| `revalidateIfStale` | true (default) | Auto-refresh stale data in background |

Per-request overrides:
- Detail pages: `{ revalidateOnFocus: false }` (data rarely changes)
- Search/filter: default config (fresh data on interaction)

---

## 8. Component Mapping: Current → Future

| UI Component | Current (inline data) | Future (SWR) |
|-------------|----------------------|-------------|
| DestinationCard | `DESTINATIONS` array | `useDestinations().data` |
| FilterBar | client-side `.filter()` | calls `setFilters()` → SWR re-fetches |
| Load More | `visibleCount + 12` | `loadMore()` → next page |
| Save heart | `useState` toggle | `useSave().toggleSave` with optimistic UI |
| Detail sections | nested inline objects | `useAttraction(slug)` |
| Sidebar (booking) | inline | fetched from detail endpoint |

---

## 9. Migration Checklist

| Step | Description | Status |
|------|-------------|--------|
| 1 | Install SWR, create `src/lib/swr-config.js` | ⬜ |
| 2 | Wrap root layout with `<SWRProvider>` | ⬜ |
| 3 | Create `src/lib/hooks/use-destinations.js` | ⬜ |
| 4 | Create `src/lib/hooks/use-attraction.js` | ⬜ |
| 5 | Create `src/lib/hooks/use-guide.js` | ⬜ |
| 6 | Create `src/lib/hooks/use-village.js` | ⬜ |
| 7 | Create `src/lib/hooks/use-itinerary.js` | ⬜ |
| 8 | Create `src/lib/hooks/use-save.js` (optimistic) | ⬜ |
| 9 | Extract `SkeletonCard`, `ErrorState`, `EmptyState` as shared components | ⬜ |
| 10 | Create API route handlers for mock data | ⬜ |
| 11 | Migrate listing pages one by one | ⬜ |
| 12 | Migrate detail pages one by one | ⬜ |
| 13 | Set up environment variables for production API | ⬜ |

---

*Maintained in `.docs/api_integrations.md`. Update this file when SWR patterns or UX states change.*
