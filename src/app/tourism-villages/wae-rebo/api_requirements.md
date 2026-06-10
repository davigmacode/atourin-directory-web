# API Requirements — Village Detail (Wae Rebo)

## Endpoint

```
GET /api/villages/wae-rebo
```

## Response Shape

```json
{
  "village": {
    "id": "desa-wae-rebo",
    "name": "Desa Wisata Wae Rebo",
    "status": "Mandiri",
    "statusFg": "#2D8838",
    "statusBg": "#D9F2DA",
    "statusDesc": "Status tertinggi, desa wisata yang sudah mampu mengelola pariwisata secara mandiri...",
    "founded": 2008,
    "kecamatan": "Satar Mese Barat",
    "kota": "Manggarai",
    "provinsi": "Nusa Tenggara Timur",
    "rating": 4.92,
    "reviews": 312,
    "tags": ["Budaya", "Petualangan", "Kerajinan", "Pegunungan", "Heritage"],
    "shortDesc": "Desa adat Manggarai di pegunungan 1.200 mdpl...",
    "longDesc": "Wae Rebo adalah desa adat Manggarai yang tersembunyi...",
    "cover": "https://images.unsplash.com/...",
    "gallery": ["https://images.unsplash.com/..."]
  },
  "activities": [
    {
      "icon": "🥾",
      "name": "Trekking Hutan Kopi",
      "dur": "3–4 jam",
      "desc": "Pendakian dari Desa Denge melewati kebun kopi dan hutan tropis..."
    }
  ],
  "packages": [
    {
      "name": "Wae Rebo 2D1N, Heritage Experience",
      "duration": "2 Hari · 1 Malam",
      "minPax": 2,
      "maxPax": 8,
      "price": 1850000,
      "popular": true,
      "includes": [
        "Transport PP Labuan Bajo–Denge",
        "Pemandu lokal bersertifikat HPI",
        "Menginap di Mbaru Niang"
      ]
    }
  ],
  "nearbyAttractions": [
    {
      "name": "Air Terjun Cunca Wulang",
      "cat": "Air Terjun",
      "catFg": "#1F6FB0",
      "rating": 4.7,
      "price": 25000,
      "img": "https://images.unsplash.com/..."
    }
  ],
  "facilities": [
    { "icon": "🚻", "label": "Toilet Bersama", "available": true },
    { "icon": "🍽️", "label": "Restoran Lokal", "available": true },
    { "icon": "📶", "label": "WiFi", "available": false }
  ],
  "reviews": [
    {
      "name": "Naufal Rasyid",
      "av": "https://i.pravatar.cc/100?img=33",
      "rating": 5,
      "date": "2 Mei 2026",
      "trip": "Paket 2D1N",
      "verified": true,
      "text": "Pengalaman paling autentik yang pernah saya alami...",
      "photos": []
    }
  ],
  "relatedVillages": [
    {
      "name": "Desa Todo",
      "status": "Maju",
      "img": "https://images.unsplash.com/...",
      "desc": "Kampung adat Manggarai dengan rumah Niang yang lebih tua...",
      "rating": 4.6,
      "statusBg": "#D4ECF4",
      "statusFg": "#1F6FB0"
    }
  ],
  "contact": {
    "manager": "Pak Yosef Mbaha",
    "role": "Ketua Pokdarwis · sejak 2015",
    "phone": "+62 813-3856-7720",
    "email": "info@waerebo.id",
    "website": "waerebo.id",
    "social": ["IG", "FB", "TT"]
  },
  "certifications": [
    {
      "icon": "🌜",
      "name": "UNESCO Asia-Pacific Award",
      "year": 2012,
      "issuer": "UNESCO"
    },
    {
      "icon": "🏆",
      "name": "ADWI Mandiri",
      "year": 2023,
      "issuer": "Kemenparekraf"
    }
  ]
}
```

## Related Entities

| Section             | Data            | Source                   |
|---------------------|-----------------|--------------------------|
| Village detail      | VLG             | `VLG` object             |
| Activities          | Activity[]      | `ACTIVITIES`             |
| Packages            | Package[]       | `PACKAGES`               |
| Nearby Attractions  | MiniAttraction[]| `VILLAGE_ATTRACTIONS`    |
| Facilities          | Facility[]      | `VLG_FACILITIES`         |
| Reviews             | Review[]        | `VLG_REVIEWS`            |
| Related Villages    | RelatedVillage[]| `RELATED_VILLAGES`       |
| Contact info        | ContactCard     | `ContactCard` component  |
| Certifications      | CertRow[]       | `CertificationsCard`     |

## Current Data Source

**File:** `src/app/tourism-villages/wae-rebo/page.jsx`  
**Variables:** `VLG` (line 10–41), `ACTIVITIES` (line 597–634), `PACKAGES` (line 660–692), `VILLAGE_ATTRACTIONS` (line 796–837), `VLG_FACILITIES` (line 857–866), `VLG_REVIEWS` (line 1134–1165), `RELATED_VILLAGES` (line 1196–1224)
