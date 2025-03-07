/**
 * Cart Controller
 * 
 * Handles all cart-related functionality including:
 * - Adding items to cart
 * - Removing items
 * - Updating quantities
 * - Cart drawer interactions
 */

export class CartController {
  constructor() {
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartToggle = document.querySelectorAll('[data-cart-toggle]');
    this.cartClose = document.querySelector('.cart-drawer__close');
    this.cartOverlay = document.querySelector('.cart-drawer__overlay');
    this.addToCartButtons = document.querySelectorAll('[data-add-to-cart]');
    this.cartItemsContainer = document.querySelector('.cart-drawer__items');
    this.cartCount = document.querySelector('.cart-count');
    this.cartTotal = document.querySelector('.cart-total');
    this.cartAPI = '/cart.js';
    this.cartAddAPI = '/cart/add.js';
    this.cartUpdateAPI = '/cart/update.js';
    this.cartChangeAPI = '/cart/change.js';
    
    this.init();
  }
  
  init() {
    this.setupCartDrawer();
    this.setupAddToCartButtons();
    this.setupCartItemEvents();
    this.getCartState();
  }
  
  setupCartDrawer() {
    this.cartToggle.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleCartDrawer();
      });
    });
    
    if (this.cartClose) {
      this.cartClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeCartDrawer();
      });
    }
    
    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => {
        this.closeCartDrawer();
      });
    }
    
    // Close cart drawer on ESC key
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.closeCartDrawer();
      }
    });
  }
  
  toggleCartDrawer() {
    if (this.cartDrawer.classList.contains('open')) {
      this.closeCartDrawer();
    } else {
      this.openCartDrawer();
    }
  }
  
  openCartDrawer() {
    this.cartDrawer.classList.add('open');
    document.body.classList.add('cart-drawer-open');
    
    // Apply glitch animation when opening
    this.cartDrawer.classList.add('glitch-in');
    setTimeout(() => {
      this.cartDrawer.classList.remove('glitch-in');
    }, 500);
  }
  
  closeCartDrawer() {
    this.cartDrawer.classList.add('glitch-out');
    
    setTimeout(() => {
      this.cartDrawer.classList.remove('open');
      this.cartDrawer.classList.remove('glitch-out');
      document.body.classList.remove('cart-drawer-open');
    }, 300);
  }
  
  setupAddToCartButtons() {
    this.addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const form = button.closest('form');
        if (!form) return;
        
        button.classList.add('loading');
        
        this.addToCart(new FormData(form))
          .then(response => {
            this.updateCartDrawer();
            this.updateCartCount(response.items.length);
            this.openCartDrawer();
            
            // Display add notification with glitch effect
            this.showAddNotification(response.items[response.items.length - 1]);
          })
          .catch(error => {
            console.error('Error adding to cart:', error);
            this.showErrorNotification('Could not add to cart. Please try again.');
          })
          .finally(() => {
            button.classList.remove('loading');
          });
      });
    });
  }
  
  setupCartItemEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-increase-quantity')) {
        const id = e.target.getAttribute('data-item-id');
        const input = document.querySelector(`[data-quantity-input="${id}"]`);
        
        if (input) {
          const newVal = parseInt(input.value) + 1;
          input.value = newVal;
          this.updateItemQuantity(id, newVal);
        }
      }
      
      if (e.target.hasAttribute('data-decrease-quantity')) {
        const id = e.target.getAttribute('data-item-id');
        const input = document.querySelector(`[data-quantity-input="${id}"]`);
        
        if (input) {
          const newVal = Math.max(parseInt(input.value) - 1, 1);
          input.value = newVal;
          this.updateItemQuantity(id, newVal);
        }
      }
      
      if (e.target.hasAttribute('data-remove-item')) {
        const id = e.target.getAttribute('data-item-id');
        this.removeItem(id);
      }
    });
  }
  
  async addToCart(formData) {
    try {
      const response = await fetch(this.cartAddAPI, {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  }
  
  async getCartState() {
    try {
      const response = await fetch(this.cartAPI);
      const cart = await response.json();
      
      this.updateCartCount(cart.item_count);
      return cart;
    } catch (error) {
      console.error('Error getting cart:', error);
    }
  }
  
  async updateCartDrawer() {
    try {
      const response = await fetch('/?section_id=cart-drawer');
      const html = await response.text();
      
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      const newItemsContainer = tempDiv.querySelector('.cart-drawer__items');
      const newTotal = tempDiv.querySelector('.cart-total');
      
      if (this.cartItemsContainer && newItemsContainer) {
        this.cartItemsContainer.innerHTML = newItemsContainer.innerHTML;
      }
      
      if (this.cartTotal && newTotal) {
        this.cartTotal.innerHTML = newTotal.innerHTML;
      }
    } catch (error) {
      console.error('Error updating cart drawer:', error);
    }
  }
  
  async updateItemQuantity(id, quantity) {
    try {
      await fetch(this.cartChangeAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          quantity
        })
      });
      
      this.updateCartDrawer();
      this.getCartState();
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  }
  
  async removeItem(id) {
    try {
      const item = document.querySelector(`[data-cart-item="${id}"]`);
      
      if (item) {
        item.classList.add('glitch-remove');
      }
      
      setTimeout(async () => {
        await this.updateItemQuantity(id, 0);
      }, 300);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }
  
  updateCartCount(count) {
    if (this.cartCount) {
      this.cartCount.textContent = count;
      
      if (count > 0) {
        this.cartCount.classList.add('has-items');
      } else {
        this.cartCount.classList.remove('has-items');
      }
    }
  }
  
  showAddNotification(item) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification glitch-effect';
    notification.innerHTML = `
      <div class="cart-notification__content">
        <p>Added to cart: ${item.title}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification cart-notification--error glitch-effect';
    notification.innerHTML = `
      <div class="cart-notification__content">
        <p>${message}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}
