<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer
              v-model="drawer"
              :clipped="clipped"
              enable-resize-watcher app
              permanent
              absolute
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-icon>
                  music_note
                </v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>vspot</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-tile
                  v-for="item in items"
                  :key="item.title"
                  @click=""
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container fluid>
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
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongInfo from './components/SongInfo.vue';
import Queue from './components/Queue.vue';
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from './shared';

@Component({
  components: {
    SongInfo,
    Queue,
  },
})
export default class App extends Vue {

    private items = [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
    ];

    private right = null;

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
}
</style>
