class VariantSelects extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange.bind(this));
  }

  onVariantChange(event) {
    const selectedOptions = this.selectedOptionValues;
    this.updateProductDetails(selectedOptions);
  }

  updateProductDetails(selectedOptions) {
    // Logic to update product details based on selected options
    console.log('Selected options:', selectedOptions);
    
    // Find the variant that matches all selected options
    const variant = this.getVariantFromOptions(selectedOptions);
    
    if (variant) {
      // Update price
      this.updatePrice(variant);
      
      // Update availability
      this.updateAvailability(variant);
      
      // Update URL with variant ID
      this.updateURL(variant);
      
      // Dispatch event for other components
      this.dispatchEvent(new CustomEvent('variant:changed', {
        detail: {
          variant: variant
        },
        bubbles: true
      }));
    }
  }
  
  getVariantFromOptions(selectedOptions) {
    // This assumes product.variants is available in the scope
    // You may need to adjust this based on how your data is structured
    const variants = window.productVariants || [];
    
    return variants.find(variant => {
      return selectedOptions.every(option => {
        return variant.options.includes(option);
      });
    });
  }
  
  updatePrice(variant) {
    const priceElement = document.querySelector('.product-price');
    if (priceElement && variant.price) {
      priceElement.innerHTML = this.formatMoney(variant.price);
    }
  }
  
  updateAvailability(variant) {
    const availabilityElement = document.querySelector('.product-availability');
    if (availabilityElement) {
      if (variant.available) {
        availabilityElement.innerHTML = 'In stock';
        availabilityElement.classList.remove('unavailable');
        availabilityElement.classList.add('available');
      } else {
        availabilityElement.innerHTML = 'Sold out';
        availabilityElement.classList.remove('available');
        availabilityElement.classList.add('unavailable');
      }
    }
  }
  
  updateURL(variant) {
    if (!variant) return;
    
    window.history.replaceState(
      {}, 
      '', 
      `${window.location.pathname}?variant=${variant.id}`
    );
  }
  
  formatMoney(cents) {
    // Simple money formatting, you might want to use Shopify's money format
    return `$${(cents / 100).toFixed(2)}`;
  }
}
