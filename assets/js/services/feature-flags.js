class FeatureFlagService {
  constructor() {
    this.flags = new Map();
    this.subscribers = new Set();
  }

  async initialize() {
    try {
      const response = await NetworkUtils.fetchWithRetry('/feature-flags.json');
      const flags = await response.json();
      
      Object.entries(flags).forEach(([key, value]) => {
        this.setFlag(key, value);
      });
    } catch (error) {
      Logger.log('Feature flags fetch failed', Logger.ERROR, error);
    }
  }

  setFlag(key, value) {
    this.flags.set(key, value);
    this.notifySubscribers();
  }

  isEnabled(key) {
    return this.flags.get(key) ?? false;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.flags);
      } catch (error) {
        Logger.log('Feature flag subscriber error', Logger.ERROR, error);
      }
    });
  }
}

window.featureFlags = new FeatureFlagService();
