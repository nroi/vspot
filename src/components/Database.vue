<template>
  <div>
    <v-card>
      <v-list two-line subheader>
        <v-subheader inset>Listing files and directories from /</v-subheader>

        <v-list-tile
                v-for="dbEntry in dbEntries"
                :key="dbEntry.file || dbEntry.directory"
                avatar
                @click=""
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

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {DatabaseEntry} from '@/types';

    @Component
    export default class Database extends Vue {
        @Prop() public name!: string;


        private dbEntries: DatabaseEntry[] = [];

        private created() {
            this.getDatabaseFromPath('').then((response: DatabaseEntry[]) => {
                this.dbEntries = response;
            });
        }

        private getDatabaseFromPath(path: string) {
            const url = `http://localhost:8080/api/database/${path}`;
            return new Promise( (resolve, reject) => {
                fetch(url).then((response) => {
                    if (response.ok) {
                        resolve(response.json());
                    } else {
                        reject();
                    }
                });
            });
        }

    }
</script>

<style scoped>

</style>