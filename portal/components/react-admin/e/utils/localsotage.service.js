const localForage = require('localforage');

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: 'Dashboard-App',
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: 'local_sql', // Should be alphanumeric, with underscores.
  description: 'Local Storage for Cache',
});

export function setItem(key, value) {
  return localForage.setItem(key, value);
}

export function getItem(key) {
  return localForage.getItem(key);
}

export const store = localForage;
