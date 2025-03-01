class ErrorTrackingService {
  constructor(config = {}) {
    this.config = {
      sampleRate: 0.1,
      maxErrors: 100,
      ...config
    };
    this.errorCount = 0;
  }

  log(error, context = {}) {
    if (this.errorCount >= this.config.maxErrors) return;
    if (Math.random() > this.config.sampleRate) return;
    
    const errorData = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context,
      shopifyData: {
        shop: window.Shopify?.shop,
        theme: window.theme?.name,
        pageName: window.theme?.page?.name
      }
    };

    // Send to monitoring service
    this.sendToMonitoring(errorData);
    this.errorCount++;
  }

  private sendToMonitoring(data) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorTracking]', data);
      return;
    }

    fetch('/error-logging-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(console.error);
  }
}

window.errorTrackingService = new ErrorTrackingService();
