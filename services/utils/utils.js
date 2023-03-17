export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function replaceValues(obj, str) {
  let newStr = str;
  for (let key in obj) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    newStr = newStr.replace(regex, obj[key]);
  }
  return newStr;
}