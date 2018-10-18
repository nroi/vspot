<template>
  <div id="app">
    <v-app>
      <HelloWorld/>
      <SongInfo v-if="$store.state.currentSong">
      </SongInfo>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import SongInfo from './components/SongInfo.vue';

@Component({
  components: {
    HelloWorld,
    SongInfo,
  },
})

export default class App extends Vue {
    private created() {
        setInterval(() => this.$store.commit('updateNow'), 50);
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
