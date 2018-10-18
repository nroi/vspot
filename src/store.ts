import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {PhxMessage, PlayerMessage, PlaylistMessage, PlayerStatus, PlayerSong, RootState} from './types';

Vue.use(Vuex);

function elapsedFromStatus(playerStatus: PlayerStatus) {
    const then = Math.trunc(playerStatus.timestamp / 1000);
    const now = Date.now();
    return Math.trunc((now - then) / 1000);
}

const store: StoreOptions<RootState> = {
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        now: Date.now(),
        ui: {
            elapsedTime: 0,
        },
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget;
            state.socket.isConnected = true;
            console.log('Websocket is connected.');
            const phxJoinPlayerMsg = {
                topic: 'player',
                event: 'phx_join',
                payload: {},
                ref: '1',
            };
            const phxJoinPlaylistMsg = {
                topic: 'playlist',
                event: 'phx_join',
                payload: {},
                ref: '1',
            };
            Vue.prototype.$socket.sendObj(phxJoinPlayerMsg);
            Vue.prototype.$socket.sendObj(phxJoinPlaylistMsg);
        },
        SOCKET_ONCLOSE(state, event) {
            state.socket.isConnected = false;
        },
        SOCKET_ONERROR(state, event) {
            console.error(state, event);
        },
        // default handler called for all methods
        SOCKET_ONMESSAGE(state, message: PhxMessage)  {
            console.log('Got message from topic ' + message.topic);
            if (message.topic === 'player' && message.event === 'changed') {
                const playerMessage = message.payload as PlayerMessage;
                console.log(JSON.stringify(message));
                Vue.set(state, 'currentSong', playerMessage.song);
                Vue.set(state, 'currentStatus', playerMessage.status);
                // Vue.set(state.ui, 'elapsedTime', playerMessage.payload.status.elapsed);
                state.ui.elapsedTime = playerMessage.status.elapsed;
                console.log('Set song and status');
                // console.log(title);
                // state.socket.message = message;
            } else if (message.topic === 'playlist' && message.event === 'changed') {
                console.log('got playlist');
                console.log(message.payload);
                const playlistMessage = message.payload as PlaylistMessage;
                const then = Math.trunc(playlistMessage.status.timestamp / 1000);
                const now = Date.now();
                const elapsedSinceTimestamp = Math.trunc((now - then) / 1000);
                console.log('elapsed since timestamp: ' + elapsedSinceTimestamp);
                // state.ui.elapsedTime = playlistMessage.status.elapsed + elapsedSinceTimestamp;
                Vue.set(state.ui, 'elapsedTime', elapsedFromStatus(playlistMessage.status));
                state.currentStatus = playlistMessage.status;
                Vue.set(state, 'currentStatus', playlistMessage.status);
                const song = playlistMessage.songs.find((p: PlayerSong) => p.id === playlistMessage.current_id);
                Vue.set(state, 'currentSong', song);
                console.log('current song: ' + JSON.stringify(song));
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count);
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
        updateNow(state) {
            console.log('update now');
            state.now = Date.now();

            // TOOD code duplication: Refactor into a separate method?
            if (state.currentStatus) {
                state.ui.elapsedTime = elapsedFromStatus(state.currentStatus);
            } else {
                state.ui.elapsedTime = 0;
            }
        },
    },
    actions: {
        sendMessage(context, message) {
            // ...
            Vue.prototype.$socket.send(message);
            // ...
        },
    },
    getters: {
        currentSongDuration(state) {
            // TODO: get the actual time from the backend and format it accordingly.
            if (state.currentSong) {
                return state.currentSong.duration_in_secs;
            } else {
                console.log('current song is NOT set.');
                return 0;
            }
        },
        uiElapsedTime(state) {
            return state.ui.elapsedTime;
        },
    },
};

export default new Vuex.Store<RootState>(store);
