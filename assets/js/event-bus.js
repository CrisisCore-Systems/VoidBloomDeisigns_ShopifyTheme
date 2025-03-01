class EventBus {
  constructor() {
    this.events = {};
    this.onceEvents = new WeakMap();
  }

  on(event, callback, options = {}) {
    if (!this.events[event]) {
      this.events[event] = new Set();
    }
    
    if (options.once) {
      this.onceEvents.set(callback, true);
    }
    
    this.events[event].add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event].delete(callback);
    }
  }

  emit(event, data) {
    if (!this.events[event]) return;

    this.events[event].forEach(callback => {
      try {
        callback(data);
        if (this.onceEvents.get(callback)) {
          this.off(event, callback);
        }
      } catch (error) {
        Logger.log(`Error in event handler for ${event}`, Logger.ERROR, error);
      }
    });
  }
}

window.eventBus = new EventBus();
