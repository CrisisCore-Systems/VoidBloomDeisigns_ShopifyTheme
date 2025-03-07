/**
 * Cyberpunk Theme Configuration
 * 
 * Central configuration object that controls theme-wide settings
 * and provides methods for theme customization.
 */

const ThemeConfig = {
  // Debug mode for development
  debug: false,
  
  // Animation settings
  animations: {
    enabled: true,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    glitchIntensity: 'medium', // 'low', 'medium', 'high'
    hoverEffects: true
  },
  
  // Performance settings
  performance: {
    lazyLoad: true,
    imageOptimization: true,
    prefetchPages: true,
    useCriticalCSS: true
  },
  
  // Color schemes
  colorSchemes: {
    cyberpunk: {
      primary: '#FF003C',
      secondary: '#00FFFF',
      background: '#0D0221',
      text: '#FFFFFF'
    },
    neonNoir: {
      primary: '#FF00FF',
      secondary: '#00FF00',
      background: '#000000',
      text: '#FFFFFF'
    },
    techCorp: {
      primary: '#FFFF00',
      secondary: '#0000FF',
      background: '#121212',
      text: '#FFFFFF'
    }
  },
  
  // Global breakpoints 
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  
  // Feature flags for experimental features
  features: {
    enableGlitchCursor: true,
    enableParallaxEffect: true,
    enableNoiseBackground: true,
    enableTypewriterEffect: true
  },
  
  // API endpoints
  api: {
    cart: '/cart.js',
    products: '/products.json',
    search: '/search'
  },
  
  /**
   * Initialize the theme with user settings
   * @param {Object} userSettings - User settings to override defaults
   */
  init(userSettings = {}) {
    // Merge user settings with defaults
    Object.keys(userSettings).forEach(key => {
      if (typeof userSettings[key] === 'object' && this[key]) {
        this[key] = { ...this[key], ...userSettings[key] };
      } else {
        this[key] = userSettings[key];
      }
    });
    
    // Check for system preferences
    this.checkSystemPreferences();
    
    // Log initialization in debug mode
    if (this.debug) {
      console.log('Cyberpunk Theme Initialized with config:', this);
    }
    
    return this;
  },
  
  /**
   * Check system preferences for accessibility and theme adjustments
   */
  checkSystemPreferences() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.animations.reducedMotion = true;
      this.animations.glitchIntensity = 'low';
    }
    
    // Check for preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.add('theme-light');
    }
  },
  
  /**
   * Switch color scheme
   * @param {string} scheme - Color scheme name
   */
  setColorScheme(scheme) {
    if (!this.colorSchemes[scheme]) {
      if (this.debug) console.error(`Color scheme "${scheme}" not found`);
      return;
    }
    
    const colors = this.colorSchemes[scheme];
    
    // Apply CSS variables
    document.documentElement.style.setProperty('--primary-color', colors.primary);
    document.documentElement.style.setProperty('--secondary-color', colors.secondary);
    document.documentElement.style.setProperty('--background-color', colors.background);
    document.documentElement.style.setProperty('--text-color', colors.text);
    
    // Update body class
    document.body.className = document.body.className
      .replace(/color-scheme-\w+/, '')
      .concat(` color-scheme-${scheme}`);
  },
  
  /**
   * Toggle debug mode
   * @param {boolean} enabled - Enable or disable debug mode
   */
  setDebugMode(enabled) {
    this.debug = enabled;
    if (enabled) {
      console.log('Cyberpunk Theme Debug Mode Activated');
      document.body.classList.add('debug-mode');
    } else {
      document.body.classList.remove('debug-mode');
    }
  }
};

export default ThemeConfig;
