/**
 * Weather Service — Adapter Pattern
 *
 * Provides a unified interface to fetch weather data from multiple providers.
 *
 * @example
 * ```js
 * // Open-Meteo (global, no API key)
 * import { createWeatherService } from "@/lib/weather";
 * const weather = createWeatherService("open-meteo");
 * const data = await weather.getAll({ lat: -8.5, lon: 119.9 });
 *
 * // BMKG (Indonesia only)
 * const bmkg = createWeatherService("bmkg");
 * const data = await bmkg.getAll({ province: "Nusa Tenggara Timur", name: "Labuan Bajo" });
 * ```
 */

export { WeatherAdapter } from "./WeatherAdapter";
export { OpenMeteoAdapter } from "./OpenMeteoAdapter";
export { BmkgAdapter } from "./BmkgAdapter";

/**
 * Create a weather service instance using the specified provider.
 *
 * @param {"open-meteo"|"bmkg"} [provider="open-meteo"] - Weather provider
 * @param {object} [options] - Adapter-specific options
 * @param {string} [options.baseUrl] - Override the API base URL
 * @param {number} [options.timeout=8000] - Request timeout (ms)
 * @param {object} [options.provinceCodes] - Custom BMKG province code map (BmkgAdapter only)
 * @returns {WeatherAdapter}
 */
export function createWeatherService(provider = "open-meteo", options = {}) {
  switch (provider) {
    case "open-meteo":
      return new OpenMeteoAdapter(options);
    case "bmkg":
      return new BmkgAdapter(options);
    default:
      throw new Error(
        `Unknown weather provider: "${provider}". ` +
          `Supported: "open-meteo", "bmkg"`,
      );
  }
}
