export const components = {
  'product-card': {
    styles: ['product-card.css', 'premium-features.css'],
    scripts: ['product-interactions.js'],
    dependencies: ['glitch-effects', 'neon-animations']
  },
  'header': {
    styles: ['header.css', 'navigation.css'],
    scripts: ['header.js', 'search.js'],
    dependencies: ['sticky-header']
  }
  // ...more components
};

export const loadComponent = (name) => {
  if (components[name]) {
    const component = components[name];
    // Load styles
    component.styles.forEach(style => loadStyle(style));
    // Load scripts
    component.scripts.forEach(script => loadScript(script));
    // Initialize dependencies
    component.dependencies.forEach(dep => initDependency(dep));
  }
};
