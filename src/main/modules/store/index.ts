import Store from 'electron-store';

let store: Store;

export const getStore = (): Store => {
  if (!store) {
    store = new Store();
  }

  return store;
};
