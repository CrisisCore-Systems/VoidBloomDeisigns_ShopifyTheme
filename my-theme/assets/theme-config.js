const themeConfig = {
  breakpoints: {
    small: 576,
    medium: 768,
    large: 992,
    xlarge: 1200
  },
  
  animations: {
    durations: {
      fast: 200,
      medium: 300,
      slow: 500
    }
  },
  
  selectors: {
    cursor: '#custom-cursor',
    loading: '[data-loading-screen]',
    neonText: '.neon-text',
    glitchText: '.glitch'
  }
};

window.themeConfig = Object.freeze(themeConfig);
