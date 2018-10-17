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
import SongInfo from './SongInfo.vue';

@Component
export default class HelloWorld extends Vue {

  private created() {
      console.log('created.');
      const song = this.$store.state.currentSong;
      console.log('current song:' + JSON.stringify(song));
  }

  // private formatHHMMSS(totalSeconds: number) {
  //     totalSeconds = Math.trunc(totalSeconds);
  //     const totalHours = Math.trunc(totalSeconds / 3600);
  //     const restMinutes = Math.trunc((totalSeconds - totalHours * 3600) / 60);
  //     const restSeconds = totalSeconds - totalHours * 3600 - restMinutes * 60;
  //
  //     const prefix = (duration: number) => duration < 10 ? '0' : '';
  //
  //     const hoursString = totalHours > 0 ? `${prefix(totalHours)}${String(totalHours)}:` : '';
  //     const minutesString = `${prefix(restMinutes)}${String(restMinutes)}:`;
  //     const secondsString = `${prefix(restSeconds)}${String(restSeconds)}`;
  //
  //     return hoursString + minutesString + secondsString;
  // }
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
