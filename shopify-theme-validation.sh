#!/bin/bash
# Shopify Theme Validation Script
# This script checks for common issues in Shopify themes

echo "🔍 Starting Shopify theme validation..."

# Check for invalid directory structure (Shopify requires flat hierarchy for assets)
if [ -n "$(find ./assets -mindepth 2 -type f)" ]; then
  echo "❌ ERROR: Subdirectories detected in assets folder."
  echo "   Shopify doesn't support subdirectories in assets."
  echo "   Please move all files to the root of the assets directory."
  find ./assets -mindepth 2 -type f | while read file; do
    echo "   - $file"
  done
else
  echo "✓ Assets directory structure is valid."
fi

# Check for {% stylesheet %} tags which are not supported
if grep -r --include="*.liquid" "{% stylesheet %}" .; then
  echo "❌ ERROR: Unsupported {% stylesheet %} tags found."
  echo "   Use {{ 'filename.css' | asset_url | stylesheet_tag }} instead."
  grep -r --include="*.liquid" -l "{% stylesheet %}" .
else
  echo "✓ No unsupported {% stylesheet %} tags found."
fi

# Validate JSON files
for jsonfile in $(find . -name "*.json"); do
  if ! jq empty "$jsonfile" 2>/dev/null; then
    echo "❌ ERROR: Invalid JSON in $jsonfile"
  else
    echo "✓ JSON file validated: $jsonfile"
  fi
done

# Check for references to non-existent assets
for liquidfile in $(find . -name "*.liquid"); do
  grep -o "asset_url | \w\+" "$liquidfile" | cut -d' ' -f3 | while read asset; do
    if [ ! -f "./assets/$asset" ]; then
      echo "⚠️ WARNING: $liquidfile references non-existent asset: $asset"
    fi
  done
done

echo "🔍 Validation complete!"
echo "Run 'shopify theme check' for additional validation."
