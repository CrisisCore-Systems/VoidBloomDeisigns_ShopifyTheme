# VoidBloomDesign Theme Setup Guide

This guide will help you set up your VoidBloomDesign cyberpunk Shopify theme correctly to avoid common deployment errors.

## Directory Structure

Shopify has specific requirements for theme structure. Here's how your directories should be organized:

```
theme-name/
├── assets/                  # CSS, JS, images (no subfolders allowed)
├── config/                  # Theme settings
│   ├── settings_data.json   # Theme setting values
│   └── settings_schema.json # Theme setting definitions
├── layout/                  # Theme layouts
├── locales/                 # Translations
├── sections/                # Theme sections
│   └── modules/             # (Only allowed subfolder)
├── snippets/                # Theme snippets
└── templates/               # Theme templates
    └── customers/           # Customer templates
```

## Required Files

At minimum, your theme needs:

1. `config/settings_data.json` - Contains the current theme settings
2. `config/settings_schema.json` - Defines the available theme settings
3. `layout/theme.liquid` - Main theme layout

## Theme Configuration Files

### settings_data.json

This file stores all current theme settings and section configurations:

```json
{
  "current": {
    "sections": {
      "header": {
        "type": "header",
        "settings": {}
      },
      "footer": {
        "type": "footer",
        "settings": {}
      }
    }
  }
}
```

### settings_schema.json

This file defines the theme settings available in the admin:

```json
[
  {
    "name": "theme_info",
    "theme_name": "VoidBloomDesign",
    "theme_version": "1.0.0",
    "theme_author": "Your Name",
    "theme_documentation_url": "",
    "theme_support_url": ""
  },
  {
    "name": "Colors",
    "settings": [
      {
        "type": "color",
        "id": "primary_color",
        "label": "Primary Color",
        "default": "#000000"
      }
    ]
  }
]
```

## Common Liquid Tags

Always use the correct Liquid tags in your theme:

✅ Use `{% style %}` instead of `{% stylesheet %}`
✅ Use `{% javascript %}` instead of `{% script %}`

## CSS/SCSS Files

All stylesheets must be in the root assets folder. For SCSS:

1. Name your file with the `.scss.liquid` extension (e.g., `main.scss.liquid`)
2. Ensure it's in the root assets folder, not a subfolder

## Deployment Steps

1. Run the validation script: `node debug-theme.js`
2. Fix any reported issues
3. Login to your store: `shopify login --store=your-store.myshopify.com`
4. Deploy your theme: `shopify theme push`

## Common Error Messages and Solutions

| Error | Solution |
|-------|----------|
| "Invalid JSON" | Check your JSON syntax in settings files |
| "Theme files may not be stored in subfolders" | Move files to root of their respective directory |
| "Unknown tag 'stylesheet'" | Replace with `{% style %}` tag |
| "Unknown tag 'javascript'" | Replace with `{% javascript %}` tag |

## Testing Before Deployment

Use the development mode to test your theme before final deployment:

```bash
shopify theme dev
```

This will provide a live preview URL and show any errors in real-time.
