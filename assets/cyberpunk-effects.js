/**
 * Cyberpunk Theme Effects
 * Provides interactive visual effects for the cyberpunk theme
 */

document.addEventListener('DOMContentLoaded', function() {
  try {
    // Initialize glitch effects
    initGlitchEffects();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize cursor effects if not on touch device
    if (!('ontouchstart' in window)) {
      initCustomCursor();
    }
  } catch (error) {
    console.error('Error initializing cyberpunk effects:', error);
  }
});

function initGlitchEffects() {
  // Randomly trigger glitch animations on text elements
  const glitchElements = document.querySelectorAll('.glitch-effect');
  
  if (glitchElements.length > 0) {
    setInterval(() => {
      const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
      
      // Add intense glitch class temporarily
      randomElement.classList.add('glitch-effect--intense');
      
      setTimeout(() => {
        randomElement.classList.remove('glitch-effect--intense');
      }, 500);
    }, 3000);
  }
  
  // Random image glitches
  const glitchImages = document.querySelectorAll('.glitch-image-container');
  
  if (glitchImages.length > 0) {
    setInterval(() => {
      if (Math.random() > 0.7) {
        const randomImage = glitchImages[Math.floor(Math.random() * glitchImages.length)];
        
        randomImage.classList.add('glitch-image--active');
        
        setTimeout(() => {
          randomImage.classList.remove('glitch-image--active');
        }, 700);
      }
    }, 4000);
  }
}

function initHoverEffects() {
  // Add hover effects to collection cards
  const collectionCards = document.querySelectorAll('.collection-card');
  
  collectionCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Create glitch line animation
      const glitchLine = document.createElement('div');
      glitchLine.classList.add('cyber-glitch-line');
      card.appendChild(glitchLine);
      
      setTimeout(() => {
        glitchLine.remove();
      }, 300);
    });
  });
}

function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('cyber-cursor');
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('cyber-cursor-dot');
  document.body.appendChild(cursorDot);
  
  // Use requestAnimationFrame for smoother cursor movement
  let cursorX = 0;
  let cursorY = 0;
  let dotX = 0;
  let dotY = 0;
  
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });
  
  function updateCursor() {
    // Add a slight delay to the dot for trailing effect
    dotX += (cursorX - dotX) * 0.2;
    dotY += (cursorY - dotY) * 0.2;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
  
  // Add highlight effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .collection-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('cyber-cursor--active');
      cursorDot.classList.add('cyber-cursor-dot--active');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('cyber-cursor--active');
      cursorDot.classList.remove('cyber-cursor-dot--active');
    });
  });
}

// Add cyberpunk scan effect when page loads
window.addEventListener('load', () => {
  const scanEffect = document.createElement('div');
  scanEffect.classList.add('cyber-scan-effect');
  document.body.appendChild(scanEffect);
  
  setTimeout(() => {
    scanEffect.style.top = '100%';
    
    setTimeout(() => {
      scanEffect.remove();
    }, 600);
  }, 100);
});
