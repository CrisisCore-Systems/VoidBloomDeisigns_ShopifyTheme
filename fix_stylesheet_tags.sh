#!/bin/bash

# Find all files containing the stylesheet tag
files=$(grep -l "{% stylesheet %}" snippets/*.liquid)

for file in $files; do
  echo "Processing $file..."
  
  # Extract content between stylesheet tags and replace with proper style tag
  awk '
    BEGIN { printing = 0; content = ""; }
    /{% stylesheet %}/ { printing = 1; next; }
    /{% endstylesheet %}/ { 
      printing = 0; 
      print "<style>" content "</style>"; 
      content = ""; 
      next; 
    }
    printing { content = content $0 "\n"; next; }
    { print; }
  ' "$file" > "${file}.new"
  
  # Replace the original file
  mv "${file}.new" "$file"
done

echo "✅ Stylesheet tags fixed in all snippet files"
