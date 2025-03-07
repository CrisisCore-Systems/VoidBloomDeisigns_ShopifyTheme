#!/bin/bash
# Script to replace invalid stylesheet tags with style tags in Liquid files

echo "Fixing stylesheet tags in Liquid files..."

# Find all Liquid files in the theme
LIQUID_FILES=$(find . -name "*.liquid")

# Loop through each file and replace tags
for file in $LIQUID_FILES; do
  # Check if the file contains stylesheet tags
  if grep -q "{% stylesheet %}" "$file"; then
    echo "Fixing $file..."
    sed -i 's/{% stylesheet %}/{% style %}/g' "$file"
    sed -i 's/{% endstylesheet %}/{% endstyle %}/g' "$file"
  fi
done

echo "All stylesheet tags have been fixed!"

# Check for script tags as well
if grep -q "{% script %}" $(find . -name "*.liquid"); then
  echo "Warning: Some files may contain invalid script tags. Run this command to fix them:"
  echo "find . -name '*.liquid' | xargs sed -i 's/{% script %}/{% javascript %}/g; s/{% endscript %}/{% endjavascript %}/g'"
fi
