export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
    
    this.init();
  }

  init() {
    document.querySelectorAll('[data-lazy]').forEach(element => {
      this.observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadElement(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  loadElement(element) {
    const type = element.dataset.lazy;
    switch(type) {
      case 'image':
        this.loadImage(element);
        break;
      case 'component':
        this.loadComponent(element);
        break;
      case 'video':
        this.loadVideo(element);
        break;
    }
  }
}
