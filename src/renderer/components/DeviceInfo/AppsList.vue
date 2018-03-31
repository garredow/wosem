<template>
  <v-container>
        <v-subheader>User Apps</v-subheader>
    <v-card>
      <v-list two-line subheader>
        <v-list-tile v-for="app in apps" :key="app.id" avatar @click="goToApp(app.id)">
          <v-list-tile-avatar>
            <img src="~@/assets/logo-icon.png" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{app.title}} <span class="text--secondary app-version">v{{app.version}}</span></v-list-tile-title>
            <v-list-tile-sub-title>{{app.vendor}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon >chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
    <v-subheader>System Apps</v-subheader>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['deviceName'],
  computed: {
    ...mapState({
      apps: state => state.Ares.deviceApps,
    }),
  },
  mounted() {
    this.refreshApps();
  },
  methods: {
    async refreshApps() {
      try {
        await this.$store.dispatch('listApps', this.deviceName);
      } catch (err) {
        // this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message });
      }
    },
    goToApp(appId) {
      this.$router.push(`/device/${this.deviceName}/app/${appId}`);
    },
  },
};
</script>

<style scoped>
.app-version {
  font-size: 0.8em;
}
</style>
