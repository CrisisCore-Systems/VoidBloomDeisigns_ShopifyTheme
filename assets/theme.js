import ThemeConfig from '../theme-config';
import { CartController } from '../js/cart-controller';
import { AnimationController } from '../js/animation-controller';

/**
 * Cyberpunk Theme Main JavaScript Entry Point
 * 
 * This file serves as the primary entry point for all JavaScript functionality.
 * It coordinates the initialization sequence and loads all required components.
 */

// Import all component functionality
import '../components/cyberpunk-theme.js';

class Theme {
  constructor() {
    this.config = ThemeConfig;
    this.settings = window.theme?.settings || {};
    this.cart = null;
    this.animations = null;
    this.init();
  }

  init() {
    // Initialize configuration with any user settings
    this.config.init({
      debug: window.Shopify?.designMode || false
    });
    
    // Initialize controllers once DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeControllers();
      this.loadThemeSettings();
      this.setupCustomCursor();
    });
  }

  initializeControllers() {
    // Initialize cart functionality
    this.cart = new CartController();
    
    // Initialize animations
    this.animations = new AnimationController();
  }

  loadThemeSettings() {
    // Apply theme settings
    document.documentElement.style.setProperty('--primary-color', this.settings.primary_color);
    document.documentElement.style.setProperty('--secondary-color', this.settings.secondary_color);
    document.documentElement.style.setProperty('--accent-color', this.settings.accent_color);
    
    // Apply layout class
    document.body.classList.add(`layout-${this.settings.layout_width || 'contained'}`);
    
    // Set animations enabled/disabled
    if (this.settings.animations_enabled === false) {
      document.body.classList.add('reduce-animations');
    }
  }

  setupCustomCursor() {
    if (!this.config.features.enableGlitchCursor) return;
    
    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      const cursor = document.createElement('div');
      cursor.className = 'cyberpunk-cursor';
      document.body.appendChild(cursor);
      
      const cursorInner = document.createElement('div');
      cursorInner.className = 'cyberpunk-cursor-inner';
      document.body.appendChild(cursorInner);
      
      document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        
        // Small delay for inner cursor for glitchy effect
        setTimeout(() => {
          cursorInner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50);
      });
      
      // Add hover state for links and buttons
      document.querySelectorAll('a, button, [role="button"], input[type="submit"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('hovering');
          cursorInner.classList.add('hovering');
        });
        
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('hovering');
          cursorInner.classList.remove('hovering');
        });
      });
    }
  }
}

// Initialize the theme
const themeInstance = new Theme();

// Export theme instance for console debugging
window.cyberpunkTheme = themeInstance;
