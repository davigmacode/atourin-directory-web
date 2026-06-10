# API Requirements — Destinations (Directory Listing)

## Endpoint

```
GET /api/destinations
```

## Query Parameters

| Param     | Type   | Example                           |
|-----------|--------|-----------------------------------|
| island    | string | `Bali & Nusa Tenggara`, `Jawa`    |
| province  | string | `Nusa Tenggara Barat`, `Bali`     |
| category  | string | `Kabupaten`, `Kota`               |
| search    | string | `Lombok`                          |
| sort      | string | `alpha`, `popular`, `content`     |
| page      | number | 1                                 |
| limit     | number | 12                                |

### Sort Values

| Value     | Meaning                  |
|-----------|--------------------------|
| alpha     | A–Z (ascending)          |
| alpha-rev | Z–A (descending)         |
| popular   | Most popular (descending)|
| content   | Most content (descending)|

## Response Shape

```json
{
  "data": [
    {
      "id": "lombok-tengah",
      "name": "Lombok Tengah",
      "type": "Kabupaten",
      "province": "Nusa Tenggara Barat",
      "island": "Bali & Nusa Tenggara",
      "img": "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800",
      "attr": 42,
      "desa": 12,
      "itin": 28,
      "guide": 18,
      "rating": 4.8,
      "tags": ["Bahari", "Petualangan", "Budaya"],
      "marketProducts": 36,
      "popular": 92
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 28,
    "totalPages": 3
  }
}
```

### Entity Fields

| Field          | Type     | Description                             |
|----------------|----------|-----------------------------------------|
| id             | string   | URL-safe slug from name                 |
| name           | string   | Destination name (e.g. "Lombok Tengah") |
| type           | string   | "Kabupaten" or "Kota"                   |
| province       | string   | Province name                           |
| island         | string   | Island group label                      |
| img            | string   | Hero image URL                          |
| attr           | number   | Attraction count                        |
| desa           | number   | Village count                           |
| itin           | number   | Itinerary count                         |
| guide          | number   | Guide count                             |
| rating         | number   | Average rating (0–5)                    |
| tags           | string[] | Category tags                           |
| marketProducts | number   | Marketplace product count               |
| popular        | number   | Popularity score (0–100)                |

## Current Data Source

**File:** `src/app/destinations/page.jsx`  
**Variable:** `DESTINATIONS` (line 10–39)
