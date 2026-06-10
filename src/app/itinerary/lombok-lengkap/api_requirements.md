# API Requirements — Itinerary Detail (Lombok Lengkap)

## Endpoint

```
GET /api/itineraries/lombok-lengkap
```

## Response Shape

```json
{
  "itinerary": {
    "id": "lombok-lengkap",
    "title": "Liburan Lengkap Lombok",
    "subtitle": "Jelajahi keindahan Lombok dari Pantai Kuta Mandalika, Bukit Merese, hingga Desa Sade yang eksotis.",
    "category": "ITINERARY",
    "location": "Lombok, NTB",
    "duration": "4 Hari 3 Malam",
    "minParticipants": "2 Orang",
    "language": "Indonesia",
    "difficulty": "Mudah",
    "price": {
      "total": "Rp 2.890.000",
      "unit": "/pax",
      "breakdown": [
        { "label": "Akomodasi (3 malam)", "value": "Rp 1.200.000" },
        { "label": "Transportasi", "value": "Rp 850.000" },
        { "label": "Makanan (6x)", "value": "Rp 480.000" },
        { "label": "Tiket masuk objek wisata", "value": "Rp 280.000" },
        { "label": "Pemandu lokal", "value": "Rp 80.000" }
      ]
    }
  },
  "days": [
    {
      "id": 1,
      "label": "Hari 1",
      "date": "12 Jun",
      "title": "Kedatangan & Kuta Mandalika",
      "stats": {
        "activityCount": 4,
        "totalCost": 0,
        "types": ["transport", "activity", "meal"]
      },
      "activities": [
        {
          "id": "a1-1",
          "order": 1,
          "time": "08:00",
          "endTime": "10:00",
          "duration": "2 jam",
          "type": "transport",
          "typeLabel": "Transportasi",
          "title": "Penjemputan Bandara",
          "location": "Bandara Internasional Lombok (LOP)",
          "img": null,
          "desc": "Penjemputan dari bandara menuju hotel...",
          "tags": ["Airport Transfer", "AC"],
          "tips": "Pastikan nomor penerbangan kamu sudah dikonfirmasi H-1.",
          "cost": "Termasuk paket"
        }
      ]
    }
  ],
  "about": {
    "description": "Nikmati pengalaman liburan 4 hari 3 malam yang mencakup destinasi terbaik Lombok...",
    "highlights": [
      { "icon": "🏖", "title": "Pantai Eksotis", "desc": "Pasir putih & air jernih..." },
      { "icon": "🌋", "title": "Budaya Sasak", "desc": "Kunjungan ke Desa Sade..." },
      { "icon": "🌊", "title": "Snorkeling", "desc": "Jelajahi biota laut..." },
      { "icon": "🍳", "title": "Kuliner Khas", "desc": "Ayam taliwang, plecing kangkung..." }
    ],
    "bestTime": {
      "peakMonths": ["Mei", "Jun", "Jul", "Agu", "Sep"],
      "shoulderMonths": ["Apr", "Okt", "Nov"],
      "lowMonths": ["Jan", "Feb", "Mar", "Des"]
    },
    "faq": [
      {
        "question": "Apakah tiket pesawat sudah termasuk?",
        "answer": "Tiket pesawat belum termasuk dalam paket ini..."
      }
    ],
    "author": {
      "name": "Rizky Pratama",
      "avatar": "https://i.pravatar.cc/200?img=11",
      "role": "Pemandu Wisata Lombok",
      "badge": "Travel Specialist",
      "bio": "Berpengalaman lebih dari 5 tahun memandu wisatawan...",
      "stats": ["18 Itinerary", "4.9 Rating", "200+ Wisatawan"]
    }
  },
  "relatedItineraries": [
    {
      "img": "https://images.unsplash.com/...",
      "meta": "Bali",
      "title": "Liburan Seru di Bali — Ubud & Kuta",
      "rating": "4.8",
      "price": "Rp 2.500.000"
    }
  ]
}
```

## Activity Type Taxonomy

| Type        | TypeLabel        | Color       | Description                          |
|-------------|------------------|-------------|--------------------------------------|
| transport   | Transportasi     | Purple      | Airport transfers, inter-city travel |
| activity    | Aktivitas / Wisata | Green    | Sightseeing, tours, free time        |
| meal        | Makan Siang / Makan Malam | Yellow | Meals, culinary experiences    |
| wisata      | Wisata           | Blue        | Sightseeing (Indonesian label)       |
| budaya      | Budaya           | Violet      | Cultural experiences                  |

## Day Overview Stats (from `computeDayStats`)

| Field         | Type     | Description                     |
|---------------|----------|---------------------------------|
| activityCount | number   | Number of activities in the day |
| totalCost     | number   | Sum of individual activity costs|
| types         | string[] | Unique activity type strings    |

## Related Entities

| Section          | Data              | Source                    |
|------------------|-------------------|---------------------------|
| Hero metadata    | DetailHero        | `DetailHero` component    |
| PriceCard        | PriceCard         | `PriceCard` component     |
| Price breakdown  | Breakdown         | `Breakdown` component     |
| Days overview    | Day[]             | `DAYS`                    |
| Activities       | Activity[] by day | `ACTIVITIES_BY_DAY`       |
| About tab        | AboutTab          | `AboutTab` component      |
| Highlights       | Highlight[]       | Inline in `AboutTab`      |
| FAQ              | FaqItem[]         | Inline in `AboutTab`      |
| Related itineraries | RelatedItem[]   | Inline in `RelatedItineraries` |

## Current Data Source

**File:** `src/app/itinerary/lombok-lengkap/page.jsx`  
**Variables:** `LBK` (line 11–25), `IMG` (line 27–34), `DAYS` (line 740–760), `ACTIVITIES_BY_DAY` (line 762–979), `DetailHero` (line 589–651), `PriceCard` (line 537–584), `AboutTab` (line 1317–1466), `RelatedItineraries` (line 1471–1539)
