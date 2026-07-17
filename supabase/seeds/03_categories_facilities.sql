-- ── Seed Data: categories ─────────────────────────────────
INSERT INTO directory.categories (slug, name, entity_types, metadata) VALUES
  ('alam', '{"id": "Alam", "en": "Nature"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🌿", "color": "#E6F7E6"}'),
  ('budaya', '{"id": "Budaya", "en": "Culture"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🎭", "color": "#EDE9FF"}'),
  ('sejarah', '{"id": "Sejarah", "en": "History"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🛣️", "color": "#FFF4D9"}'),
  ('kuliner', '{"id": "Kuliner", "en": "Culinary"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🌙", "color": "#FFE2E2"}'),
  ('religi', '{"id": "Religi", "en": "Religious"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🕌", "color": "#E2F1FF"}'),
  ('petualangan', '{"id": "Petualangan", "en": "Adventure"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "⚽", "color": "#D9F2DA"}'),
  ('heritage', '{"id": "Heritage", "en": "Heritage"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🎯", "color": "#FFE9D6"}'),
  ('bahari', '{"id": "Bahari", "en": "Marine"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🌊", "color": "#D4ECF4"}'),
  ('desa-wisata', '{"id": "Desa Wisata", "en": "Tourism Village"}'::jsonb, ARRAY['village'], '{"icon": "🌾", "color": "#F0FBE9"}'),
  ('ecotourism', '{"id": "Ecotourism", "en": "Ecotourism"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🌱", "color": "#E6F7E6"}'),
  -- ADWI Levels (Anugerah Desa Wisata Indonesia) — entity_types = adwi_level
  ('adwi-rintisan', '{"id": "Rintisan", "en": "Rintisan"}'::jsonb, ARRAY['adwi_level'], '{"icon": "🌱", "color": "rgba(196,73,73,0.14)", "fg": "#C44949"}'),
  ('adwi-berkembang', '{"id": "Berkembang", "en": "Berkembang"}'::jsonb, ARRAY['adwi_level'], '{"icon": "🌿", "color": "rgba(31,111,176,0.14)", "fg": "#1F6FB0"}'),
  ('adwi-maju', '{"id": "Maju", "en": "Maju"}'::jsonb, ARRAY['adwi_level'], '{"icon": "🌳", "color": "rgba(81,176,84,0.16)", "fg": "#2D8838"}'),
  ('adwi-mandiri', '{"id": "Mandiri", "en": "Mandiri"}'::jsonb, ARRAY['adwi_level'], '{"icon": "🏆", "color": "rgba(180,122,0,0.16)", "fg": "#B47A00"}'),
  -- Village Themes (village_theme)
  ('tema-budaya', '{"id": "Budaya & Adat", "en": "Culture & Heritage"}'::jsonb, ARRAY['village_theme'], '{"icon": "🎭"}'),
  ('tema-alam', '{"id": "Alam & Ekowisata", "en": "Nature & Ecotourism"}'::jsonb, ARRAY['village_theme'], '{"icon": "🌿"}'),
  ('tema-kerajinan', '{"id": "Kerajinan", "en": "Handcrafts"}'::jsonb, ARRAY['village_theme'], '{"icon": "🏺"}'),
  ('tema-kuliner', '{"id": "Kuliner Lokal", "en": "Local Culinary"}'::jsonb, ARRAY['village_theme'], '{"icon": "🍽️"}'),
  ('tema-bahari', '{"id": "Bahari", "en": "Marine & Coastal"}'::jsonb, ARRAY['village_theme'], '{"icon": "🌊"}'),
  ('tema-pertanian', '{"id": "Agrowisata", "en": "Agrotourism"}'::jsonb, ARRAY['village_theme'], '{"icon": "🌾"}'),
  -- Village Activities (village_activity)
  ('aktivitas-tarian', '{"id": "Tarian", "en": "Traditional Dance"}'::jsonb, ARRAY['village_activity'], '{"icon": "💃"}'),
  ('aktivitas-kuliner', '{"id": "Kuliner", "en": "Culinary Tasting"}'::jsonb, ARRAY['village_activity'], '{"icon": "🍳"}'),
  ('aktivitas-trekking', '{"id": "Trekking", "en": "Nature Trekking"}'::jsonb, ARRAY['village_activity'], '{"icon": "🥾"}'),
  ('aktivitas-snorkel', '{"id": "Snorkel", "en": "Coral Snorkeling"}'::jsonb, ARRAY['village_activity'], '{"icon": "🤿"}'),
  ('aktivitas-workshop', '{"id": "Workshop", "en": "Traditional Workshop"}'::jsonb, ARRAY['village_activity'], '{"icon": "🔨"}'),
  ('aktivitas-homestay', '{"id": "Homestay", "en": "Local Stay Experience"}'::jsonb, ARRAY['village_activity'], '{"icon": "🏡"}')
ON CONFLICT (slug) DO NOTHING;

-- ── Seed Data: facilities ─────────────────────────────────
INSERT INTO directory.facilities (slug, name, entity_types, metadata) VALUES
  ('parkir', '{"id": "Parkir", "en": "Parking"}'::jsonb, ARRAY['attraction', 'village'], '{"icon": "🅿️"}'),
  ('toilet', '{"id": "Toilet", "en": "Restroom"}'::jsonb, ARRAY['attraction', 'village'], '{"icon": "🚾"}'),
  ('spot-foto', '{"id": "Spot Foto", "en": "Photo Spot"}'::jsonb, ARRAY['attraction'], '{"icon": "📸"}'),
  ('souvenir', '{"id": "Souvenir", "en": "Souvenir"}'::jsonb, ARRAY['attraction'], '{"icon": "🛍️"}'),
  ('akses-disabilitas', '{"id": "Akses Disabilitas", "en": "Disability Access"}'::jsonb, ARRAY['attraction'], '{"icon": "♿"}'),
  ('restoran', '{"id": "Restoran / Warung", "en": "Restaurant / Eatery"}'::jsonb, ARRAY['attraction', 'village'], '{"icon": "🍽️"}'),
  ('musholla', '{"id": "Musholla", "en": "Prayer Room"}'::jsonb, ARRAY['attraction', 'village'], '{"icon": "🕌"}'),
  ('camping-area', '{"id": "Camping Area", "en": "Camping Area"}'::jsonb, ARRAY['attraction'], '{"icon": "⛺"}'),
  ('sinyal-hp', '{"id": "Sinyal HP", "en": "Mobile Signal"}'::jsonb, ARRAY['attraction'], '{"icon": "📶"}'),
  ('air-bersih', '{"id": "Air Bersih", "en": "Clean Water"}'::jsonb, ARRAY['attraction'], '{"icon": "💧"}'),
  ('pemandu-lokal', '{"id": "Pemandu Lokal", "en": "Local Guide"}'::jsonb, ARRAY['attraction', 'village'], '{"icon": "🙋"}'),
  ('homestay', '{"id": "Homestay", "en": "Homestay"}'::jsonb, ARRAY['village'], '{"icon": "🏡"}'),
  ('charging-station', '{"id": "Stasiun Pengisian Daya", "en": "Charging Station"}'::jsonb, ARRAY['village'], '{"icon": "🔌"}'),
  ('wifi', '{"id": "WiFi", "en": "WiFi Connection"}'::jsonb, ARRAY['village'], '{"icon": "📶"}')
ON CONFLICT (slug) DO NOTHING;
