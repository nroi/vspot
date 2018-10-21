<template>
  <div id="app">
    <v-app>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-list v-if="$store.state.songs">
        <template v-for="(song, index) in $store.state.songs">
          <v-list-tile :key="song.id" @click="play(song.id)">
            <v-list-tile-action>
              <v-icon v-if="$store.state.currentSong.id === song.id && $store.state.currentStatus.state === 'play'" color="black">
                play_circle_outline
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="song.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < $store.state.songs.length" :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
      <SongInfo v-if="$store.state.currentSong" />
      <HelloWorld/>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import SongInfo from './components/SongInfo.vue';
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from './shared';

@Component({
  components: {
    HelloWorld,
    SongInfo,
  },
})

export default class App extends Vue {

    private created() {
        setInterval(() => this.$store.commit('updateNow'), UPDATE_INTERVAL);
        setInterval(() => this.$store.commit('heartbeat'), HEARTBEAT_INTERVAL);
    }

    private play(id: number) {
        this.$store.commit('playId', id);
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
