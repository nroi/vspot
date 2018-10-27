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
                @start="elapsedSliderStart()"
                @end="elapsedSliderEnd($event)"
                @change="elapsedSliderChange($event)"
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

@Component
export default class HelloWorld extends Vue {
    private created() {
        console.log('created.');
        const song = this.$store.state.currentSong;
    }

    private elapsedSliderStart() {
        this.$store.state.sliding = true;
        console.log('sliderStart()');
    }

    private elapsedSliderEnd(seconds: number) {
        console.log('sliderEnd() at value ' + seconds);
        this.$store.commit('seek', seconds);
    }

    private elapsedSliderChange(seconds: number) {
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
