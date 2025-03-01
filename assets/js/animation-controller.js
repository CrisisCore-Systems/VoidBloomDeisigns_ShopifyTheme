class AnimationController {
  constructor() {
    this.config = window.themeConfig.animations;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    this.initGlitchEffects();
    this.initNeonPulse();
    this.initParallaxBackgrounds();
  }

  animate(element, animation, options = {}) {
    if (this.reducedMotion) return;

    const settings = {
      duration: this.config.durations.medium,
      easing: 'ease-out',
      ...options
    };

    return element.animate(animation, settings);
  }

  glitch(element) {
    if (this.reducedMotion) return;
    
    return this.animate(element, [
      { clip: 'rect(44px, 450px, 56px, 0)' },
      { clip: 'rect(34px, 450px, 16px, 0)' },
      { clip: 'rect(67px, 450px, 81px, 0)' }
    ], {
      duration: 100,
      iterations: 3
    });
  }

  neonPulse(element) {
    if (this.reducedMotion) return;
    
    return this.animate(element, [
      { textShadow: '0 0 7px var(--glow-primary)' },
      { textShadow: '0 0 20px var(--glow-primary), 0 0 30px var(--glow-primary)' },
      { textShadow: '0 0 7px var(--glow-primary)' }
    ], {
      duration: 1500,
      iterations: Infinity
    });
  }

  initParallaxBackgrounds() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', this.debounce(() => {
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallaxSpeed || 0.5;
        const scroll = window.pageYOffset;
        element.style.transform = `translateY(${scroll * speed}px)`;
      });
    }, 10));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

window.animationController = new AnimationController();
