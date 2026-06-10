# API Requirements — Guide Detail (Welli Wilyanto)

## Endpoint

```
GET /api/guides/welli-wilyanto
```

## Response Shape

```json
{
  "guide": {
    "id": "welli-wilyanto",
    "name": "Welli Wilyanto",
    "tagline": "Local Komodo · Sailing & Diving Specialist",
    "avatar": "https://i.pravatar.cc/400?img=15",
    "cover": "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1800",
    "verified": true,
    "superhost": true,
    "basedIn": "Labuan Bajo, Manggarai Barat, NTT",
    "origin": "Lahir & besar di Pulau Mesa, Labuan Bajo",
    "years": 8,
    "trips": 87,
    "rating": 4.95,
    "reviews": 218,
    "responseTime": "< 1 jam",
    "responseRate": 99,
    "joined": "Mei 2018",
    "languages": [
      { "flag": "🇮🇩", "name": "Indonesia", "level": "Native" },
      { "flag": "🇬🇧", "name": "English", "level": "Fluent" },
      { "flag": "🇫🇷", "name": "Français", "level": "Conversational" }
    ],
    "specialties": ["Bahari", "Diving", "Snorkeling", "Photography Trip", "Sailing"],
    "about": "Saya lahir di Pulau Mesa..."
  },
  "stats": {
    "responseTime": "< 1 jam",
    "responseRate": "99%",
    "tripsCompleted": 87,
    "yearsExperience": 8,
    "superhostStatus": true
  },
  "certifications": [
    {
      "name": "PADI Open Water Scuba Instructor",
      "year": 2021,
      "issuer": "PADI",
      "icon": "🦿"
    }
  ],
  "packages": [
    {
      "name": "Komodo Sailing 1 Day, Padar & Pink Beach",
      "duration": "1 hari (07.00–18.00)",
      "pax": "1–8 orang",
      "spots": ["Pulau Padar", "Pink Beach", "Manta Point", "Kanawa"],
      "price": 1850000,
      "unit": "/orang (min 2 pax)",
      "bestseller": true,
      "boat": "Speedboat (8 pax)"
    }
  ],
  "gallery": [
    { "src": "https://images.unsplash.com/...", "h": 1 }
  ],
  "reviews": [
    {
      "name": "Anastasia Wijaya",
      "av": "https://i.pravatar.cc/100?img=44",
      "rating": 5,
      "date": "10 Mei 2026",
      "trip": "Sailing 3D2N · Phinisi",
      "verified": true,
      "text": "Welli benar-benar tahu setiap sudut Komodo...",
      "photos": []
    }
  ],
  "similarGuides": [
    {
      "name": "Yosua Mbaha",
      "av": "https://i.pravatar.cc/200?img=51",
      "specs": ["Petualangan", "Trekking"],
      "rating": 4.88,
      "trips": 62,
      "price": 750000
    }
  ],
  "experienceAreas": [
    {
      "name": "Pulau Padar",
      "img": "https://images.unsplash.com/...",
      "visits": 87
    }
  ]
}
```

## Related Entities

| Section            | Data                | Source                     |
|--------------------|---------------------|----------------------------|
| Guide detail       | GUIDE               | `GUIDE` object             |
| GuideHero stats    | statsStrip          | `ghStyles.statsStrip`      |
| Languages          | Language[]          | `GUIDE.languages`          |
| Specialties        | string[]            | `GUIDE.specialties`        |
| Specialty meta     | SPEC_META           | `SPEC_META`                |
| About / Bio        | string              | `GUIDE.about`              |
| Certifications     | Certification[]     | `GUIDE.certifications`     |
| Experience Areas   | ExperienceArea[]    | `EXPERIENCE_AREAS`         |
| Packages           | GuidePackage[]      | `GUIDE_PACKAGES`           |
| Gallery            | GalleryItem[]       | `GUIDE_GALLERY`            |
| Reviews            | GuideReview[]       | `GUIDE_REVIEWS`            |
| Similar Guides     | SimilarGuide[]      | `SIMILAR_GUIDES`           |
| Response Stats     | ResponseStatsCard   | `ResponseStatsCard`        |

## Current Data Source

**File:** `src/app/tour-guides/welli-wilyanto/page.jsx`  
**Variables:** `GUIDE` (line 12–85), `GUIDE_PACKAGES` (line 131–170), `GUIDE_GALLERY` (line 172–205), `GUIDE_REVIEWS` (line 207–248), `SIMILAR_GUIDES` (line 250–283), `EXPERIENCE_AREAS` (line 98–129), `SPEC_META` (line 87–96)
