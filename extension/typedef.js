/**
 * @typedef {Object} SDKContext
 * @property {ExtensionConfig} config
 * @property {SDKContextMeta} meta
 * @property {SDKContextStorage} storage
 * @property {SDKContextLog} log
 * @property {function} tracedRequest
 */

/**
 * @typedef {Object} ExtensionConfig
 * @property {boolean} hasCoupons
 * @property {boolean} allowMultipleCoupons
 * @property {string} currency
 * @property {string} legalText
 * @property {string} legalInfo
 */

/**
 * @typedef {Object} SDKContextMeta
 * @property {string} deviceId
 * @property {string} appId
 * @property {string} userId
 * @property {string} appLanguage
 */

/**
 * @typedef {Object} SDKContextStorage
 * @property {SDKContextEntityStorage} extension
 * @property {SDKContextEntityStorage} device
 * @property {SDKContextEntityStorage} user
 */

/**
 * @typedef {Object} SDKContextEntityStorage
 * @property {function} get - (string key, function cb)
 * @property {function} set - (string key, mixed value, function cb)
 * @property {function} del - (string key, function cb)
 */

/**
 * @typedef {Object} SDKContextLog
 * @property {function} log.trace
 * @property {function} log.debug
 * @property {function} log.info
 * @property {function} log.warn
 * @property {function} log.error
 * @property {function} log.fatal
 */

/**
 * @typedef {CartItem[]} Cart
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {string} productId
 * @property {number} quantity
 * @property {string} type
 * @property {CartItemOption[]} options
 * @property {Object} price
 * @property {number} price.unit
 * @property {number} price.default full amount with quantity or striked price
 * @property {number} price.special full amount with quantity when strike is given
 */

/**
 * @typedef {Object} CartItemOption
 * @property {string} id
 * @property {string} type
 * @property {string} value
 */
