# API Requirements — Atourin Directory Web

> **Status:** Draft — API not yet implemented. All data currently lives in hardcoded JS constants.
> **Goal:** Define entity model, relationships, and per-page API requirements for future backend integration.

---

## 1. Entity Relationship Diagram

```
┌────────────┐     ┌──────────────────┐
│   Island   │1──N→│    Province      │
│ (7 items)  │     │ (34 items)       │
└────────────┘     └────────┬─────────┘
                            │
                    ┌───────┴──────────┐
                    │                  │
                    ▼                  ▼
          ┌──────────────────┐  ┌──────────────────┐
          │   Destination    │  │    Village        │
          │ (kota/kabupaten) │  │ (desa wisata)     │
          └────────┬─────────┘  └────────┬─────────┘
                   │                     │
         ┌─────────┼──────────┐          │
         │         │          │          │
         ▼         ▼          ▼          │
   ┌─────────┐ ┌────────┐ ┌────────┐    │
   │Attraction│ │TourGuide│ │Itinerary│   │
   └─────────┘ └────────┘ └────┬───┘    │
                               │        │
                    ┌──────────┘        │
                    ▼                   ▼
              ┌────────────┐   ┌──────────────┐
              │  Activity  │   │  VillagePkg   │
              │ (per-day)  │   │  (paket wisata)│
              └────────────┘   └──────────────┘
```

### Cross-cutting entities (not in hierarchy)

| Entity | Relates to | Description |
|--------|-----------|-------------|
| **Review** | Attraction, Guide, Itinerary, Village | User reviews with rating, text, photos |
| **Facility** | Attraction, Village | Available amenities (toilet, parking, etc.) |
| **Package** | Attraction, Guide, Village | Booking packages with pricing |
| **Category** | Attraction, Itinerary | Taxonomy (Alam, Budaya, Sejarah, etc.) |
| **Certification** | Guide | Guide credentials (HPI, BNSP, PADI, etc.) |
| **GalleryImage** | Attraction, Village, Guide | Photo gallery with captions |

---

## 2. Entity Definitions

### 2.1 Island

```json
{
  "id": "string (slug)",
  "name": "Sumatera | Jawa | Kalimantan | Sulawesi | Bali & Nusa Tenggara | Maluku | Papua",
  "provinces": "number",
  "img": "url",
  "color": "hex"
}
```

**Source:** `src/data/explore-data.js` → `ISLANDS`

### 2.2 Province

```json
{
  "id": "string (slug)",
  "name": "string",
  "islandId": "string (ref: Island.id)",
  "img": "url",
  "dest": "number (destination count)",
  "attr": "number (attraction count)",
  "desa": "number (village count)",
  "popular": "number (popularity score 0-100)"
}
```

**Source:** `src/data/explore-data.js` → `PROVINCES`

### 2.3 Destination (Kota/Kabupaten)

```json
{
  "id": "string (slug)",
  "name": "string",
  "type": "Kota | Kabupaten",
  "provinceId": "string (ref: Province.id)",
  "islandId": "string (ref: Island.id)",
  "img": "url",
  "attr": "number",
  "desa": "number",
  "itin": "number",
  "guide": "number",
  "rating": "number (0-5)",
  "tags": "string[]",
  "marketProducts": "number",
  "popular": "number (0-100)"
}
```

**Page:** `/destinations`
**Source:** Inline in `src/app/destinations/page.jsx` → `DESTINATIONS`

### 2.4 Attraction

```json
{
  "id": "string (slug)",
  "name": "string",
  "cat": "string (category name)",
  "catBg": "hex",
  "catFg": "hex",
  "region": "string (kota, provinsi)",
  "price": "number (rupiah)",
  "rating": "number (0-5)",
  "reviews": "number",
  "hours": "string (operating hours)",
  "trekking": "boolean",
  "save": "boolean",
  "img": "url"
}
```

**Detail:**

```json
{
  "id": "string (slug)",
  "name": "string",
  "cat": "string",
  "catBg": "hex",
  "catFg": "hex",
  "kecamatan": "string",
  "kota": "string",
  "provinsi": "string",
  "rating": "number",
  "reviews": "number",
  "coords": { "lat": "number", "lng": "number" },
  "tags": "string[]",
  "shortDesc": "string",
  "longDesc": "string",
  "images": "url[]",
  "totalPhotos": "number",
  "facilities": "Facility[]",
  "tips": "Tip[]",
  "nearbyAttractions": "Attraction[]",
  "relatedItineraries": "Itinerary[]",
  "reviews": "Review[]",
  "packages": "Package[]"
}
```

**Pages:** `/attractions` (list), `/attractions/{slug}` (detail)
**Source:** Inline in `src/app/attractions/page.jsx` → `ATTR_DATA`, `ATTR_FILTER_OPTIONS`, `FACILITIES`, etc.

### 2.5 Tour Guide

```json
{
  "id": "string (slug)",
  "name": "string",
  "avatar": "url",
  "region": "string",
  "spec": "string[]",
  "specBg": "hex",
  "specFg": "hex",
  "langs": "string[]",
  "certs": "string[]",
  "rating": "number",
  "trips": "number",
  "price": "number (rupiah/hari)",
  "exp": "string",
  "verified": "boolean"
}
```

**Detail:**

```json
{
  "id": "string (slug)",
  "name": "string",
  "tagline": "string",
  "avatar": "url",
  "cover": "url",
  "verified": "boolean",
  "superhost": "boolean",
  "basedIn": "string",
  "origin": "string",
  "years": "number",
  "trips": "number",
  "rating": "number",
  "reviews": "number",
  "responseTime": "string",
  "responseRate": "number",
  "joined": "string (month year)",
  "languages": [
    { "flag": "emoji", "name": "string", "level": "Native | Fluent | Conversational" }
  ],
  "specialties": "string[]",
  "about": "string",
  "certifications": "Certification[]",
  "packages": "Package[]",
  "gallery": "GalleryImage[]",
  "reviews": "Review[]",
  "similarGuides": "TourGuide[]"
}
```

**Pages:** `/tour-guides` (list), `/tour-guides/{slug}` (detail)
**Source:** Inline in `src/app/tour-guides/page.jsx` → `GUIDE_DATA`, `/welli-wilyanto/page.jsx` → `GUIDE`, `GUIDE_PACKAGES`, etc.

### 2.6 Village

```json
{
  "id": "string (slug)",
  "name": "string",
  "img": "url",
  "region": "string",
  "adwi": "Mandiri | Maju | Berkembang | Rintisan",
  "adwiBg": "hex",
  "adwiFg": "hex",
  "theme": "string",
  "activities": "string[]",
  "price": "number (rupiah/malam)",
  "rating": "number",
  "families": "number (KK homestay)",
  "signature": "string",
  "featured": "boolean"
}
```

**Detail:**

```json
{
  "id": "string (slug)",
  "name": "string",
  "status": "string",
  "statusFg": "hex",
  "statusBg": "hex",
  "statusDesc": "string",
  "founded": "number (year)",
  "kecamatan": "string",
  "kota": "string",
  "provinsi": "string",
  "rating": "number",
  "reviews": "number",
  "tags": "string[]",
  "shortDesc": "string",
  "longDesc": "string",
  "cover": "url",
  "gallery": "url[]",
  "activities": "VillageActivity[]",
  "packages": "Package[]",
  "facilities": "Facility[]",
  "certifications": "Certification[]",
  "reviews": "Review[]",
  "relatedVillages": "Village[]",
  "accessSteps": "AccessStep[]",
  "contactInfo": {
    "name": "string",
    "phone": "string",
    "email": "string",
    "website": "string",
    "social": { "ig": "url", "fb": "url", "tt": "url" }
  }
}
```

**Pages:** `/tourism-villages` (list), `/tourism-villages/{slug}` (detail)
**Source:** Inline in `src/app/tourism-villages/page.jsx` → `VIL_DATA`, `/wae-rebo/page.jsx` → `VLG`, `ACTIVITIES`, `PACKAGES`, etc.

### 2.7 Itinerary

```json
{
  "id": "string (slug)",
  "img": "url",
  "days": "string (e.g. '3 Hari · 2 Malam')",
  "city": "string",
  "tag": "string (Adventure | Culture | Family | etc.)",
  "title": "string",
  "author": "string",
  "role": "string",
  "price": "string (e.g. 'Rp 1.2jt')",
  "rating": "number",
  "reviews": "number",
  "views": "number",
  "save": "boolean",
  "day1": "string[] (day preview)"
}
```

**Detail:**

```json
{
  "id": "string (slug)",
  "title": "string",
  "subtitle": "string",
  "duration": "string",
  "location": "string",
  "tags": "string[]",
  "difficulty": "string",
  "budget": {
    "total": "number",
    "currency": "IDR",
    "breakdown": [
      { "label": "string", "amount": "number" }
    ]
  },
  "days": [
    {
      "day": "number",
      "label": "string (day name)",
      "date": "string",
      "title": "string",
      "activities": "Activity[]"
    }
  ],
  "author": {
    "name": "string",
    "avatar": "url",
    "role": "string",
    "rating": "number",
    "reviews": "number",
    "itineraries": "number",
    "followers": "number"
  },
  "highlights": "string[]",
  "bestTime": "string",
  "whatToBring": "string[]",
  "faq": [{ "q": "string", "a": "string" }],
  "reviews": "Review[]",
  "relatedItineraries": "Itinerary[]"
}
```

**Pages:** `/itinerary` (list), `/itinerary/{slug}` (detail)
**Source:** Inline in `src/app/itinerary/page.jsx` → `ITIN_DATA`, `/lombok-lengkap/page.jsx` → `DAYS`, `ACTIVITIES_BY_DAY`, etc.

### 2.8 Activity (within Itinerary Day)

```json
{
  "id": "number (order)",
  "time": "string (HH:mm)",
  "end": "string (HH:mm)",
  "dur": "string (duration)",
  "title": "string",
  "type": "Transport | Sightseeing | Beach | Food | Culture | Adventure | Nature",
  "typeColor": { "bg": "hex", "fg": "hex" },
  "location": "string",
  "distance": "string (optional)",
  "img": "url | null",
  "desc": "string",
  "tips": "string | null",
  "cost": "string",
  "transport": {
    "mode": "string",
    "time": "string",
    "distance": "string"
  } | null,
  "tags": "string[]"
}
```

### 2.9 Review

```json
{
  "id": "string",
  "name": "string",
  "avatar": "url",
  "rating": "number (1-5)",
  "date": "string (date)",
  "trip": "string | null",
  "verified": "boolean",
  "text": "string",
  "photos": "url[]"
}
```

### 2.10 Facility

```json
{
  "icon": "emoji",
  "label": "string",
  "available": "boolean"
}
```

### 2.11 Package

```json
{
  "id": "string",
  "name": "string",
  "duration": "string",
  "minPax": "number",
  "maxPax": "number",
  "price": "number",
  "unit": "string",
  "bestseller": "boolean",
  "boat": "string (optional)",
  "spots": "string[] (optional)",
  "includes": "string[]"
}
```

---

## 3. API Endpoint Mapping

| Page | Route | Required API | Query Params |
|------|-------|--------------|-------------|
| Explore Hub | `/` | `GET /islands`, `GET /provinces`, `GET /categories`, `GET /featured` | — |
| Destinations | `/destinations` | `GET /destinations` | `?island=&province=&category=&search=&sort=&page=` |
| Attractions | `/attractions` | `GET /attractions` | `?provinsi=&kategori=&tiket=&fasilitas=&rating=&sort=&page=` |
| Attraction Detail | `/attractions/{slug}` | `GET /attractions/{slug}` | — |
| Tour Guides | `/tour-guides` | `GET /guides` | `?wilayah=&spesialisasi=&bahasa=&harga=&sertifikasi=&sort=&page=` |
| Tour Guide Detail | `/tour-guides/{slug}` | `GET /guides/{slug}` | — |
| Tourism Villages | `/tourism-villages` | `GET /villages` | `?provinsi=&adwi=&tema=&aktivitas=&harga=&sort=&page=` |
| Village Detail | `/tourism-villages/{slug}` | `GET /villages/{slug}` | — |
| Itineraries | `/itinerary` | `GET /itineraries` | `?destination=&durasi=&budget=&tipe=&kategori=&sort=&page=` |
| Itinerary Detail | `/itinerary/{slug}` | `GET /itineraries/{slug}` | — |

---

## 4. Data Flow Patterns

### Listing pages (all directory pages)

```
Client ← GET /{entity}?filters ← API ← Database
  ↓
  FilterBar (client-side state)
  ↓
  Card Grid (renders filtered data)
  ↓
  Pagination (Load More)
```

### Detail pages

```
Client ← GET /{entity}/{slug} ← API ← Database
  ↓
  Main Content (header, description, sections)
  ↓
  Sidebar (booking/contact info, weather)
  ↓
  Related Entities (nearby attractions, similar guides)
```

### Current data state

All data is **hardcoded inline** in page files or `src/data/`. No API calls exist yet. When migrating:
1. Replace inline arrays with `fetch()` or a data layer
2. Keep static data in `src/data/` for listing pages (can be served as static JSON)
3. Detail pages should fetch from API, with fallback to static data during transition

---

## 5. Pagination & Filtering Convention

All listing endpoints should support:

```json
// Request
GET /destinations?page=1&limit=12&sort=popular&search=lombok&filter[island]=Jawa

// Response
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 180,
    "totalPages": 15
  }
}
```

**Current behavior:** "Load More" buttons add 12 items at a time, appending to existing list.

---

## 6. Per-Page API Requirements

See individual `api_requirements.md` files in each page directory:

| Page | File |
|------|------|
| Explore Hub | `src/app/explore-hub/api_requirements.md` |
| Destinations | `src/app/destinations/api_requirements.md` |
| Attractions | `src/app/attractions/api_requirements.md` |
| Attraction Detail | `src/app/attractions/pulau-padar/api_requirements.md` |
| Tour Guides | `src/app/tour-guides/api_requirements.md` |
| Tour Guide Detail | `src/app/tour-guides/welli-wilyanto/api_requirements.md` |
| Tourism Villages | `src/app/tourism-villages/api_requirements.md` |
| Village Detail | `src/app/tourism-villages/wae-rebo/api_requirements.md` |
| Itineraries | `src/app/itinerary/api_requirements.md` |
| Itinerary Detail | `src/app/itinerary/lombok-lengkap/api_requirements.md` |

---

*Maintained in `.docs/api_integrations.md`. Update this file when new pages or entities are added.*
