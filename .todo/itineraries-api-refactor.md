# Itineraries API Refactor - Plan (v10)

> TypeScript + Elysia API for itineraries.
> Full detail-page UI: hero, info chips, price breakdown,
> day plans (stops + timeline as child tables), schedules,
> best time, languages, target audience, category, etc.

## Summary

**Renames:**
- budget_min / budget_max -> budget_estimation (single)
- price_breakdown -> budget_breakdown
- cocok_untuk -> target_audience
- best_months -> best_time_weather (record {jan:"rain",...})
- best_time_peak -> best_time_crowd (record {jan:"high",...})
- itinerary_languages.category_id -> taxonomy_id
- itinerary_daily.title (text) -> title (jsonb)
- itinerary_daily_stops.order -> sort_order
- itinerary_daily.summary (jsonb) -> explicit columns: summary_stops, summary_hours, summary_km, summary_price

## Tables

1. 20260718000000_patch_taxonomy_types.sql
   Extend taxonomies type CHECK: add language, creator_role, itinerary_category, itinerary_highlight
   Rename guide_language -> language in existing rows
   Seed: creator_role (official, local-expert, community, partner)
   Seed: itinerary_highlight (pemandangan, kearifan-budaya, biota-alam, kuliner-otentik)
   Seed: itinerary_category (petualangan, keluarga, budaya, romantis, alam, bahari, kuliner, backpacker)

2. 20260718000001_create_creators_and_badges.sql
   creators: id, user_id (FK auth.users), slug, name, display_name, avatar (jsonb), bio (jsonb), is_verified
   creator_badges: id, creator_id (FK creators), taxonomy_id (FK taxonomies, type=creator_role), issued_at, valid_until

3. 20260718000002_create_itineraries_core.sql
   itineraries: id, slug, name (jsonb), description (jsonb), cover_image (jsonb),
   rating_average, reviews_count, views_count, saves_count,
   duration_days, duration_nights, min_pax, max_pax,
   destination_id (FK), author_id (FK creators),
   difficulty (easy/medium/hard),
   budget_estimation, budget_breakdown (jsonb),
   target_audience (jsonb),
   best_time_weather (jsonb), best_time_crowd (jsonb), best_time_note (jsonb),
   is_featured, is_published
   itinerary_languages: itinerary_id (FK), category_id (FK taxonomies, type=language)
   itinerary_highlights: itinerary_id (FK), taxonomy_id (FK taxonomies, type=itinerary_highlight), description (jsonb), sort_order

4. 20260718000003_create_itinerary_categories.sql
   itinerary_categories: itinerary_id (FK), category_id (FK taxonomies, type=itinerary_category), sort_order

5. 20260718000004_create_itinerary_daily_and_stops.sql
   itinerary_daily: id, itinerary_id (FK), day_number, title (jsonb), summary_stops, summary_hours, summary_km, summary_price
   itinerary_daily_stops: id, itinerary_daily_id (FK), name (jsonb multilingual), sort_order, lat, lng, type (check: attraction/food/rest/transport/photo/other)

6. 20260718000005_create_itinerary_timelines_and_schedules.sql
   itinerary_daily_timelines: id, itinerary_daily_id (FK), time, duration_minutes, title (jsonb),
   stop_id (FK), description (jsonb), includes (jsonb), travel_info, sort_order
   itinerary_schedules: id, itinerary_id (FK), start_date, custom_title,
   status (check: scheduled/available/sold_out/cancelled), min_pax, max_pax,
   budget_estimation (nullable, overrides itinerary-level)

## Budget Sync Strategy

- itinerary.budget_estimation = default per-person price (used in list view)
- itinerary.budget_breakdown = itemized cost list (shared across all schedules)
- schedule.budget_estimation = per-departure override (null = use itinerary-level)
- list API returns itinerary-level budgetEstimation
- detail API returns both itinerary and schedule levels for comparison