<template>
  <div>
    HERE: {{ formatHHMMSS($store.getters.uiElapsedTime) }} / {{ formatHHMMSS($store.getters.currentSongDuration) }}
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class SongInfo extends Vue {
        name: "SongInfo";

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
    }
</script>

<style scoped>

</style>