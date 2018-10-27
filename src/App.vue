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

        <v-data-table v-if="$store.state.songs"
                :headers="queueHeaders"
                :items="$store.state.songs"
                      :search="$store.state.filterInput"
                hide-actions
                class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <tr @click="play(props.item.id)">
              <td>
                <v-icon v-if="$store.state.currentSong.id === props.item.id && $store.state.currentStatus.state === 'play'" color="black">
                  play_circle_outline
                </v-icon>
              </td>
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.artist }}</td>
              <td class="text-xs-left">{{ props.item.album }}</td>
              <td class="text-xs-left">{{ props.item.duration_in_secs | formatHHMMSS }}</td>
            </tr>
          </template>
        </v-data-table>

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
import {HEARTBEAT_INTERVAL, UPDATE_INTERVAL} from './shared';

@Component({
  components: {
    HelloWorld,
    SongInfo,
  },
})

export default class App extends Vue {

    private queueHeaders = [
        {text: '', value: 'empty'},
        {text: 'Title', value: 'title'},
        {text: 'Artist', value: 'artist'},
        {text: 'Album', value: 'album'},
        {text: 'Time', value: 'time'},
    ];

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
