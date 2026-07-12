# API Requirements — Explore Hub

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/islands` | GET | Daftar pulau utama |
| `GET /api/provinces` | GET | Daftar 34 provinsi |
| `GET /api/categories` | GET | Kategori wisata |
| `GET /api/featured` | GET | Item unggulan (editor's pick) |
| `GET /api/stats` | GET | Angka statistik hero |

---

## 1. GET /api/islands

### Response

```json
{
  "data": [
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

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (slug) | Identifier unik |
| `name` | string | Nama pulau |
| `provinces` | number | Jumlah provinsi di pulau ini |
| `img` | url | Gambar background |
| `color` | hex | Warna aksen |

---

## 2. GET /api/provinces

### Query Parameters

| Param | Type | Example |
|-------|------|---------|
| `island` | string | `jawa` |
| `sort` | string | `alpha`, `popular` |

### Response

```json
{
  "data": [
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

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (slug) | Identifier unik |
| `name` | string | Nama provinsi |
| `islandId` | string | Ref ke `Island.id` |
| `img` | url | Gambar representatif |
| `dest` | number | Jumlah destinasi |
| `attr` | number | Jumlah atraksi |
| `desa` | number | Jumlah desa wisata |
| `popular` | number (0–100) | Skor popularitas |

---

## 3. GET /api/categories

### Response

```json
{
  "data": [
    { "name": "Alam", "icon": "\uD83C\uDF3F", "color": "#E6F7E6" }
  ]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Nama kategori |
| `icon` | emoji | Ikon representatif |
| `color` | hex | Warna background |

---

## 4. GET /api/featured

### Response

```json
{
  "data": [
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

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Tipe (Itinerary, Desa Wisata, Atraksi) |
| `typeColor` | hex | Warna badge tipe |
| `img` | url | Gambar cover |
| `title` | string | Judul |
| `loc` | string | Lokasi |
| `rating` | number | Rating (0–5) |

---

## 5. GET /api/stats

### Response

```json
{
  "data": {
    "destinations": "180+",
    "attractions": "1.2K+",
    "guides": "640+",
    "villages": "320+",
    "itineraries": "2.4K+"
  }
}
```

---

## Related Entities

| Entity | Endpoint | Source |
|--------|----------|--------|
| Islands with provinces | `GET /api/islands` with embed | `src/data/explore-data.js` → `ISLANDS` |
| Provinces | `GET /api/provinces` | `src/data/explore-data.js` → `PROVINCES` |

---

**Data source:** `src/data/explore-data.js`
