<template>
  <div id="song-info">
    <v-btn @click="previous()" icon title="previous">
      <v-icon>skip_previous</v-icon>
    </v-btn>
    <v-btn v-if="$store.state.currentStatus.state === 'play'" @click="pause()" icon :icon="true" :flat="true" large title="pause">
      <v-icon dark>
        pause_circle_outline
      </v-icon>
    </v-btn>
    <v-btn v-else @click="play()" icon large title="play">
      <v-icon>
        play_circle_outline
      </v-icon>
    </v-btn>
    <v-btn @click="next()" icon title="next">
      <v-icon>skip_next</v-icon>
    </v-btn>

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
                @start="volumeSliderStart()"
                @end="volumeSliderEnd($event)"
                @change="volumeSliderChange($event)"
        ></v-slider>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class SongInfo extends Vue {
        @Prop() public name!: string;

        private play() {
            this.$store.dispatch('play');
        }

        private pause() {
            this.$store.dispatch('pause');
        }

        private next() {
            this.$store.dispatch('playNextSong');
        }

        private previous() {
            this.$store.dispatch('playPreviousSong');
        }

        private elapsedSliderStart() {
            this.$store.state.elapsedSliding = true;
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

        private volumeSliderStart() {
            this.$store.state.volumeSliding = true;
            console.log('sliderStart()');
        }

        private volumeSliderEnd(percent: number) {
            console.log('sliderEnd() at value ' + percent);
            this.$store.commit('setVolume', percent);
        }

        private volumeSliderChange(percent: number) {
            console.log('sliderChange() at value ' + percent);
            this.$store.commit('setVolume', percent);
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
  #song-info {
    text-align: center;
  }
</style>