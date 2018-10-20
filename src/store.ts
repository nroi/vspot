import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {PhxMessage, PlayerMessage, PlaylistMessage, PlayerSong, RootState, PlayerStatus} from './types';
import {randomString, UPDATE_INTERVAL} from './shared';

Vue.use(Vuex);

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
        sliding: false,
        prevSliderValue: -1,
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
                ref: '2',
            };
            const phxJoinStatusMsg = {
                topic: 'status',
                event: 'phx_join',
                payload: {},
                ref: '3',
            };
            Vue.prototype.$socket.sendObj(phxJoinPlayerMsg);
            Vue.prototype.$socket.sendObj(phxJoinPlaylistMsg);
            Vue.prototype.$socket.sendObj(phxJoinStatusMsg);
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
                Vue.set(state, 'currentStatus', playlistMessage.status);
                const song = playlistMessage.songs.find((p: PlayerSong) => p.id === playlistMessage.current_id);
                Vue.set(state, 'currentSong', song);
                console.log('current song: ' + JSON.stringify(song));
                Vue.set(state, 'songs', playlistMessage.songs);
            } else if (message.topic === 'status' && message.event !== 'phx_reply') {
                const playerStatus: PlayerStatus = message.payload as PlayerStatus;
                Vue.set(state, 'currentStatus', playerStatus);
            }
        },
        // mutations for reconnect methods
        SOCKET_RECONNECT(state, count) {
            console.info(state, count);
        },
        SOCKET_RECONNECT_ERROR(state) {
            state.socket.reconnectError = true;
        },
        heartbeat(state) {
            const heartbeatMsg = {
                topic: 'phoenix',
                event: 'heartbeat',
                payload: {},
                ref: randomString(),
            };
            Vue.prototype.$socket.sendObj(heartbeatMsg);
        },
        updateNow(state) {
            const diff = Date.now() - state.now;
            if (diff > UPDATE_INTERVAL * 8) {
                console.log('Wake up from suspend?');
                const msg = {
                    topic: 'status',
                    event: 'status',
                    payload: {
                        module: 'Paracusia.MpdClient.Status',
                        function: 'status',
                    },
                    ref: randomString(),
                };
                Vue.prototype.$socket.sendObj(msg);
            }
            state.now = Date.now();
        },
    },
    actions: {
        sendObject(context, object) {
            Vue.prototype.$socket.sendObj(object);
        },

        playNextSong(context) {
            const msg = {
                topic: 'player',
                event: 'play_next_song',
                payload: {},
                ref: randomString(),
            };
            Vue.prototype.$socket.sendObj(msg);
        },

        pause(context) {
            const msg = {
                topic: 'player',
                event: 'pause_playback',
                payload: {},
                ref: randomString(),
            };
            Vue.prototype.$socket.sendObj(msg);
        },

        play(context) {
            const msg = {
                topic: 'player',
                event: 'play',
                payload: {},
                ref: randomString(),
            };
            Vue.prototype.$socket.sendObj(msg);
        },

        playPreviousSong(context) {
            const msg = {
                topic: 'player',
                event: 'play_previous_song',
                payload: {},
                ref: randomString(),
            };
            Vue.prototype.$socket.sendObj(msg);
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
            let newSliderValue = -1;
            if (state.currentStatus && !state.sliding) {
                if (state.currentStatus.state === 'play') {
                    const diff = state.now * 1000 - state.currentStatus.timestamp;
                    newSliderValue = state.currentStatus.elapsed + diff / 1000000;
                } else {
                    newSliderValue = state.currentStatus.elapsed;
                }
            } else if (state.currentStatus && state.sliding) {
                newSliderValue = state.prevSliderValue;
            } else {
                newSliderValue = 0;
            }
            state.prevSliderValue = newSliderValue;
            return newSliderValue;
        },
    },
};

export default new Vuex.Store<RootState>(store);
