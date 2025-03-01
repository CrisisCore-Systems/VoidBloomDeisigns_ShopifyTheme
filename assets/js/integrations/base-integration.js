class BaseIntegration {
  constructor(config = {}) {
    this.config = config;
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) return;
    try {
      await this.setup();
      this.initialized = true;
      Logger.log(`Integration ${this.constructor.name} initialized`, Logger.INFO);
    } catch (error) {
      Logger.log(`Integration ${this.constructor.name} failed`, Logger.ERROR, error);
    }
  }

  async setup() {
    throw new Error('setup() must be implemented by subclass');
  }

  trackEvent(eventName, data) {
    if (!this.initialized) {
      Logger.warn(`${this.constructor.name} not initialized`);
      return;
    }
    window.analytics.track(`${this.constructor.name.toLowerCase()}:${eventName}`, data);
  }
}
