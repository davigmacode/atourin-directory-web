-- =============================================================
-- Seed: tourism_village_certifications
-- Run AFTER: 07_certifications.sql (certifications must exist)
-- =============================================================

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', 'Penghargaan ADWI 2024'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-wae-rebo' AND c.slug = 'adwi-award-2024'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2023-06-15', 'GSTC Certified Sustainable Tourism'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-wae-rebo' AND c.slug = 'gstc-certified'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', 'Penghargaan ADWI 2024'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-penglipuran' AND c.slug = 'adwi-award-2024'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2023-03-10', 'UNESCO Heritage Award - Cultural Landscape'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-penglipuran' AND c.slug = 'heritage-award'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', 'Penghargaan ADWI 2024'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-nglanggeran' AND c.slug = 'adwi-award-2024'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2022-09-20', 'ASEAN Sustainable Tourism Award'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-nglanggeran' AND c.slug = 'indonesia-sustainable-tourism'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2023-01-01', 'Penghargaan ADWI 2023'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-pemuteran' AND c.slug = 'adwi-award-2023'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', 'Penghargaan ADWI 2024'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-sasak-sade' AND c.slug = 'adwi-award-2024'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', '5-Star Kemenparekraf Rating'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-sasak-sade' AND c.slug = 'kemenparekraf-5-star'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2022-05-10', 'Sapta Pesona Training - Kemenparekraf'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-pentingsari' AND c.slug = 'sapta-pesona-training'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2023-01-01', 'Penghargaan ADWI 2023'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-wisata-alam-endah' AND c.slug = 'adwi-award-2023'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2024-01-01', 'Penghargaan ADWI 2024'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-wisata-ciptagelar' AND c.slug = 'adwi-award-2024'
ON CONFLICT DO NOTHING;

INSERT INTO directory.tourism_village_certifications (tourism_village_id, certification_id, awarded_at, notes)
SELECT v.id, c.id, '2023-08-20', 'Cultural Heritage Interpretation Training - Kemendikbudristek'
FROM directory.tourism_villages v, directory.certifications c
WHERE v.slug = 'desa-wisata-ciptagelar' AND c.slug = 'cultural-heritage-training'
ON CONFLICT DO NOTHING;
