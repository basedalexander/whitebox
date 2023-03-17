
// @todo 
// the point is to have to store an object in local storage under key "whitebox"
// the all the name --> params then stored within name space of that object
// example: "whitebox": { "Explore on weekends": { weekStartsOn: Friday, ...}, "algorithmX": { date: 23, ... } }

export class LocalStorageService {
    constructor() {
      // this.storage = window.localStorage;
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