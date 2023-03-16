export function deepCopy(obj) {
    let copy = Object.assign({}, obj);
    Object.keys(copy).forEach(key => {
      if (typeof copy[key] === 'object') {
        copy[key] = deepCopy(copy[key]);
      }
    });
    return copy;
  }