<template>
  <div>
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
    <div>
      {{ $store.state.currentSong.artist || 'Unknown' }} – {{ $store.state.currentSong.title }}
    </div>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SongInfo extends Vue {

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
    }
</script>

<style scoped>

</style>