<template>
  <v-snackbar
          v-model="snackbar.visible"
          :timeout="snackbar.timeout"
          :color="snackbar.status === 'success' ? 'green' : 'red'"
          top
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component
    export default class extends Vue  {

        get snackbar() {
            return this.$store.state.snackbar;
        }

    }
</script>

<style scoped>

</style>