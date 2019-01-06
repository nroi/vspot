<template>
  <div id="queue">
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
            <v-icon v-if="$store.state.currentSong &&
          $store.state.currentSong.id === props.item.id &&
          $store.state.currentStatus.state === 'play'" color="black">
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
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class Queue extends Vue {
        @Prop() public name!: string;

        private queueHeaders = [
            {text: '', value: 'empty'},
            {text: 'Title', value: 'title'},
            {text: 'Artist', value: 'artist'},
            {text: 'Album', value: 'album'},
            {text: 'Time', value: 'time'},
        ];

        private play(id: number) {
            console.log('clicked play, id = ' + id);
            this.$store.commit('playId', id);
        }
    }
</script>

<style scoped>
</style>