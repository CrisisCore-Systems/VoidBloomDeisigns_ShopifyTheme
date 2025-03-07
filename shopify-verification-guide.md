# Shopify CLI Verification Guide

This guide helps you verify your Shopify CLI installation and connection to make sure everything is set up correctly before deploying your theme.

## Verifying Shopify CLI Installation

### Check CLI version
```bash
shopify version
```

Expected output should show something like:
```
shopify/3.x.x darwin-arm64 node-v16.15.0
```

If this command fails, you may need to reinstall the CLI:
```bash
npm install -g @shopify/cli @shopify/theme
```

## Verifying Store Connection

### Check current store connection
```bash
shopify store info
```

This should display information about your currently connected store. If you see an error, you're not connected to any store.

### Connect to a store
```bash
shopify login --store=your-store.myshopify.com
```

This will open a browser window where you can authenticate with your Shopify admin credentials.

## Verifying Theme Access

### List available themes
```bash
shopify theme list
```

This should display all themes in your store. If you see an error, there might be a permission issue with your store access.

### Test theme development mode
```bash
shopify theme dev --theme=THEME_ID
```

This should start a development server and open a browser with your theme preview. If this works, your setup is correctly configured.

## Troubleshooting Common Issues

### Authentication Issues
If you're having trouble authenticating:

1. Make sure you're using the correct store URL format: `your-store.myshopify.com`
2. Try logging out and back in:
   ```bash
   shopify logout
   shopify login --store=your-store.myshopify.com
   ```
3. Check that your Shopify account has access to the theme you're trying to work with.

### CLI Command Not Found
If you see "Command not found" errors:

1. Make sure you're using the correct command syntax (check this guide)
2. Some commands previously available in older CLI versions may have changed
3. Try `shopify help` to see all available commands
4. Update to the latest CLI version: `npm update -g @shopify/cli @shopify/theme`

### Partner Access Issues
If you're getting permission errors:

1. Make sure your account has the necessary permissions in the store
2. For agencies, ensure you have correctly accepted the store collaboration invitation
3. Try the store login flow through Partners dashboard if direct login fails
