#!/bin/bash
# Shopify Theme Deployment Workflow
# Run this script before deploying your theme to catch common errors

# Set text colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Print header
echo -e "\n${YELLOW}=======================================${NC}"
echo -e "${YELLOW}   SHOPIFY THEME DEPLOYMENT WORKFLOW    ${NC}"
echo -e "${YELLOW}=======================================${NC}\n"

echo -e "${YELLOW}Step 1: Checking theme structure...${NC}"
# Check for subdirectories in assets
if [ -n "$(find ./assets -mindepth 2 -type f 2>/dev/null)" ]; then
  echo -e "${RED}❌ ERROR: Subdirectories found in assets folder${NC}"
  echo "Shopify requires a flat structure in the assets directory."
  echo "Moving files to root assets directory..."
  
  # Move files from subdirectories to root assets directory
  find ./assets -mindepth 2 -type f -exec bash -c 'mkdir -p $(dirname "./assets/$(basename "{}")") && cp "{}" "./assets/$(basename "{}")"' \;
  
  echo -e "${YELLOW}Files moved. You should remove the subdirectories manually after verifying.${NC}"
else
  echo -e "${GREEN}✅ Assets directory structure is valid${NC}"
fi

echo -e "\n${YELLOW}Step 2: Validating JSON configuration files...${NC}"
# Check JSON files
json_valid=true
for file in config/settings_schema.json config/settings_data.json; do
  if [ -f "$file" ]; then
    if command -v jq &> /dev/null; then
      if ! jq empty "$file" 2>/dev/null; then
        echo -e "${RED}❌ ERROR: Invalid JSON in $file${NC}"
        json_valid=false
      else
        echo -e "${GREEN}✅ $file is valid${NC}"
      fi
    else
      echo -e "${YELLOW}⚠️ jq not installed, skipping JSON validation${NC}"
      echo "Install jq for JSON validation: https://jqlang.github.io/jq/download/"
    fi
  else
    echo -e "${RED}❌ ERROR: $file not found${NC}"
    json_valid=false
  fi
done

echo -e "\n${YELLOW}Step 3: Checking for unsupported Liquid tags...${NC}"
# Check for unsupported tags
if grep -r --include="*.liquid" "{% stylesheet %}" .; then
  echo -e "${RED}❌ ERROR: Unsupported {% stylesheet %} tags found${NC}"
  echo "Please use {{ 'filename.css' | asset_url | stylesheet_tag }} instead"
  grep -r --include="*.liquid" -l "{% stylesheet %}" .
else
  echo -e "${GREEN}✅ No unsupported stylesheet tags found${NC}"
fi

echo -e "\n${YELLOW}Step 4: Checking for missing assets...${NC}"
# Check for missing assets
missing_assets=false
for liquidfile in $(find . -name "*.liquid"); do
  grep -o "asset_url | \w\+" "$liquidfile" 2>/dev/null | cut -d' ' -f3 | while read asset; do
    if [ ! -f "./assets/$asset" ]; then
      echo -e "${RED}❌ Missing asset: $asset referenced in $liquidfile${NC}"
      missing_assets=true
    fi
  done
done

if [ "$missing_assets" = false ]; then
  echo -e "${GREEN}✅ No missing assets found${NC}"
fi

echo -e "\n${YELLOW}Step 5: Running Theme Check...${NC}"
# Run Shopify Theme Check if available
if command -v theme-check &> /dev/null; then
  theme-check .
else
  echo -e "${YELLOW}⚠️ Theme Check not installed${NC}"
  echo "Install Theme Check for advanced linting: npm install -g @shopify/theme-check"
fi

echo -e "\n${YELLOW}Step 6: Backing up theme...${NC}"
if command -v shopify &> /dev/null; then
  # Create a backup directory with timestamp
  backup_dir="theme_backup_$(date +%Y%m%d_%H%M%S)"
  mkdir -p "$backup_dir"
  echo "Copying theme files to $backup_dir..."
  cp -r assets config layout locales sections snippets templates "$backup_dir"
  echo -e "${GREEN}✅ Theme backed up to $backup_dir${NC}"
else
  echo -e "${YELLOW}⚠️ Shopify CLI not installed, skipping backup${NC}"
  echo "Install Shopify CLI: npm install -g @shopify/cli @shopify/theme"
fi

echo -e "\n${YELLOW}=======================================${NC}"
echo -e "${YELLOW}   DEPLOYMENT WORKFLOW COMPLETE    ${NC}"
echo -e "${YELLOW}=======================================${NC}\n"

# Provide final recommendations
if [ "$json_valid" = false ] || [ "$missing_assets" = true ]; then
  echo -e "${RED}⚠️ Please fix the errors before deploying your theme${NC}"
  exit 1
else
  echo -e "${GREEN}✅ Pre-deployment checks passed!${NC}"
  echo -e "${GREEN}Run 'shopify theme push' to deploy your theme${NC}"
  exit 0
fi
