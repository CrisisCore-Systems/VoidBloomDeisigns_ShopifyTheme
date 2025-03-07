# VoidBloomDesign Theme Deployment Commands

## Prerequisites

Before deploying your Shopify theme, make sure you have:
- Fixed all JSON files
- Moved files out of subfolders
- Fixed all Liquid syntax errors (e.g., `{% stylesheet %}` → `{% style %}`)
- Installed the Shopify CLI (`npm install -g @shopify/cli @shopify/theme`)

## Setup and Authentication

### Login to your Shopify store
```bash
shopify login --store=your-store.myshopify.com
```

### Verify you're logged into the correct store
```bash
shopify store info
```

## Theme Validation

### Check for theme errors before deployment
```bash
shopify theme check
```

### Run the custom validator script
```bash
node debug-theme.js
```

### Fix stylesheet tags automatically
```bash
bash fix-stylesheet-tags.sh
```

## Development Workflow

### Start development mode (live preview)
```bash
shopify theme dev
```

### Pull the latest theme changes from Shopify
```bash
shopify theme pull
```

### Pull a specific theme
```bash
shopify theme pull --theme=THEME_ID
```

## Deployment

### List available themes
```bash
shopify theme list
```

### Deploy your theme to Shopify
```bash
shopify theme push
```

### Deploy to a specific theme
```bash
shopify theme push --theme=THEME_ID
```

### Deploy with specific files only
```bash
shopify theme push --files="assets/main.scss.liquid,snippets/cart-item.liquid"
```

### Deploy theme with development assets unpublished
```bash
shopify theme push --unpublished
```

### Force overwrite the theme (use with caution)
```bash
shopify theme push --force
```

## Post-Deployment

### Open the theme in the Shopify admin
```bash
shopify theme open
```

### Open the live theme in a browser
```bash
shopify theme open --live
```

### Package your theme for the Theme Store
```bash
shopify theme package
```

## Troubleshooting

### If you need to delete a theme
```bash
shopify theme delete --theme=THEME_ID
```

### Enable verbose logging for more deployment details
```bash
shopify theme push --verbose
```

### Show theme development server logs
```bash
shopify theme dev --show-server-logs
```

## One-Line Deploy Script

For quick deployment after fixing all issues:
```bash
shopify theme check && shopify theme push
```

## Complete Deployment Pipeline

This sequence runs all validation and then deploys:
```bash
node debug-theme.js && \
bash fix-stylesheet-tags.sh && \
shopify theme check && \
shopify theme push
```

Remember to always verify the theme in the Shopify preview before publishing it to your live store.
