-- ── Seed Data: categories ─────────────────────────────────
INSERT INTO directory.categories (slug, name, metadata) VALUES
  ('alam', '{"id": "Alam", "en": "Nature"}'::jsonb, '{"icon": "🌿", "color": "#E6F7E6"}'),
  ('budaya', '{"id": "Budaya", "en": "Culture"}'::jsonb, '{"icon": "🎭", "color": "#EDE9FF"}'),
  ('sejarah', '{"id": "Sejarah", "en": "History"}'::jsonb, '{"icon": "🛣️", "color": "#FFF4D9"}'),
  ('kuliner', '{"id": "Kuliner", "en": "Culinary"}'::jsonb, '{"icon": "🌙", "color": "#FFE2E2"}'),
  ('religi', '{"id": "Religi", "en": "Religious"}'::jsonb, '{"icon": "🕌", "color": "#E2F1FF"}'),
  ('petualangan', '{"id": "Petualangan", "en": "Adventure"}'::jsonb, '{"icon": "⚽", "color": "#D9F2DA"}'),
  ('heritage', '{"id": "Heritage", "en": "Heritage"}'::jsonb, '{"icon": "🎯", "color": "#FFE9D6"}'),
  ('bahari', '{"id": "Bahari", "en": "Marine"}'::jsonb, '{"icon": "🌊", "color": "#D4ECF4"}'),
  ('desa-wisata', '{"id": "Desa Wisata", "en": "Tourism Village"}'::jsonb, '{"icon": "🌾", "color": "#F0FBE9"}'),
  ('ecotourism', '{"id": "Ecotourism", "en": "Ecotourism"}'::jsonb, '{"icon": "🌱", "color": "#E6F7E6"}')
ON CONFLICT (slug) DO NOTHING;

-- ── Seed Data: facilities ─────────────────────────────────
INSERT INTO directory.facilities (slug, name, metadata) VALUES
  ('parkir', '{"id": "Parkir", "en": "Parking"}'::jsonb, '{"icon": "🅿️"}'),
  ('toilet', '{"id": "Toilet", "en": "Restroom"}'::jsonb, '{"icon": "🚾"}'),
  ('spot-foto', '{"id": "Spot Foto", "en": "Photo Spot"}'::jsonb, '{"icon": "📸"}'),
  ('souvenir', '{"id": "Souvenir", "en": "Souvenir"}'::jsonb, '{"icon": "🛍️"}'),
  ('akses-disabilitas', '{"id": "Akses Disabilitas", "en": "Disability Access"}'::jsonb, '{"icon": "♿"}'),
  ('restoran', '{"id": "Restoran / Warung", "en": "Restaurant / Eatery"}'::jsonb, '{"icon": "🍽️"}'),
  ('musholla', '{"id": "Musholla", "en": "Prayer Room"}'::jsonb, '{"icon": "🕌"}'),
  ('camping-area', '{"id": "Camping Area", "en": "Camping Area"}'::jsonb, '{"icon": "⛺"}'),
  ('sinyal-hp', '{"id": "Sinyal HP", "en": "Mobile Signal"}'::jsonb, '{"icon": "📶"}'),
  ('air-bersih', '{"id": "Air Bersih", "en": "Clean Water"}'::jsonb, '{"icon": "💧"}'),
  ('pemandu-lokal', '{"id": "Pemandu Lokal", "en": "Local Guide"}'::jsonb, '{"icon": "🙋"}'),
  ('homestay', '{"id": "Homestay", "en": "Homestay"}'::jsonb, '{"icon": "🏡"}'),
  ('charging-station', '{"id": "Stasiun Pengisian Daya", "en": "Charging Station"}'::jsonb, '{"icon": "🔌"}'),
  ('wifi', '{"id": "WiFi", "en": "WiFi Connection"}'::jsonb, '{"icon": "📶"}')
ON CONFLICT (slug) DO NOTHING;
