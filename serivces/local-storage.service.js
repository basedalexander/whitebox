export class LocalStorageService {
    constructor() {
      this.storage = window.localStorage;
    }
  
    save(key, value) {
      this.storage.setItem(key, JSON.stringify(value));
    }
  
    retrieve(key) {
      return JSON.parse(this.storage.getItem(key));
    }

    remove(key) {
        this.storage.removeItem(key);
      }
  }