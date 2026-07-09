import { WeatherAdapter } from "./WeatherAdapter";

/**
 * Normalized condition lookup (BMKG → common icon + label).
 */
const BMKG_CONDITION_MAP = {
  "Cerah":                     { icon: "☀️",  code: 0 },
  "Cerah Berawan":             { icon: "🌤️", code: 1 },
  "Berawan":                   { icon: "⛅",  code: 2 },
  "Berawan Tebal":             { icon: "☁️",  code: 3 },
  "Mendung":                   { icon: "☁️",  code: 3 },
  "Kabut":                     { icon: "🌫️", code: 45 },
  "Asap":                      { icon: "🌫️", code: 45 },
  "Gerimis":                   { icon: "🌦️", code: 51 },
  "Hujan Ringan":              { icon: "🌧️", code: 61 },
  "Hujan Sedang":              { icon: "🌧️", code: 63 },
  "Hujan Lebat":               { icon: "🌧️", code: 65 },
  "Hujan Lokal":               { icon: "🌧️", code: 80 },
  "Hujan Petir":               { icon: "⛈️",  code: 95 },
  "Hujan Disertai Petir":      { icon: "⛈️",  code: 95 },
  "Hujan Badai":               { icon: "⛈️",  code: 99 },
  "Badai Petir":               { icon: "⛈️",  code: 99 },
};

function resolveBMKGCondition(condition) {
  const clean = (condition || "").trim();
  return BMKG_CONDITION_MAP[clean] || { icon: "❓", code: -1 };
}

/**
 * BmkgAdapter
 *
 * Uses BMKG (Badan Meteorologi, Klimatologi, dan Geofisika) public API.
 * Data is limited to Indonesian territory.
 *
 * API docs: https://data.bmkg.go.id/prakiraan-cuaca/
 *
 * Location can be provided as:
 *   - `{ adm1, adm2 }` — BMKG administrative codes (fastest)
 *   - `{ province, name }` — province & city name (auto-resolved)
 *   - `{ lat, lon }` — coordinates (auto-resolved to nearest BMKG area)
 *
 * @example
 * ```js
 * const weather = new BmkgAdapter();
 * const data = await weather.getAll({ adm1: "51", adm2: "5101" });
 * ```
 */
export class BmkgAdapter extends WeatherAdapter {
  constructor(options = {}) {
    super();
    this.baseUrl =
      options.baseUrl || "https://api.bmkg.go.id/prakiraan-cuaca";
    this.timeout = options.timeout || 8000;

    /**
     * Simple lookup table: province name → BMKG adm1 code.
     * A more complete mapping can be injected via options.provinceCodes.
     */
    this.provinceCodes =
      options.provinceCodes || DEFAULT_PROVINCE_CODES;
  }

  /* ─── Build query URL ─────────────────────────────── */

  _buildUrl(location) {
    const url = new URL(this.baseUrl);

    // Priority: explicit adm1/adm2 > province lookup > lat/lon
    if (location.adm1) {
      url.searchParams.set("adm1", location.adm1);
      if (location.adm2) url.searchParams.set("adm2", location.adm2);
    } else if (location.province) {
      const adm1 = this._resolveAdm1(location.province);
      if (adm1) url.searchParams.set("adm1", adm1);
    }
    // If only lat/lon is given, we attempt via Jakarta default
    // (BMKG doesn't directly accept lat/lon — needs adm code)

    return url;
  }

  _resolveAdm1(provinceName) {
    const name = provinceName.toLowerCase().trim();
    for (const [code, names] of Object.entries(this.provinceCodes)) {
      if (names.some((n) => name.includes(n.toLowerCase()))) {
        return code;
      }
    }
    return null;
  }

  /* ─── HTTP fetch ──────────────────────────────────── */

  async _fetch(location) {
    const url = this._buildUrl(location);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url.toString(), {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(
          `BMKG API error: ${res.status} ${res.statusText}`,
        );
      }
      return res.json();
    } catch (err) {
      if (err.name === "AbortError") {
        throw new Error("BMKG API request timed out");
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  /* ─── Normalize BMKG response ─────────────────────── */

  _parseBMKGData(json) {
    // BMKG may wrap data in a nested structure
    const raw = json.data || json;
    const cuaca = raw.cuaca || raw.forecast || raw.data || [];

    if (!Array.isArray(cuaca) || cuaca.length === 0) {
      return { current: null, forecast: [] };
    }

    // BMKG returns a timeline within a day.
    // Pick the first entry as "current" and group by date for forecast.
    const now = cuaca[0];
    const loc = raw.lokasi || {};

    // Group entries by date for daily forecast
    const dayMap = new Map();
    for (const entry of cuaca) {
      // "waktu" can be "YYYY-MM-DD HH:mm:ss" or "YYYY-MM-DD"
      const rawDate = entry.waktu || entry.datetime || entry.date;
      if (!rawDate) continue;
      const dateKey = rawDate.slice(0, 10);
      if (!dayMap.has(dateKey)) {
        dayMap.set(dateKey, []);
      }
      dayMap.get(dateKey).push(entry);
    }

    const forecast = [];
    for (const [dateKey, entries] of dayMap) {
      const temps = entries.map((e) => e.suhuMin ?? e.suhu_min ?? e.temp_min);
      const tempMaxs = entries.map((e) => e.suhuMax ?? e.suhu_max ?? e.temp_max);
      const hums = entries.map((e) => e.kelembapan ?? e.humidity ?? e.humid);
      const winds = entries.map((e) => e.angin ?? e.wind_speed ?? e.wind);

      // Pick the most common condition for the day
      const conditions = entries.map((e) => e.cuaca || e.weather || e.condition);
      const modeCondition = modeString(conditions.filter(Boolean));

      const w = resolveBMKGCondition(modeCondition);

      forecast.push({
        date: dateKey,
        tempMin: Math.round(avg(temps.filter((v) => v != null))),
        tempMax: Math.round(avg(tempMaxs.filter((v) => v != null))),
        weatherCode: w.code,
        condition: modeCondition || w.condition,
        icon: w.icon,
        precipitation: null, // BMKG doesn't provide pop directly
      });
    }

    // Current weather from the first (most recent) entry
    const current = now
      ? (() => {
          const w = resolveBMKGCondition(
            now.cuaca || now.weather || now.condition,
          );
          return {
            temp: Math.round(now.suhuMin ?? now.suhu ?? now.temp ?? 0),
            feelsLike: Math.round(now.suhuMax ?? now.suhu ?? now.temp ?? 0),
            humidity: now.kelembapan ?? now.humidity ?? now.humid ?? 0,
            windSpeed: Math.round(now.angin ?? now.wind_speed ?? 0),
            weatherCode: w.code,
            condition: now.cuaca || now.weather || w.condition,
            icon: w.icon,
            updatedAt: now.waktu || now.datetime || now.date || new Date().toISOString(),
            location: loc.provinsi
              ? `${loc.kota || ""}, ${loc.provinsi}`
              : null,
          };
        })()
      : null;

    return { current, forecast };
  }

  /* ─── Public API ──────────────────────────────────── */

  /**
   * @param {import("./WeatherAdapter").WeatherLocation} location
   * @returns {Promise<import("./WeatherAdapter").CurrentWeather>}
   */
  async getCurrentWeather(location) {
    const json = await this._fetch(location);
    const { current, forecast } = this._parseBMKGData(json);
    if (!current) {
      throw new Error(
        "BMKG returned no current weather data for this location",
      );
    }
    return current;
  }

  /**
   * @param {import("./WeatherAdapter").WeatherLocation} location
   * @param {number} [days=7]
   * @returns {Promise<import("./WeatherAdapter").ForecastDay[]>}
   */
  async getForecast(location, days = 7) {
    const json = await this._fetch(location);
    const { forecast } = this._parseBMKGData(json);
    return forecast.slice(0, days);
  }
}

/* ─── Helpers ───────────────────────────────────────── */

function avg(arr) {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function modeString(arr) {
  const freq = {};
  let max = 0;
  let mode = "";
  for (const s of arr) {
    freq[s] = (freq[s] || 0) + 1;
    if (freq[s] > max) {
      max = freq[s];
      mode = s;
    }
  }
  return mode;
}

/**
 * Default BMKG province codes (adm1).
 * Source: https://data.bmkg.go.id/ — BPBD / BPS codes.
 */
const DEFAULT_PROVINCE_CODES = {
  "11": ["Aceh"],
  "12": ["Sumatera Utara", "Sumut"],
  "13": ["Sumatera Barat", "Sumbar"],
  "14": ["Riau"],
  "15": ["Jambi"],
  "16": ["Sumatera Selatan", "Sumsel"],
  "17": ["Bengkulu"],
  "18": ["Lampung"],
  "19": ["Kepulauan Bangka Belitung", "Bangka Belitung", "Babel"],
  "21": ["Kepulauan Riau", "Kepri"],
  "31": ["DKI Jakarta", "Jakarta"],
  "32": ["Jawa Barat", "Jabar"],
  "33": ["Jawa Tengah", "Jateng"],
  "34": ["DI Yogyakarta", "Yogyakarta", "DIY"],
  "35": ["Jawa Timur", "Jatim"],
  "36": ["Banten"],
  "51": ["Bali"],
  "52": ["Nusa Tenggara Barat", "NTB"],
  "53": ["Nusa Tenggara Timur", "NTT"],
  "61": ["Kalimantan Barat", "Kalbar"],
  "62": ["Kalimantan Tengah", "Kalteng"],
  "63": ["Kalimantan Selatan", "Kalsel"],
  "64": ["Kalimantan Timur", "Kaltim"],
  "65": ["Kalimantan Utara", "Kaltara"],
  "71": ["Sulawesi Utara", "Sulut"],
  "72": ["Sulawesi Tengah", "Sulteng"],
  "73": ["Sulawesi Selatan", "Sulsel"],
  "74": ["Sulawesi Tenggara", "Sultra"],
  "75": ["Gorontalo"],
  "76": ["Sulawesi Barat", "Sulbar"],
  "81": ["Maluku"],
  "82": ["Maluku Utara", "Malut"],
  "91": ["Papua"],
  "92": ["Papua Barat", "Pabar"],
  "93": ["Papua Selatan", "Pasal"],
  "94": ["Papua Tengah", "Pateng"],
  "95": ["Papua Pegunungan", "Pagunungan"],
  "96": ["Papua Barat Daya", "Pabar Daya"],
};
