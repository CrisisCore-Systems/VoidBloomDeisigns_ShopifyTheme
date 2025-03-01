class AnalyticsManager {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.batchSize = 10;
    this.flushInterval = 30000; // 30 seconds
    
    setInterval(() => this.flush(), this.flushInterval);
  }

  track(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      ...data,
      shopData: {
        shop: window.Shopify?.shop,
        theme: window.theme?.name,
        currency: window.theme?.currency
      }
    };

    this.queue.push(event);
    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  async flush() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    const events = this.queue.splice(0, this.batchSize);

    try {
      await NetworkUtils.fetchWithRetry('/analytics/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events })
      });
    } catch (error) {
      Logger.log('Analytics error', Logger.ERROR, error);
      // Re-queue failed events
      this.queue.unshift(...events);
    } finally {
      this.isProcessing = false;
    }
  }
}

window.analytics = new AnalyticsManager();

// Track page views
document.addEventListener('DOMContentLoaded', () => {
  window.analytics.track('page_view', {
    title: document.title,
    referrer: document.referrer
  });
});
