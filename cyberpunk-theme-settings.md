# VoidBloom Cyberpunk Theme Settings

## Required Theme Settings

Your theme needs to have these settings to support the cyberpunk components:

```json
{
  "type": "header",
  "content": "VoidBloom Cyberpunk Theme"
},
{
  "type": "color",
  "id": "neon_primary",
  "label": "Primary Neon Color",
  "default": "#00FFFF"
},
{
  "type": "color",
  "id": "neon_secondary",
  "label": "Secondary Neon Color",
  "default": "#FF00FF"
},
{
  "type": "color", 
  "id": "neon_accent",
  "label": "Accent Neon Color",
  "default": "#FFFF00"
},
{
  "type": "color",
  "id": "background_primary",
  "label": "Primary Background Color",
  "default": "#0A0A0A"
},
{
  "type": "color",
  "id": "background_secondary",
  "label": "Secondary Background Color",
  "default": "#1A1A1A"
},
{
  "type": "color",
  "id": "text_color",
  "label": "Main Text Color",
  "default": "#FFFFFF"
}
```

## How to Add These Settings

1. Locate your `settings_schema.json` file in your theme directory
2. Add the above settings to a new section or incorporate them into an existing section
3. Example placement:

```json
[
  {
    "name": "VoidBloom Theme Style",
    "settings": [
      // Paste the settings here
    ]
  },
  // Other theme sections
]
```

## Using These Settings in Your Components

All the cyberpunk components will use these theme settings. For example:

```liquid
<div class="voidbloom-element" style="background: {{ settings.background_primary }}; color: {{ settings.text_color }};">
  <h2 style="text-shadow: 0 0 5px {{ settings.neon_primary }};">Cyberpunk Heading</h2>
</div>
```

## Tips for Cyberpunk Style

1. Use high contrast between background and neon colors
2. Aim for dark backgrounds with bright neon accents
3. Complementary colors work well (purple/green, blue/orange, etc.)
4. Consider adding a "theme switcher" with preset cyberpunk color schemes
