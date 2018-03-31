<template>
  <div>
    <v-toolbar tabs dense>
      <back-button></back-button>
      <v-toolbar-title>Device Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <v-btn icon slot="activator" :loading="deleting || refreshing">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="refresh()">
            <v-list-tile-title>Refresh</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="showDeleteDialog = true">
            <v-list-tile-title>Delete</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-tabs v-model="activeTab" slot="extension" color="transparent" slider-color="primary">
        <v-tab :key="'config'">Configuration</v-tab>
        <v-tab :key="'apps'">Apps</v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <device-config :device="device"></device-config>
      </v-tab-item>
      <v-tab-item>
        <apps-list :deviceName="deviceName"></apps-list>
      </v-tab-item>
    </v-tabs-items>
    <v-dialog v-model="showDeleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Delete</v-card-title>
        <v-card-text>Do you really want to delete this device?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat="flat" @click.native="showDeleteDialog = false">No</v-btn>
          <v-btn color="red" flat="flat" @click.native="deleteDevice()">Yes, delete!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DeviceConfig from '@/components/DeviceInfo/DeviceConfig';
import AppsList from '@/components/DeviceInfo/AppsList';

export default {
  props: ['deviceName'],
  components: { DeviceConfig, AppsList },
  data() {
    return {
      activeTab: null,
      deleting: false,
      refreshing: false,
      showDeleteDialog: false,
    };
  },
  computed: {
    device() {
      return this.$store.getters.getDeviceByName(this.deviceName);
    },
  },
  methods: {
    async deleteDevice() {
      this.showDeleteDialog = false;
      this.deleting = true;

      try {
        await this.$store.dispatch('deleteDevice', this.device.name);
        this.$store.commit('showSnackbarMessage', { type: 'success', text: 'Device deleted!' });
        this.$router.go(-1);
      } catch (err) {
        this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message, duration: 10000 });
      }
      this.deleting = false;
    },
    async refresh() {
      this.refreshing = true;
      try {
        await this.$store.dispatch('listApps', this.deviceName);
      } catch (err) {
        this.$store.commit('showSnackbarMessage', { type: 'error', text: 'Failed to refresh info.', duration: 2000 });
      }

      this.refreshing = false;
    },
  },
};
</script>

<style>

</style>
