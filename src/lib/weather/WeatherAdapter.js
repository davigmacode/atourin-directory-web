/**
 * WeatherAdapter — Abstract base class for weather service adapters.
 *
 * All adapters must implement `getCurrentWeather()` and `getForecast()`.
 * Both methods accept a location object and return a normalized response.
 *
 * @typedef {Object} WeatherLocation
 * @property {number} lat          - Latitude
 * @property {number} lon          - Longitude
 * @property {string} [name]       - City / destination name
 * @property {string} [province]   - Province name (used by BMKG adapter)
 * @property {string} [adm1]       - BMKG province code
 * @property {string} [adm2]       - BMKG city/district code
 *
 * @typedef {Object} NormalizedWeather
 * @property {CurrentWeather} current
 * @property {ForecastDay[]}  forecast
 *
 * @typedef {Object} CurrentWeather
 * @property {number} temp         - Current temperature (°C)
 * @property {number} feelsLike    - Apparent temperature (°C)
 * @property {number} humidity     - Relative humidity (%)
 * @property {number} windSpeed    - Wind speed (km/h)
 * @property {number} weatherCode  - Normalized weather code (0 = clear, 1–3 clouds, etc.)
 * @property {string} condition    - Human-readable condition (ID)
 * @property {string} icon         - Emoji icon for the weather
 * @property {string} updatedAt    - ISO timestamp of the data
 *
 * @typedef {Object} ForecastDay
 * @property {string} date         - Date string (YYYY-MM-DD)
 * @property {number} tempMin      - Min temperature (°C)
 * @property {number} tempMax      - Max temperature (°C)
 * @property {number} weatherCode  - Normalized weather code
 * @property {string} condition    - Human-readable condition (ID)
 * @property {string} icon         - Emoji icon
 * @property {number} [precipitation] - Precipitation probability (%)
 */

export class WeatherAdapter {
  /**
   * Fetch current weather for a given location.
   * @param {WeatherLocation} location
   * @returns {Promise<CurrentWeather>}
   */
  async getCurrentWeather(location) {
    throw new Error(
      `[WeatherAdapter] ${this.constructor.name} must implement getCurrentWeather()`,
    );
  }

  /**
   * Fetch weather forecast for a given location.
   * @param {WeatherLocation} location
   * @param {number} [days=7] - Number of forecast days
   * @returns {Promise<ForecastDay[]>}
   */
  async getForecast(location, days = 7) {
    throw new Error(
      `[WeatherAdapter] ${this.constructor.name} must implement getForecast()`,
    );
  }

  /**
   * Convenience method: fetch current + forecast in one call.
   * @param {WeatherLocation} location
   * @param {number} [days=7]
   * @returns {Promise<NormalizedWeather>}
   */
  async getAll(location, days = 7) {
    const [current, forecast] = await Promise.all([
      this.getCurrentWeather(location),
      this.getForecast(location, days),
    ]);
    return { current, forecast };
  }
}
