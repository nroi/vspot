<template>
  <v-container>
    <v-layout>
      <v-flex shrink
              style="width: 60px"
              >
        <v-container>
          <div>{{ $store.getters.uiElapsedTime | formatHHMMSS }}</div>
        </v-container>
      </v-flex>
      <v-flex>
        <v-slider
                id='elapsedSlider'
                :max="$store.state.currentSong ? $store.state.currentSong.duration_in_secs : 0"
                :value="$store.getters.uiElapsedTime"
                @start="sliderStart()"
                @end="sliderEnd($event)"
                @change="sliderChange($event)"
        ></v-slider>
      </v-flex>
      <v-flex shrink
              style="width: 60px">
        <v-container>
          {{ $store.getters.currentSongDuration | formatHHMMSS }}
        </v-container>
      </v-flex>
      <v-slider
              :value="$store.getters.uiVolume"
              prepend-icon="volume_down"
      ></v-slider>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    filters: {
        formatHHMMSS(totalSeconds: number) {
            totalSeconds = Math.trunc(totalSeconds);
            const totalHours = Math.trunc(totalSeconds / 3600);
            const restMinutes = Math.trunc((totalSeconds - totalHours * 3600) / 60);
            const restSeconds = totalSeconds - totalHours * 3600 - restMinutes * 60;

            const prefix = (duration: number) => duration < 10 ? '0' : '';
            const hoursString = totalHours > 0 ? `${prefix(totalHours)}${String(totalHours)}:` : '';
            const minutesString = `${prefix(restMinutes)}${String(restMinutes)}:`;
            const secondsString = `${prefix(restSeconds)}${String(restSeconds)}`;
            return hoursString + minutesString + secondsString;
        },
    },
})
export default class HelloWorld extends Vue {
    private created() {
        console.log('created.');
        const song = this.$store.state.currentSong;
    }

    private sliderStart() {
        this.$store.state.sliding = true;
        console.log('sliderStart()');
    }

    private sliderEnd(seconds: number) {
        console.log('sliderEnd() at value ' + seconds);
        this.$store.commit('seek', seconds);
    }

    private sliderChange(seconds: number) {
        console.log('sliderChange() at value ' + seconds);
        this.$store.commit('seek', seconds);
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
