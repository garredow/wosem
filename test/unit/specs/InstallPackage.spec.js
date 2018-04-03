import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import InstallPackage from '@/views/InstallPackage';
import store from '@/store';

Vue.use(Vuetify);
Vue.use(Vuex);

describe('LandingPage.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      store,
      el: document.createElement('div'),
      render: h => h(InstallPackage),
    }).$mount();

    expect(vm.$el.querySelector('p').textContent).to.contain('Drop an ipk file in the box below, select a device, and click "install". Easy as that!');
  });
});
