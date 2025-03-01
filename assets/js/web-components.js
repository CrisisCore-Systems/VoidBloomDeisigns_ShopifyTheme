class WebComponentRegistry {
  static definitions = new Map();

  static define(name, component, options = {}) {
    try {
      if (this.definitions.has(name)) {
        Logger.warn(`Component ${name} already registered`);
        return;
      }

      customElements.define(name, component, options);
      this.definitions.set(name, component);
      
      Logger.log(`Component ${name} registered successfully`, Logger.INFO);
    } catch (error) {
      Logger.log(`Failed to register component ${name}`, Logger.ERROR, error);
    }
  }

  static get(name) {
    return this.definitions.get(name);
  }
}

// Register all components
WebComponentRegistry.define('menu-drawer', MenuDrawer);
WebComponentRegistry.define('header-drawer', HeaderDrawer);
WebComponentRegistry.define('modal-dialog', ModalDialog);
WebComponentRegistry.define('quantity-input', QuantityInput);
WebComponentRegistry.define('product-recommendations', ProductRecommendations);
