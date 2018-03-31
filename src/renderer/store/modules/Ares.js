import aresService from '../../services/aresService';

function cleanCopy(obj) {
  return obj ? JSON.parse(JSON.stringify(obj)) : null;
}

export default {
  state: {
    devices: [],
    deviceApps: [],
  },
  mutations: {
    setDevices(state, payload) {
      state.devices = payload;
    },
    updateDevice(state, payload) {
      const index = state.devices.findIndex(a => a.name === payload.name);
      if (index > -1) {
        state.devices[index] = Object.assign(state.devices[index], payload);
      }
    },
    setDeviceApps(state, payload) {
      state.deviceApps = payload;
    },
    clearDeviceApps(state) {
      state.deviceApps = [];
    },
  },
  getters: {
    getDeviceByName: state => (name) => {
      const device = state.devices.find(a => a.name === name);
      return cleanCopy(device);
    },
    getAppById: state => (appId) => {
      const app = state.deviceApps.find(a => a.id === appId);
      return cleanCopy(app);
    },
  },
  actions: {
    async refreshDeviceList({ commit }) {
      const devices = await aresService.listDevices();
      commit('setDevices', devices);
    },
    async updateDeviceInfo({ commit }, deviceInfo) {
      await aresService.updateDeviceInfo(deviceInfo);
      this.dispatch('refreshDeviceList');
    },
    async addDevice({ commit }, deviceInfo) {
      await aresService.addDevice(deviceInfo);
      this.dispatch('refreshDeviceList');
    },
    async deleteDevice({ commit }, deviceName) {
      await aresService.deleteDevice(deviceName);
      this.dispatch('refreshDeviceList');
    },
    async installApp({ commit }, { deviceName, filePath }) {
      await aresService.installApp(deviceName, filePath);
    },
    async deleteApp({ commit }, { deviceName, appId }) {
      await aresService.deleteApp(deviceName, appId);
    },
    async listApps({ commit }, deviceName) {
      const apps = await aresService.listApps(deviceName);
      commit('setDeviceApps', apps);
    },
    async clearDeviceApps({ commit }) {
      commit('clearDeviceApps');
    },
  },
};
