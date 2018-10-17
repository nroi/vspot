<template>
  <div>
    <v-slider
            :max="$store.state.currentSong ? $store.state.currentSong.duration_in_secs : 0"
            v-model="$store.state.ui.elapsedTime"
    ></v-slider>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {

  private created() {
      console.log('created.');
      const song = this.$store.state.currentSong;
      console.log('current song:' + JSON.stringify(song));
  }
}

</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
