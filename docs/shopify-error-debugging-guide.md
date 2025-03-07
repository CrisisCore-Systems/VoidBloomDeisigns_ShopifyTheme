# Shopify Theme Debugging Guide

## Structured Debugging Process

### 1. Check Theme Logs
- Open your Shopify admin
- Go to Online Store → Themes → Actions → View theme logs
- Look for recent errors and their timestamps

### 2. Validate Theme Structure
- Run the validation script: `bash shopify-theme-validation.sh`
- Ensure all assets are in the root assets directory
- Check for proper file organization

### 3. Check Liquid Syntax
- Look for missing closing tags: `{% if %}` needs `{% endif %}`
- Verify filters are properly used: `{{ product.title | upcase }}`
- Check for object existence before accessing properties

### 4. Validate JSON Files
