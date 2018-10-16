import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {PhxMessage, PlayerMessage, RootState} from './types';
import { formatHHMMSS } from './shared';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        duration: 0,
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
        now: Date.now(),
    },
    mutations: {
        SOCKET_ONOPEN(state, event) {
            Vue.prototype.$socket = event.currentTarget;
            state.socket.isConnected = true;
            console.log('Websocket is connected.');
            const msg1 = {
                topic: 'player',
                event: 'phx_join',
                payload: {},
                ref: '1',
            };
            Vue.prototype.$socket.sendObj(msg1);
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
                const playerMessage = message as PlayerMessage;
                console.log(JSON.stringify(message));
                // state.currentSong = playerMessage.payload.song;
                Vue.set(state, 'currentSong', playerMessage.payload.song);
                playerMessage.payload.status.timestamp = Date.now();
                Vue.set(state, 'currentStatus', playerMessage.payload.status);
                console.log('Set song and status');

                // TODO ugly workaround.
                state.duration = playerMessage.payload.song.duration_in_secs;
                // console.log(title);
                // state.socket.message = message;
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
        formatDuration(state) {
            // TODO: get the actual time from the backend and format it accordingly.
            if (state.currentSong) {
                return formatHHMMSS(state.currentSong.duration_in_secs);
            } else {
                console.log('current song is NOT set.');
                return '00:00';
            }
        },
        elapsedTime(state) {
            // TODO code duplication (formatElapsed).
            // perhaps we can use a filter or some such.
            if (state.currentStatus) {
                const elapsedThen: number = state.currentStatus.elapsed;
                const elapsedDiff = Math.max(0, Math.trunc((state.now - state.currentStatus.timestamp) / 1000));
                const elapsedNow = elapsedThen + elapsedDiff;
                return Math.trunc(elapsedNow);
            } else {
                return 0;
            }
        },
        formatElapsed(state) {
            // TODO: get the actual time from the backend and format it accordingly.
            if (state.currentStatus) {
                const elapsedThen: number = state.currentStatus.elapsed;
                const elapsedDiff = Math.max(0, Math.trunc((state.now - state.currentStatus.timestamp) / 1000));
                const elapsedNow = elapsedThen + elapsedDiff;
                return formatHHMMSS(Math.trunc(elapsedNow));
            } else {
                return '00:00';
            }
        },
    },
};

export default new Vuex.Store<RootState>(store);
