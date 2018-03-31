<template>
<div>
  <v-toolbar>
    <back-button></back-button>
    <v-toolbar-title>App Info</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <pre>{{this.app}}</pre>
    <v-btn @click="showDeleteDialog = true" class="red white--text" :disabled="deleting" :loading="deleting">delete</v-btn>
  </v-container>
  <v-dialog v-model="showDeleteDialog" max-width="290">
    <v-card>
      <v-card-title class="headline">Delete</v-card-title>
      <v-card-text>Do you really want to delete this app?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat="flat" @click.native="showDeleteDialog = false">No</v-btn>
        <v-btn color="red" flat="flat" @click.native="deleteApp()">Yes, delete!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['deviceName', 'appId'],
  data() {
    return {
      showDeleteDialog: false,
      deleting: false,
    };
  },
  computed: {
    app() {
      return this.$store.getters.getAppById(this.appId);
    },
  },
  methods: {
    async deleteApp() {
      this.showDeleteDialog = false;
      this.deleting = true;

      try {
        await this.$store.dispatch('deleteApp', { deviceName: this.deviceName, appId: this.appId });
        this.$store.commit('showSnackbarMessage', { type: 'success', text: 'App deleted!' });
        this.$router.go(-1);
      } catch (err) {
        this.$store.commit('showSnackbarMessage', { type: 'error', text: err.message, duration: 10000 });
      }

      this.deleting = false;
    },
  },
};
</script>

<style>

</style>
