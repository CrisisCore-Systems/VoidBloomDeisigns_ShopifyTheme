class PremiumEffects {
  constructor() {
    this.init();
  }

  init() {
    this.initParallax();
    this.initMagneticButtons();
    this.initPremiumHovers();
    this.init3DCards();
  }

  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-button');
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const position = button.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  init3DCards() {
    const cards = document.querySelectorAll('.premium-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.pageX - left) / width;
        const y = (e.pageY - top) / height;
        
        const rotateX = (y - 0.5) * 40;
        const rotateY = (x - 0.5) * 40;
        
        card.style.transform = 
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }
}

export default new PremiumEffects();
