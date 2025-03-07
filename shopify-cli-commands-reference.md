# Shopify CLI Commands Reference

## Authentication Commands

### Login to a store
```bash
shopify login --store=your-store.myshopify.com
```

### Check current store
```bash
shopify store info
```

### Log out from current store
```bash
shopify logout
```

### Switch to a different store
```bash
shopify login --store=another-store.myshopify.com
```

Note: The command `auth list` does not exist. Use `store info` to see the currently connected store.

## Theme Commands

### Initialize a new theme
```bash
shopify theme init [THEME_NAME]
```

### Check theme for errors
```bash
shopify theme check
```

### List themes in a store
```bash
shopify theme list
```

### Publish theme changes
```bash
shopify theme push
```

### Pull theme from Shopify
```bash
shopify theme pull
```

### Development mode
```bash
shopify theme dev
```

### Delete a theme
```bash
shopify theme delete --theme=THEME_ID
```

## App Commands

### Create a new app
```bash
shopify app create
```

### Deploy an app
```bash
shopify app deploy
```

## Troubleshooting Commands

### Check Shopify CLI version
```bash
shopify version
```

### Update Shopify CLI
```bash
npm update -g @shopify/cli @shopify/theme
```

### Get help for a command
```bash
shopify help [COMMAND]
```

### Enable debug mode
```bash
shopify --verbose [COMMAND]
```

## Common Errors and Solutions

### Command not found errors
If you see "Command not found" errors, check:
1. That you're using the correct command syntax
2. That Shopify CLI is properly installed
3. Try updating the CLI with `npm update -g @shopify/cli @shopify/theme`

### Authentication errors
If you have trouble authenticating:
1. Check that your store URL is correct
2. Run `shopify auth logout` then try logging in again
3. Check your internet connection and firewall settings

### Theme deployment errors
For theme deployment issues:
1. Run `shopify theme check` to identify errors before pushing
2. Check JSON files for syntax errors
3. Make sure all required files exist and are in the correct directories
