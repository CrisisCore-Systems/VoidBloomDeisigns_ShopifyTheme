const performanceConfig = {
  metrics: {
    FCP: {
      threshold: 2000, // 2 seconds
      weight: 0.3
    },
    LCP: {
      threshold: 2500, // 2.5 seconds
      weight: 0.3
    },
    CLS: {
      threshold: 0.1,
      weight: 0.2
    },
    TTI: {
      threshold: 3500, // 3.5 seconds
      weight: 0.2
    }
  },
  
  caching: {
    staticAssets: {
      maxAge: 31536000, // 1 year
      staleWhileRevalidate: 86400 // 1 day
    },
    apiResponses: {
      maxAge: 300, // 5 minutes
      staleWhileRevalidate: 60 // 1 minute
    }
  },
  
  monitoring: {
    sampleRate: 0.1, // 10% of traffic
    errorSampleRate: 1.0, // 100% of errors
    performanceEntries: [
      'navigation',
      'resource',
      'paint',
      'mark',
      'measure'
    ]
  }
};

module.exports = performanceConfig;
