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
          <v-text-field label="Name" v-model="formData.name" :rules="requiredRules" required></v-text-field>
          <v-text-field label="Description" v-model="formData.description" :rules="requiredRules" required></v-text-field>
        </v-container>
      </v-card>
      <v-subheader>Connection</v-subheader>
      <v-card>
        <v-container>
          <v-layout row>
            <v-flex xs8>
              <v-text-field label="IP Address" v-model="formData.host" :rules="requiredRules" required></v-text-field>
            </v-flex>
            <v-flex xs4 style="padding-left:25px">
              <v-text-field label="Port" v-model="formData.port" type="number" :rules="requiredRules" required></v-text-field>
            </v-flex>
          </v-layout>
          <v-select v-model="authType" label="Authentication Type" :items="['Password']" disabled></v-select>
          <v-text-field label="User" v-model="formData.username" :rules="requiredRules" required></v-text-field>
          <v-text-field label="Password" v-model="formData.password" type="password"></v-text-field>
        </v-container>
      </v-card>
      <div class="actions">
        <v-btn @click.prevent="submit" class="primary" :disabled="saving" :loading="saving">save</v-btn>
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
      requiredRules: [v => !!v || 'This field is required!'],
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
