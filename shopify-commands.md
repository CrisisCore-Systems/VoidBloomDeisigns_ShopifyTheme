# Shopify Theme Development Commands

# Initialize a new theme
shopify theme init [THEME_NAME]

# Login to your Shopify store
shopify login --store=your-store.myshopify.com

# Check which store you're currently connected to
shopify store info

# Push your theme to Shopify
shopify theme push

# Deploy a specific theme
shopify theme push --theme=THEME_ID

# Watch for changes and auto-update
shopify theme dev

# Pull the latest theme changes
shopify theme pull

# List themes
shopify theme list

# Open the theme in the Shopify admin
shopify theme open

# Check the theme for errors
shopify theme check

# Package your theme
shopify theme package

# Common Errors and Solutions

## Invalid JSON files
- Ensure `config/settings_data.json` and `config/settings_schema.json` contain valid JSON
- At minimum, settings_data.json should contain `{}`

## File structure issues
- Shopify doesn't allow assets in subfolders
- Move files like `assets/styles/main.scss` to `assets/main.scss.liquid`

## Liquid syntax errors
- Use `{% style %}` instead of `{% stylesheet %}` for CSS in Liquid files
- Use `{% javascript %}` instead of `{% script %}` for JS in Liquid files
- Ensure all Liquid tags are properly closed

## Theme deployment
- Make sure you're logged into the correct store with `shopify login --store=your-store.myshopify.com`
- Use `shopify theme delete --theme=THEME_ID` to remove unwanted themes
