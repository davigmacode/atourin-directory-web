import { WeatherAdapter } from "./WeatherAdapter";

/**
 * WMO Weather Code → normalized icon & condition (ID)
 * https://open-meteo.com/en/docs#weathervariables
 */
const WMO_TABLE = {
  0:  { icon: "☀️",   condition: "Cerah" },
  1:  { icon: "🌤️",  condition: "Cerah Berawan" },
  2:  { icon: "⛅",   condition: "Berawan" },
  3:  { icon: "☁️",   condition: "Mendung" },
  45: { icon: "🌫️",  condition: "Kabut" },
  48: { icon: "🌫️",  condition: "Kabut" },
  51: { icon: "🌦️",  condition: "Gerimis" },
  53: { icon: "🌦️",  condition: "Gerimis" },
  55: { icon: "🌦️",  condition: "Gerimis" },
  56: { icon: "🌦️",  condition: "Gerimis Beku" },
  57: { icon: "🌦️",  condition: "Gerimis Beku" },
  61: { icon: "🌧️",  condition: "Hujan Ringan" },
  63: { icon: "🌧️",  condition: "Hujan Sedang" },
  65: { icon: "🌧️",  condition: "Hujan Lebat" },
  66: { icon: "🌧️",  condition: "Hujan Beku" },
  67: { icon: "🌧️",  condition: "Hujan Beku" },
  71: { icon: "❄️",   condition: "Salju Ringan" },
  73: { icon: "❄️",   condition: "Salju Sedang" },
  75: { icon: "❄️",   condition: "Salju Lebat" },
  77: { icon: "❄️",   condition: "Butiran Salju" },
  80: { icon: "🌧️",  condition: "Hujan Lokal" },
  81: { icon: "🌧️",  condition: "Hujan Sedang" },
  82: { icon: "🌧️",  condition: "Hujan Lebat" },
  85: { icon: "❄️",   condition: "Salju Ringan" },
  86: { icon: "❄️",   condition: "Salju Lebat" },
  95: { icon: "⛈️",   condition: "Badai Petir" },
  96: { icon: "⛈️",   condition: "Badai Petir" },
  99: { icon: "⛈️",   condition: "Badai Petir" },
};

function resolveWMO(code) {
  return WMO_TABLE[code] || { icon: "❓", condition: "Tidak diketahui" };
}

/**
 * OpenMeteoAdapter
 *
 * Uses the free Open-Meteo API (no API key required).
 * API docs: https://open-meteo.com/en/docs
 *
 * Location must include `lat` and `lon`.
 *
 * @example
 * ```js
 * const weather = new OpenMeteoAdapter();
 * const data = await weather.getAll({ lat: -8.5, lon: 119.9 });
 * ```
 */
export class OpenMeteoAdapter extends WeatherAdapter {
  constructor(options = {}) {
    super();
    this.baseUrl = options.baseUrl || "https://api.open-meteo.com/v1";
    this.timeout = options.timeout || 8000;
  }

  async _fetch(params) {
    const url = new URL(`${this.baseUrl}/forecast`);
    url.searchParams.set("timezone", "auto");

    for (const [key, val] of Object.entries(params)) {
      if (val != null) url.searchParams.set(key, String(val));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const res = await fetch(url.toString(), {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        throw new Error(
          `Open-Meteo API error: ${res.status} ${res.statusText}`,
        );
      }
      return res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * @param {import("./WeatherAdapter").WeatherLocation} location
   * @returns {Promise<import("./WeatherAdapter").CurrentWeather>}
   */
  async getCurrentWeather(location) {
    const { lat, lon } = location;
    const json = await this._fetch({
      latitude: lat,
      longitude: lon,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
    });

    const c = json.current;
    const w = resolveWMO(c.weather_code);

    return {
      temp: Math.round(c.temperature_2m),
      feelsLike: Math.round(c.apparent_temperature),
      humidity: c.relative_humidity_2m,
      windSpeed: Math.round(c.wind_speed_10m),
      weatherCode: c.weather_code,
      condition: w.condition,
      icon: w.icon,
      updatedAt: c.time,
    };
  }

  /**
   * @param {import("./WeatherAdapter").WeatherLocation} location
   * @param {number} [days=7]
   * @returns {Promise<import("./WeatherAdapter").ForecastDay[]>}
   */
  async getForecast(location, days = 7) {
    const { lat, lon } = location;
    const json = await this._fetch({
      latitude: lat,
      longitude: lon,
      daily:
        "temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max",
      forecast_days: Math.min(days, 16),
    });

    const d = json.daily;
    const result = [];

    for (let i = 0; i < d.time.length; i++) {
      const w = resolveWMO(d.weather_code[i]);
      result.push({
        date: d.time[i],
        tempMin: Math.round(d.temperature_2m_min[i]),
        tempMax: Math.round(d.temperature_2m_max[i]),
        weatherCode: d.weather_code[i],
        condition: w.condition,
        icon: w.icon,
        precipitation: d.precipitation_probability_max?.[i] ?? null,
      });
    }

    return result;
  }
}
