#!/bin/bash

echo "��� Validating Shopify Theme..."
errors=0

# Check for subdirectories in assets
if find assets -mindepth 2 -type f 2>/dev/null | grep -q .; then
  echo "❌ ERROR: Assets contain subdirectories, which Shopify doesn't allow"
  find assets -mindepth 2 -type f 2>/dev/null
  errors=$((errors+1))
else
  echo "✅ Assets directory structure is valid"
fi

# Validate JSON files
for json_file in config/settings_data.json config/settings_schema.json; do
  if [ -f "$json_file" ]; then
    if command -v jq &>/dev/null; then
      if jq empty "$json_file" 2>/dev/null; then
        echo "✅ $json_file is valid JSON"
      else
        echo "❌ ERROR: $json_file contains invalid JSON"
        errors=$((errors+1))
      fi
    else
      echo "⚠️ jq not installed, skipping JSON validation"
    fi
  else
    echo "❌ ERROR: $json_file is missing"
    errors=$((errors+1))
  fi
done

# Check for stylesheet tags
if grep -r "{% stylesheet %}" --include="*.liquid" . 2>/dev/null; then

# Check for javascript tags
if grep -r "{% javascript %}" --include="*.liquid" . 2>/dev/null; then
  echo "❌ ERROR: Found unsupported {% javascript %} tags"
  grep -r "{% javascript %}" --include="*.liquid" . | cut -d: -f1 | sort | uniq
  errors=$((errors+1))
else
  echo "✅ No unsupported javascript tags found"
fi
  echo "❌ ERROR: Found unsupported {% stylesheet %} tags"
  grep -r "{% stylesheet %}" --include="*.liquid" . | cut -d: -f1 | sort | uniq

# Check for javascript tags
if grep -r "{% javascript %}" --include="*.liquid" . 2>/dev/null; then
  echo "❌ ERROR: Found unsupported {% javascript %} tags"
  grep -r "{% javascript %}" --include="*.liquid" . | cut -d: -f1 | sort | uniq
  errors=$((errors+1))
else
  echo "✅ No unsupported javascript tags found"
fi
  errors=$((errors+1))
else
  echo "✅ No unsupported stylesheet tags found"
fi

# Final report
if [ $errors -eq 0 ]; then
  echo "✅ All checks passed! Theme is ready for deployment."
  exit 0
else
  echo "❌ Found $errors errors that need to be fixed before deployment."
  exit 1
fi
