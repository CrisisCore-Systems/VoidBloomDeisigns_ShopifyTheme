# Shopify Theme Development Checklist

## Project Setup

- [ ] Initialize theme with Shopify CLI (`shopify theme init`)
- [ ] Set up version control (Git)
- [ ] Configure settings_schema.json and settings_data.json
- [ ] Create a development store for testing

## File Organization

- [ ] Keep assets directory flat (no subdirectories)
- [ ] Use prefixes for asset organization (e.g., `component-`, `section-`)
- [ ] Use BEM naming convention for CSS classes
- [ ] Organize templates logically

## Theme Configuration

- [ ] Validate all JSON files (settings_schema.json, settings_data.json, etc.)
- [ ] Configure theme info in settings_schema.json
- [ ] Set up color scheme and typography settings
- [ ] Configure metafields if needed

## CSS Implementation

- [ ] Use one of the approved CSS methods:
  - [ ] External CSS file linked via `{{ 'filename.css' | asset_url | stylesheet_tag }}`
  - [ ] Inline styles with `<style>` tags
  - [ ] Liquid-enabled SCSS with `.scss.liquid` extension
- [ ] Avoid deprecated `{% stylesheet %}` tags
- [ ] Implement responsive breakpoints

## JavaScript Best Practices

- [ ] Modularize JavaScript code
- [ ] Use ES6+ features with appropriate polyfills
- [ ] Minimize global namespace pollution
- [ ] Implement proper event handling
- [ ] Add error handling for API calls

## Liquid Template Optimization

- [ ] Check for nil objects before accessing properties
- [ ] Use appropriate conditional logic
- [ ] Avoid deep nesting of Liquid tags
- [ ] Utilize template inheritance where possible
- [ ] Implement pagination for collection pages

## Section and Block Configuration

- [ ] Create reusable sections with appropriate settings
- [ ] Implement blocks for customizable content
- [ ] Use presets for default section configurations
- [ ] Add appropriate section and block limits

## Cart and Checkout

- [ ] Implement AJAX cart functionality
- [ ] Style cart page consistently with site theme
- [ ] Test checkout flow on multiple devices
- [ ] Configure shipping and tax settings

## Performance Optimization

- [ ] Optimize image loading with responsive image sizes
- [ ] Lazy load below-the-fold content
- [ ] Minimize HTTP requests
- [ ] Implement browser caching
- [ ] Reduce JavaScript and CSS file sizes

## Testing

- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Check responsive breakpoints
- [ ] Verify all interactive elements work properly
- [ ] Test with different customer accounts

## Accessibility

- [ ] Implement proper heading hierarchy
- [ ] Add descriptive alt text for images
- [ ] Ensure sufficient color contrast
- [ ] Make interactive elements keyboard accessible
- [ ] Test with screen readers

## Internationalization

- [ ] Set up translation files
- [ ] Use translation keys consistently
- [ ] Test with different locales
- [ ] Configure currency formatting
- [ ] Handle right-to-left languages if needed

## Pre-launch

- [ ] Run `shopify theme check` to validate theme
- [ ] Validate HTML and CSS
- [ ] Test site speed with Google PageSpeed Insights
- [ ] Implement SEO best practices
- [ ] Configure robots.txt and sitemap.xml

## Launch

- [ ] Back up production theme
- [ ] Deploy theme using `shopify theme push`
- [ ] Test all functionality in live environment
- [ ] Monitor for errors and performance issues
- [ ] Configure analytics

## Post-launch

- [ ] Set up monitoring
- [ ] Document theme customization options
- [ ] Create user guides for theme management
- [ ] Plan for maintenance and updates

## Common Commands

