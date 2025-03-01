declare global {
  interface Window {
    theme: ThemeConfig;
    themeUtils: ThemeUtils;
    cartController: CartController;
    errorTrackingService: ErrorTrackingService;
    stateManager: StateManager;
    cache: Cache;
  }
}

interface ThemeConfig {
  routes: {
    cart_add_url: string;
    cart_change_url: string;
    cart_url: string;
    predictive_search_url: string;
  };
  strings: {
    cartError: string;
    addToCart: string;
    soldOut: string;
  };
  moneyFormat: string;
  settings: Record<string, any>;
}

interface ThemeUtils {
  formatMoney(cents: number, format?: string): string;
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void;
  handleError(error: Error, context?: string): void;
  showNotification(message: string, type?: 'info' | 'error' | 'success'): void;
}

export {};
