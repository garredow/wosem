<template>
<div>
  <v-toolbar>
    <v-toolbar-title>Devices</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <p>Add, update, and delete webOS OSE devices and manage their installed apps.</p>
    <v-card>
      <v-list two-line>
        <v-list-tile avatar v-for="device in devices" :key="device.name" @click="goToDevice(device.name)">
          <v-list-tile-avatar>
            <v-icon>computer</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{device.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{device.details.description}}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-btn fab fixed bottom right color="primary" @click="goToAddDevice()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card>
  </v-container>
</div>
</template>

<script>
export default {
  computed: {
    devices() {
      return this.$store.state.Ares.devices;
    },
  },
  mounted() {
    this.$store.dispatch('refreshDeviceList');
    this.$store.dispatch('clearDeviceApps'); // TODO: Better way of managing stale app data
  },
  methods: {
    goToDevice(deviceName) {
      this.$router.push(`/device/${deviceName}`);
    },
    goToAddDevice(deviceName) {
      this.$router.push('/devices/add');
    },
  },
};
</script>

<style>

</style>
