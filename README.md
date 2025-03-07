# Shopify Theme Development Guide

## Prerequisites
- [Shopify CLI](https://shopify.dev/themes/tools/cli/installation) installed
- [Node.js](https://nodejs.org/) (v16 or later)
- A Shopify store or development store

## Commands for Theme Development

### Initialize a new theme
```bash
shopify theme init [THEME_NAME]
```

### Login to your Shopify store
```bash
shopify login
```

### Push your theme to Shopify
```bash
shopify theme push
```

### Deploy a specific theme
```bash
shopify theme push --theme=THEME_ID
```

### Watch for changes and auto-update
```bash
shopify theme dev
```

### Pull the latest theme changes
```bash
shopify theme pull
```

## Additional Resources
- [Shopify Theme Development Documentation](https://shopify.dev/themes)
- [Liquid Template Language](https://shopify.dev/api/liquid)
- [Dawn Theme](https://github.com/Shopify/dawn) (Shopify's reference theme)

## Best Practices
1. Use version control (Git) to track changes
2. Test thoroughly before deploying to production
3. Keep a backup of your theme before making major changes
4. Use theme sections for modular design
5. Optimize images and assets for performance

# Cyberpunk Shopify Theme

## Theme Architecture

This theme follows Shopify's required directory structure:

```
/
├── assets/           # Flat structure for all assets (CSS, JS, images)
├── config/           # Theme configuration files
├── layout/           # Layout templates
├── locales/          # Translation files
├── sections/         # Shopify sections
├── snippets/         # Reusable liquid snippets
├── templates/        # Page templates
└── src/              # Source files for development
    ├── scripts/      # JavaScript source files
    └── styles/       # SCSS source files
```

## Development Workflow

1. **Setup**: Clone the repo and install dependencies
   ```
   npm install
   ```

2. **Development**: Use the Shopify CLI for development
   ```
   npm run dev
   ```
   This will compile your assets and start the theme development server.

3. **Validation**: Before deploying, validate the theme
   ```
   npm run validate
   ```

4. **Build**: Build production-ready assets
   ```
   npm run build
   ```

5. **Deploy**: Push to Shopify
   ```
   shopify theme push
   ```

## Best Practices

### CSS/SCSS

- **DO NOT** use `{% stylesheet %}` tags - these are not supported by Shopify
- **DO** use regular `<style>` tags in Liquid templates for component-specific styling
- **DO** keep the asset directory flat (no subdirectories)

### JavaScript

- **DO NOT** use `{% javascript %}` tags - these are not supported by Shopify
- **DO** use regular `<script>` tags in Liquid templates for component-specific scripts
- **DO** use the webpack build system for main script bundles

### JSON Configuration

- **ALWAYS** validate your JSON files before deployment
- **ENSURE** `settings_data.json` and `settings_schema.json` follow Shopify's schema

### Liquid Templates

- **USE** proper Shopify syntax for includes: `{% render 'snippet-name' %}`
- **AVOID** deprecated tags like `{% include %}` 
- **TEST** all templates with theme check: `shopify theme check`

## Troubleshooting

If you encounter deployment errors:

1. Run the validation tool: `npm run validate`
2. Check for nested directories in `/assets`
3. Verify all JSON files are valid
4. Ensure no deprecated Liquid tags are used
