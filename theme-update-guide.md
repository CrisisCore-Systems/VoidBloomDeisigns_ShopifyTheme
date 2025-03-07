# VoidBloom Theme Update Guide

## Modifying theme.liquid

To use your custom components instead of the default ones, you'll need to modify the main theme.liquid file:

### 1. Replace Header Reference

Find this code in theme.liquid:

```liquid
{% section 'header' %}
```

Replace with:

```liquid
{% section 'voidbloom-header' %}
```

### 2. Replace Footer Reference

Find this code:

```liquid
{% section 'footer' %}
```

Replace with:

```liquid
{% section 'voidbloom-footer' %}
```

### 3. Replace Announcement Bar (if present in theme.liquid)

Find:

```liquid
{% section 'announcement-bar' %}
```

Replace with:

```liquid
{% section 'voidbloom-announcement' %}
```

## Adding Custom CSS

Add these lines before the closing </head> tag in theme.liquid:

```liquid
{{ 'voidbloom-card.css' | asset_url | stylesheet_tag }}
{{ 'voidbloom-hero.css' | asset_url | stylesheet_tag }}
```

## Testing Process

1. After each modification to theme.liquid, preview your changes:
   ```
   shopify theme serve
   ```

2. Check each page for proper functionality:
   - Home page
   - Collection pages
   - Product pages
   - Blog pages
   - Cart functionality

3. Only after confirming everything works, mark the component as complete:
   ```
   ./theme-customization-script.sh
   # Select option 3, then select the component to mark complete
   ```

## Reverting Changes

If something goes wrong, you can restore from your backup:

```bash
cp -r dawn-backup/sections/* sections/
cp -r dawn-backup/assets/* assets/
```

Or revert theme.liquid to use the original components.
