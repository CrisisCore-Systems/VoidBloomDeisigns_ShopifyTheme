import { CartController } from './assets/js/cart-controller';
import { AnimationController } from './assets/js/animation-controller';

// Remove duplicate initialization and use existing setup
document.addEventListener('DOMContentLoaded', () => {
  window.cartController = new CartController();
  window.animationController = new AnimationController();
  window.animationController.init();
});
