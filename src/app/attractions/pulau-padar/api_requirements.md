# API Requirements — Attraction Detail (Pulau Padar)

## Endpoint

```
GET /api/attractions/pulau-padar
```

## Response Shape

```json
{
  "attraction": {
    "id": "pulau-padar",
    "name": "Pulau Padar",
    "cat": "Alam · Trekking",
    "catBg": "#D9F2DA",
    "catFg": "#2D8838",
    "kecamatan": "Komodo",
    "kota": "Manggarai Barat",
    "provinsi": "Nusa Tenggara Timur",
    "rating": 4.95,
    "reviews": 1240,
    "coords": { "lat": -8.6447, "lng": 119.571 },
    "tags": ["Alam", "Trekking", "Sunset", "Fotografi", "Viewpoint", "Pulau"],
    "shortDesc": "Pulau ikonik di Taman Nasional Komodo...",
    "longDesc": "Pulau Padar adalah salah satu pulau terbesar ketiga...",
    "images": [
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1400",
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=900"
    ],
    "totalPhotos": 24
  },
  "facilities": [
    { "icon": "🚵", "label": "Parkir", "available": true },
    { "icon": "🚻", "label": "Toilet", "available": true },
    { "icon": "🛡", "label": "Life Jacket", "available": true },
    { "icon": "📸", "label": "Spot Foto", "available": true },
    { "icon": "🛐", "label": "Musholla", "available": false },
    { "icon": "📡", "label": "Sinyal HP", "available": false }
  ],
  "nearby": [
    {
      "name": "Pink Beach",
      "cat": "Pantai",
      "catFg": "#C44949",
      "rating": 4.85,
      "price": 50000,
      "img": "https://images.unsplash.com/..."
    }
  ],
  "relatedItineraries": [
    {
      "title": "Labuan Bajo Sailing 4D3N, Padar, Pink Beach & Komodo",
      "img": "https://images.unsplash.com/...",
      "days": "4H 3M",
      "theme": "Adventure",
      "themeFg": "#B85C00",
      "themeBg": "#FFE9D6",
      "stops": 9,
      "budget": 5800000,
      "rating": 4.95,
      "creator": "Welli Wilyanto",
      "creatorAv": "https://i.pravatar.cc/60?img=15"
    }
  ],
  "reviews": [
    {
      "name": "Andini Mahardika",
      "av": "https://i.pravatar.cc/100?img=47",
      "rating": 5,
      "date": "12 Mei 2026",
      "trip": "Sailing 4D3N",
      "verified": true,
      "text": "View dari puncak benar-benar tidak ada duanya...",
      "photos": ["https://images.unsplash.com/..."]
    }
  ],
  "tips": [
    {
      "title": "Waktu terbaik",
      "icon": "🌅",
      "body": "Pagi 06.00–08.00 untuk golden hour..."
    },
    {
      "title": "Disarankan bawa",
      "icon": "🎒",
      "items": ["Sepatu trekking / sneakers", "Sunblock SPF 50+ & topi"]
    }
  ],
  "quickInfo": [
    { "icon": "⏱", "label": "Durasi kunjungan", "value": "2–4 jam" },
    { "icon": "📶", "label": "Sinyal HP", "value": "Tidak ada" },
    { "icon": "🌊", "label": "Best season", "value": "Apr – Nov (kering)" },
    { "icon": "🎯", "label": "Tingkat kesulitan", "value": "Sedang (trek tangga)" },
    { "icon": "👨‍👩‍👧", "label": "Cocok untuk", "value": "Dewasa, remaja" }
  ],
  "booking": {
    "price": { "label": "Mulai Rp 75rb", "unit": "/orang" },
    "ticketPrices": [
      { "label": "Dewasa (WNI)", "value": "Rp 75.000" },
      { "label": "Anak (< 12 thn)", "value": "Rp 40.000" },
      { "label": "WNA", "value": "Rp 250.000" }
    ],
    "conservationFee": "Rp 50.000",
    "hours": "Setiap hari 07.00 – 17.00 WITA",
    "status": "open"
  }
}
```

## Related Entities

| Section              | Data            | Source               |
|----------------------|-----------------|----------------------|
| Attraction detail    | ATR             | `ATR` object         |
| Facilities           | Facility[]      | `FACILITIES`         |
| Nearby Attractions   | MiniAttraction[]| `NEARBY`             |
| Related Itineraries  | RelatedItin[]   | `RELATED_ITIN`       |
| Reviews              | Review[]        | `REVIEWS`            |
| Tips                 | Tip[]           | `AtrTips` component  |
| QuickInfo            | InfoLine[]      | `QuickInfoSide`      |
| Booking              | BookingBox      | `BookingBox`         |

## Current Data Source

**File:** `src/app/attractions/pulau-padar/page.jsx`  
**Variables:** `ATR` (line 10–32), `FACILITIES` (line 380–393), `NEARBY` (line 459–466), `RELATED_ITIN` (line 478–482), `REVIEWS` (line 519–523)
