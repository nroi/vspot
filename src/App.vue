<template>
  <!--TODO maybe put the search box into a toolbar? https://vuetifyjs.com/en/examples/layouts/googleYoutube-->
  <!--TODO check out this example: https://github.com/vuetifyjs/docs/blob/master/examples/layouts/complex.vue-->
  <!--https://vuetifyjs.com/en/examples/layouts/complex-->
  <div id="app">
    <v-app>
      <v-navigation-drawer
              fixed
              clipped
              app
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
                  @click="$router.push('queue')"
          >
            <v-list-tile-action>
              <v-icon>queue_music</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Queue</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
                  @click="$router.push('database')"
          >
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Database</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-navigation-drawer>
      <v-toolbar
              color="blue-grey"
              dark
              fixed
              app
              clipped-right
      >
        <v-toolbar-title>vspot</v-toolbar-title>
        <v-spacer></v-spacer>
        <p>add search box here.</p>
      </v-toolbar>
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

          <router-view></router-view>

          <SongInfo v-if="$store.state.currentSong" />
        </v-container>
      </v-content>
      <v-footer height="85" color="blue-grey" class="white--text" app>
        useless text. place the current song and the seekbar in here.
        <br>
        even more useless text.
        <br>
        even more useless text.
      </v-footer>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SongInfo from './components/SongInfo.vue';
import Queue from './components/Queue.vue';
import Database from './components/Database.vue';
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from './shared';

@Component({
  components: {
    SongInfo,
    Queue,
    Database,
  },
})
export default class App extends Vue {

    private items = [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
    ];

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
  color: #2c3e50;
}
</style>
