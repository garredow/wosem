<template>
<div>
  <v-toolbar>
    <v-toolbar-title>Install Package</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <p>Drop an ipk file in the box below, select a device, and click "install". Easy as that!</p>

    <div class="drop-area" @dragover.prevent="" @drop.prevent="handleFileDrop($event)">
      <div v-if="!file">Drop an .ipk file here!</div>
      <div v-if="file">
        <v-icon small>insert_drive_file</v-icon>
        {{file.name}}
        <v-btn flat icon small @click="file = null" style="margin-left:0" class="red--text">
          <v-icon small>clear</v-icon>
        </v-btn>
      </div>
    </div>
    <v-container>
      <v-form v-model="validForm" ref="form" lazy-validation>
        <v-select :items="devices" v-model="selectedDevice" label="Device" item-value="name" item-text="name" :rules="deviceSelectRules"></v-select>
        <v-btn @click.prevent="installApp" class="primary" :disabled="installingApp || !file" :loading="installingApp">install</v-btn>
      </v-form>
    </v-container>
  </v-container>
</div>
</template>

<script>
export default {
  name: 'installPackage',
  data() {
    return {
      validForm: true,
      deviceSelectRules: [v => !!v || 'Device is required!'],
      installingApp: false,
      selectedDevice: null,
      file: null,
    };
  },
  computed: {
    devices() {
      return this.$store.state.Ares.devices;
    },
  },
  methods: {
    handleFileDrop(ev) {
      const file = ev.dataTransfer.files[0];

      if (!file || !file.name.endsWith('.ipk')) {
        this.$store.commit('showSnackbarMessage', {
          type: 'error',
          text: 'Invalid file. Only .ipk files are currently supported.',
        });
        return;
      }

      this.file = {
        name: file.name,
        path: file.path,
      };
    },
    async installApp() {
      if (!this.$refs.form.validate() || !this.file) {
        return;
      }

      this.installingApp = true;

      try {
        await this.$store.dispatch('installApp', { deviceName: this.selectedDevice, filePath: this.file.path });
        this.file = null;
        this.$store.commit('showSnackbarMessage', { type: 'success', text: 'Package installed!' });
      } catch (err) {
        this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message, duration: 10000 });
      }
      this.installingApp = false;
    },
  },
};
</script>

<style>
.drop-area {
  height: 150px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border: 2px dotted rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
