import DarkSkyAPIWrapper from 'dark-sky-skeleton'
import { getNavigatorCoords } from 'geo-loc-utils'

const config = {
  acceptedLanguage: ['en'],
  errorMessage: {
    noApiKeyOrProxy: 'No Dark Sky api key set and no proxy url set',
  },
  excludes: ['alerts', 'currently', 'daily', 'flags', 'hourly', 'minutely'],
  warningMessage: {
    invalidLanguage: 'not an accepted API lanugage.',
  },
}

class DarkSkyApi {
  /**
   * @param {string} apiKey Darksky API key - consider using a proxy.
   * @param {string|boolean} proxy Make request behind proxy to hide
   *    API key or set to true to indicate caller is server-side.
   * @param {string} units
   * @param {string} language
   * @param {Function} processor
   * @constructor
   */
  constructor(apiKey, proxy, language) {
    this._darkSkyApi = new DarkSkyAPIWrapper(apiKey, proxy)
    this._language = language || 'en'
  }

  /**
   * Initialze Darksky API with position data.
   * @param {object} position Contains the geo latitude and longitude.
   * @see DarkSkyApi.getNavigatorCoords
   */
  initialize(position) {
    this.position(position)
    this.initialized = true

    return this
  }

  /**
   * Set Darksky API position data.
   * @param {object} position Containing geo latitude and longitude.
   */
  position({ latitude, longitude }) {
    this._darkSkyApi.latitude(latitude).longitude(longitude)
    this.initialized = true

    return this
  }

  /**
   * Set language for response summaries.
   * @param {string} value The language token.
   */
  language(value) {
    if (config.acceptedLanguage.indexOf(value) === -1) {
      // eslint-disable-next-line no-console
      console.warn(`${value} ${config.warningMessage.invalidLanguage}`)
    } else {
      value = value ? (this._language = value) : null
    }

    return this
  }

  /**
   * Get the forecasted week of weather.
   * @param {object} position If omitted will use loadPosition.
   */
  loadCurrent(position) {
    if (position) {
      this.position(position)
    } else if (!this.initialized) {
      return this.loadPosition().then((position) => {
        return this.initialize(position).loadCurrent()
      })
    }

    return this._darkSkyApi
      .language(this._language)
      .exclude(config.excludes.filter((val) => val !== 'currently').join(','))
      .get()
      .then(({ currently }) => this.processWeatherItem(currently))
  }

  /**
   * Make response a bit more friendly
   * @param {object} item Item to process.
   */
  processWeatherItem(item) {
    return item
  }

  /**
   * Get the browser navigator coords.
   * @param {object} options
   * @return {Promise}
   */
  loadPosition(options = {}) {
    return DarkSkyApi.loadPosition(options)
  }

  static _api

  // Allow config and deferring of initialization.
  static apiKey
  static proxy
  static units
  static language
  static postProcessor

  /**
   *  Get browser navigator coords.
   * @return {Promise}
   */
  static loadPosition = (options = {}) => {
    return getNavigatorCoords(options)
  }

  /**
   * Initialize a static instance of weather api with dark sky api key
   * @param {string} apiKey
   * @param {string|boolean} proxy
   */
  static initialize(apiKey, proxy, units, language, postProcessor) {
    if (this._api) {
      return
    }

    if (!this.apiKey && !this.proxy && !apiKey && !proxy) {
      throw new Error(config.errorMessage.noApiKeyOrProxy)
    }

    const key = apiKey || this.apiKey || ''
    const proxyService = proxy || this.proxy || ''
    const unit = units || this.units || ''
    const lang = language || this.language || ''
    const processor = postProcessor || this.postProcessor || null

    this._api = new DarkSkyApi(key, proxyService, unit, lang, processor)
  }

  /**
   * Set language for response summaries - initialize or configure
   *  with api key or proxy first
   * @param {String} value The language token.
   */
  static setLanguage(language) {
    this.initialize()
    this._api.language(language)
  }

  /**
   * Get today's weather.
   * @param {object} position If omitted will use loadPosition.
   * @return {Promise}
   */
  static loadCurrent(position) {
    this.initialize()

    if (position) {
      return this._api.position(position).loadCurrent()
    } else {
      return this._api.loadCurrent()
    }
  }
}

export default DarkSkyApi
