class ResourceLoader {
  static #loadedResources = new Set();
  static #loadingPromises = new Map();

  static async loadScript(src, options = {}) {
    if (this.#loadedResources.has(src)) return;
    if (this.#loadingPromises.has(src)) {
      return this.#loadingPromises.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      
      Object.entries(options).forEach(([key, value]) => {
        script[key] = value;
      });

      script.onload = () => {
        this.#loadedResources.add(src);
        this.#loadingPromises.delete(src);
        resolve();
      };

      script.onerror = (error) => {
        this.#loadingPromises.delete(src);
        reject(error);
      };

      document.head.appendChild(script);
    });

    this.#loadingPromises.set(src, promise);
    return promise;
  }

  static async loadStyle(href, options = {}) {
    if (this.#loadedResources.has(href)) return;
    
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      
      Object.entries(options).forEach(([key, value]) => {
        link[key] = value;
      });

      link.onload = () => {
        this.#loadedResources.add(href);
        resolve();
      };
      
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }
}

window.resourceLoader = ResourceLoader;
