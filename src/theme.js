// Import styles (this will work after you create the CSS file)
// import '../assets/voidbloom-base.css';

// Import fonts
import '@fontsource/rajdhani/300.css';
import '@fontsource/rajdhani/400.css';
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '@fontsource/rajdhani/700.css';
import '@fontsource/share-tech-mono/400.css';

// VoidBloom Cyberpunk Theme JS
class VoidBloom {
  constructor() {
    console.log('VoidBloom initialization');
    this.initGlitchEffects();
    this.initParallaxEffect();
    this.initTextAnimations();
  }

  // Initialize glitch effects for elements with glitch-container class
  initGlitchEffects() {
    const glitchContainers = document.querySelectorAll('.glitch-container');
    
    glitchContainers.forEach(container => {
      // Random glitch effect every 5-10 seconds
      setInterval(() => {
        // Apply glitch class
        container.classList.add('glitching');
        
        // Remove after random duration
        setTimeout(() => {
          container.classList.remove('glitching');
        }, Math.random() * 200 + 100);
      }, Math.random() * 5000 + 5000);
    });
  }

  // Initialize parallax effects on scroll
  initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrollTop * speed}px)`;
      });
    });
  }

  // Initialize text animations
  initTextAnimations() {
    const animatedTexts = document.querySelectorAll('.text-glitch');
    
    animatedTexts.forEach(text => {
      const originalText = text.textContent;
      text.setAttribute('data-text', originalText);
      
      // Add click effect to glitch text temporarily
      text.addEventListener('mouseenter', () => {
        text.classList.add('active');
        
        setTimeout(() => {
          text.classList.remove('active');
        }, 1000);
      });
    });
  }
}

// Initialize VoidBloom when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.voidbloom = new VoidBloom();
  
  // Hide page loader
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 1000);
  }
});
