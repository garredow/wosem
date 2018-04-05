<template>
<v-app id="app" :dark="settings.theme === 'dark'">
  <v-navigation-drawer app stateless hide-overlay :mini-variant.sync="mini" v-model="drawer" permanent :class="settings.theme==='light'?'primary':'grey darken-4'">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="~@/assets/icon-256.png" class="logo-avatar">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>WOSEM</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0">
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" @click.prevent="navigate($event, item.id)">
        <v-list-tile-action>
          <v-icon :class="{'primary--text': settings.theme === 'dark'}">{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-content>
      <router-view></router-view>
  </v-content>
  <v-snackbar bottom :timeout="snackbarMessage.duration" :color="snackbarMessage.type" v-model="showSnackbar" v-if="snackbarMessage">
    {{snackbarMessage.text}}
    <v-btn dark flat @click.native="showSnackbar = false">Close</v-btn>
  </v-snackbar>
</v-app>
</template>

<script>
export default {
  name: 'wosem',
  data() {
    return {
      drawer: true,
      items: [
        { id: 'install', title: 'Install', icon: 'file_download' },
        { id: 'devices', title: 'Devices', icon: 'devices_other' },
        // { id: 'about', title: 'About', icon: 'info_outline' },
        { id: 'settings', title: 'Settings', icon: 'settings' },
      ],
      mini: true,
      snackbar: {},
      showSnackbar: false,
    };
  },
  computed: {
    settings() {
      return this.$store.state.System.settings;
    },
    snackbarMessage() {
      const message = this.$store.state.System.snackbarMessage;

      if (!message) {
        return {};
      }
      this.showSnackbar = true;

      return {
        type: message.type,
        text: message.text,
        duration: message.duration || 2000,
      };
    },
  },
  methods: {
    navigate(ev, pageId) {
      ev.stopPropagation();

      switch (pageId) {
        case 'install':
          this.$router.push('/');
          break;
        case 'devices':
          this.$router.push('/devices');
          break;
        case 'about':
          this.$router.push('/about');
          break;
        case 'settings':
          this.$router.push('/settings');
          break;
        default:
          console.warn('No valid route path');
      }
    },
  },
  mounted() {
    this.$store.dispatch('loadSettings');
    this.$store.dispatch('refreshDeviceList');
  },
};
</script>

<style scoped>
.logo-avatar {
  border: 2px solid rgba(255,255,255,.7);
}
</style>
