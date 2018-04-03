<template>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation v-if="device" @submit.prevent="submit">
      <v-subheader>Basic Info</v-subheader>
      <v-card>
        <v-container>
          <v-text-field label="Name" v-model="device.name" disabled></v-text-field>
          <v-text-field label="Description" v-model="device.details.description" :rules="formRules.description" required></v-text-field>
        </v-container>
      </v-card>
      <v-subheader>Connection</v-subheader>
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs8>
              <v-text-field label="IP Address" v-model="device.deviceinfo.ip" :rules="formRules.ip" required></v-text-field>
            </v-flex>
            <v-flex xs4 style="padding-left:25px">
              <v-text-field label="Port" v-model="device.deviceinfo.port" type="number" :rules="formRules.port" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field label="User" v-model="device.deviceinfo.user" disabled></v-text-field>
          <v-text-field label="Password" v-model="device.details.password" type="password" disabled></v-text-field>
        </v-container>
      </v-card>
      <div class="actions">
        <v-btn type="submit" class="primary" :disabled="!valid || saving" :loading="saving">save</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['device'],
  data() {
    return {
      valid: true,
      saving: false,
      formRules: {
        description: [v => !!v || 'Description is required!', v => (!!v && !v.match(/[']+/)) || "' is not allowed"],
        ip: [v => !!v || 'IP Address is required!', v => (!!v && !!v.match(/^[0-9.]+$/)) || 'Invalid address.'],
        port: [v => !!v || 'Port is required!', v => (!!v && !!v.match(/^[0-9]+$/)) || 'Port must be a number.'],
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.saving = true;
        try {
          const payload = {
            name: this.device.name,
            description: this.device.details.description,
            ip: this.device.deviceinfo.ip,
            port: this.device.deviceinfo.port,
          };
          await this.$store.dispatch('updateDeviceInfo', payload);
          this.$store.commit('showSnackbarMessage', { type: 'success', text: 'Saved!' });
        } catch (err) {
          this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message, duration: 10000 });
        }
        this.saving = false;
      }
    },
  },
};
</script>

<style scoped>
.actions {
  padding: 15px 0;
}
</style>
