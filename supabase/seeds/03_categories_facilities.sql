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
  ('ecotourism', '{"id": "Ecotourism", "en": "Ecotourism"}'::jsonb, ARRAY['attraction', 'destination', 'village', 'itinerary'], '{"icon": "🌱", "color": "#E6F7E6"}')
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
