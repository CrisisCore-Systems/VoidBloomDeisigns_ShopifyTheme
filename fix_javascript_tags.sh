#!/bin/bash

# Find all files containing the javascript tag
files=$(grep -r -l "{% javascript %}" --include="*.liquid" .)

for file in $files; do
  echo "Processing $file for javascript tags..."
  
  # Extract content between javascript tags and replace with proper script tag
  awk '
    BEGIN { printing = 0; content = ""; }
    /{% javascript %}/ { printing = 1; next; }
    /{% endjavascript %}/ { 
      printing = 0; 
      print "<script>" content "</script>"; 
      content = ""; 
      next; 
    }
    printing { content = content $0 "\n"; next; }
    { print; }
  ' "$file" > "${file}.new"
  
  # Replace the original file
  mv "${file}.new" "$file"
done

echo "✅ JavaScript tags fixed in all liquid files"
