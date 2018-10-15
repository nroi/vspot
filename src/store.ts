import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import {PhxMessage, PlayerMessage, RootState} from './types';
import { formatHHMMSS } from './shared';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        socket: {
            isConnected: false,
            message: '',
            reconnectError: false,
        },
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
                Vue.set(state, 'currentStatus', playerMessage.payload.status);
                console.log('Set song and status');
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
        formatElapsed(state) {
            // TODO: get the actual time from the backend and format it accordingly.
            if (state.currentStatus) {
                return formatHHMMSS(state.currentStatus.elapsed);
            } else {
                console.log('current song is NOT set.');
                return '00:00';
            }
        },
    },
};

export default new Vuex.Store<RootState>(store);
