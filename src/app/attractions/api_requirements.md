# API Requirements — Attractions (Directory Listing)

## Endpoint

```
GET /api/attractions
```

## Query Parameters

| Param       | Type   | Example                              |
|-------------|--------|--------------------------------------|
| provinsi    | string | `Bali`, `NTB`, `Jawa Timur`          |
| kategori    | string | `Pantai`, `Gunung`, `Candi & Sejarah`|
| tiket_masuk | string | `Gratis`, `< Rp25rb`, `Rp25rb – Rp100rb` |
| fasilitas   | string | `Parkir`, `Toilet`, `Mushola`        |
| rating      | string | `4.5+`, `4.0+`, `3.5+`              |
| sort        | string | `Paling populer`, `Terbaru`, `Rating tertinggi`, `Harga terendah`, `Harga tertinggi` |
| page        | number | 1                                    |
| limit       | number | 12                                   |

### Filter Options (`ATTR_FILTER_OPTIONS`)

| Filter        | Values                                                                 |
|---------------|------------------------------------------------------------------------|
| Provinsi      | Bali, DI Yogyakarta, Jawa Timur, NTB, NTT, Jawa Barat, Sumatera Utara, Papua Barat Daya, Sulawesi Selatan, Aceh |
| Kategori      | Pantai, Air Terjun, Gunung, Candi & Sejarah, Museum, Religi, Taman, Snorkeling & Diving, Pemandian, Kuliner |
| Tiket masuk   | Gratis, < Rp25rb, Rp25rb – Rp100rb, Rp100rb – Rp250rb, > Rp250rb       |
| Fasilitas     | Parkir, Toilet, Mushola, Restoran, Penyewaan alat, Ramah anak, Akses kursi roda |
| Rating        | ★ 4.5+, ★ 4.0+, ★ 3.5+, Semua rating                                   |

## Response Shape

```json
{
  "data": [
    {
      "id": "pulau-padar-viewpoint",
      "img": "https://images.unsplash.com/...",
      "name": "Pulau Padar Viewpoint",
      "cat": "Alam",
      "catBg": "#D9F2DA",
      "catFg": "#2D8838",
      "region": "Labuan Bajo, NTT",
      "price": 50000,
      "rating": 4.95,
      "reviews": 412,
      "hours": "06.00–18.00",
      "trekking": true,
      "save": false
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 36,
    "totalPages": 3
  }
}
```

### Entity Fields

| Field    | Type    | Description                        |
|----------|---------|------------------------------------|
| id       | string  | URL-safe slug from name            |
| img      | string  | Thumbnail image URL                |
| name     | string  | Attraction name                    |
| cat      | string  | Category label                     |
| catBg    | string  | Category badge background (hex)    |
| catFg    | string  | Category badge foreground (hex)    |
| region   | string  | Location description               |
| price    | number  | Entry fee in IDR (0 = free)        |
| rating   | number  | Average rating (0–5)               |
| reviews  | number  | Review count                       |
| hours    | string  | Opening hours                      |
| trekking | boolean | Trekking required flag             |
| save     | boolean | Saved/bookmarked flag              |

## Current Data Source

**File:** `src/app/attractions/page.jsx`  
**Variables:** `ATTR_DATA` (line 94–263), `ATTR_FILTER_OPTIONS` (line 43–85)
