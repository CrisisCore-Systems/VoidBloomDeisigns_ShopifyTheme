// Main entry point for JavaScript

// Import modules
import { initCartFlyout } from './modules/cart';
import { initProductForm } from './modules/product';
import { initGlitchEffect } from './modules/glitch-effect';
import { initNotifications } from './modules/notifications';

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize cart functionality
  initCartFlyout();
  
  // Initialize product functionality on product pages
  if (document.querySelector('.js-product-form')) {
    initProductForm();
  }
  
  // Initialize glitch effects
  initGlitchEffect();
  
  // Initialize notification system
  initNotifications();
});

// Handle Shopify events
document.addEventListener('shopify:section:load', (event) => {
  const section = event.detail.sectionId;
  
  // Re-initialize specific functionality based on the section loaded
  if (section.includes('product')) {
    initProductForm();
  }
});
