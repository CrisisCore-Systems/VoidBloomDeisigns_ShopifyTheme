document.addEventListener('DOMContentLoaded', function() {
  // Set background images for clones based on the original image
  const glitchContainers = document.querySelectorAll('.glitch-image-container');
  
  glitchContainers.forEach(container => {
    const originalImg = container.querySelector('.glitch-img');
    const clones = container.querySelectorAll('.glitch-image--clone');
    
    if (originalImg) {
      // Wait for image to load to get its source
      originalImg.addEventListener('load', function() {
        const imgSrc = this.currentSrc || this.src;
        
        // Set the background image for each clone
        clones.forEach(clone => {
          clone.style.backgroundImage = `url(${imgSrc})`;
        });
      });
      
      // If image is already loaded
      if (originalImg.complete) {
        const imgSrc = originalImg.currentSrc || originalImg.src;
        clones.forEach(clone => {
          clone.style.backgroundImage = `url(${imgSrc})`;
        });
      }
    }
  });
});
