<template>
    <v-btn icon ripple @click="navigateBack()">
      <v-icon>chevron_left</v-icon>
    </v-btn>
</template>

<script>
export default {
  props: ['title'],
  methods: {
    navigateBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>

</style>
