/**
 * Animation Controller
 * 
 * Handles all animation effects across the cyberpunk theme
 * Includes glitch effects, scroll animations, and hover effects
 */

export class AnimationController {
  constructor() {
    this.glitchElements = document.querySelectorAll('.glitch-effect');
    this.glitchImages = document.querySelectorAll('.glitch-image-container');
    this.hoverElements = document.querySelectorAll('[data-hover-effect]');
    this.scrollAnimations = document.querySelectorAll('[data-scroll-animation]');
    
    this.init();
  }
  
  init() {
    this.setupGlitchText();
    this.setupGlitchImages();
    this.setupHoverEffects();
    this.setupScrollAnimations();
    this.setupIntersectionObserver();
  }
  
  setupGlitchText() {
    this.glitchElements.forEach(element => {
      // Apply random glitch effect on interval
      setInterval(() => {
        if (Math.random() > 0.9) {
          element.classList.add('glitching');
          setTimeout(() => {
            element.classList.remove('glitching');
          }, 200 + Math.random() * 400);
        }
      }, 2000);
    });
  }
  
  setupGlitchImages() {
    this.glitchImages.forEach(container => {
      const redChannel = container.querySelector('.glitch-image-red');
      const greenChannel = container.querySelector('.glitch-image-green');
      const blueChannel = container.querySelector('.glitch-image-blue');
      
      // Apply random offset to RGB channels on interval
      setInterval(() => {
        if (Math.random() > 0.9) {
          const offsetX = Math.random() * 10 - 5;
          const offsetY = Math.random() * 10 - 5;
          
          redChannel.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          
          setTimeout(() => {
            redChannel.style.transform = 'translate(0, 0)';
          }, 200);
        }
        
        if (Math.random() > 0.9) {
          const offsetX = Math.random() * 10 - 5;
          const offsetY = Math.random() * 10 - 5;
          
          greenChannel.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          
          setTimeout(() => {
            greenChannel.style.transform = 'translate(0, 0)';
          }, 200);
        }
        
        if (Math.random() > 0.9) {
          const offsetX = Math.random() * 10 - 5;
          const offsetY = Math.random() * 10 - 5;
          
          blueChannel.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
          
          setTimeout(() => {
            blueChannel.style.transform = 'translate(0, 0)';
          }, 200);
        }
      }, 3000);
    });
  }
  
  setupHoverEffects() {
    this.hoverElements.forEach(element => {
      const effect = element.getAttribute('data-hover-effect');
      
      element.addEventListener('mouseenter', () => {
        element.classList.add(`hover-${effect}`);
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove(`hover-${effect}`);
      });
    });
  }
  
  setupScrollAnimations() {
    // Basic setup for scroll triggered animations
    this.scrollAnimations.forEach(element => {
      element.classList.add('scroll-animation-hidden');
    });
  }
  
  setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-animation-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      this.scrollAnimations.forEach(element => {
        observer.observe(element);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      this.scrollAnimations.forEach(element => {
        element.classList.add('scroll-animation-visible');
      });
    }
  }
}
