<template>
<div>
  <v-toolbar>
    <back-button></back-button>
    <v-toolbar-title>Add Device</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <v-form v-model="valid" ref="form" lazy-validation v-if="formData">
      <v-subheader>Basic Info</v-subheader>
      <v-card>
        <v-container>
          <v-text-field label="Name" v-model="formData.name" :rules="formRules.name" required></v-text-field>
          <v-text-field label="Description" v-model="formData.description" :rules="formRules.description" required></v-text-field>
        </v-container>
      </v-card>
      <v-subheader>Connection</v-subheader>
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs8>
              <v-text-field label="IP Address" v-model="formData.host" :rules="formRules.ip" required></v-text-field>
            </v-flex>
            <v-flex xs4 style="padding-left:25px">
              <v-text-field label="Port" v-model="formData.port" type="number" :rules="formRules.port" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-select v-model="authType" label="Authentication Type" :items="['Password']" disabled></v-select>
          <v-text-field label="User" v-model="formData.username" :rules="formRules.username" required></v-text-field>
          <v-text-field label="Password" v-model="formData.password" type="password" :rules="formRules.password"></v-text-field>
        </v-container>
      </v-card>
      <div class="actions">
        <v-btn @click.prevent="submit" class="primary" :disabled="!valid || saving" :loading="saving">save</v-btn>
      </div>
    </v-form>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      saving: false,
      authType: 'Password',
      formData: {
        name: null,
        description: 'A webOS Device',
        host: '127.0.0.1',
        port: '22',
        username: 'root',
        password: null,
      },
      formRules: {
        name: [
          v => !!v || 'Name is required!',
          v => (!!v && !!v.match(/^[\w-.]+$/)) || 'Allowed characters: a-z A-Z 0-9 .-_',
        ],
        description: [v => !!v || 'Description is required!', v => (!!v && !v.match(/[']+/)) || "' is not allowed"],
        ip: [v => !!v || 'IP Address is required!', v => (!!v && !!v.match(/^[0-9.]+$/)) || 'Invalid address.'],
        port: [v => !!v || 'Port is required!', v => (!!v && !!v.match(/^[0-9]+$/)) || 'Port must be a number.'],
        username: [v => !!v || 'Name is required!', v => (!!v && !v.match(/[']+/)) || "' is not allowed"],
        password: [v => !v || (!!v && !v.match(/[']+/)) || "' is not allowed"],
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.saving = true;
        try {
          await this.$store.dispatch('addDevice', this.formData);
          this.$store.commit('showSnackbarMessage', { type: 'success', text: 'Saved!' });
          this.$router.push('/devices');
        } catch (err) {
          this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message, duration: 10000 });
        }
        this.saving = false;
      }
    },
  },
};
</script>

<style>
.actions {
  padding: 15px 0;
}
</style>
