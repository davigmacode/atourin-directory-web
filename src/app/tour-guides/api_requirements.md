# API Requirements — Tour Guides (Directory Listing)

## Endpoint

```
GET /api/guides
```

## Query Parameters

| Param        | Type   | Example                              |
|--------------|--------|--------------------------------------|
| wilayah      | string | `Bali`, `Labuan Bajo`, `Lombok`      |
| spesialisasi | string | `Heritage & Sejarah`, `Petualangan`  |
| bahasa       | string | `English`, `Japanese`, `Mandarin`    |
| harga        | string | `< Rp500rb/hari`, `Rp1jt – Rp2jt`   |
| sertifikasi  | string | `HPI`, `BNSP`, `Diving Master`       |
| sort         | string | `Paling populer`, `Rating tertinggi`, `Harga terendah`, `Harga tertinggi`, `Pengalaman terbanyak` |
| page         | number | 1                                    |
| limit        | number | 12                                   |

### Filter Options (`GUIDE_FILTER_OPTIONS`)

| Filter        | Values                                                                              |
|---------------|-------------------------------------------------------------------------------------|
| Wilayah       | Bali, Yogyakarta, Labuan Bajo, Lombok, Bandung, Bromo, Raja Ampat, Danau Toba, Komodo, Sumba |
| Spesialisasi  | Heritage & Sejarah, Petualangan, Bahari & Diving, Kuliner, Fotografi, Birdwatching, Hiking, Family Friendly, Honeymoon, Spiritual |
| Bahasa        | Indonesia, English, Mandarin, Japanese, Korean, Spanish, French, German, Arabic, Dutch |
| Harga         | < Rp500rb/hari, Rp500rb – Rp1jt, Rp1jt – Rp2jt, > Rp2jt/hari                        |
| Sertifikasi   | HPI, BNSP, Diving Master, Mountain Guide, Bersertifikat semua                        |

## Response Shape

```json
{
  "data": [
    {
      "id": "welli-wilyanto",
      "name": "Welli Wilyanto",
      "img": "https://i.pravatar.cc/200?img=12",
      "region": "Labuan Bajo, NTT",
      "spec": ["Bahari", "Petualangan"],
      "specBg": "#E2F1FF",
      "specFg": "#1F6FB0",
      "langs": ["ID", "EN", "JP"],
      "certs": ["HPI", "BNSP"],
      "rating": 4.95,
      "trips": 412,
      "price": 1200000,
      "exp": "8 tahun",
      "verified": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 42,
    "totalPages": 4
  }
}
```

### Entity Fields

| Field    | Type     | Description                          |
|----------|----------|--------------------------------------|
| id       | string   | URL-safe slug from name              |
| name     | string   | Guide name                           |
| img      | string   | Avatar image URL                     |
| region   | string   | Location description                 |
| spec     | string[] | Specialization labels                |
| specBg   | string   | Specialization badge background (hex)|
| specFg   | string   | Specialization badge foreground (hex)|
| langs    | string[] | Language codes                       |
| certs    | string[] | Certification labels                 |
| rating   | number   | Average rating (0–5)                 |
| trips    | number   | Trip count                           |
| price    | number   | Price per day in IDR                 |
| exp      | string   | Experience duration text             |
| verified | boolean  | Verified guide flag                  |

## Current Data Source

**File:** `src/app/tour-guides/page.jsx`  
**Variables:** `GUIDE_DATA` (line 377–558), `GUIDE_FILTER_OPTIONS` (line 701–751)
