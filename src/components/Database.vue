<template>
  <div>
    <p>Hello, World! this is your database.</p>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class Database extends Vue {
        @Prop() public name!: string;

        name: "Database"
    }
</script>

<style scoped>

</style>