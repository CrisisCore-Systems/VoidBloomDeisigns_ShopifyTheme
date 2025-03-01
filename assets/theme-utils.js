// Utility functions
const themeUtils = {
  formatMoney: (cents, format) => {
    // Money formatting logic
  },
  
  // Use this single debounce implementation
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  handleError(error, context = '') {
    console.error(`Theme Error [${context}]:`, error);
    
    // Send to monitoring service if available
    if (window.errorLoggingService) {
      window.errorLoggingService.log({
        error, 
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href
      });
    }
    
    // Show user-friendly error message if needed
    if (process.env.NODE_ENV !== 'production') {
      const message = `An error occurred${context ? ` in ${context}` : ''}: ${error.message}`;
      this.showNotification(message, 'error');
    }
  },

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `theme-notification theme-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
  },

  initializeFeatures() {
    this.initPerformanceTracking();
    this.initCustomCursor();
    this.initNeonEffects();
  },

  initPerformanceTracking() {
    window.performance.mark('themeStart');
    window.addEventListener('load', () => {
      window.performance.mark('themeLoaded');
      window.performance.measure('themeLoadTime', 'themeStart', 'themeLoaded');
    });
  },

  initCustomCursor() {
    if (window.innerWidth <= 768) return;
    
    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
  },

  initNeonEffects() {
    document.querySelectorAll('.neon-text').forEach(el => {
      el.addEventListener('mouseover', () => {
        el.style.animation = 'neon-pulse var(--animation-speed) infinite';
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.animation = 'none';
      });
    });
  }
};

window.themeUtils = themeUtils;
