<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-text-field
                v-model="$store.state.filterInput"
                prepend-icon="search"
                box
                solo
                clearable
                label="Filter"
                type="text"
        ></v-text-field>

        <Queue></Queue>

        <SongInfo v-if="$store.state.currentSong" />
        <HelloWorld/>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import SongInfo from './components/SongInfo.vue';
import Queue from './components/Queue.vue';
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from './shared';

@Component({
  components: {
    HelloWorld,
    SongInfo,
    Queue,
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
