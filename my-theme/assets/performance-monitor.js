class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null,
      lcp: null,
      cls: null,
      fid: null
    };
    
    this.init();
  }

  init() {
    this.observeCoreWebVitals();
    this.observeCustomMetrics();
    this.setupErrorTracking();
  }

  observeCoreWebVitals() {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        this.logMetric(entry);
        this.sendToAnalytics(entry);
      });
    }).observe({ 
      entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
    });
  }

  logMetric(entry) {
    console.log(`Performance Metric: ${entry.name} - ${entry.startTime}ms`);
  }
}

export default new PerformanceMonitor();
