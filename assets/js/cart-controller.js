class CartController {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.cache = new Cache(300000); // 5 minute cache
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const addToCartButton = e.target.closest('[data-add-to-cart]');
      if (addToCartButton) {
        e.preventDefault();
        this.addToCart(addToCartButton);
      }
    });

    document.addEventListener('change', (e) => {
      const quantityInput = e.target.closest('[data-cart-quantity]');
      if (quantityInput) {
        this.updateQuantity(quantityInput);
      }
    });
  }

  async addToCart(button) {
    const formData = new FormData(button.closest('form'));
    button.classList.add('loading');

    try {
      const cacheKey = `cart-add-${formData.get('id')}`;
      
      const response = await NetworkUtils.fetchWithRetry(
        window.routes.cart_add_url,
        {
          method: 'POST',
          body: formData
        }
      );
      
      const cart = await response.json();
      this.cache.set(cacheKey, cart);
      this.updateCart(cart);
      document.dispatchEvent(new CustomEvent('cart:open'));
    } catch (error) {
      Logger.log('Cart error', Logger.ERROR, error);
      this.showError(window.theme.strings.cartError);
    } finally {
      button.classList.remove('loading');
    }
  }

  updateCart(cart) {
    // Update cart count
    document.querySelectorAll('[data-cart-count]')
      .forEach(el => el.textContent = cart.item_count);
    
    // Update cart total
    document.querySelectorAll('[data-cart-total]')
      .forEach(el => el.textContent = this.formatMoney(cart.total_price));
    
    // Update cart items
    const itemsContainer = document.querySelector('[data-cart-items]');
    if (itemsContainer) {
      this.renderItems(itemsContainer, cart.items);
    }
  }

  formatMoney(cents) {
    return window.themeUtils.formatMoney(cents, window.themeConfig.moneyFormat);
  }

  showError(message) {
    // Create and show error notification with cyberpunk style
    const notification = document.createElement('div');
    notification.className = 'notification notification--error neon-text';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  }
}

window.cartController = new CartController();
