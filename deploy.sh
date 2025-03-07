#!/bin/bash
# VoidBloomDesign Theme Deployment Script

# Set your store URL here
STORE_URL="your-store.myshopify.com"

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== VoidBloomDesign Theme Deployment ===${NC}"

# Step 1: Login to Shopify store
echo -e "${YELLOW}Logging in to Shopify store...${NC}"
shopify login --store=$STORE_URL

# Step 1.5: Verify store connection
echo -e "${YELLOW}Verifying store connection...${NC}"
shopify store info || {
  echo -e "${RED}✘ Failed to connect to store. Please check your store URL and try again.${NC}"
  exit 1
}

# Step 2: Run validation scripts
echo -e "${YELLOW}Running theme validator...${NC}"
node debug-theme.js
if [ $? -ne 0 ]; then
  echo -e "${RED}✘ Validator found errors. Fix them before continuing.${NC}"
  exit 1
fi

echo -e "${YELLOW}Fixing stylesheet tags...${NC}"
bash fix-stylesheet-tags.sh

# Step 3: Run Shopify theme check
echo -e "${YELLOW}Running Shopify theme check...${NC}"
shopify theme check
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}⚠ Theme check found issues. Review them before continuing.${NC}"
  read -p "Continue with deployment? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Deployment aborted.${NC}"
    exit 1
  fi
fi

# Step 4: Deploy the theme
echo -e "${YELLOW}Deploying theme...${NC}"
shopify theme push

# Step 5: Open the theme in browser
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Deployment successful!${NC}"
  
  # Ask if they want to open the theme
  read -p "Open theme in browser? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    shopify theme open
  fi
else
  echo -e "${RED}✘ Deployment failed. Please check the error messages above.${NC}"
  exit 1
fi

echo -e "${GREEN}Deployment process completed.${NC}"
