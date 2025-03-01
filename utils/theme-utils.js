export const initializeFeatures = () => {
  const features = [
    'initCustomCursor',
    'initGlitchEffects',
    'initNeonAnimations',
    'initPremiumEffects'
  ];

  features.forEach(feature => {
    if (typeof window[feature] === 'function') {
      window[feature]();
    }
  });
};

export const initPerformanceTracking = () => {
  // ...existing performance tracking code...
};
