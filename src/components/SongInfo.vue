<template>
  <div>
    <v-btn @click="previous()" fab title="previous">
      <v-icon>skip_previous</v-icon>
    </v-btn>
    <v-btn @click="play()" fab large title="play">
      <v-icon>play_circle_outline</v-icon>
    </v-btn>
    <v-btn @click="next()" fab title="next">
      <v-icon>skip_next</v-icon>
    </v-btn>
    {{ $store.state.currentSong.artist }} – {{ $store.state.currentSong.title }}
    {{ formatHHMMSS($store.getters.uiElapsedTime) }} / {{ formatHHMMSS($store.getters.currentSongDuration) }}
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SongInfo extends Vue {

        private formatHHMMSS(totalSeconds: number) {
            totalSeconds = Math.trunc(totalSeconds);
            const totalHours = Math.trunc(totalSeconds / 3600);
            const restMinutes = Math.trunc((totalSeconds - totalHours * 3600) / 60);
            const restSeconds = totalSeconds - totalHours * 3600 - restMinutes * 60;

            const prefix = (duration: number) => duration < 10 ? '0' : '';

            const hoursString = totalHours > 0 ? `${prefix(totalHours)}${String(totalHours)}:` : '';
            const minutesString = `${prefix(restMinutes)}${String(restMinutes)}:`;
            const secondsString = `${prefix(restSeconds)}${String(restSeconds)}`;

            return hoursString + minutesString + secondsString;
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