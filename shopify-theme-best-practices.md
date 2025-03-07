# Shopify Theme Development Best Practices

## Directory Structure
- Keep all assets in the root `/assets` folder - Shopify does not support subdirectories
- For CSS organization, use naming conventions like `component-name.css` rather than subdirectories

## CSS Implementation
- Use one of these approved methods for CSS:
  1. External CSS files: `{{ 'filename.css' | asset_url | stylesheet_tag }}`
  2. Inline styles: `<style>...</style>` within templates or sections
  3. Liquid-enabled SCSS: Use `.scss.liquid` extension

- ❌ AVOID using `{% stylesheet %}` tags - these are not supported by Shopify

## JSON Files
- Always validate JSON files before deployment:
  - `settings_data.json` - Stores the current theme settings values
  - `settings_schema.json` - Defines the structure of the theme settings

## Asset Organization
- For modular CSS without subdirectories:
  1. Use BEM naming convention (`block__element--modifier`)
  2. Use filename prefixes (`component-`, `section-`, `template-`)

## Deployment Checklist
1. Validate all JSON files with a JSON linter
2. Ensure no subdirectories exist in assets folder
3. Check for unsupported Liquid tags
4. Run `shopify theme check` before deployment

## Common Commands
```
# Check theme for errors
shopify theme check

# Test your theme locally
shopify theme dev

# Push your theme to Shopify
shopify theme push
```
