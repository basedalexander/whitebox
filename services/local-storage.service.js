class LocalStorageService {
  constructor() {
    this.namespace = 'whitebox';
  }

  init() {
    this.storage = window.localStorage;
    console.log('localStorageService initialized');
  }

  set(key, value) {
    const data = this.getAll();
    data[key] = value;
    this.storage.setItem(this.namespace, JSON.stringify(data));
  }

  get(key) {
    const data = this.getAll();
    return data[key];
  }

  getAll() {
    const data = this.storage.getItem(this.namespace);
    return data ? JSON.parse(data) : {};
  }

  remove(key) {
    const data = this.getAll();
    delete data[key];
    this.storage.setItem(this.namespace, JSON.stringify(data));
  }
}

export default LocalStorageService;