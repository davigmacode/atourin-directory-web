# API Requirements — Itineraries (Directory Listing)

## Endpoint

```
GET /api/itineraries
```

## Query Parameters

| Param            | Type   | Example                              |
|------------------|--------|--------------------------------------|
| destination      | string | `Bali`, `Lombok`, `Labuan Bajo`      |
| durasi           | string | `1 Hari`, `3D2N`, `5D4N`             |
| budget           | string | `< Rp1jt`, `Rp1jt – Rp3jt`           |
| tipe_perjalanan  | string | `Solo`, `Couple`, `Family`           |
| kategori         | string | `Culture`, `Adventure`, `Food`       |
| sort             | string | `Paling populer`, `Terbaru`, `Rating tertinggi`, `Harga terendah`, `Harga tertinggi`, `Durasi terpendek` |
| page             | number | 1                                    |
| limit            | number | 12                                   |

### Filter Options (`FILTER_OPTIONS`)

| Filter             | Values                                                                               |
|--------------------|--------------------------------------------------------------------------------------|
| Destinasi tujuan   | Bali, Yogyakarta, Lombok, Labuan Bajo, Raja Ampat, Bandung, Bromo, Danau Toba, Garut, Surabaya |
| Durasi             | 1 Hari, 2D1N, 3D2N, 4D3N, 5D4N, 6D+                                                  |
| Budget             | < Rp500rb, < Rp1jt, Rp1jt – Rp3jt, Rp3jt – Rp6jt, Rp6jt+                              |
| Tipe perjalanan    | Solo, Couple, Family, Honeymoon, Group, Business                                      |
| Kategori wisata    | Culture, Adventure, Food, Nature, Beach, City Break, Religi, Sejarah                  |

## Response Shape

```json
{
  "data": [
    {
      "id": "senja-di-borobudur-pagi-di-prambanan",
      "img": "https://images.unsplash.com/...",
      "days": "3 Hari · 2 Malam",
      "city": "Yogyakarta",
      "tag": "Culture",
      "title": "Senja di Borobudur, Pagi di Prambanan",
      "author": "Syah Ari Wiharjo",
      "role": "Local Expert",
      "price": "Rp 1.2jt",
      "rating": 4.9,
      "reviews": 128,
      "views": 522,
      "save": false,
      "day1": ["Borobudur", "Pasar Beringharjo", "Malioboro"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 32,
    "totalPages": 3
  },
  "featured": [
    {
      "type": "editor_pick",
      "img": "https://images.unsplash.com/...",
      "days": "7 Hari · 6 Malam",
      "tag": "Family",
      "city": "Bali",
      "title": "Bali Slow Travel, Ubud, Sidemen & Amed tanpa terburu-buru",
      "author": "Putu Adi Wirawan",
      "role": "Tour Guide bersertifikat · Bali",
      "budget": "Rp 4.2jt",
      "highlights": "Trekking sawah Tegallalang, kelas memasak Bali, snorkeling USS Liberty..."
    }
  ]
}
```

### Entity Fields

| Field   | Type     | Description                        |
|---------|----------|------------------------------------|
| id      | string   | URL-safe slug from title           |
| img     | string   | Card image URL                     |
| days    | string   | Duration label                     |
| city    | string   | Destination city                   |
| tag     | string   | Travel category tag                |
| title   | string   | Itinerary title                    |
| author  | string   | Creator name                       |
| role    | string   | Creator role label                 |
| price   | string   | Price range (formatted)            |
| rating  | number   | Average rating (0–5)               |
| reviews | number   | Review count                       |
| views   | number   | View count                         |
| save    | boolean  | Saved/bookmarked flag              |
| day1    | string[] | Day 1 stop names (preview)         |

### FeaturedRail Curated Items

The `featured` array includes editor's picks and curated routes displayed in the `FeaturedRail` section:

| Item | Type | Days | Budget  | Author           |
|------|------|------|---------|------------------|
| Bali Slow Travel | editor_pick | 7H 6M | Rp 4.2jt | Putu Adi Wirawan |
| Raja Ampat untuk Berdua | curated | 5H 4M | Rp 8.4jt | Andini Mahardika |
| Sunrise Bromo & Madakaripura | curated | 3H 2M | Rp 1.6jt | Catur Hidayat    |

## Current Data Source

**File:** `src/app/itinerary/page.jsx`  
**Variables:** `ITIN_DATA` (line 795–931), `FILTER_OPTIONS` (line 440–479), `FeaturedRail` (line 757–792)
