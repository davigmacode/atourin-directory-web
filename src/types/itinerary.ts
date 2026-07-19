import type { Creator } from "@/types/creator";

// ─── Primitive types ─────────────────────────────────────────

export type Difficulty = "easy" | "medium" | "hard";

/** Strict enum per month — UI maps to color: rain=red, ok=yellow, ideal=green */
export type BestTimeWeather = "rain" | "ok" | "ideal";

/** Crowd level per month */
export type BestTimeCrowd = "low" | "mid" | "high";

export interface ItineraryAudience {
  id: string;
  slug: string;
  name: I18nText;
  icon?: string | null;
}

// ─── Shared shapes ───────────────────────────────────────────

/** Multilingual text object */
export interface I18nText {
  id: string;
  en: string;
}

/** Monthly map for weather / crowd (12 keys: jan … dec) */
export interface ItineraryTimeMap {
  [month: string]: BestTimeWeather | BestTimeCrowd | string;
}

// ─── Budget ──────────────────────────────────────────────────

export interface ItineraryPriceItem {
  label: string;
  sublabel?: string | null;
  amount: number;
}

// ─── Stops ───────────────────────────────────────────────────

export interface ItineraryStop {
  id: string;
  /** Multilingual place name: { id: "Sirkuit Mandalika", en: "Mandalika Circuit" } */
  name: I18nText;
  /** Renamed from `order` (SQL reserved keyword) */
  sortOrder: number;
  lat?: number | null;
  lng?: number | null;
  type: "attraction" | "food" | "rest" | "transport" | "photo" | "other";
}

// ─── Timeline ────────────────────────────────────────────────

export interface ItineraryTimelineEvent {
  id: string;
  /** Scheduled time string, e.g. "07:30" */
  time: string;
  /**
   * Duration in MINUTES (e.g. 30 = "30 min", 90 = "1 jam 30 min").
   * NULL = open-ended / no fixed duration.
   * UI formats: <60 → "X min", >=60 → "X jam Y min"
   */
  durationMinutes?: number | null;
  /** Multilingual event title */
  title: I18nText;
  /** FK to itinerary_daily_stops — null for in-transit events */
  stopId?: string | null;
  /** Resolved stop object (joined in API response) */
  stop?: ItineraryStop | null;
  /** Multilingual detailed description */
  description?: I18nText | null;
  /** List of specific inclusions, e.g. ["Termasuk tiket masuk"] */
  includes?: string[];
  /** Transit info string, e.g. "12 km · 25 min" */
  travelInfo?: string | null;
  sortOrder: number;
}

// ─── Day ─────────────────────────────────────────────────────

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  /** Multilingual day title */
  title: I18nText;
  /** Number of stops in this day (maps to summary_stops column) */
  summaryStops: number;
  /** Estimated total hours (maps to summary_hours column) */
  summaryHours: number;
  /** Estimated distance in km (maps to summary_km column) */
  summaryKm: number;
  /** Estimated day cost in IDR (maps to summary_price column) */
  summaryPrice: number;
  stops: ItineraryStop[];
  timeline: ItineraryTimelineEvent[];
}

// ─── Schedule ────────────────────────────────────────────────

export type ScheduleStatus = 'scheduled' | 'available' | 'sold_out' | 'cancelled';

export interface ItinerarySchedule {
  id: string;
  /** ISO date string, e.g. "2026-08-07" */
  startDate: string;
  customTitle?: string | null;
  /** Booking status: scheduled â†' available â†' sold_out â†' cancelled */
  status: ScheduleStatus;
  /** Per-schedule pax limits (null = fallback to itinerary-level) */
  minPax?: number | null;
  maxPax?: number | null;
  /**
   * Per-schedule budget in IDR (null = use itinerary-level budgetEstimation).
   * Enables seasonal pricing (e.g., peak season = higher per-person price).
   */
  budgetEstimation?: number | null;
}

// ─── Category ────────────────────────────────────────────────

export interface ItineraryCategory {
  id: string;
  slug: string;
  /** Multilingual from taxonomies.name */
  name: I18nText;
  icon?: string | null;
  sortOrder: number;
}

// ─── Highlight ───────────────────────────────────────────────

export interface ItineraryHighlight {
  id: string;
  slug: string;
  name: I18nText;
  icon: string;
  /** Global description from taxonomies.description, not per-itinerary */
  description: I18nText;
  sortOrder: number;
}

// ─── Language ────────────────────────────────────────────────

export interface ItineraryLanguage {
  id: string;
  slug: string;
  name: I18nText;
  code?: string | null;
  icon?: string | null;
}

// ─── Main Itinerary ──────────────────────────────────────────

export interface Itinerary {
  id: string;
  slug: string;
  name: I18nText;
  description: I18nText;
  coverImage: { url: string; blurhash: string | null; base64?: string | null };
  ratingAverage: number;
  reviewsCount: number;
  viewsCount: number;
  savesCount: number;
  durationDays: number;
  durationNights: number;
  minPax: number;
  maxPax: number;
  destination: { id: string; slug: string; name: string };
  author: Creator;
  /** Multi-category via itinerary_categories join table */
  categories: ItineraryCategory[];
  difficulty: Difficulty | null;
  budgetEstimation?: number | null;
  budgetBreakdown: ItineraryPriceItem[];
  targetAudience: ItineraryAudience[];
  bestTimeWeather: ItineraryTimeMap;
  bestTimeCrowd: ItineraryTimeMap;
  /** Multilingual note — matches DB jsonb column */
  bestTimeNote: I18nText | null;
  days: ItineraryDay[];
  schedules: ItinerarySchedule[];
  highlights: ItineraryHighlight[];
  languages: ItineraryLanguage[];
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Filters ─────────────────────────────────────────────────

export interface ItineraryFilters {
  destination?: string;
  theme?: string;
  /** Taxonomy slug via itinerary_categories */
  category?: string;
  /** "1" | "2-3" | "4-7" | "7+" */
  duration?: string;
  /** "<500rb" | "500-2jt" | ">2jt" */
  budget?: string;
  difficulty?: string;
  /** Creator slug */
  author?: string;
  /** Taxonomy slug via itinerary_languages */
  language?: string;
  /**
   * Month number 1–12.
   * Filters: best_time_weather @> '{"<month>":"ideal"}'
   */
  month?: string;
  /**
   * ISO date — filters: itinerary_schedules.start_date >= this date
   */
  startDate?: string;
  sort?: "popular" | "rating" | "newest" | "budget";
}
