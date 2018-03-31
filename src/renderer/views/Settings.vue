<template>
<div>
  <v-toolbar>
    <v-toolbar-title>Settings</v-toolbar-title>
  </v-toolbar>
  <v-container>
    <p>Be sure to first set the path to your local ares-cli folder!</p>
    <v-card>
      <v-layout row>
        <v-flex xs4>
          <v-subheader class="label">Path to ares</v-subheader>
        </v-flex>
        <v-flex xs8 class="setting-input">
          <v-text-field v-model="settings.pathToAres" label="/Users/garrett/cli-tools/ares-cli/bin/" single-line></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs4>
          <v-subheader class="label">Theme</v-subheader>
        </v-flex>
        <v-flex xs8 class="setting-input">
          <v-select v-model="settings.theme" single-line :items="themes" item-value="id" item-text="label"></v-select>
        </v-flex>
      </v-layout>
    </v-card>
    <div class="actions">
      <v-btn class="primary" @click="save()">save</v-btn>
    </div>
  </v-container>
</div>
</template>

<script>
export default {
  data() {
    return {
      themes: [{ label: 'Light', id: 'light' }, { label: 'Dark', id: 'dark' }],
    };
  },
  computed: {
    settings() {
      return this.$store.getters.getSettings();
    },
  },
  methods: {
    save() {
      this.$store.dispatch('setSettings', this.settings);
    },
  },
};
</script>

<style scoped>
.label {
  padding-top: 18px;
}
.setting-input {
  padding-right: 16px;
}
.actions {
  padding: 15px 0;
}
</style>
