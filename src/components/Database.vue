<template>
  <div>

    <status-snackbar></status-snackbar>

    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>Listing files and directories from {{ currentPath }}</v-subheader>

        <v-list-tile
                v-for="dbEntry in dbEntries"
                :key="dbEntry.file || dbEntry.directory"
                avatar
                @click="dbEntry.file ? addToQueue(dbEntry) : traverseToDirectory(dbEntry.directory)"
        >
          <v-list-tile-avatar>
            <v-icon>
              <template v-if="dbEntry.file">
                music_video
              </template>
              <template v-else>
                folder
              </template>
            </v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <template v-if="dbEntry.file">
              <v-list-tile-title>{{ dbEntry.Title || dbEntry.file }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ dbEntry.Artist || 'unknown artist' }}</v-list-tile-sub-title>
            </template>
            <template v-else-if="dbEntry.directory">
              <v-list-tile-title>{{ dbEntry.directory }}</v-list-tile-title>
            </template>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </div>
</template>

<script lang='ts'>
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {DatabaseEntry, DatabasePlayerSong} from '@/types';
    import StatusSnackbar from '@/views/StatusSnackbar.vue';
    @Component({
        components: {
            StatusSnackbar,
        },
    })
    export default class Database extends Vue {
        @Prop() public name!: string;


        private dbEntries: DatabaseEntry[] = [];

        private currentPath: string = '/';

        private created() {
            return this.initializeFromPath('');
        }

        private initializeFromPath(path: string) {
            this.currentPath = '/' + path;
            this.getDatabaseFromPath(path).then((response: DatabaseEntry[]) => {
                this.dbEntries = response;
            });
        }

        private getDatabaseFromPath(path: string): Promise<DatabaseEntry[]> {
            const url = `http://localhost:8080/api/database/${path}`;
            // noinspection TypeScriptValidateTypes
            return new Promise<DatabaseEntry[]>( (resolve, reject) => {
                fetch(url).then((response) => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject();
                    }
                });
            });
        }

        private addToQueue(song: DatabasePlayerSong) {
            this.$store.dispatch('addToQueue', song.file).then(() => {
                this.$store.dispatch('setSnackbarText', 'Song added to queue');
                this.$store.dispatch('showSnackbar');
                this.$store.dispatch('setSnackbarStatus', 'success');
            });
        }

        private traverseToDirectory(directory: string) {
            this.initializeFromPath(directory);
        }

    }
</script>

<style scoped>

</style>