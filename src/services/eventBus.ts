class EventBus {
    #privateBus: any;

    constructor() {
        this.#privateBus = document.createElement('div');
    }
  
    register(event, callback) {
        this.#privateBus.addEventListener(event, callback);
    } 
      
    remove(event, callback) {
        this.#privateBus.removeEventListener(event, callback);
    }

    fire(event, detail) {
        this.#privateBus.dispatchEvent(new CustomEvent(event, { detail }));
    }
}

export const EVENT_BUS = new EventBus();