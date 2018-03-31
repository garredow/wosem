import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';

import '../../node_modules/vuetify/dist/vuetify.min.css';
import '../../static/styles.css';
import App from './App';
import router from './router';
import store from './store';

import BackButton from './components/Shared/BackButton.vue';
Vue.component('back-button', BackButton);

Vue.use(Vuex);

Vue.use(Vuetify, {
  theme: {
    primary: '#D81B60',
    secondary: '#EC407A',
    accent: '#9c27b0',
    error: '#f44336',
    warning: '#ffeb3b',
    info: '#2196f3',
    success: '#4caf50',
  },
  options: {
    themeVariations: ['primary', 'secondary'],
  },
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
