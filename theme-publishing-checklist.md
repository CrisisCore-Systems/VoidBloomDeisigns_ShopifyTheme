# VoidBloomDesign Theme Publishing Checklist

Use this checklist before deploying your theme to ensure everything works correctly.

## 📋 Pre-Deployment Checklist

### 1. Configuration Files
- [ ] Validate `config/settings_data.json` (valid JSON)
- [ ] Validate `config/settings_schema.json` (valid JSON)
- [ ] Check that required settings are defined

### 2. Directory Structure
- [ ] No subfolders in assets directory
- [ ] No subfolders in snippets directory
- [ ] No subfolders in templates directory
- [ ] No subfolders in sections directory (except modules)

### 3. Liquid Syntax
- [ ] Replace all `{% stylesheet %}` tags with `{% style %}` tags
- [ ] Replace all `{% script %}` tags with `{% javascript %}` tags
- [ ] Ensure all Liquid tags are properly closed
- [ ] No syntax errors in Liquid files

### 4. Assets
- [ ] All referenced assets exist
- [ ] Move SCSS files from subdirectories to root of assets
- [ ] Rename SCSS files to use `.scss.liquid` extension
- [ ] All image assets are optimized

### 5. Performance
- [ ] Minify JavaScript files
- [ ] Optimize CSS
- [ ] Compress images
- [ ] Remove unused code and assets

### 6. Testing
- [ ] Test in Theme Editor
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test all interactive features
- [ ] Test checkout flow
- [ ] Test all collection pages
- [ ] Test all product pages

## 🚀 Deployment Commands

```bash
# Run the theme validator
node debug-theme.js

# Fix common issues automatically
bash fix-stylesheet-tags.sh

# Login to your store
shopify login --store=your-store.myshopify.com

# Deploy in development mode first
shopify theme dev

# When ready, push to production
shopify theme push

# If you need to target a specific theme
shopify theme push --theme=THEME_ID
```

## 🔍 Post-Deployment Verification

- [ ] Verify all pages load correctly
- [ ] Test the add-to-cart functionality
- [ ] Test the checkout process
- [ ] Verify mobile responsiveness
- [ ] Check for any console errors

## 🆘 Troubleshooting

If you encounter issues during deployment:

1. Check the error message for specific file paths
2. Validate the mentioned files individually
3. For JSON errors, use a JSON validator
4. For Liquid syntax errors, check line numbers mentioned in error messages
5. For asset path errors, verify the file exists and is correctly referenced
6. Run `shopify theme check` for detailed analysis
