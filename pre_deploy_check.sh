#!/bin/bash

echo "��� Running comprehensive pre-deployment checks..."
errors=0

# Check file extensions for SCSS files
echo "Checking SCSS file extensions..."
scss_files=$(find assets -name "*.scss" ! -name "*.scss.liquid")
if [ -n "$scss_files" ]; then
  echo "❌ ERROR: Found .scss files without .liquid extension that will cause deployment errors:"
  echo "$scss_files"
  echo "Convert these to .scss.liquid format to avoid asset pipeline collisions"
  errors=$((errors+1))
else
  echo "✅ All SCSS files have correct extensions"
fi

# Check theme configuration files
echo "Checking theme configuration files..."
if [ ! -f "config/settings_schema.json" ]; then
  echo "❌ ERROR: Missing settings_schema.json file"
  errors=$((errors+1))
else
  echo "✅ settings_schema.json file exists"
fi

if [ ! -f "config/settings_data.json" ]; then
  echo "❌ ERROR: Missing settings_data.json file"
  errors=$((errors+1))
else
  echo "✅ settings_data.json file exists"
fi

# Check for invalid Liquid tags
echo "Checking for invalid Liquid tags..."
if grep -r "{% stylesheet %}" --include="*.liquid" . 2>/dev/null; then
  echo "❌ ERROR: Found unsupported {% stylesheet %} tags"
  errors=$((errors+1))
else
  echo "✅ No unsupported stylesheet tags found"
fi

if grep -r "{% javascript %}" --include="*.liquid" . 2>/dev/null; then
  echo "❌ ERROR: Found unsupported {% javascript %} tags"
  errors=$((errors+1))
else
  echo "✅ No unsupported javascript tags found"
fi

# Check for asset subdirectories
echo "Checking asset directory structure..."
if find assets -mindepth 2 -type f 2>/dev/null | grep -q .; then
  echo "❌ ERROR: Assets contain subdirectories, which Shopify doesn't allow"
  errors=$((errors+1))
else
  echo "✅ Assets directory structure is valid"
fi

# Final report
if [ $errors -eq 0 ]; then
  echo "✅ All pre-deployment checks passed! Theme is ready for deployment."
  echo "Run 'shopify theme push' to deploy your theme."
  exit 0
else
  echo "❌ Found $errors errors that need to be fixed before deployment."
  exit 1
fi
