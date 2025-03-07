document.addEventListener('DOMContentLoaded', function() {
  // Initialize text glitch effects
  const glitchTexts = document.querySelectorAll('.glitch-effect');
  
  glitchTexts.forEach(element => {
    // Ensure the data-text attribute exists
    if (!element.hasAttribute('data-text')) {
      element.setAttribute('data-text', element.textContent);
    }
    
    // Add glitch-text class if not already present
    if (!element.classList.contains('glitch-text')) {
      element.classList.add('glitch-text');
    }
    
    // Random glitch effect on hover
    element.addEventListener('mouseenter', randomGlitchEffect);
  });
  
  // Add random glitches occasionally
  setInterval(randomGlitch, 3000);
  
  function randomGlitch() {
    // Only apply to a random element, 30% chance
    if (Math.random() < 0.3 && glitchTexts.length > 0) {
      const randomIndex = Math.floor(Math.random() * glitchTexts.length);
      const element = glitchTexts[randomIndex];
      
      triggerGlitch(element);
    }
  }
  
  function randomGlitchEffect() {
    triggerGlitch(this);
  }
  
  function triggerGlitch(element) {
    // Add intense glitch class
    element.classList.add('glitch-intense');
    
    // Remove after animation completes
    setTimeout(() => {
      element.classList.remove('glitch-intense');
    }, 750);
  }
  
  // Handle collection card hover effects for better performance
  const collectionCards = document.querySelectorAll('.collection-card');
  
  collectionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Prepare glitch effect but delay activation slightly
      const glitchContainer = card.querySelector('.glitch-image-container');
      if (glitchContainer) {
        setTimeout(() => {
          glitchContainer.classList.add('glitching');
        }, 50);
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const glitchContainer = card.querySelector('.glitch-image-container');
      if (glitchContainer) {
        glitchContainer.classList.remove('glitching');
      }
    });
  });

  // Glitch text effect randomization
  glitchTexts.forEach(text => {
    const randomizeGlitch = () => {
      const shift = Math.random() * 10 - 5;
      const delay = Math.random() * 0.8;
      const duration = 0.8 + Math.random() * 0.4;
      
      text.style.setProperty('--shift-x', `${shift}px`);
      text.style.setProperty('--shift-delay', `${delay}s`);
      text.style.setProperty('--shift-duration', `${duration}s`);
    };
    
    randomizeGlitch();
    text.addEventListener('mouseenter', randomizeGlitch);
  });
  
  // Glitch image effect
  const glitchImageContainers = document.querySelectorAll('.glitch-image-container');
  
  const applyRandomGlitch = (container) => {
    const redChannel = container.querySelector('.glitch-image__channel--red');
    const blueChannel = container.querySelector('.glitch-image__channel--blue');
    
    if (!redChannel || !blueChannel) return;
    
    const redX = (Math.random() * 10 - 5) + 'px';
    const redY = (Math.random() * 8 - 4) + 'px';
    const blueX = (Math.random() * 10 - 5) + 'px';
    const blueY = (Math.random() * 8 - 4) + 'px';
    
    redChannel.style.transform = `translate3d(${redX}, ${redY}, 0)`;
    blueChannel.style.transform = `translate3d(${blueX}, ${blueY}, 0)`;
  };
  
  glitchImageContainers.forEach(container => {
    // Initial random positions
    applyRandomGlitch(container);
    
    // Animate on hover
    let glitchInterval;
    container.addEventListener('mouseenter', () => {
      glitchInterval = setInterval(() => {
        applyRandomGlitch(container);
      }, 100);
    });
    
    container.addEventListener('mouseleave', () => {
      clearInterval(glitchInterval);
    });
  });
});
