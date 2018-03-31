import localForage from 'localforage';

class StorageService {
  set(key, payload) {
    localForage.setItem(key, payload);
  }
  async get(key) {
    const res = await localForage.getItem(key);
    return res;
  }
}

export default new StorageService();
