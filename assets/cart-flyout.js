/**
 * Cart Flyout Functionality
 * Handles opening and closing the cart flyout panel
 */
class CartFlyout {
  constructor() {
    this.cartFlyout = document.querySelector('[data-cart-flyout]');
    this.cartOpeners = document.querySelectorAll('[data-cart-open]');
    this.cartClosers = document.querySelectorAll('[data-cart-close]');
    this.overlay = this.cartFlyout?.querySelector('.cart-flyout__overlay');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.cartFlyout) return;
    
    // Add event listeners to cart openers
    this.cartOpeners.forEach(opener => {
      opener.addEventListener('click', this.openCart.bind(this));
    });
    
    // Add event listeners to cart closers
    this.cartClosers.forEach(closer => {
      closer.addEventListener('click', this.closeCart.bind(this));
    });
    
    // Close cart when clicking on overlay
    this.overlay?.addEventListener('click', this.closeCart.bind(this));
    
    // Close cart when pressing Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) {
        this.closeCart();
      }
    });
  }
  
  openCart() {
    this.cartFlyout.classList.add('active');
    this.overlay?.classList.add('active');
    document.body.classList.add('no-scroll');
    this.isOpen = true;
    
    // Trigger a custom event that other scripts might listen to
    document.dispatchEvent(new CustomEvent('cart:opened'));
  }
  
  closeCart() {
    this.cartFlyout.classList.remove('active');
    this.overlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
    this.isOpen = false;
    
    // Trigger a custom event that other scripts might listen to
    document.dispatchEvent(new CustomEvent('cart:closed'));
  }
}

// Initialize cart flyout when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CartFlyout();
});
