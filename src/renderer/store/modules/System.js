import storageService from '../../services/storageService';

function cleanCopy(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
}

const defaultSettings = {
  pathToAres: '',
  theme: 'light',
};

export default {
  state: {
    settings: {},
    snackbarMessage: null,
  },
  mutations: {
    setSettings(state, payload) {
      state.settings = payload;
    },
    showSnackbarMessage(state, payload) {
      state.snackbarMessage = payload;
    },
  },
  getters: {
    getSettings: state => () => cleanCopy(state.settings),
  },
  actions: {
    async loadSettings({ commit }) {
      const settings = await storageService.get('settings');
      const loadedSettings = Object.assign({}, defaultSettings, settings);
      commit('setSettings', loadedSettings);
    },
    setSettings({ commit }, settings) {
      const fullSettings = Object.assign({}, defaultSettings, settings);
      commit('setSettings', fullSettings);
      storageService.set('settings', fullSettings);
    },
    newSnackbarMessage({ commit }, message) {
      commit('showSnackbar', message);
    },
  },
};
