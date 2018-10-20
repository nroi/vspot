<template>
  <div id="app">
    <v-app>
      <ul v-if="$store.state.songs">
        <li v-for="song in $store.state.songs">
          <p>{{song.artist}} {{ song.title }}</p>
        </li>
      </ul>
      <SongInfo v-if="$store.state.currentSong" />
      <HelloWorld/>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import SongInfo from './components/SongInfo.vue';
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from "./shared";

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
