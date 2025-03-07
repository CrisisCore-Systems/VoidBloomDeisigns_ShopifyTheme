/**
 * Shopify Theme Update Configuration
 * 
 * This configuration file defines settings for the theme
 * deployment and update process.
 */

module.exports = {
  // Theme environments
  environments: {
    development: {
      storeUrl: 'dev-store.myshopify.com',
      themeId: '12345678901',
      password: process.env.SHOPIFY_DEV_PASSWORD || '',
      ignore: [
        'node_modules/**',
        '.git/**',
        'docs/**',
        'tests/**',
        'README.md',
        '.gitignore',
        'utils/**'
      ]
    },
    staging: {
      storeUrl: 'staging-store.myshopify.com',
      themeId: '23456789012',
      password: process.env.SHOPIFY_STAGING_PASSWORD || '',
      ignore: [
        'node_modules/**',
        '.git/**',
        'docs/**',
        'tests/**'
      ]
    },
    production: {
      storeUrl: 'production-store.myshopify.com',
      themeId: '34567890123',
      password: process.env.SHOPIFY_PROD_PASSWORD || '',
      ignore: [
        'node_modules/**',
        '.git/**',
        'docs/**',
        'tests/**',
        'utils/**',
        'theme.update.config.js',
        '.gitignore',
        'README.md'
      ]
    }
  },

  // Theme validation settings
  validation: {
    runThemeCheck: true,
    validateJson: true,
    checkAssetStructure: true,
    lintCss: false,
    lintJs: false
  },

  // Pre-deployment tasks
  preDeploy: [
    // Run validation script
    'bash ./shopify-theme-validation.sh',
    
    // Optimize assets
    'node ./utils/optimize-assets.js',
    
    // Create a backup
    'mkdir -p backups/$(date +%Y%m%d_%H%M%S) && cp -r assets sections snippets templates backups/$(date +%Y%m%d_%H%M%S)/'
  ],

  // Post-deployment tasks
  postDeploy: [
    // Notify team about deployment
    'node ./utils/notify-deploy.js',
    
    // Clear cache
    'curl -X POST https://{store}/admin/api/2023-01/themes/{theme_id}/cache.json'
  ],

  // Files to always include in deployment
  alwaysInclude: [
    'layout/theme.liquid',
    'assets/theme.js',
    'assets/theme.css',
    'config/settings_data.json',
    'config/settings_schema.json'
  ],

  // Notification settings
  notifications: {
    email: ['developer@example.com', 'designer@example.com'],
    slack: {
      webhook: process.env.SLACK_WEBHOOK_URL || '',
      channel: '#theme-deployments'
    }
  },

  // Performance thresholds
  performanceThresholds: {
    maxAssetSize: 1024 * 1024, // 1MB
    maxInlineScriptSize: 1024 * 20, // 20KB
    maxStylesheetSize: 1024 * 200, // 200KB
    maxJsSize: 1024 * 300 // 300KB
  }
};
