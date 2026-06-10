# API Requirements — Tourism Villages (Directory Listing)

## Endpoint

```
GET /api/villages
```

## Query Parameters

| Param        | Type   | Example                              |
|--------------|--------|--------------------------------------|
| provinsi     | string | `Bali`, `NTT`, `NTB`                |
| adwi_kategori| string | `Mandiri`, `Maju`, `Berkembang`      |
| tema         | string | `Budaya & Adat`, `Alam & Ekowisata`  |
| aktivitas    | string | `Homestay`, `Trekking`, `Tarian tradisional` |
| harga        | string | `< Rp150rb`, `Rp150rb – Rp300rb`     |
| sort         | string | `Paling populer`, `Rating tertinggi`, `Harga terendah`, `Harga tertinggi` |
| page         | number | 1                                    |
| limit        | number | 12                                   |

### Filter Options (`VIL_FILTER_OPTIONS`)

| Filter          | Values                                                                           |
|-----------------|----------------------------------------------------------------------------------|
| Provinsi        | Bali, DI Yogyakarta, NTT, NTB, Jawa Tengah, Jawa Timur, Jawa Barat, Sumatera Barat, Sumatera Utara, Sulawesi Selatan |
| Kategori ADWI   | Mandiri, Maju, Berkembang, Rintisan, Belum terklasifikasi                         |
| Tema utama      | Budaya & Adat, Alam & Ekowisata, Kerajinan, Kuliner Lokal, Edukasi, Religi, Pertanian, Bahari |
| Aktivitas       | Homestay, Workshop kerajinan, Trekking, Bersepeda, Tarian tradisional, Memasak bareng, Memancing, Bertani |
| Harga homestay  | < Rp150rb, Rp150rb – Rp300rb, Rp300rb – Rp500rb, > Rp500rb                        |

## Response Shape

```json
{
  "data": [
    {
      "id": "desa-wae-rebo",
      "img": "https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?w=600",
      "name": "Desa Wae Rebo",
      "region": "Manggarai, NTT",
      "adwi": "Mandiri",
      "adwiBg": "rgba(180,122,0,0.16)",
      "adwiFg": "#B47A00",
      "theme": "Budaya & Adat",
      "activities": ["Homestay", "Tarian", "Trekking"],
      "price": 350000,
      "rating": 4.95,
      "families": 7,
      "signature": "Mbaru Niang",
      "featured": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 24,
    "totalPages": 2
  }
}
```

### Entity Fields

| Field      | Type     | Description                             |
|------------|----------|-----------------------------------------|
| id         | string   | URL-safe slug from name                 |
| img        | string   | Thumbnail image URL                     |
| name       | string   | Village name                            |
| region     | string   | Location description                    |
| adwi       | string   | ADWI classification level               |
| adwiBg     | string   | ADWI badge background color             |
| adwiFg     | string   | ADWI badge foreground color             |
| theme      | string   | Main theme category                     |
| activities | string[] | Available activities                    |
| price      | number   | Homestay price per night in IDR         |
| rating     | number   | Average rating (0–5)                    |
| families   | number   | Number of homestay families             |
| signature  | string   | Signature attraction/selling point      |
| featured   | boolean  | Featured/promoted flag                  |

## Current Data Source

**File:** `src/app/tourism-villages/page.jsx`  
**Variables:** `VIL_DATA` (line 245–415), `VIL_FILTER_OPTIONS` (line 610–656)
