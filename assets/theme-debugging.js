/**
 * Shopify Theme Debugging Utilities
 * 
 * Include this file in your theme for additional debugging tools.
 * Usage: {{ 'theme-debugging.js' | asset_url | script_tag }}
 */

class ShopifyThemeDebugger {
  constructor(options = {}) {
    this.options = {
      enabled: options.enabled || window.location.search.includes('debug=true'),
      logEvents: options.logEvents || true,
      highlightDynamicContent: options.highlightDynamicContent || false,
      checkMissingTranslations: options.checkMissingTranslations || true,
      trackAssetLoading: options.trackAssetLoading || true
    };
    
    if (this.options.enabled) {
      this.init();
    }
  }
  
  init() {
    console.log('%c Shopify Theme Debugger Enabled ', 'background: #5c6ac4; color: white; padding: 2px 5px; border-radius: 3px;');
    
    this.createDebugPanel();
    
    if (this.options.logEvents) {
      this.setupEventLogging();
    }
    
    if (this.options.highlightDynamicContent) {
      this.highlightDynamicContent();
    }
    
    if (this.options.checkMissingTranslations) {
      this.checkMissingTranslations();
    }
    
    if (this.options.trackAssetLoading) {
      this.trackAssetLoading();
    }
  }
  
  createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'shopify-debug-panel';
    panel.style = `
      position: fixed;
      bottom: 0;
      right: 0;
      width: 300px;
      height: auto;
      max-height: 400px;
      background: rgba(0,0,0,0.8);
      color: #fff;
      font-family: monospace;
      font-size: 12px;
      z-index: 9999;
      padding: 10px;
      overflow: auto;
      border-top-left-radius: 5px;
      transition: all 0.3s ease;
      transform: translateY(calc(100% - 30px));
    `;
    
    const header = document.createElement('div');
    header.textContent = '🔍 Shopify Theme Debugger';
    header.style = `
      cursor: pointer;
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255,255,255,0.3);
    `;
    
    const content = document.createElement('div');
    content.id = 'debug-content';
    content.style = 'margin-top: 10px;';
    
    panel.appendChild(header);
    panel.appendChild(content);
    document.body.appendChild(panel);
    
    // Toggle panel visibility
    header.addEventListener('click', () => {
      if (panel.style.transform === 'translateY(0px)') {
        panel.style.transform = 'translateY(calc(100% - 30px))';
      } else {
        panel.style.transform = 'translateY(0)';
      }
    });
    
    this.debugContent = content;
    this.logToPanel('Debugger initialized');
  }
  
  logToPanel(message, type = 'info') {
    if (!this.debugContent) return;
    
    const colors = {
      info: '#8eb4cb',
      error: '#e3342f',
      warning: '#ffed4a',
      success: '#38c172'
    };
    
    const entry = document.createElement('div');
    entry.style = `
      margin-bottom: 5px;
      color: ${colors[type] || colors.info};
      border-left: 3px solid ${colors[type] || colors.info};
      padding-left: 5px;
    `;
    
    const timestamp = document.createElement('span');
    timestamp.textContent = new Date().toLocaleTimeString() + ': ';
    timestamp.style = 'opacity: 0.7; margin-right: 5px;';
    
    entry.appendChild(timestamp);
    entry.appendChild(document.createTextNode(message));
    this.debugContent.appendChild(entry);
    
    // Auto-scroll to bottom
    this.debugContent.scrollTop = this.debugContent.scrollHeight;
    
    // Also log to console with appropriate method
    console[type === 'error' ? 'error' : type === 'warning' ? 'warn' : 'log'](message);
  }
  
  setupEventLogging() {
    const eventsToTrack = [
      'cart:updated', 'product:added', 'variant:change',
      'section:load', 'cart:error', 'checkout:error'
    ];
    
    eventsToTrack.forEach(eventType => {
      document.addEventListener(eventType, (e) => {
        this.logToPanel(`Event: ${eventType}`, 'info');
        console.log(`Event ${eventType} details:`, e.detail);
      });
    });
    
    this.logToPanel('Event logging enabled for: ' + eventsToTrack.join(', '));
  }
  
  highlightDynamicContent() {
    // Add a border around sections and dynamic elements
    document.querySelectorAll('[id^="shopify-section-"]').forEach(section => {
      section.style.outline = '2px dashed rgba(92, 106, 196, 0.5)';
      
      const label = document.createElement('div');
      label.textContent = section.id.replace('shopify-section-', '');
      label.style = `
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(92, 106, 196, 0.8);
        color: white;
        font-size: 10px;
        padding: 2px 5px;
        z-index: 999;
      `;
      
      if (window.getComputedStyle(section).position === 'static') {
        section.style.position = 'relative';
      }
      
      section.appendChild(label);
    });
    
    this.logToPanel('Dynamic content highlighting enabled');
  }
  
  checkMissingTranslations() {
    // Find potential missing translations (placeholder text starting with "translation missing")
    const textNodes = [];
    const walk = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walk.nextNode()) {
      if (node.nodeValue.trim().toLowerCase().startsWith('translation missing')) {
        textNodes.push(node);
      }
    }
    
    if (textNodes.length > 0) {
      this.logToPanel(`Found ${textNodes.length} missing translations`, 'warning');
      textNodes.forEach(node => {
        node.parentElement.style.outline = '2px solid #ffed4a';
        console.warn('Missing translation:', node.nodeValue);
      });
    } else {
      this.logToPanel('No missing translations found', 'success');
    }
  }
  
  trackAssetLoading() {
    // Check for failed asset loads
    window.addEventListener('load', () => {
      const failedAssets = [];
      
      // Check stylesheets
      document.querySelectorAll('link[rel="stylesheet"]').forEach(stylesheet => {
        if (!stylesheet.sheet) {
          failedAssets.push(stylesheet.href);
        }
      });
      
      // Report failed assets
      if (failedAssets.length) {
        this.logToPanel(`${failedAssets.length} assets failed to load`, 'error');
        failedAssets.forEach(asset => {
          this.logToPanel(`Failed to load: ${asset}`, 'error');
        });
      } else {
        this.logToPanel('All tracked assets loaded successfully', 'success');
      }
    });
  }
}

// Initialize debugger
document.addEventListener('DOMContentLoaded', () => {
  window.shopifyThemeDebugger = new ShopifyThemeDebugger({
    enabled: window.location.search.includes('debug=true'),
    highlightDynamicContent: window.location.search.includes('highlight=true')
  });
});

// Export debugging helper function
window.shopifyDebug = function(message, type = 'info') {
  if (window.shopifyThemeDebugger) {
    window.shopifyThemeDebugger.logToPanel(message, type);
  } else {
    console.log(message);
  }
};
