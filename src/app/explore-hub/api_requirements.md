# API Requirements — Explore Hub

## Endpoint

```
GET /api/explore
```

## Data Requirements

### Islands
```json
{
  "islands": [
    {
      "id": "sumatera",
      "name": "Sumatera",
      "provinces": 10,
      "img": "url",
      "color": "#E76F51"
    }
  ]
}
```

### Provinces
```json
{
  "provinces": [
    {
      "id": "aceh",
      "name": "Aceh",
      "islandId": "sumatera",
      "img": "url",
      "dest": 23,
      "attr": 145,
      "desa": 32,
      "popular": 80
    }
  ]
}
```

### Categories
```json
{
  "categories": [
    { "name": "Alam", "icon": "\uD83C\uDF3F", "color": "#E6F7E6" }
  ]
}
```

### Featured Items
```json
{
  "featured": [
    {
      "type": "Itinerary",
      "typeColor": "#7068D5",
      "img": "url",
      "title": "string",
      "loc": "string",
      "rating": 4.92
    }
  ]
}
```

### Hero Stats
```json
{
  "stats": {
    "destinations": "180+",
    "attractions": "1.2K+",
    "guides": "640+",
    "villages": "320+",
    "itineraries": "2.4K+"
  }
}
```

## Filters (client-side)

Search, Island filter, Province filter, Sort (name, popular).

---

**Data source:** `src/data/explore-data.js`
