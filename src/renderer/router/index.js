import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'install-package',
      component: require('@/views/InstallPackage').default,
    },
    {
      path: '/devices',
      name: 'devices',
      component: require('@/views/Devices').default,
    },
    {
      path: '/device/:deviceName',
      name: 'device-info',
      component: require('@/views/DeviceInfo').default,
      props: true,
    },
    {
      path: '/devices/add',
      name: 'add-device',
      component: require('@/views/AddDevice').default,
      props: true,
    },
    {
      path: '/device/:deviceName/app/:appId',
      name: 'app-info',
      component: require('@/views/AppInfo').default,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/views/About').default,
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/views/Settings').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
