// ...existing code...

class CartPerformance {
  static #metric_prefix = "cart-performance"

  static createStartingMarker(benchmarkName) {
    const metricName = `${CartPerformance.#metric_prefix}:${benchmarkName}`
    return performance.mark(`${metricName}:start`);
  }

  static measureFromEvent(benchmarkName, event) {
    const metricName = `${CartPerformance.#metric_prefix}:${benchmarkName}`
    const startMarker = performance.mark(`${metricName}:start`, {
      startTime: event.timeStamp
    });

    const endMarker = performance.mark(`${metricName}:end`);

    performance.measure(
      benchmarkName,
      `${metricName}:start`,
      `${metricName}:end`
    );
  }

  static measureFromMarker(benchmarkName, startMarker) {
    const metricName = `${CartPerformance.#metric_prefix}:${benchmarkName}`
    const endMarker = performance.mark(`${metricName}:end`);

    performance.measure(
      benchmarkName,
      startMarker.name,
      `${metricName}:end`
    );
  }
}

/**
 * @typedef {Object} PerformanceMetrics
 * @property {number} startTime
 * @property {number} endTime
 * @property {string} name
 */

class Logger {
  static ERROR = 'error';
  static WARN = 'warn';
  static INFO = 'info';
  
  /**
   * @param {string} message
   * @param {string} level
   * @param {Error} [error]
   */
  static log(message, level = Logger.INFO, error = null) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (process.env.NODE_ENV === 'development') {
      console[level](logMessage, error || '');
    }
  }
}

class StateManager {
  constructor() {
    this.state = new Map();
    this.subscribers = new Map();
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  setState(key, value) {
    this.state.set(key, value);
    this.notify(key, value);
  }

  /**
   * @param {string} key
   * @returns {*}
   */
  getState(key) {
    return this.state.get(key);
  }

  /**
   * @param {string} key
   * @param {Function} callback
   * @returns {Function} Unsubscribe function
   */
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key).add(callback);
    
    return () => {
      this.subscribers.get(key).delete(callback);
    };
  }

  /**
   * @private
   */
  notify(key, value) {
    if (this.subscribers.has(key)) {
      this.subscribers.get(key).forEach(callback => callback(value));
    }
  }
}

class Cache {
  constructor(ttl = 3600000) { // Default 1 hour TTL
    this.cache = new Map();
    this.ttl = ttl;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  /**
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
}

// Initialize global instances
window.stateManager = new StateManager();
window.cache = new Cache();

// ...existing code...

/**
 * Enhanced trap focus with error handling
 * @param {HTMLElement} element
 * @param {HTMLElement} [elementToFocus]
 * @throws {Error}
 */
function trapFocus(element, elementToFocus = element) {
  try {
    if (!element) throw new Error('No element provided to trap focus');
    
    const focusableElements = getFocusableElements(element);
    if (focusableElements.length === 0) {
      Logger.warn('No focusable elements found in trap focus container');
      return;
    }

    // ...existing trapFocus code...
    
  } catch (error) {
    Logger.log('Error in trapFocus', Logger.ERROR, error);
    throw error;
  }
}
